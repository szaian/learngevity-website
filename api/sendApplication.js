import multiparty from "multiparty";
import nodemailer from "nodemailer";
import fs from "fs";

// Disable body parsing so multiparty can handle form-data correctly
export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, message: "Method not allowed" });
  }

  const MAX_SIZE = 4 * 1024 * 1024; // 4MB limit

  const form = new multiparty.Form();

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error("Form parsing error:", err);
      return res.status(500).json({ success: false, message: "Form parsing error" });
    }

    // Extract text fields
    const data = {};
    for (const key in fields) {
      data[key] = fields[key][0];
    }

    // Prepare attachments array
    const attachments = [];

    // Allowed keys:
    const fileFields = ["matricFile", "transcriptFile"];

    for (const field of fileFields) {
      if (!files[field] || !files[field][0] || files[field][0].size === 0) {
        continue; // No file uploaded for this field
      }

      const file = files[field][0];

      // SERVER-SIDE FILE SIZE CHECK
      if (file.size > MAX_SIZE) {
        console.warn(`File too large: ${file.originalFilename}, size=${file.size}`);

        // Delete temp upload to free space
        try { fs.unlinkSync(file.path); } catch {}

        return res.status(413).json({
          success: false,
          message: `${field} is larger than 4MB. Please upload a smaller file.`,
        });
      }

      // SERVER-SIDE FILE TYPE CHECK (PDF ONLY)
      const allowedTypes = ["application/pdf"];
      if (!allowedTypes.includes(file.headers["content-type"])) {
        console.warn(`Rejected non-PDF upload: ${file.originalFilename}`);

        try { fs.unlinkSync(file.path); } catch {}

        return res.status(400).json({
          success: false,
          message: `${field} must be a PDF file.`,
        });
      }

      // Add valid attachment
      attachments.push({
        filename: file.originalFilename,
        path: file.path,
      });
    }

    // Setup Gmail transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD, // Your Gmail App Password
      },
    });

    // Email content formatting
    const formattedText =
      "NEW TUTOR APPLICATION\n\n" +
      Object.entries(data)
        .map(([k, v]) => `${k}: ${v}`)
        .join("\n");

    const mailOptions = {
      from: process.env.EMAIL_USERNAME,
      to: process.env.EMAIL_USERNAME, // send to yourself
      subject: "New Tutor Application",
      text: formattedText,
      attachments,
    };

    try {
      await transporter.sendMail(mailOptions);
      return res.status(200).json({ success: true, message: "Application submitted" });
    } catch (emailErr) {
      console.error("Email sending failed:", emailErr);

      return res.status(500).json({
        success: false,
        message: "Email sending failed",
      });
    }
  });
}
