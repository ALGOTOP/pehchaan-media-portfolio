import React, { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { fadeInUp, delayFade } from "@/utils/animations";
import { Instagram, Mail, Phone } from "lucide-react";

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess("");
    setError("");

    const formData = {
      name: e.target.name.value.trim(),
      email: e.target.email.value.trim(),
      subject: e.target.subject.value.trim(),
      message: e.target.message.value.trim(),
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to send message.");
      }

      setSuccess("Message sent successfully!");
      e.target.reset();
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="contact"
      ref={ref}
      className="relative py-24 md:py-36 bg-[#060606] flex flex-col items-center overflow-hidden"
    >
      <motion.h2
        variants={fadeInUp}
        initial="hidden"
        animate={inView ? "show" : "hidden"}
        className="text-4xl md:text-6xl font-extrabold mb-12 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500"
      >
        Let’s Build Your Story
      </motion.h2>

      <motion.p
        variants={fadeInUp}
        initial="hidden"
        animate={inView ? "show" : "hidden"}
        transition={{ delay: 0.2 }}
        className="text-gray-400 text-lg mb-16 text-center max-w-2xl leading-relaxed"
      >
        Ready to elevate your brand? Whether you need film production, web
        design, or marketing strategy — Pehchaan Media is here to turn your
        vision into impact. Drop a message and we’ll get back to you within 48
        hours.
      </motion.p>

      {/* Form */}
      <motion.form
        variants={fadeInUp}
        initial="hidden"
        animate={inView ? "show" : "hidden"}
        transition={{ delay: 0.3 }}
        className="w-full max-w-2xl space-y-6"
        onSubmit={handleSubmit}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            required
            className="w-full bg-[#0e0e0e] border border-white/10 rounded-xl px-5 py-4 text-white placeholder-gray-500 focus:border-cyan-400 outline-none transition"
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            required
            className="w-full bg-[#0e0e0e] border border-white/10 rounded-xl px-5 py-4 text-white placeholder-gray-500 focus:border-cyan-400 outline-none transition"
          />
        </div>
        <input
          type="text"
          name="subject"
          placeholder="Subject"
          className="w-full bg-[#0e0e0e] border border-white/10 rounded-xl px-5 py-4 text-white placeholder-gray-500 focus:border-cyan-400 outline-none transition"
        />
        <textarea
          name="message"
          rows="5"
          placeholder="Your Message"
          className="w-full bg-[#0e0e0e] border border-white/10 rounded-xl px-5 py-4 text-white placeholder-gray-500 focus:border-cyan-400 outline-none transition"
        ></textarea>

        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-cyan-400 to-blue-500 text-black font-semibold py-4 rounded-xl shadow-xl hover:shadow-cyan-400/30 transition-all"
        >
          {loading ? "Sending..." : "Send Message"}
        </motion.button>

        {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
        {success && <p className="text-green-400 text-sm mt-2">{success}</p>}
      </motion.form>

      {/* Social Links */}
      <motion.div
        variants={delayFade(0.6)}
        initial="hidden"
        animate={inView ? "show" : "hidden"}
        transition={{ delay: 0.6 }}
        className="flex flex-col items-center mt-20 space-y-4 text-gray-400"
      >
        <div className="flex space-x-4">
          <a
            href="https://www.instagram.com/pehchaanmediahouse/"
            className="hover:text-cyan-400 transition"
          >
            <Instagram size={24} />
          </a>
          <a
            href="mailto:infopehchaanmedia@gmail.com"
            className="hover:text-cyan-400 transition"
          >
            <Mail size={24} />
          </a>
          <a
            href="tel:+923355312242"
            className="hover:text-cyan-400 transition"
          >
            <Phone size={24} />
          </a>
        </div>
        <p className="text-sm">infopehchaanmedia@gmail.com</p>
        <p className="text-sm">+92 335 5312242 </p>
      </motion.div>
    </section>
  );
}
