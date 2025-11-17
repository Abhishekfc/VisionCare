import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface ConsultationEmailRequest {
  name: string;
  email: string;
  phone: string;
  age?: number;
  gender?: string;
  leftEyePower?: string;
  rightEyePower?: string;
  lensType?: string;
  notes?: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const customerData: ConsultationEmailRequest = await req.json();
    console.log("Received consultation request for:", customerData.email);

    const adminEmail = Deno.env.get("ADMIN_EMAIL");
    if (!adminEmail) {
      console.error("ADMIN_EMAIL environment variable is not set");
      throw new Error("Admin email not configured");
    }
    
    console.log("Sending notification to admin:", adminEmail);

    // Send confirmation email to customer
    const customerEmailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8fafc;">
        <div style="background: linear-gradient(135deg, #0ea5e9 0%, #38bdf8 100%); padding: 30px; border-radius: 12px 12px 0 0;">
          <h1 style="color: white; margin: 0; font-size: 28px;">VisionCare Lens Shop</h1>
          <p style="color: white; margin: 10px 0 0 0; font-size: 16px;">Consultation Confirmation</p>
        </div>
        
        <div style="background-color: white; padding: 30px; border-radius: 0 0 12px 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
          <h2 style="color: #1e293b; margin-top: 0;">Thank you for booking with us, ${customerData.name}!</h2>
          
          <p style="color: #64748b; font-size: 16px; line-height: 1.6;">
            We have received your lens consultation request. Our team will review your details and contact you shortly.
          </p>
          
          <div style="background-color: #f1f5f9; padding: 20px; border-radius: 8px; margin: 25px 0;">
            <h3 style="color: #1e293b; margin-top: 0; font-size: 18px;">Your Consultation Details:</h3>
            
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; color: #64748b; font-weight: 600; width: 40%;">Name:</td>
                <td style="padding: 8px 0; color: #1e293b;">${customerData.name}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #64748b; font-weight: 600;">Email:</td>
                <td style="padding: 8px 0; color: #1e293b;">${customerData.email}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #64748b; font-weight: 600;">Phone:</td>
                <td style="padding: 8px 0; color: #1e293b;">${customerData.phone}</td>
              </tr>
              ${customerData.age ? `
              <tr>
                <td style="padding: 8px 0; color: #64748b; font-weight: 600;">Age:</td>
                <td style="padding: 8px 0; color: #1e293b;">${customerData.age}</td>
              </tr>
              ` : ''}
              ${customerData.gender ? `
              <tr>
                <td style="padding: 8px 0; color: #64748b; font-weight: 600;">Gender:</td>
                <td style="padding: 8px 0; color: #1e293b;">${customerData.gender}</td>
              </tr>
              ` : ''}
              ${customerData.leftEyePower ? `
              <tr>
                <td style="padding: 8px 0; color: #64748b; font-weight: 600;">Left Eye Power:</td>
                <td style="padding: 8px 0; color: #1e293b;">${customerData.leftEyePower}</td>
              </tr>
              ` : ''}
              ${customerData.rightEyePower ? `
              <tr>
                <td style="padding: 8px 0; color: #64748b; font-weight: 600;">Right Eye Power:</td>
                <td style="padding: 8px 0; color: #1e293b;">${customerData.rightEyePower}</td>
              </tr>
              ` : ''}
              ${customerData.lensType ? `
              <tr>
                <td style="padding: 8px 0; color: #64748b; font-weight: 600;">Lens Type:</td>
                <td style="padding: 8px 0; color: #1e293b;">${customerData.lensType}</td>
              </tr>
              ` : ''}
              ${customerData.notes ? `
              <tr>
                <td style="padding: 8px 0; color: #64748b; font-weight: 600; vertical-align: top;">Notes:</td>
                <td style="padding: 8px 0; color: #1e293b;">${customerData.notes}</td>
              </tr>
              ` : ''}
            </table>
          </div>
          
          <p style="color: #64748b; font-size: 14px; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0;">
            <strong>VisionCare Lens Shop</strong><br>
            Your Vision, Our Care
          </p>
        </div>
      </div>
    `;

    // Send notification email to admin
    const adminEmailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8fafc;">
        <div style="background: linear-gradient(135deg, #ef4444 0%, #f97316 100%); padding: 30px; border-radius: 12px 12px 0 0;">
          <h1 style="color: white; margin: 0; font-size: 28px;">🔔 New Consultation Request</h1>
          <p style="color: white; margin: 10px 0 0 0; font-size: 16px;">VisionCare Admin Notification</p>
        </div>
        
        <div style="background-color: white; padding: 30px; border-radius: 0 0 12px 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
          <h2 style="color: #1e293b; margin-top: 0;">New Customer Consultation</h2>
          
          <p style="color: #64748b; font-size: 16px;">
            A new customer has submitted a lens consultation request. Please review the details below and follow up accordingly.
          </p>
          
          <div style="background-color: #fef2f2; padding: 20px; border-radius: 8px; margin: 25px 0; border-left: 4px solid #ef4444;">
            <h3 style="color: #1e293b; margin-top: 0; font-size: 18px;">Customer Details:</h3>
            
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; color: #64748b; font-weight: 600; width: 40%;">Name:</td>
                <td style="padding: 8px 0; color: #1e293b;">${customerData.name}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #64748b; font-weight: 600;">Email:</td>
                <td style="padding: 8px 0; color: #1e293b;"><a href="mailto:${customerData.email}" style="color: #0ea5e9;">${customerData.email}</a></td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #64748b; font-weight: 600;">Phone:</td>
                <td style="padding: 8px 0; color: #1e293b;"><a href="tel:${customerData.phone}" style="color: #0ea5e9;">${customerData.phone}</a></td>
              </tr>
              ${customerData.age ? `
              <tr>
                <td style="padding: 8px 0; color: #64748b; font-weight: 600;">Age:</td>
                <td style="padding: 8px 0; color: #1e293b;">${customerData.age}</td>
              </tr>
              ` : ''}
              ${customerData.gender ? `
              <tr>
                <td style="padding: 8px 0; color: #64748b; font-weight: 600;">Gender:</td>
                <td style="padding: 8px 0; color: #1e293b;">${customerData.gender}</td>
              </tr>
              ` : ''}
              ${customerData.leftEyePower ? `
              <tr>
                <td style="padding: 8px 0; color: #64748b; font-weight: 600;">Left Eye Power:</td>
                <td style="padding: 8px 0; color: #1e293b;"><strong>${customerData.leftEyePower}</strong></td>
              </tr>
              ` : ''}
              ${customerData.rightEyePower ? `
              <tr>
                <td style="padding: 8px 0; color: #64748b; font-weight: 600;">Right Eye Power:</td>
                <td style="padding: 8px 0; color: #1e293b;"><strong>${customerData.rightEyePower}</strong></td>
              </tr>
              ` : ''}
              ${customerData.lensType ? `
              <tr>
                <td style="padding: 8px 0; color: #64748b; font-weight: 600;">Lens Type:</td>
                <td style="padding: 8px 0; color: #1e293b;">${customerData.lensType}</td>
              </tr>
              ` : ''}
              ${customerData.notes ? `
              <tr>
                <td style="padding: 8px 0; color: #64748b; font-weight: 600; vertical-align: top;">Notes:</td>
                <td style="padding: 8px 0; color: #1e293b;">${customerData.notes}</td>
              </tr>
              ` : ''}
            </table>
          </div>
          
          <div style="background-color: #eff6ff; padding: 15px; border-radius: 8px; margin-top: 20px;">
            <p style="color: #1e40af; margin: 0; font-size: 14px;">
              💡 <strong>Action Required:</strong> Please contact the customer within 24 hours to schedule their consultation.
            </p>
          </div>
          
          <p style="color: #94a3b8; font-size: 12px; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0;">
            This is an automated notification from VisionCare Lens Shop Admin System
          </p>
        </div>
      </div>
    `;

    // Send both emails
    const [customerResponse, adminResponse] = await Promise.all([
      resend.emails.send({
        from: "VisionCare Lens Shop <onboarding@resend.dev>",
        to: [customerData.email],
        subject: "Consultation Confirmation - VisionCare Lens Shop",
        html: customerEmailHtml,
      }),
      resend.emails.send({
        from: "VisionCare Admin <onboarding@resend.dev>",
        to: [adminEmail],
        subject: `🔔 New Consultation Request from ${customerData.name}`,
        html: adminEmailHtml,
      })
    ]);

    console.log("Customer email sent successfully:", customerResponse);
    console.log("Admin email sent successfully:", adminResponse);

    return new Response(
      JSON.stringify({ 
        success: true,
        customerEmailId: customerResponse.data?.id,
        adminEmailId: adminResponse.data?.id 
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
    console.error("Error in send-consultation-email function:", error);
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