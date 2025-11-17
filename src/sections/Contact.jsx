import React, { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { fadeInUp, delayFade } from "@/utils/animations";
import { Instagram, Mail, Phone } from "lucide-react";

const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  // ----------- HANDLE INPUT CHANGE -----------
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // ----------- SUBMIT FORM -----------
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Something went wrong.");
      }

      setSuccess("Message sent successfully!");
      setFormData({ name: "", email: "", message: "" });
    } catch (err) {
      setError(err.message || "Failed to send message.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="contact"
      ref={ref}
      className="min-h-screen bg-black text-white px-6 md:px-20 py-32"
    >
      <motion.h2
        variants={fadeInUp}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="text-5xl md:text-6xl font-bold mb-12"
      >
        Contact Us
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
        {/* LEFT SIDE: FORM */}
        <motion.form
          onSubmit={handleSubmit}
          variants={delayFade}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="space-y-6"
        >
          <div>
            <label className="block mb-2">Name</label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-neutral-900 border border-neutral-700 rounded-lg focus:outline-none focus:border-white"
            />
          </div>

          <div>
            <label className="block mb-2">Email</label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-neutral-900 border border-neutral-700 rounded-lg focus:outline-none focus:border-white"
            />
          </div>

          <div>
            <label className="block mb-2">Message</label>
            <textarea
              name="message"
              rows="5"
              required
              value={formData.message}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-neutral-900 border border-neutral-700 rounded-lg focus:outline-none focus:border-white"
            ></textarea>
          </div>

          {error && <p className="text-red-400">{error}</p>}
          {success && <p className="text-green-400">{success}</p>}

          <button
            type="submit"
            disabled={loading}
            className="bg-white text-black px-8 py-3 rounded-lg font-semibold hover:bg-neutral-200 transition-all"
          >
            {loading ? "Sending..." : "Send Message"}
          </button>
        </motion.form>

        {/* RIGHT SIDE CONTACT INFO */}
        <motion.div
          variants={delayFade}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="space-y-8"
        >
          <div className="flex items-center gap-4">
            <Mail size={26} />
            <p className="text-lg">infopehchaanmedia@gmail.com</p>
          </div>

          <div className="flex items-center gap-4">
            <Phone size={26} />
            <p className="text-lg">+92 345 1234567</p>
          </div>

          <div className="flex items-center gap-4">
            <Instagram size={26} />
            <p className="text-lg">@pehchaanmedia</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
