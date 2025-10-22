import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.50.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));
const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface ConfirmationEmailRequest {
  email: string;
  confirmationUrl: string;
  name?: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email, confirmationUrl, name }: ConfirmationEmailRequest = await req.json();

    console.log('Sending confirmation email to:', email);

    const emailResponse = await resend.emails.send({
      from: "Invitopia <noreply@invitopia.app>",
      to: [email],
      subject: "Confirmez votre adresse email - Invitopia",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #6366f1; margin-bottom: 10px;">Bienvenue sur Invitopia!</h1>
          </div>
          
          <div style="background-color: #f9fafb; border-radius: 12px; padding: 30px; margin-bottom: 30px;">
            <h2 style="color: #1f2937; margin-bottom: 15px;">
              ${name ? `Bonjour ${name}!` : 'Bonjour!'}
            </h2>
            <p style="color: #4b5563; line-height: 1.6; margin-bottom: 20px;">
              Merci de vous être inscrit sur Invitopia. Pour finaliser votre inscription et accéder à toutes les fonctionnalités, 
              veuillez confirmer votre adresse email en cliquant sur le bouton ci-dessous.
            </p>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="${confirmationUrl}" 
                 style="background-color: #6366f1; color: white; padding: 14px 32px; text-decoration: none; 
                        border-radius: 8px; font-weight: 600; display: inline-block; font-size: 16px;">
                Confirmer mon email
              </a>
            </div>
            
            <p style="color: #6b7280; font-size: 14px; margin-top: 20px;">
              Ou copiez et collez ce lien dans votre navigateur:<br>
              <a href="${confirmationUrl}" style="color: #6366f1; word-break: break-all;">
                ${confirmationUrl}
              </a>
            </p>
          </div>
          
          <div style="text-align: center; color: #6b7280; font-size: 13px;">
            <p style="margin-bottom: 10px;">
              Si vous n'avez pas créé de compte sur Invitopia, vous pouvez ignorer cet email en toute sécurité.
            </p>
            <p style="margin-top: 20px;">
              Ce lien expirera dans 24 heures.
            </p>
          </div>
          
          <div style="border-top: 1px solid #e5e7eb; margin-top: 30px; padding-top: 20px; text-align: center;">
            <p style="color: #9ca3af; font-size: 12px; margin: 0;">
              © 2025 Invitopia. Tous droits réservés.
            </p>
          </div>
        </div>
      `,
    });

    console.log("Confirmation email sent successfully:", emailResponse);

    return new Response(
      JSON.stringify({ 
        success: true,
        emailId: emailResponse.id,
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
  } catch (error: any) {
    console.error("Error in send-confirmation-email function:", error);
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
