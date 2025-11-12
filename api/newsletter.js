import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "infopehchaanmedia@gmail.com",
      pass: soozywkmiwgpbbkl,
    },
  });

  const mailOptions = {
    from: "newsletter@pehchaanmedia.com",
    to: "infopehchaanmedia@gmail.com",
    subject: "New Newsletter Signup",
    text: `New subscriber: ${email}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    return res.status(200).json({ success: true });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Failed to send email" });
  }
}
