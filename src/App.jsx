import React, { useEffect, useRef } from "react";
import { motion, useInView, useAnimation } from "framer-motion";
import { Play, Instagram, Mail, Film, Users, Sparkles, ChevronDown, ArrowRight, Star, Camera, Monitor, Clapperboard } from "lucide-react";

// 🌟 Smooth reusable button component
const Button = ({ children, className = "", ...props }) => (
  <button
    {...props}
    className={`px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-700 hover:from-indigo-700 hover:to-purple-800 rounded-2xl text-white font-semibold tracking-wide shadow-md hover:shadow-lg transition duration-300 ${className}`}
  >
    {children}
  </button>
);

// 💠 Animated reveal wrapper
const Reveal = ({ children, delay = 0 }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const controls = useAnimation();
  useEffect(() => {
    if (inView) controls.start({ opacity: 1, y: 0 });
  }, [inView]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={controls}
      transition={{ delay, duration: 0.8, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
};

// 🧱 Card wrapper
const Card = ({ children, className = "", ...props }) => (
  <div
    {...props}
    className={`rounded-3xl bg-[#11121D]/80 border border-gray-800 shadow-xl backdrop-blur-md p-6 hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 ${className}`}
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
      title: "FMCG Cinematic Campaign",
      desc: "Evoking emotion through movement and rhythm for a global brand.",
      image: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Luxury Brand Story Film",
      desc: "The fusion of minimalism and meaning — cinematic narrative crafted with depth.",
      image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Music Video Visual Identity",
      desc: "Creating a visual symphony that moves with the pulse of sound.",
      image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=800&q=80",
    },
  ];

  const services = [
    {
      icon: <Film className="w-10 h-10 text-indigo-400" />,
      title: "Cinematic Direction",
      desc: "High-end film direction blending brand narrative with cinematic excellence.",
    },
    {
      icon: <Sparkles className="w-10 h-10 text-pink-400" />,
      title: "Creative Strategy",
      desc: "Vision-driven ideation that translates abstract ideas into iconic campaigns.",
    },
    {
      icon: <Users className="w-10 h-10 text-green-400" />,
      title: "Brand Positioning",
      desc: "Merging creative storytelling and analytics to craft influential brand presence.",
    },
  ];

  const testimonials = [
    {
      quote:
        "Working with Pehchaan Media elevated our storytelling. Every frame spoke volumes.",
      author: "Sana Qureshi, Head of Marketing @ Luminance",
    },
    {
      quote:
        "They don’t just produce — they *craft* meaning. A rare fusion of art and precision.",
      author: "Ali Hamza, Founder @ The Narrative Co.",
    },
  ];

  const logos = [
    "https://upload.wikimedia.org/wikipedia/commons/3/35/G2_logo.svg",
    "https://upload.wikimedia.org/wikipedia/commons/6/6e/Capterra-logo.svg",
    "https://upload.wikimedia.org/wikipedia/commons/3/3a/Software_Advice_logo.svg",
  ];

  return (
    <div className="bg-[#0A0C14] text-white font-sans overflow-x-hidden scroll-smooth">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full bg-black/70 backdrop-blur-md z-50 border-b border-gray-800">
        <div className="max-w-7xl mx-auto flex justify-between items-center p-5">
          <h1 className="font-extrabold text-2xl tracking-wide bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent">
            Pehchaan Media
          </h1>
          <div className="hidden md:flex gap-8 text-gray-300">
            <a href="#about" className="hover:text-indigo-400">About</a>
            <a href="#projects" className="hover:text-indigo-400">Projects</a>
            <a href="#services" className="hover:text-indigo-400">Services</a>
            <a href="#reviews" className="hover:text-indigo-400">Reviews</a>
            <a href="#contact" className="hover:text-indigo-400">Contact</a>
          </div>
        </div>
      </nav>

      {/* Hero */}
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
          className="text-6xl md:text-8xl font-extrabold z-10 leading-tight"
        >
          Stories That Resonate.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 1 }}
          className="max-w-2xl mx-auto text-gray-300 mt-6 mb-8 z-10 text-lg"
        >
          We’re a creative studio turning vision into cinematic identity.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="z-10"
        >
          <a href="#projects">
            <Button className="flex items-center gap-2">
              <Play className="w-5 h-5" /> Explore Work
            </Button>
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-10 text-gray-400 animate-bounce"
        >
          <ChevronDown className="w-8 h-8" />
        </motion.div>
      </section>

      {/* About */}
      <section id="about" className="bg-[#0C0E19] py-32 text-center px-6">
        <Reveal>
          <h2 className="text-5xl font-bold mb-6">Our Philosophy</h2>
          <p className="max-w-3xl mx-auto text-gray-400 text-lg">
            At Pehchaan Media, every frame tells a story. Our goal is to build emotional connections through visual storytelling — bridging brand, heart, and imagination.
          </p>
        </Reveal>
      </section>

      {/* Projects */}
      <section id="projects" className="px-8 py-32 bg-[#0A0C14]">
        <Reveal>
          <h2 className="text-5xl font-semibold text-center mb-16">Featured Projects</h2>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-10 max-w-7xl mx-auto">
          {projects.map((item, i) => (
            <Reveal delay={i * 0.2} key={i}>
              <Card className="overflow-hidden group">
                <div className="relative overflow-hidden rounded-2xl mb-4">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-60 w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white">
                  {item.title}
                </h3>
                <CardContent>{item.desc}</CardContent>
              </Card>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Services */}
      <section id="services" className="bg-[#101223] py-32 text-center px-8">
        <Reveal>
          <h2 className="text-5xl font-bold mb-16">Our Expertise</h2>
        </Reveal>
        <div className="grid md:grid-cols-3 gap-10 max-w-7xl mx-auto">
          {services.map((s, i) => (
            <Reveal key={i} delay={i * 0.3}>
              <Card className="flex flex-col items-center text-center">
                <div className="mb-6">{s.icon}</div>
                <h3 className="text-xl font-semibold mb-3">{s.title}</h3>
                <CardContent>{s.desc}</CardContent>
              </Card>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Reviews */}
      <section id="reviews" className="py-32 bg-[#0B0D17] text-center">
        <Reveal>
          <h2 className="text-5xl font-bold mb-16">What Clients Say</h2>
        </Reveal>
        <div className="flex justify-center gap-8 mb-12 flex-wrap">
          {logos.map((logo, i) => (
            <img
              key={i}
              src={logo}
              alt="review platform"
              className="h-10 opacity-70 hover:opacity-100 transition"
            />
          ))}
        </div>
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10">
          {testimonials.map((t, i) => (
            <Reveal key={i} delay={i * 0.3}>
              <Card>
                <CardContent>
                  <p className="italic mb-4 text-gray-200 text-lg leading-relaxed">“{t.quote}”</p>
                  <p className="text-sm text-gray-500">— {t.author}</p>
                </CardContent>
              </Card>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-32 bg-[#101223] text-center border-t border-gray-800">
        <Reveal>
          <h3 className="text-5xl font-semibold mb-8">Let’s Create Together</h3>
          <p className="text-gray-400 mb-12 max-w-2xl mx-auto">
            Have a story waiting to be told? Let’s shape it into something unforgettable.
          </p>
          <div className="flex justify-center gap-6 flex-wrap">
            <a
              href="mailto:pehchaanmedia@email.com"
              className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 transition px-6 py-3 rounded-2xl font-semibold"
            >
              <Mail className="w-5 h-5" /> Contact Us
            </a>
            <a
              href="https://instagram.com/pehchaanmedia"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-pink-600 hover:bg-pink-700 transition px-6 py-3 rounded-2xl font-semibold"
            >
              <Instagram className="w-5 h-5" /> Follow on Instagram
            </a>
          </div>
        </Reveal>
      </section>

      {/* Footer */}
      <footer className="py-10 text-center text-gray-500 text-sm border-t border-gray-800 bg-[#0B0D17]">
        <p>
          © {new Date().getFullYear()} Pehchaan Media — Designed with passion.
        </p>
      </footer>
    </div>
  );
}
