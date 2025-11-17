// api/newsletter.js
import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { email } = req.body;
  if (!email) return res.status(400).json({ error: "Email is required" });

  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD;
  const from = process.env.FROM_EMAIL || user;
  const to = "infopehchaanmedia@gmail.com";

  if (!user || !pass) {
    console.error("Missing GMAIL_USER or GMAIL_APP_PASSWORD env vars");
    return res.status(500).json({ error: "Email server not configured" });
  }

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: { user, pass },
  });

  const mailOptions = {
    from,
    to,
    subject: "New Newsletter Signup",
    text: `New subscriber: ${email}`,
    html: `<p>New subscriber: <strong>${email}</strong></p>`,
  };

  try {
    await transporter.sendMail(mailOptions);
    return res.status(200).json({ success: true });
  } catch (err) {
    console.error("sendMail error:", err);
    return res.status(500).json({ error: "Failed to send email" });
  }
}
