import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface SendProgramRequest {
  guestId: string;
  eventId: string;
  deliveryMethod?: 'email' | 'whatsapp' | 'telegram';
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // SECURITY: Verify authentication
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized - Missing authorization header' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Verify the JWT token
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY")!;
    const supabaseAuth = createClient(supabaseUrl, supabaseAnonKey, {
      global: { headers: { Authorization: authHeader } }
    });

    const { data: { user }, error: userError } = await supabaseAuth.auth.getUser();
    if (userError || !user) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized - Invalid token' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const { guestId, eventId, deliveryMethod = 'email' }: SendProgramRequest = await req.json();
    
    // Validate required fields
    if (!guestId || !eventId) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields: guestId, eventId' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Use service role key for database operations
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // SECURITY: Verify the request is from event organizer
    const { data: event, error: eventError } = await supabase
      .from('events')
      .select('organizer_id, title, program')
      .eq('id', eventId)
      .single();

    if (eventError || !event) {
      return new Response(
        JSON.stringify({ error: 'Event not found' }),
        { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Check if user is the organizer
    if (event.organizer_id !== user.id) {
      return new Response(
        JSON.stringify({ error: 'Forbidden - Only event organizer can send program' }),
        { status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Fetch guest details
    const { data: guest, error: guestError } = await supabase
      .from('guests')
      .select('*')
      .eq('id', guestId)
      .eq('event_id', eventId)
      .single();

    if (guestError || !guest) {
      return new Response(
        JSON.stringify({ error: 'Guest not found' }),
        { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Check if guest has confirmed attendance
    if (guest.rsvp_status !== 'confirmed') {
      return new Response(
        JSON.stringify({ 
          error: 'Only confirmed guests can receive the event program'
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    if (!event.program || event.program.length === 0) {
      return new Response(
        JSON.stringify({ 
          error: 'No program available for this event'
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    // Generate program HTML
    const programSteps = event.program.map((step: any, index: number) => `
      <div style="margin-bottom: 20px; padding: 15px; background-color: #f9fafb; border-left: 4px solid #3B82F6; border-radius: 4px;">
        <div style="display: flex; align-items: center; margin-bottom: 8px;">
          <div style="width: 30px; height: 30px; background-color: #3B82F6; color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; margin-right: 10px;">
            ${index + 1}
          </div>
          <div style="font-size: 18px; font-weight: bold; color: #1F2937;">
            ${step.title}
          </div>
        </div>
        <div style="color: #6B7280; font-size: 14px; margin-bottom: 4px;">
          🕐 ${step.time} - Durée: ${step.duration} minutes
        </div>
        ${step.description ? `
          <div style="color: #4B5563; font-size: 14px; margin-top: 8px;">
            ${step.description}
          </div>
        ` : ''}
      </div>
    `).join('');

    const emailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background-color: #3B82F6; color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0;">
            <h1 style="margin: 0; font-size: 28px;">Programme de l'événement</h1>
            <p style="margin: 10px 0 0 0; font-size: 16px;">${event.title}</p>
          </div>
          
          <div style="background-color: white; padding: 30px; border: 1px solid #E5E7EB; border-top: none; border-radius: 0 0 8px 8px;">
            <p style="font-size: 16px; color: #1F2937;">
              Bonjour <strong>${guest.name}</strong>,
            </p>
            
            <p style="font-size: 14px; color: #4B5563;">
              Nous sommes ravis de vous compter parmi nos invités ! Voici le programme détaillé de l'événement :
            </p>

            <div style="margin: 30px 0;">
              <h2 style="color: #1F2937; font-size: 20px; margin-bottom: 20px; border-bottom: 2px solid #3B82F6; padding-bottom: 10px;">
                📅 Déroulement
              </h2>
              ${programSteps}
            </div>

            <div style="background-color: #EFF6FF; padding: 15px; border-radius: 8px; margin-top: 30px;">
              <p style="margin: 0; font-size: 14px; color: #1E40AF;">
                <strong>💡 Conseil :</strong> Nous vous recommandons d'arriver quelques minutes avant le début pour profiter pleinement de l'événement.
              </p>
            </div>

            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #E5E7EB; text-align: center;">
              <p style="font-size: 14px; color: #6B7280; margin: 5px 0;">
                À très bientôt !
              </p>
            </div>
          </div>

          <div style="text-align: center; margin-top: 20px; color: #9CA3AF; font-size: 12px;">
            <p>Cet email a été envoyé automatiquement par Invitopia</p>
          </div>
        </body>
      </html>
    `;

    // Send based on delivery method
    if (deliveryMethod === 'email' && guest.email) {
      const emailResponse = await resend.emails.send({
        from: "Invitopia <invitations@invitopia.app>",
        to: [guest.email],
        subject: `Programme - ${event.title}`,
        html: emailHtml,
      });

      return new Response(
        JSON.stringify({ 
          success: true,
          method: 'email',
          to: guest.email,
          sentAt: new Date().toISOString()
        }),
        {
          status: 200,
          headers: {
            "Content-Type": "application/json",
            ...corsHeaders,
          },
        }
      );
    } else if (deliveryMethod === 'whatsapp' || deliveryMethod === 'telegram') {
      // TODO: Implement WhatsApp/Telegram integration
      return new Response(
        JSON.stringify({ 
          success: true,
          method: deliveryMethod,
          message: 'WhatsApp/Telegram integration to be implemented',
          sentAt: new Date().toISOString()
        }),
        {
          status: 200,
          headers: {
            "Content-Type": "application/json",
            ...corsHeaders,
          },
        }
      );
    } else {
      throw new Error('Invalid delivery method or missing contact information');
    }

  } catch (error: any) {
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
