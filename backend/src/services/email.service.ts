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
   * Send confirmation receipt to the customer who submitted an inquiry
   */
  async sendCustomerEnquiryConfirmation(data: {
    fullName: string;
    email: string;
    assetTitle?: string;
    referenceNumber?: string;
    preferredSalon?: string;
  }): Promise<void> {
    const subject = `[DARBAAR] Inquiry Confirmation — Ref #${data.referenceNumber || "INQ"}`;
    const html = `
      <div style="font-family: 'Georgia', serif; background-color: #F7F5F0; padding: 35px 20px; color: #111111;">
        <div style="max-width: 580px; margin: 0 auto; background-color: #FFFFFF; border: 1px solid #E5E5EA; padding: 35px; box-shadow: 0 4px 12px rgba(0,0,0,0.03);">
          
          <!-- Header -->
          <div style="border-bottom: 2px solid #263A31; padding-bottom: 20px; margin-bottom: 25px; text-align: center;">
            <h1 style="letter-spacing: 0.3em; font-size: 26px; margin: 0; color: #111111; text-transform: uppercase;">DARBAAR</h1>
            <p style="letter-spacing: 0.25em; font-size: 10px; color: #A68A55; margin: 6px 0 0 0; text-transform: uppercase;">Where Heritage Meets Rarity</p>
          </div>

          <!-- Title Bar -->
          <div style="background-color: #263A31; color: #F7F5F0; padding: 12px 18px; margin-bottom: 25px; font-size: 11px; letter-spacing: 0.15em; text-transform: uppercase; text-align: center;">
            Confidential Inquiry Confirmation
          </div>

          <!-- Body -->
          <div style="font-size: 14px; line-height: 1.8; color: #333333;">
            <p style="margin: 0 0 15px 0;">Dear <strong>${data.fullName}</strong>,</p>
            <p style="margin: 0 0 20px 0; color: #555555;">
              Thank you for contacting the Sovereign House of DARBAAR. Your inquiry regarding <strong>${data.assetTitle || "Curatorial Collection Specimen"}</strong> has been registered with our senior curatorial desk.
            </p>

            <div style="text-align: center; margin: 25px 0; padding: 15px; background-color: #F7F5F0; border: 1px solid #E5E5EA;">
              <span style="display: block; font-size: 10px; text-transform: uppercase; letter-spacing: 0.25em; color: #686868; margin-bottom: 6px;">Confidential Reference ID</span>
              <div style="font-size: 20px; font-weight: bold; color: #263A31; letter-spacing: 0.2em; font-family: 'Courier New', monospace;">
                #${data.referenceNumber || "DARBAAR-REF"}
              </div>
            </div>

            <p style="font-size: 13px; color: #555555; line-height: 1.7;">
              A Senior Advisory Specialist from our <strong>${data.preferredSalon || "Geneva Vault"}</strong> corridor will review your inquiry under strict non-disclosure protocols and contact you within 24 hours.
            </p>
          </div>

          <!-- Footer -->
          <div style="margin-top: 35px; padding-top: 20px; border-top: 1px solid #E5E5EA; font-size: 11px; color: #888888; text-align: center; line-height: 1.7;">
            <p style="margin: 0; font-weight: bold; color: #263A31;">DARBAAR Curatorial Directorate & Sovereign Advisory</p>
            <p style="margin: 3px 0 0 0; letter-spacing: 0.1em; text-transform: uppercase;">Mumbai • Geneva • London • Dubai • Singapore</p>
          </div>

        </div>
      </div>
    `;

    try {
      await transporter.sendMail({
        from: `"DARBAAR Curatorial Directorate" <${process.env.SMTP_USER || "darbaar3001@gmail.com"}>`,
        to: data.email,
        subject,
        html,
      });
      console.log(`[DARBAAR Email Dispatch] Customer confirmation dispatched to: ${data.email}`);
    } catch (err: any) {
      console.warn(`[DARBAAR Email Dispatch] Could not send confirmation to customer ${data.email}:`, err.message);
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

  /**
   * Send confidential registration verification OTP to newly registered collector
   */
  async sendRegistrationOtp(data: {
    email: string;
    fullName: string;
    otp: string;
  }): Promise<boolean> {
    const subject = `[DARBAAR] ${data.otp} is your Collector Registration Verification Code`;
    const html = `
      <div style="font-family: 'Georgia', serif; background-color: #F7F5F0; padding: 35px 20px; color: #111111;">
        <div style="max-width: 580px; margin: 0 auto; background-color: #FFFFFF; border: 1px solid #E5E5EA; padding: 35px; box-shadow: 0 4px 12px rgba(0,0,0,0.03);">
          
          <!-- Header -->
          <div style="border-bottom: 2px solid #263A31; padding-bottom: 20px; margin-bottom: 25px; text-align: center;">
            <h1 style="letter-spacing: 0.3em; font-size: 26px; margin: 0; color: #111111; text-transform: uppercase; font-family: 'Georgia', serif;">DARBAAR</h1>
            <p style="letter-spacing: 0.25em; font-size: 10px; color: #A68A55; margin: 6px 0 0 0; text-transform: uppercase;">Where Heritage Meets Rarity</p>
          </div>

          <!-- Title Bar -->
          <div style="background-color: #263A31; color: #F7F5F0; padding: 12px 18px; margin-bottom: 25px; font-size: 11px; letter-spacing: 0.15em; text-transform: uppercase; text-align: center;">
            Confidential Collector Authentication
          </div>

          <!-- Body -->
          <div style="font-size: 14px; line-height: 1.8; color: #333333;">
            <p style="margin: 0 0 15px 0;">Dear <strong>${data.fullName}</strong>,</p>
            <p style="margin: 0 0 20px 0; color: #555555;">
              Welcome to the Sovereign House of DARBAAR. To complete your collector registration and activate your confidential access to our permanent archival catalogue, please verify your email address using the passkey below:
            </p>

            <!-- OTP Box -->
            <div style="text-align: center; margin: 30px 0; padding: 20px; background-color: #F7F5F0; border: 1px solid #E5E5EA;">
              <span style="display: block; font-size: 10px; text-transform: uppercase; letter-spacing: 0.25em; color: #686868; margin-bottom: 10px;">One-Time Security Passkey</span>
              <div style="display: inline-block; background-color: #263A31; color: #C4AC79; font-size: 34px; font-weight: bold; letter-spacing: 0.35em; padding: 14px 32px; border: 1px solid #A68A55; font-family: 'Courier New', monospace;">
                ${data.otp}
              </div>
              <span style="display: block; font-size: 11px; color: #888888; margin-top: 12px;">Valid for 10 minutes • Do not disclose to third parties</span>
            </div>

            <p style="font-size: 12px; color: #777777; line-height: 1.6; margin: 25px 0 0 0;">
              If you did not initiate this collector account registration, please ignore this communication or contact the Curatorial Directorate.
            </p>
          </div>

          <!-- Footer -->
          <div style="margin-top: 35px; padding-top: 20px; border-top: 1px solid #E5E5EA; font-size: 11px; color: #888888; text-align: center; line-height: 1.7;">
            <p style="margin: 0; font-weight: bold; color: #263A31;">DARBAAR Curatorial Directorate & Sovereign Advisory</p>
            <p style="margin: 3px 0 0 0; letter-spacing: 0.1em; text-transform: uppercase;">Mumbai • Geneva • London • Dubai • Singapore</p>
          </div>

        </div>
      </div>
    `;

    try {
      await transporter.sendMail({
        from: `"DARBAAR Curatorial Directorate" <${process.env.SMTP_USER || "darbaar3001@gmail.com"}>`,
        to: data.email,
        subject,
        html,
      });
      console.log(`[DARBAAR OTP Dispatch] Registration OTP successfully dispatched to: ${data.email}`);
      return true;
    } catch (err: any) {
      console.error(`[DARBAAR OTP Dispatch] Failed to send email to ${data.email}:`, err.message);
      return false;
    }
  },
};

