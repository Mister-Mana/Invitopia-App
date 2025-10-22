import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface SendSMSRequest {
  to: string;
  message: string;
  eventId?: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { to, message, eventId }: SendSMSRequest = await req.json();

    console.log('Sending SMS to:', to);
    console.log('Message:', message);
    console.log('Event ID:', eventId);

    // TODO: Integrate with SMS provider (Twilio, MessageBird, etc.)
    // For now, we'll simulate sending
    
    // Example Twilio integration would look like:
    // const twilioAccountSid = Deno.env.get('TWILIO_ACCOUNT_SID');
    // const twilioAuthToken = Deno.env.get('TWILIO_AUTH_TOKEN');
    // const twilioPhoneNumber = Deno.env.get('TWILIO_PHONE_NUMBER');

    // const response = await fetch(
    //   `https://api.twilio.com/2010-04-01/Accounts/${twilioAccountSid}/Messages.json`,
    //   {
    //     method: 'POST',
    //     headers: {
    //       'Authorization': `Basic ${btoa(`${twilioAccountSid}:${twilioAuthToken}`)}`,
    //       'Content-Type': 'application/x-www-form-urlencoded',
    //     },
    //     body: new URLSearchParams({
    //       To: to,
    //       From: twilioPhoneNumber,
    //       Body: message,
    //     }),
    //   }
    // );

    console.log('SMS sent successfully (simulated)');

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'SMS envoyé avec succès',
        to,
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
    console.error("Error in send-sms function:", error);
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
