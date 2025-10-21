import React from "react";
import { motion } from "framer-motion";
import { Play, Instagram, Mail, Film, Users, Sparkles } from "lucide-react";

const Button = ({ children, className = "", ...props }) => (
  <button
    {...props}
    className={`px-6 py-3 bg-indigo-600 hover:bg-indigo-700 rounded-2xl text-white font-medium transition duration-300 ${className}`}
  >
    {children}
  </button>
);

const Card = ({ children, className = "", ...props }) => (
  <div
    {...props}
    className={`rounded-2xl bg-[#141627]/80 border border-gray-800 shadow-lg p-6 hover:shadow-2xl transition ${className}`}
  >
    {children}
  </div>
);

const CardContent = ({ children, className = "" }) => (
  <div className={`text-gray-300 leading-relaxed ${className}`}>{children}</div>
);

export default function App() {
  const projects = [
    {
      title: "Cinematic Ad Campaign",
      desc: "High-impact storytelling blending emotion, precision, and brand intent.",
      image:
        "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Music Video Production",
      desc: "Where rhythm meets narrative — transforming music into motion.",
      image:
        "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Brand Storytelling Series",
      desc: "Authentic human stories shaped into powerful brand narratives.",
      image:
        "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=800&q=80",
    },
  ];

  const services = [
    {
      icon: <Film className="w-8 h-8 text-indigo-400" />,
      title: "Film & Video Production",
      desc: "End-to-end production of cinematic ads, music videos, and documentaries.",
    },
    {
      icon: <Sparkles className="w-8 h-8 text-pink-400" />,
      title: "Creative Direction",
      desc: "We turn abstract ideas into striking visuals and brand experiences.",
    },
    {
      icon: <Users className="w-8 h-8 text-green-400" />,
      title: "Brand Strategy",
      desc: "Merging storytelling and data to shape brands that resonate globally.",
    },
  ];

  const testimonials = [
    {
      quote:
        "Pehchaan Media captured the essence of our brand better than we imagined — visually stunning work.",
      author: "Sara Malik, Creative Director @ LuxeHouse",
    },
    {
      quote:
        "Their storytelling redefined our online identity. A team that truly *gets* creativity.",
      author: "Adil Hussain, CEO @ CoreVision",
    },
  ];

  return (
    <div className="bg-[#0B0D17] text-white font-inter scroll-smooth">
      {/* 🧭 Navbar */}
      <nav className="fixed top-0 left-0 w-full bg-black/60 backdrop-blur-md z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center p-5">
          <h1 className="font-bold text-xl tracking-wide">Pehchaan Media</h1>
          <div className="space-x-6 text-gray-300 hidden md:flex">
            <a href="#about" className="hover:text-blue-400">About</a>
            <a href="#projects" className="hover:text-blue-400">Projects</a>
            <a href="#services" className="hover:text-blue-400">Services</a>
            <a href="#contact" className="hover:text-blue-400">Contact</a>
          </div>
        </div>
      </nav>

      {/* 🎬 Hero */}
      <section className="relative h-screen flex flex-col justify-center items-center text-center overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        >
          <source src="https://cdn.pixabay.com/video/2019/08/29/26742-361072681_large.mp4" type="video/mp4" />
        </video>

        <motion.h1
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-6xl md:text-7xl font-extrabold z-10"
        >
          Crafting Iconic Narratives
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 1 }}
          className="max-w-2xl mx-auto text-gray-300 mt-6 mb-8 z-10 text-lg"
        >
          A full-service creative house that transforms vision into cinematic experiences. 
          Driven by story, powered by craft.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="z-10"
        >
          <a href="#projects">
            <Button className="flex items-center gap-2">
              <Play className="w-4 h-4" /> Explore Our Work
            </Button>
          </a>
        </motion.div>
      </section>

      {/* 👤 About */}
      <section id="about" className="bg-[#0f111c] py-24 text-center px-6">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold mb-6"
        >
          Our Philosophy
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="max-w-3xl mx-auto text-gray-300 text-lg leading-relaxed"
        >
          Pehchaan Media exists to bridge emotion and design. Every project begins with
          curiosity and evolves into an iconic story. Our belief: visuals should *move* people,
          not just impress them.
        </motion.p>
      </section>

      {/* 🎥 Showreel */}
      <section className="py-20 bg-[#101223] text-center">
        <h2 className="text-4xl font-bold mb-8">Our Showreel</h2>
        <div className="max-w-5xl mx-auto aspect-video rounded-2xl overflow-hidden shadow-2xl border border-gray-700">
          <iframe
            src="https://www.youtube.com/embed/ScMzIvxBSi4"
            title="Pehchaan Media Showreel"
            allowFullScreen
            className="w-full h-full"
          ></iframe>
        </div>
      </section>

      {/* 🧱 Projects */}
      <section id="projects" className="px-8 py-24 bg-[#0b0d17]">
        <h2 className="text-4xl font-semibold text-center mb-12">
          Featured Projects
        </h2>

        <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {projects.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
            >
              <Card className="overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="rounded-xl mb-4 h-48 w-full object-cover"
                />
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <CardContent>{item.desc}</CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 💡 Services */}
      <section id="services" className="bg-[#101223] py-24 text-center px-8">
        <h2 className="text-4xl font-bold mb-12">What We Do</h2>
        <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {services.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
            >
              <Card className="flex flex-col items-center text-center">
                <div className="mb-4">{s.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{s.title}</h3>
                <CardContent>{s.desc}</CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 💬 Testimonials */}
      <section className="py-24 bg-[#0B0D17] text-center">
        <h2 className="text-4xl font-bold mb-12">Voices of Collaboration</h2>
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.3 }}
            >
              <Card>
                <CardContent>
                  <p className="italic mb-4 text-gray-200">“{t.quote}”</p>
                  <p className="text-sm text-gray-400">— {t.author}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ✉️ Contact */}
      <section
        id="contact"
        className="py-24 text-center bg-[#101223] border-t border-gray-800"
      >
        <motion.h3
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-semibold mb-8"
        >
          Let’s Build Something Iconic
        </motion.h3>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-gray-400 mb-8 max-w-xl mx-auto"
        >
          Have a project in mind? Whether you’re an artist, brand, or entrepreneur,
          we’re ready to collaborate.
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
        © {new Date().getFullYear()} Pehchaan Media — Crafted with Passion.
      </footer>
    </div>
  );
}
