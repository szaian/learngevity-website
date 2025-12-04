import multiparty from "multiparty";
import nodemailer from "nodemailer";

// Disable Vercel’s body parsing so multiparty can read the form data
export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  const form = new multiparty.Form();

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error("Parsing error:", err);
      res.status(500).json({ success: false });
      return;
    }

    // Extract text inputs
    const data = {};
    for (const key in fields) {
      data[key] = fields[key][0];
    }

    // Create attachments array
    const attachments = [];
    for (const key in files) {
      const file = files[key][0];
      attachments.push({
        filename: file.originalFilename,
        path: file.path,
      });
    }

    // Gmail transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD, // Must be Gmail App Password
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USERNAME,
      to: process.env.EMAIL_USERNAME,
      subject: "New Tutor Application",
      text: JSON.stringify(data, null, 2),
      attachments,
    };

    try {
      await transporter.sendMail(mailOptions);
      res.status(200).json({ success: true });
    } catch (emailError) {
      console.error("Email error:", emailError);
      res.status(500).json({ success: false, error: "Email failed" });
    }
  });
}
