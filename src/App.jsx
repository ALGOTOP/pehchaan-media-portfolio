import React from "react";
import { motion } from "framer-motion";
import { Play, Instagram, Mail } from "lucide-react";

// ✅ Inline Button Component
const Button = ({ children, className = "", ...props }) => (
  <button
    {...props}
    className={`px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 rounded-2xl text-white font-medium transition duration-300 ${className}`}
  >
    {children}
  </button>
);

// ✅ Inline Card Component
const Card = ({ children, className = "", ...props }) => (
  <div
    {...props}
    className={`rounded-2xl bg-[#141627] border border-gray-800 shadow-md p-6 hover:shadow-lg transition ${className}`}
  >
    {children}
  </div>
);

// ✅ Inline CardContent Component
const CardContent = ({ children, className = "" }) => (
  <div className={`text-gray-400 ${className}`}>{children}</div>
);

export default function App() {
  const projects = [
    {
      title: "Cinematic Ad Campaign",
      desc: "High-impact storytelling through visual precision.",
      tools: ["Premiere Pro", "After Effects"],
      link: "#",
    },
    {
      title: "Music Video Production",
      desc: "Where rhythm meets narrative in perfect sync.",
      tools: ["DaVinci Resolve", "Canon R6"],
      link: "#",
    },
    {
      title: "Brand Storytelling Series",
      desc: "Crafting unique digital experiences for visionary brands.",
      tools: ["Final Cut Pro", "Sony A7III"],
      link: "#",
    },
  ];

  return (
    <div className="bg-[#0B0D17] text-white min-h-screen font-inter scroll-smooth">
      {/* 🧭 Navbar */}
      <nav className="fixed top-0 left-0 w-full bg-black/60 backdrop-blur-md z-50">
        <div className="max-w-6xl mx-auto flex justify-between items-center p-4">
          <h1 className="font-bold text-xl">Pehchaan Media</h1>
          <div className="space-x-6 text-gray-300">
            <a href="#about" className="hover:text-blue-400">About</a>
            <a href="#projects" className="hover:text-blue-400">Projects</a>
            <a href="#contact" className="hover:text-blue-400">Contact</a>
          </div>
        </div>
      </nav>

      {/* 🏠 Hero Section */}
      <section
        id="hero"
        className="flex flex-col items-center justify-center text-center h-screen px-6"
      >
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-7xl font-bold mb-4"
        >
          Pehchaan Media
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-gray-400 max-w-xl mb-8"
        >
          A digital media house crafting compelling stories through visuals,
          sound, and strategy. Elevate your brand’s identity with us.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <a
            href="#projects"
          >
            <Button className="flex items-center gap-2">
              <Play className="w-4 h-4" /> Explore Our Work
            </Button>
          </a>
        </motion.div>
      </section>

      {/* 👤 About Section */}
      <section id="about" className="bg-[#101223] text-center py-20 px-6">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold mb-6"
        >
          About Us
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="max-w-3xl mx-auto text-gray-300 text-lg leading-relaxed"
        >
          Pehchaan Media is a creative collective focused on storytelling that
          moves audiences. From brand campaigns to music videos, we help artists
          and brands express their true identity through visuals that resonate
          and inspire.
        </motion.p>
      </section>

      {/* 🎬 Projects Section */}
      <section id="projects" className="px-8 py-20 bg-[#0b0d17]">
        <h2 className="text-4xl font-semibold text-center mb-12">
          Featured Projects
        </h2>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {projects.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
            >
              <Card>
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <CardContent>{item.desc}</CardContent>
                <p className="text-sm text-gray-500 mt-2">
                  Tools: {item.tools.join(", ")}
                </p>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 💬 Contact Section */}
      <section
        id="contact"
        className="py-20 text-center bg-[#101223] border-t border-gray-800"
      >
        <motion.h3
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-3xl font-semibold mb-6"
        >
          Let’s Build Something Iconic.
        </motion.h3>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-gray-400 mb-8 max-w-xl mx-auto"
        >
          Got a project, idea, or collaboration in mind? Let’s talk and make it
          real.
        </motion.p>

        <div className="flex justify-center gap-4 flex-wrap">
          <a
            href="mailto:pehchaanmedia@email.com"
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 transition px-6 py-3 rounded-2xl font-semibold"
          >
            <Mail className="w-5 h-5" /> Get in Touch
          </a>

          <a
            href="https://instagram.com/pehchaanmedia"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-pink-600 hover:bg-pink-700 transition px-6 py-3 rounded-2xl font-semibold"
          >
            <Instagram className="w-5 h-5" /> Follow Us
          </a>
        </div>
      </section>

      {/* 🦶 Footer */}
      <footer className="py-6 text-center text-gray-500 text-sm border-t border-gray-800 bg-[#0B0D17]">
        © {new Date().getFullYear()} Pehchaan Media. All rights reserved.
      </footer>
    </div>
  );
}
