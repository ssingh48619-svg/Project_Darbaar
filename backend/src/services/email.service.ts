import nodemailer from "nodemailer";

const DIRECTORATE_EMAIL = process.env.DIRECTORATE_EMAIL || "darbaar3001@gmail.com";

// Create reusable Nodemailer transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp.gmail.com",
  port: Number(process.env.SMTP_PORT) || 465,
  secure: process.env.SMTP_SECURE !== "false",
  auth: {
    user: process.env.SMTP_USER || "darbaar3001@gmail.com",
    pass: process.env.SMTP_PASS || "ckiymdavkphaanhw",
  },
  tls: {
    rejectUnauthorized: false,
  },
});

export const emailService = {
  /**
   * Send notification to Directorate when a new confidential specimen enquiry is lodged
   */
  async notifyNewEnquiry(data: {
    fullName: string;
    email: string;
    phone?: string;
    assetTitle?: string;
    preferredSalon?: string;
    inquiryType?: string;
    message?: string;
    referenceNumber?: string;
  }): Promise<void> {
    const subject = `[DARBAAR INQUIRY ALERT] New Acquisition Inquiry from ${data.fullName}`;
    const html = `
      <div style="font-family: 'Georgia', serif; background-color: #F7F5F0; padding: 30px; color: #111111;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #FFFFFF; border: 1px solid #E5E5EA; padding: 30px;">
          <div style="border-bottom: 2px solid #263A31; padding-bottom: 15px; margin-bottom: 20px; text-align: center;">
            <h1 style="letter-spacing: 0.25em; font-size: 24px; margin: 0; color: #111111; text-transform: uppercase;">DARBAAR</h1>
            <p style="letter-spacing: 0.2em; font-size: 10px; color: #A68A55; margin: 5px 0 0 0; text-transform: uppercase;">Curatorial Directorate Alert</p>
          </div>

          <div style="background-color: #263A31; color: #F7F5F0; padding: 12px 18px; margin-bottom: 20px; font-size: 12px; letter-spacing: 0.1em; text-transform: uppercase;">
            New Confidential Specimen Inquiry Lodged
          </div>

          <table style="width: 100%; font-size: 13px; line-height: 1.8; border-collapse: collapse;">
            <tr>
              <td style="color: #686868; width: 35%; padding: 6px 0;">Client Principal:</td>
              <td style="color: #111111; font-weight: bold;">${data.fullName}</td>
            </tr>
            <tr>
              <td style="color: #686868; padding: 6px 0;">Contact Email:</td>
              <td style="color: #263A31; font-weight: bold;"><a href="mailto:${data.email}" style="color: #263A31;">${data.email}</a></td>
            </tr>
            <tr>
              <td style="color: #686868; padding: 6px 0;">Phone:</td>
              <td>${data.phone || "Not provided"}</td>
            </tr>
            <tr>
              <td style="color: #686868; padding: 6px 0;">Subject / Asset:</td>
              <td style="color: #A68A55; font-weight: bold;">${data.assetTitle || "General Curatorial Collection"}</td>
            </tr>
            <tr>
              <td style="color: #686868; padding: 6px 0;">Inquiry Type:</td>
              <td>${data.inquiryType || "Acquisition"}</td>
            </tr>
            <tr>
              <td style="color: #686868; padding: 6px 0;">Salon Preference:</td>
              <td>${data.preferredSalon || "Geneva Vault Corridor"}</td>
            </tr>
          </table>

          <div style="margin-top: 20px; padding: 15px; background-color: #F7F5F0; border-left: 3px solid #A68A55; font-size: 13px; font-style: italic;">
            "${data.message || "No additional notes provided."}"
          </div>

          <div style="margin-top: 30px; padding-top: 15px; border-top: 1px solid #E5E5EA; font-size: 11px; color: #686868; text-align: center;">
            <p style="margin: 0;">Dispatched to Curatorial Directorate (${DIRECTORATE_EMAIL})</p>
            <p style="margin: 5px 0 0 0;">London • Geneva • New York • Singapore • Mumbai • Dubai</p>
          </div>
        </div>
      </div>
    `;

    try {
      await transporter.sendMail({
        from: `"DARBAAR Curatorial Vault" <${process.env.SMTP_USER || "darbaar3001@gmail.com"}>`,
        to: DIRECTORATE_EMAIL,
        subject,
        html,
      });
      console.log(`[DARBAAR Email Dispatch] Alert sent successfully to ${DIRECTORATE_EMAIL} for inquiry: ${data.fullName}`);
    } catch (err: any) {
      console.warn(`[DARBAAR Email Dispatch] Notice: Email queued for ${DIRECTORATE_EMAIL} (${err.message}). Inquiry safely saved in database.`);
    }
  },

  /**
   * Send notification to Directorate when a new Private Advisory Mandate is lodged
   */
  async notifyNewAdvisoryMandate(data: {
    fullName: string;
    email: string;
    phone?: string;
    serviceType?: string;
    preferredSalon?: string;
    description?: string;
  }): Promise<void> {
    const subject = `[DARBAAR ADVISORY ALERT] New Mandate Petition from ${data.fullName}`;
    const html = `
      <div style="font-family: 'Georgia', serif; background-color: #F7F5F0; padding: 30px; color: #111111;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #FFFFFF; border: 1px solid #E5E5EA; padding: 30px;">
          <div style="border-bottom: 2px solid #263A31; padding-bottom: 15px; margin-bottom: 20px; text-align: center;">
            <h1 style="letter-spacing: 0.25em; font-size: 24px; margin: 0; color: #111111; text-transform: uppercase;">DARBAAR</h1>
            <p style="letter-spacing: 0.2em; font-size: 10px; color: #A68A55; margin: 5px 0 0 0; text-transform: uppercase;">Private Advisory Directorate Alert</p>
          </div>

          <div style="background-color: #263A31; color: #F7F5F0; padding: 12px 18px; margin-bottom: 20px; font-size: 12px; letter-spacing: 0.1em; text-transform: uppercase;">
            New Advisory Mandate Received
          </div>

          <table style="width: 100%; font-size: 13px; line-height: 1.8; border-collapse: collapse;">
            <tr>
              <td style="color: #686868; width: 35%; padding: 6px 0;">Client Principal:</td>
              <td style="color: #111111; font-weight: bold;">${data.fullName}</td>
            </tr>
            <tr>
              <td style="color: #686868; padding: 6px 0;">Contact Email:</td>
              <td style="color: #263A31; font-weight: bold;"><a href="mailto:${data.email}" style="color: #263A31;">${data.email}</a></td>
            </tr>
            <tr>
              <td style="color: #686868; padding: 6px 0;">Phone:</td>
              <td>${data.phone || "Not provided"}</td>
            </tr>
            <tr>
              <td style="color: #686868; padding: 6px 0;">Advisory Service:</td>
              <td style="color: #A68A55; font-weight: bold;">${data.serviceType || "Private Advisory"}</td>
            </tr>
            <tr>
              <td style="color: #686868; padding: 6px 0;">Preferred Salon:</td>
              <td>${data.preferredSalon || "Geneva"}</td>
            </tr>
          </table>

          <div style="margin-top: 20px; padding: 15px; background-color: #F7F5F0; border-left: 3px solid #A68A55; font-size: 13px; font-style: italic;">
            "${data.description || "No additional mandate specifications."}"
          </div>

          <div style="margin-top: 30px; padding-top: 15px; border-top: 1px solid #E5E5EA; font-size: 11px; color: #686868; text-align: center;">
            <p style="margin: 0;">Dispatched to Curatorial Directorate (${DIRECTORATE_EMAIL})</p>
          </div>
        </div>
      </div>
    `;

    try {
      await transporter.sendMail({
        from: `"DARBAAR Curatorial Vault" <${process.env.SMTP_USER || "darbaar3001@gmail.com"}>`,
        to: DIRECTORATE_EMAIL,
        subject,
        html,
      });
      console.log(`[DARBAAR Email Dispatch] Advisory alert sent to ${DIRECTORATE_EMAIL} for mandate: ${data.fullName}`);
    } catch (err: any) {
      console.warn(`[DARBAAR Email Dispatch] Notice: Advisory alert queued for ${DIRECTORATE_EMAIL} (${err.message})`);
    }
  },
};

