import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface ContactEmailRequest {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, subject, message }: ContactEmailRequest = await req.json();

    console.log('Sending contact form email from:', email);

    // Send notification to admin
    await resend.emails.send({
      from: "Invitopia Contact <contact@invitopia.app>",
      to: ["support@invitopia.app"],
      replyTo: email,
      subject: `[Contact Form] ${subject}`,
      html: `
        <h2>Nouveau message du formulaire de contact</h2>
        <p><strong>Nom:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Sujet:</strong> ${subject}</p>
        <hr>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
    });

    // Send confirmation to user
    const confirmationResponse = await resend.emails.send({
      from: "Invitopia <contact@invitopia.app>",
      to: [email],
      subject: "Nous avons reçu votre message - Invitopia",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #6366f1;">Merci de nous avoir contactés, ${name}!</h1>
          <p>Nous avons bien reçu votre message et nous vous répondrons dans les plus brefs délais.</p>
          <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Votre message:</strong></p>
            <p style="color: #4b5563;">${message.replace(/\n/g, '<br>')}</p>
          </div>
          <p>Cordialement,<br>L'équipe Invitopia</p>
        </div>
      `,
    });

    console.log("Contact email sent successfully:", confirmationResponse);

    return new Response(
      JSON.stringify({ 
        success: true,
        message: "Email envoyé avec succès"
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
    console.error("Error in send-contact-email function:", error);
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
