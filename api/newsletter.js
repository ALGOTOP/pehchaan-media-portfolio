// api/newsletter.js
import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { email } = req.body;
  if (!email) return res.status(400).json({ error: "Email is required" });

  // Load environment variables from Vercel
  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_PASS;
  const from = process.env.FROM_EMAIL || user;
  const to = user; // send newsletter signup to yourself

  if (!user || !pass) {
    console.error("Missing EMAIL_USER or EMAIL_PASS env vars");
    return res.status(500).json({ error: "Email server not configured" });
  }

  // Create transporter
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
    return res.status(200).json({ success: true, message: "Subscriber added successfully" });
  } catch (err) {
    console.error("sendMail error:", err);
    return res.status(500).json({ error: "Failed to send email" });
  }
}
