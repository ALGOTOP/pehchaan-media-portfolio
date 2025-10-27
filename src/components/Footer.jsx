import React from "react";
import { Instagram, Twitter, Facebook, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative bg-[#050505] border-t border-white/10 py-16 px-6 text-gray-400 text-sm md:text-base">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <div>
          <h3 className="text-white text-xl font-semibold mb-4">
            Pehchaan Media
          </h3>
          <p className="text-gray-400 leading-relaxed mb-6">
            A full-service creative agency crafting digital experiences,
            cinematic visuals, and brand stories that connect on a human level.
          </p>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-cyan-400 transition">
              <Instagram size={18} />
            </a>
            <a href="#" className="hover:text-cyan-400 transition">
              <Twitter size={18} />
            </a>
            <a href="#" className="hover:text-cyan-400 transition">
              <Facebook size={18} />
            </a>
            <a href="#" className="hover:text-cyan-400 transition">
              <Linkedin size={18} />
            </a>
          </div>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-4">Services</h4>
          <ul className="space-y-2">
            <li><a href="#services" className="hover:text-cyan-400 transition">Branding & Strategy</a></li>
            <li><a href="#services" className="hover:text-cyan-400 transition">Web Design</a></li>
            <li><a href="#services" className="hover:text-cyan-400 transition">Film Production</a></li>
            <li><a href="#services" className="hover:text-cyan-400 transition">Marketing Campaigns</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-4">Company</h4>
          <ul className="space-y-2">
            <li><a href="#about" className="hover:text-cyan-400 transition">About Us</a></li>
            <li><a href="#work" className="hover:text-cyan-400 transition">Our Work</a></li>
            <li><a href="#studio" className="hover:text-cyan-400 transition">Studio</a></li>
            <li><a href="#contact" className="hover:text-cyan-400 transition">Contact</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-4">Newsletter</h4>
          <p className="text-gray-400 mb-4">
            Subscribe to get insights, updates, and behind-the-scenes from our
            creative team.
          </p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              alert("Subscribed (demo). Hook up a backend to capture emails.");
            }}
            className="flex items-center space-x-2"
          >
            <input
              type="email"
              placeholder="Your email"
              required
              className="flex-1 bg-[#0e0e0e] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:border-cyan-400 outline-none transition"
            />
            <button className="bg-gradient-to-r from-cyan-400 to-blue-500 px-4 py-3 rounded-xl text-black font-semibold hover:shadow-cyan-400/30 transition">
              Join
            </button>
          </form>
        </div>
      </div>

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
