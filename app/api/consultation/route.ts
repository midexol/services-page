import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, message } = body;

    // 1. Basic validation
    if (!name || !email || !phone) {
      return NextResponse.json(
        { error: "Name, email, and phone are required fields." },
        { status: 400 }
      );
    }

    const submission = {
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      name,
      email,
      phone,
      message: message || "",
    };

    // 2. Local Backup Storage (data/submissions.json)
    const dataDir = path.join(process.cwd(), "data");
    const filePath = path.join(dataDir, "submissions.json");

    try {
      if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
      }

      let submissions = [];
      if (fs.existsSync(filePath)) {
        const fileData = fs.readFileSync(filePath, "utf-8");
        submissions = JSON.parse(fileData || "[]");
      }

      submissions.push(submission);
      fs.writeFileSync(filePath, JSON.stringify(submissions, null, 2), "utf-8");
      console.log(`[Backup Saved] Consultation request stored locally for ${name}`);
    } catch (fsError) {
      console.error("[Backup Error] Failed to store submission locally:", fsError);
      // Continue execution so we don't block email/Google Sheet integrations
    }

    // 3. Google Sheets Integration (via Google Apps Script Web App)
    const googleSheetUrl = process.env.GOOGLE_SHEET_WEBHOOK_URL;
    if (googleSheetUrl && googleSheetUrl !== "your_google_script_web_app_url") {
      try {
        console.log(`[Google Sheets] Sending submission to webhook: ${googleSheetUrl}`);
        const response = await fetch(googleSheetUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            phone,
            message,
          }),
        });

        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }
        console.log(`[Google Sheets] Successfully synced submission for ${name}`);
      } catch (sheetError) {
        console.error("[Google Sheets Error] Failed to sync to Google Sheet:", sheetError);
        // Continue execution so email still sends
      }
    } else {
      console.log("[Google Sheets] Webhook URL not configured in .env.local. Skipping sync.");
    }

    // 4. Email Confirmations (via Nodemailer)
    const smtpHost = process.env.SMTP_HOST;
    const smtpPort = process.env.SMTP_PORT;
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;
    const smtpFrom = process.env.SMTP_FROM || "Web3Nova <consultations@web3nova.com>";

    const hasSmtpConfig = smtpHost && smtpUser && smtpPass;

    const emailSubject = "Your Web3Nova Consultation Confirmation";
    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
        <h2 style="color: #2E7BD1; font-family: 'Space Grotesk', sans-serif;">Hello ${name},</h2>
        <p>Thank you for requesting a free discovery consultation with Web3Nova!</p>
        <p>Our team of digital engineers and designers has received your details and will contact you within the next 24 hours to schedule our strategy session.</p>
        
        <hr style="border: 0; border-top: 1px solid #eeeeee; margin: 20px 0;" />
        
        <h3 style="color: #333333;">Submission Details:</h3>
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 6px 0; font-weight: bold; width: 120px; color: #555555;">Full Name:</td>
            <td style="padding: 6px 0; color: #333333;">${name}</td>
          </tr>
          <tr>
            <td style="padding: 6px 0; font-weight: bold; color: #555555;">Email:</td>
            <td style="padding: 6px 0; color: #333333;">${email}</td>
          </tr>
          <tr>
            <td style="padding: 6px 0; font-weight: bold; color: #555555;">Phone:</td>
            <td style="padding: 6px 0; color: #333333;">${phone}</td>
          </tr>
          ${
            message
              ? `<tr>
            <td style="padding: 6px 0; font-weight: bold; color: #555555; vertical-align: top;">Project:</td>
            <td style="padding: 6px 0; color: #333333; white-space: pre-wrap;">${message}</td>
          </tr>`
              : ""
          }
        </table>
        
        <hr style="border: 0; border-top: 1px solid #eeeeee; margin: 20px 0;" />
        
        <p style="color: #777777; font-size: 13px; line-height: 1.5;">
          This is an automated confirmation of your request. If you have any immediate questions, feel free to reply directly to this email.
        </p>
        <p style="font-weight: bold; color: #2E7BD1;">Best Regards,<br />The Web3Nova Team</p>
      </div>
    `;

    const adminHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
        <h2 style="color: #FDB913; font-family: 'Space Grotesk', sans-serif;">New Consultation Request Received!</h2>
        <p>A new lead has submitted a request for a free discovery consultation on the Web3Nova landing page.</p>
        
        <hr style="border: 0; border-top: 1px solid #eeeeee; margin: 20px 0;" />
        
        <h3 style="color: #333333;">Lead Details:</h3>
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 6px 0; font-weight: bold; width: 120px; color: #555555;">Full Name:</td>
            <td style="padding: 6px 0; color: #333333;">${name}</td>
          </tr>
          <tr>
            <td style="padding: 6px 0; font-weight: bold; color: #555555;">Email:</td>
            <td style="padding: 6px 0; color: #333333;"><a href="mailto:${email}">${email}</a></td>
          </tr>
          <tr>
            <td style="padding: 6px 0; font-weight: bold; color: #555555;">Phone:</td>
            <td style="padding: 6px 0; color: #333333;"><a href="tel:${phone}">${phone}</a></td>
          </tr>
          ${
            message
              ? `<tr>
            <td style="padding: 6px 0; font-weight: bold; color: #555555; vertical-align: top;">Project:</td>
            <td style="padding: 6px 0; color: #333333; white-space: pre-wrap;">${message}</td>
          </tr>`
              : ""
          }
        </table>
        
        <hr style="border: 0; border-top: 1px solid #eeeeee; margin: 20px 0;" />
        
        <p style="font-weight: bold; color: #333333;">Please respond to this lead within 24 hours.</p>
      </div>
    `;

    if (hasSmtpConfig) {
      console.log(`[SMTP] Sending confirmation emails using ${smtpHost}...`);
      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: parseInt(smtpPort || "2525"),
        secure: smtpPort === "465",
        auth: {
          user: smtpUser,
          pass: smtpPass,
        },
      });

      // Send confirmation to client
      await transporter.sendMail({
        from: smtpFrom,
        to: email,
        subject: emailSubject,
        html: emailHtml,
      });
      console.log(`[SMTP] Confirmation email sent successfully to client: ${email}`);

      // Send notification to admin/web3nova
      await transporter.sendMail({
        from: smtpFrom,
        to: smtpFrom, // Send a copy to yourself
        subject: `[New Lead] Consultation Request - ${name}`,
        html: adminHtml,
      });
      console.log(`[SMTP] Notification email sent successfully to admin: ${smtpFrom}`);
    } else {
      console.warn("[SMTP Warn] SMTP credentials are not configured in .env.local.");
      console.log("------------------ LOGGED CLIENT CONFIRMATION MAIL ------------------");
      console.log(`To: ${email}`);
      console.log(`Subject: ${emailSubject}`);
      console.log("Body (HTML):\n", emailHtml);
      console.log("---------------------------------------------------------------------");

      console.log("------------------ LOGGED ADMIN NOTIFICATION MAIL -------------------");
      console.log(`To: ${smtpFrom}`);
      console.log(`Subject: [New Lead] Consultation Request - ${name}`);
      console.log("Body (HTML):\n", adminHtml);
      console.log("---------------------------------------------------------------------");
    }

    return NextResponse.json({ status: "success", data: submission });
  } catch (error) {
    console.error("[Backend Error] API route handler crash:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { error: "Internal server error: " + errorMessage },
      { status: 500 }
    );
  }
}
