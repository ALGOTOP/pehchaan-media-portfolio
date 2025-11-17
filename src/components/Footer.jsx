import React, { useState } from "react";
import {
  Instagram,
  Facebook,
  Linkedin,
  Phone,
  Mail,
  MessageCircle,
} from "lucide-react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleSubscribe = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess("");
    setError("");

    const cleanedEmail = email.trim().toLowerCase();

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: cleanedEmail }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Subscription failed.");
      }

      setSuccess("Thanks for subscribing!");
      setEmail("");
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="relative bg-[#050505] border-t border-white/10 py-16 px-6 text-gray-400 text-sm md:text-base">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        
        {/* BRAND / ABOUT */}
        <div>
          <h3 className="text-white text-xl font-semibold mb-4">
            Pehchaan Media
          </h3>
          <p className="text-gray-400 leading-relaxed mb-6">
            A full-service creative agency crafting digital experiences,
            cinematic visuals, and brand stories that connect on a human level.
          </p>

          {/* Contact Info */}
          <p className="text-gray-300">
            <Mail className="inline-block mr-2" size={16} />
            <span className="text-cyan-400">infopehchaanmedia@gmail.com</span>
          </p>
          <p className="text-gray-300 mb-6">
            <Phone className="inline-block mr-2" size={16} />
            <span className="text-cyan-400">+92 335 5312242</span>
          </p>

          {/* Social Icons */}
          <div className="flex space-x-4">
            <a
              href="https://www.instagram.com/pehchaanmediahouse/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-pink-500 transition"
            >
              <Instagram size={18} />
            </a>

            <a
              href="https://www.facebook.com/people/Pehchaan-Media/61583589837999/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-500 transition"
            >
              <Facebook size={18} />
            </a>

            <a
              href="https://www.linkedin.com/company/pehchaan-media/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#0A66C2] transition"
            >
              <Linkedin size={18} />
            </a>

            <a
              href="https://wa.me/923355312242?text=Hello%20Pehchaan%20Media%20team!"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-green-500 transition"
            >
              <MessageCircle size={18} />
            </a>
          </div>
        </div>

        {/* SERVICES LINKS */}
        <div>
          <h4 className="text-white font-semibold mb-4">Services</h4>
          <ul className="space-y-2">
            <li><a href="#services" className="hover:text-cyan-400 transition">Branding & Strategy</a></li>
            <li><a href="#services" className="hover:text-cyan-400 transition">Web Design</a></li>
            <li><a href="#services" className="hover:text-cyan-400 transition">Film Production</a></li>
            <li><a href="#services" className="hover:text-cyan-400 transition">Marketing Campaigns</a></li>
          </ul>
        </div>

        {/* COMPANY LINKS */}
        <div>
          <h4 className="text-white font-semibold mb-4">Company</h4>
          <ul className="space-y-2">
            <li><a href="#about" className="hover:text-cyan-400 transition">About Us</a></li>
            <li><a href="#work" className="hover:text-cyan-400 transition">Our Work</a></li>
            <li><a href="#studio" className="hover:text-cyan-400 transition">Studio</a></li>
            <li><a href="#contact" className="hover:text-cyan-400 transition">Contact</a></li>
          </ul>
        </div>

        {/* NEWSLETTER */}
        <div>
          <h4 className="text-white font-semibold mb-4">Newsletter</h4>
          <p className="text-gray-400 mb-4">
            Subscribe to get insights, behind-the-scenes, and updates from our creative team.
          </p>

          <form onSubmit={handleSubscribe} className="flex items-center space-x-2">
            <input
              type="email"
              placeholder="Your email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 bg-[#0e0e0e] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:border-cyan-400 outline-none transition"
            />
            <button
              disabled={loading}
              className="bg-gradient-to-r from-cyan-400 to-blue-500 px-4 py-3 rounded-xl text-black font-semibold hover:shadow-cyan-400/30 transition"
            >
              {loading ? "..." : "Join"}
            </button>
          </form>

          {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
          {success && <p className="text-green-400 text-sm mt-2">{success}</p>}
        </div>
      </div>

      {/* BOTTOM COPYRIGHT */}
      <div className="border-t border-white/10 mt-16 pt-8 text-center text-gray-500 text-sm">
        <p>
          © {new Date().getFullYear()}{" "}
          <span className="text-cyan-400 font-semibold">Pehchaan Media</span>.
          All Rights Reserved.
        </p>
        <p className="mt-1">Crafted with ❤️ by our creative team.</p>
      </div>
    </footer>
  );
}
