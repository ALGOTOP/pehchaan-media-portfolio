// ============================================================
// === PART 1 — Imports, Global Animations & Navbar ===
// ============================================================

import React, { useState, useEffect, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useInView,
  LazyMotion,
  domAnimation,
} from "framer-motion";
import {
  Play,
  Instagram,
  Linkedin,
  Mail,
  Menu,
  X,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  Camera,
  Palette,
  PenTool,
  Film,
  Globe,
  Megaphone,
  Heart,
  Sparkles,
  Users,
  Phone,
  Twitter,
  Facebook,
} from "lucide-react";

/* =====================================================
   GLOBAL ANIMATION PRESETS
   ===================================================== */

// Subtle fade-and-rise
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

// Slide from left or right
const slideIn = (direction) => ({
  hidden: { opacity: 0, x: direction === "left" ? -60 : 60 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
});

// Small fade delay utility
const delayFade = (delay = 0.2) => ({
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { duration: 0.8, delay },
  },
});

/* =====================================================
   NAVBAR COMPONENT
   ===================================================== */

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  // Detect scroll for background blur
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Track active anchor section
  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.4 }
    );
    sections.forEach((sec) => observer.observe(sec));
    return () => sections.forEach((sec) => observer.unobserve(sec));
  }, []);

  // Navigation links
  const links = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Services", href: "#services" },
    { name: "Work", href: "#work" },
    { name: "Studio", href: "#studio" },
    { name: "Testimonials", href: "#testimonials" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? "bg-black/70 backdrop-blur-xl border-b border-white/10 shadow-lg"
          : "bg-transparent"
      }`}
    >
      {/* Container */}
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        {/* Brand */}
        <a
          href="#home"
          className="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-cyan-400 to-blue-500 text-transparent bg-clip-text hover:opacity-90 transition"
        >
          Pehchaan Media
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-10">
          {links.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className={`text-sm font-medium uppercase tracking-wide transition-colors duration-300 ${
                activeSection === link.href.replace("#", "")
                  ? "text-cyan-400"
                  : "text-gray-300 hover:text-cyan-400"
              }`}
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* CTA on desktop */}
        <div className="hidden md:flex items-center space-x-4">
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05 }}
            className="px-4 py-2 text-sm rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 text-black font-semibold shadow-md hover:shadow-cyan-400/30 transition"
          >
            Let’s Talk
          </motion.a>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-300 hover:text-white transition"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="md:hidden bg-black/90 backdrop-blur-xl border-t border-white/10 flex flex-col items-center py-6 space-y-4"
          >
            {links.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="text-gray-300 hover:text-cyan-400 text-lg font-medium transition-colors duration-200"
              >
                {link.name}
              </a>
            ))}

            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              className="mt-4 inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 text-black font-semibold shadow-md hover:shadow-cyan-400/30 transition-all"
            >
              <Sparkles size={18} className="mr-2" />
              Get in Touch
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};
// ============================================================
// === PART 2 — Hero, About & Services Sections ===
// ============================================================

/* =====================================================
   HERO SECTION
   ===================================================== */

const Hero = () => {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center text-center overflow-hidden bg-gradient-to-b from-[#0a0f1f] via-[#0a0a0a] to-[#050505]"
    >
      {/* Animated background gradients */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute w-[800px] h-[800px] rounded-full bg-cyan-500/10 blur-[200px] top-[-200px] left-[-200px]"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
        />
        <motion.div
          className="absolute w-[700px] h-[700px] rounded-full bg-blue-500/10 blur-[160px] bottom-[-200px] right-[-200px]"
          animate={{ rotate: -360 }}
          transition={{ repeat: Infinity, duration: 50, ease: "linear" }}
        />
      </div>

      {/* Hero Text Content */}
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        animate="show"
        className="relative z-10 max-w-4xl px-6"
      >
        <h1 className="text-5xl md:text-7xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500 leading-tight">
          We make brands unforgettable.
        </h1>

        <p className="text-gray-300 text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed">
          Pehchaan Media is a full-service creative agency crafting stories that
          connect, inspire, and move audiences. From design to film to strategy —
          we create experiences that define identities.
        </p>

        <motion.a
          href="#work"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          className="inline-flex items-center px-8 py-4 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 text-black font-semibold shadow-xl hover:shadow-cyan-500/30 transition-all"
        >
          <Play size={18} className="mr-2" />
          View Our Work
        </motion.a>

        {/* Animated Scroll Icon */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        >
          <ChevronDown className="text-cyan-400 animate-bounce" size={28} />
        </motion.div>
      </motion.div>
    </section>
  );
};

/* =====================================================
   ABOUT SECTION
   ===================================================== */

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section
      id="about"
      ref={ref}
      className="relative py-24 md:py-36 bg-[#080808] flex flex-col items-center justify-center overflow-hidden"
    >
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        animate={isInView ? "show" : "hidden"}
        className="max-w-5xl text-center px-6"
      >
        <h2 className="text-4xl md:text-6xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
          Who We Are
        </h2>

        <p className="text-gray-400 text-lg leading-relaxed mb-10 max-w-3xl mx-auto">
          We are thinkers, storytellers, and dreamers. At Pehchaan Media, we
          blend strategy with creativity to build experiences that transform
          businesses into beloved brands. Our philosophy is simple — every brand
          has a soul, and our job is to make it shine.
        </p>
      </motion.div>

      {/* About Cards */}
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        animate={isInView ? "show" : "hidden"}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10 max-w-6xl px-6"
      >
        {[
          {
            icon: <Camera className="text-cyan-400" size={36} />,
            title: "Visual Storytelling",
            desc: "We capture emotion through design and film to make every brand story unforgettable.",
          },
          {
            icon: <Palette className="text-cyan-400" size={36} />,
            title: "Creative Strategy",
            desc: "We craft narratives that align creativity with business goals for meaningful impact.",
          },
          {
            icon: <Users className="text-cyan-400" size={36} />,
            title: "Collaborative Approach",
            desc: "Our team works as an extension of yours — open, transparent, and relentlessly passionate.",
          },
        ].map((card, i) => (
          <motion.div
            key={i}
            variants={fadeInUp}
            whileHover={{ scale: 1.05, rotate: 0.5 }}
            className="bg-[#0f0f0f] rounded-2xl p-8 border border-white/10 hover:border-cyan-400/40 transition-all shadow-md backdrop-blur-sm"
          >
            <div className="mb-6">{card.icon}</div>
            <h3 className="text-xl font-semibold mb-3 text-white tracking-wide">
              {card.title}
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              {card.desc}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

/* =====================================================
   SERVICES SECTION
   ===================================================== */

const Services = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  const serviceData = [
    {
      icon: <PenTool size={32} className="text-cyan-400" />,
      title: "Brand Identity & Design",
      desc: "From logos to full brand systems, we design visuals that communicate your essence.",
    },
    {
      icon: <Film size={32} className="text-cyan-400" />,
      title: "Film & Production",
      desc: "Cinematic storytelling that builds emotional connections and elevates your message.",
    },
    {
      icon: <Globe size={32} className="text-cyan-400" />,
      title: "Web & Digital Presence",
      desc: "Responsive, elegant, and high-performance digital experiences for your brand.",
    },
    {
      icon: <Megaphone size={32} className="text-cyan-400" />,
      title: "Marketing & Strategy",
      desc: "Integrated campaigns that combine creativity with data-driven growth strategies.",
    },
    {
      icon: <Heart size={32} className="text-cyan-400" />,
      title: "Community Building",
      desc: "We help brands form emotional connections through long-term, human-first engagement.",
    },
  ];

  return (
    <section
      id="services"
      ref={ref}
      className="relative py-24 md:py-36 bg-[#0b0b0b] flex flex-col items-center"
    >
      <motion.h2
        variants={fadeInUp}
        initial="hidden"
        animate={inView ? "show" : "hidden"}
        className="text-4xl md:text-6xl font-extrabold mb-12 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500"
      >
        What We Do
      </motion.h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 max-w-7xl px-6">
        {serviceData.map((srv, i) => (
          <motion.div
            key={i}
            variants={fadeInUp}
            initial="hidden"
            animate={inView ? "show" : "hidden"}
            transition={{ delay: i * 0.1 }}
            whileHover={{ scale: 1.05, y: -5 }}
            className="bg-[#101010] border border-white/10 hover:border-cyan-400/40 rounded-2xl p-8 text-center shadow-md"
          >
            <div className="flex justify-center mb-5">{srv.icon}</div>
            <h3 className="text-lg font-semibold mb-3">{srv.title}</h3>
            <p className="text-gray-400 text-sm leading-relaxed">{srv.desc}</p>
          </motion.div>
        ))}
      </div>

      <motion.a
        href="#work"
        whileHover={{ scale: 1.05 }}
        className="mt-14 inline-flex items-center bg-gradient-to-r from-cyan-400 to-blue-500 text-black font-semibold px-8 py-4 rounded-full shadow-xl hover:shadow-cyan-400/30 transition-all"
      >
        Explore Our Projects
        <ArrowRight size={18} className="ml-2" />
      </motion.a>
    </section>
  );
};
// ============================================================
// === PART 3 — Work, Studio & Testimonials Sections ===
// ============================================================

/* =====================================================
   WORK / PORTFOLIO SECTION
   ===================================================== */

const Work = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  const projects = [
    {
      title: "Luminous Skincare Campaign",
      category: "Film Production",
      image:
        "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=1000&q=80",
    },
    {
      title: "Drift E-Sports Branding",
      category: "Brand Identity",
      image:
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80",
    },
    {
      title: "OceanX Web Experience",
      category: "Web Design",
      image:
        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=80",
    },
    {
      title: "Aurum Fashion Film",
      category: "Cinematography",
      image:
        "https://images.unsplash.com/photo-1542744173-05336fcc7ad4?auto=format&fit=crop&w=1000&q=80",
    },
    {
      title: "Rise Coffee Rebrand",
      category: "Creative Strategy",
      image:
        "https://images.unsplash.com/photo-1510626176961-4b57d4fbad03?auto=format&fit=crop&w=1000&q=80",
    },
    {
      title: "Urban Tech Product Launch",
      category: "Marketing Campaign",
      image:
        "https://images.unsplash.com/photo-1581093588401-22c1f0af9ab9?auto=format&fit=crop&w=1000&q=80",
    },
  ];

  return (
    <section
      id="work"
      ref={ref}
      className="relative py-24 md:py-36 bg-[#0a0a0a] flex flex-col items-center overflow-hidden"
    >
      <motion.h2
        variants={fadeInUp}
        initial="hidden"
        animate={inView ? "show" : "hidden"}
        className="text-4xl md:text-6xl font-extrabold mb-12 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500"
      >
        Our Work
      </motion.h2>

      {/* Portfolio Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl px-6">
        {projects.map((project, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: i * 0.1, duration: 0.6 }}
            whileHover={{ scale: 1.02 }}
            className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[#101010] hover:border-cyan-400/30 transition-all shadow-md"
          >
            <div className="overflow-hidden">
              <motion.img
                src={project.image}
                alt={project.title}
                className="object-cover w-full h-64 group-hover:scale-110 transition-transform duration-700"
              />
            </div>

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6">
              <h3 className="text-white text-xl font-semibold mb-2">
                {project.title}
              </h3>
              <p className="text-cyan-400 text-sm font-medium">
                {project.category}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* CTA */}
      <motion.a
        href="#contact"
        whileHover={{ scale: 1.05 }}
        className="mt-16 inline-flex items-center bg-gradient-to-r from-cyan-400 to-blue-500 text-black font-semibold px-8 py-4 rounded-full shadow-xl hover:shadow-cyan-400/30 transition-all"
      >
        Start Your Project
        <ArrowRight size={18} className="ml-2" />
      </motion.a>
    </section>
  );
};

/* =====================================================
   STUDIO SECTION
   ===================================================== */

const Studio = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section
      id="studio"
      ref={ref}
      className="relative py-24 md:py-36 bg-[#080808] overflow-hidden"
    >
      {/* Animated background blob */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute w-[900px] h-[900px] rounded-full bg-blue-500/5 blur-[200px] top-[-200px] left-[-200px]"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 90, ease: "linear" }}
        />
      </div>

      {/* Header */}
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        animate={inView ? "show" : "hidden"}
        className="relative z-10 text-center mb-16"
      >
        <h2 className="text-4xl md:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500 mb-6">
          Inside Our Studio
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed">
          A space where creativity meets technology — our studio is designed to
          foster collaboration, experimentation, and magic. Every corner tells a
          story of ideas coming to life.
        </p>
      </motion.div>

      {/* Layout */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 px-6">
        {/* Left visual */}
        <motion.div
          variants={slideIn("left")}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="rounded-3xl overflow-hidden border border-white/10 shadow-lg hover:border-cyan-400/30 transition-all"
        >
          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80"
            alt="Studio Interior"
            className="object-cover w-full h-[420px]"
          />
        </motion.div>

        {/* Right text */}
        <motion.div
          variants={slideIn("right")}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="flex flex-col justify-center space-y-6"
        >
          <h3 className="text-3xl font-semibold text-white">
            Where Ideas Turn Into Reality
          </h3>
          <p className="text-gray-400 text-lg leading-relaxed">
            Whether it’s conceptualizing a new brand, producing a film, or
            designing an immersive web experience, our studio is the heart of
            innovation. We combine creativity, collaboration, and cutting-edge
            tools to deliver results that captivate audiences.
          </p>
          <ul className="text-gray-300 grid grid-cols-2 gap-3 mt-4">
            <li className="flex items-center space-x-2">
              <Sparkles className="text-cyan-400" size={16} />{" "}
              <span>Design Lab</span>
            </li>
            <li className="flex items-center space-x-2">
              <Camera className="text-cyan-400" size={16} />{" "}
              <span>Film Stage</span>
            </li>
            <li className="flex items-center space-x-2">
              <Heart className="text-cyan-400" size={16} />{" "}
              <span>Brand Strategy</span>
            </li>
            <li className="flex items-center space-x-2">
              <Users className="text-cyan-400" size={16} />{" "}
              <span>Creative Teams</span>
            </li>
          </ul>
        </motion.div>
      </div>
    </section>
  );
};

/* =====================================================
   TESTIMONIALS SECTION
   ===================================================== */

const Testimonials = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  const testimonials = [
    {
      name: "Ayesha Khan",
      company: "Glow Beauty Co.",
      quote:
        "Working with Pehchaan Media transformed our entire brand presence. Their team understood our story and brought it to life visually in ways we couldn’t have imagined.",
    },
    {
      name: "Rizwan Malik",
      company: "NextGen Technologies",
      quote:
        "They don’t just make designs — they create experiences. From our website to our film launch, everything reflected our identity perfectly.",
    },
    {
      name: "Sara Ahmed",
      company: "Urban Brew",
      quote:
        "The passion and dedication Pehchaan Media brings is unmatched. They became an integral part of our team during the rebrand and helped us grow exponentially.",
    },
  ];

  return (
    <section
      id="testimonials"
      ref={ref}
      className="relative py-24 md:py-36 bg-[#0a0a0a] text-center overflow-hidden"
    >
      {/* Section Title */}
      <motion.h2
        variants={fadeInUp}
        initial="hidden"
        animate={inView ? "show" : "hidden"}
        className="text-4xl md:text-6xl font-extrabold mb-16 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500"
      >
        What Our Clients Say
      </motion.h2>

      {/* Testimonials Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 px-6">
        {testimonials.map((t, i) => (
          <motion.div
            key={i}
            variants={fadeInUp}
            initial="hidden"
            animate={inView ? "show" : "hidden"}
            transition={{ delay: i * 0.15 }}
            whileHover={{ scale: 1.03 }}
            className="bg-[#101010] border border-white/10 rounded-2xl p-8 shadow-lg hover:border-cyan-400/30 transition-all"
          >
            <p className="text-gray-300 italic mb-6 leading-relaxed">
              “{t.quote}”
            </p>
            <h4 className="text-white font-semibold">{t.name}</h4>
            <p className="text-cyan-400 text-sm">{t.company}</p>
          </motion.div>
        ))}
      </div>

      {/* Decorative gradient animation */}
      <motion.div
        className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-cyan-500/10 blur-[160px] -z-10"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 100, ease: "linear" }}
      />
    </section>
  );
};
// ============================================================
// === PART 4 — Contact, Footer, CTA, Scroll Effects & Global Wrapper ===
// ============================================================

/* =====================================================
   CONTACT SECTION
   ===================================================== */

const Contact = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

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

      <motion.form
        variants={fadeInUp}
        initial="hidden"
        animate={inView ? "show" : "hidden"}
        transition={{ delay: 0.3 }}
        className="w-full max-w-2xl space-y-6"
        onSubmit={(e) => {
          e.preventDefault();
          // lightweight client-side success UX (no backend)
          const btn = e.currentTarget.querySelector("button");
          if (btn) {
            btn.disabled = true;
            btn.innerText = "Sending...";
            setTimeout(() => {
              btn.disabled = false;
              btn.innerText = "Send Message";
              alert("Message submitted (demo). Hook up a backend to send real messages.");
            }, 900);
          }
        }}
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
          className="w-full bg-gradient-to-r from-cyan-400 to-blue-500 text-black font-semibold py-4 rounded-xl shadow-xl hover:shadow-cyan-400/30 transition-all"
        >
          Send Message
        </motion.button>
      </motion.form>

      <motion.div
        variants={delayFade(0.6)}
        initial="hidden"
        animate={inView ? "show" : "hidden"}
        transition={{ delay: 0.6 }}
        className="flex flex-col items-center mt-20 space-y-4 text-gray-400"
      >
        <div className="flex space-x-4">
          <a href="#" aria-label="Instagram" className="hover:text-cyan-400 transition">
            <Instagram size={24} />
          </a>
          <a href="mailto:info@pehchaanmedia.com" aria-label="Email" className="hover:text-cyan-400 transition">
            <Mail size={24} />
          </a>
          <a href="tel:+923001234567" aria-label="Phone" className="hover:text-cyan-400 transition">
            <Phone size={24} />
          </a>
        </div>
        <p className="text-sm">info@pehchaanmedia.com</p>
        <p className="text-sm">+92 300 1234567</p>
      </motion.div>
    </section>
  );
};

/* =====================================================
   FOOTER (Main)
   ===================================================== */

const Footer = () => {
  return (
    <footer className="relative bg-[#050505] border-t border-white/10 py-16 px-6 text-gray-400 text-sm md:text-base">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* Column 1 */}
        <div>
          <h3 className="text-white text-xl font-semibold mb-4">
            Pehchaan Media
          </h3>
          <p className="text-gray-400 leading-relaxed mb-6">
            A full-service creative agency crafting digital experiences,
            cinematic visuals, and brand stories that connect on a human level.
          </p>
          <div className="flex space-x-4">
            <a href="#" className="text-gray-400 hover:text-cyan-400 transition">
              <Instagram size={18} />
            </a>
            <a href="#" className="text-gray-400 hover:text-cyan-400 transition">
              <Twitter size={18} />
            </a>
            <a href="#" className="text-gray-400 hover:text-cyan-400 transition">
              <Facebook size={18} />
            </a>
            <a href="#" className="text-gray-400 hover:text-cyan-400 transition">
              <Linkedin size={18} />
            </a>
          </div>
        </div>

        {/* Column 2 */}
        <div>
          <h4 className="text-white font-semibold mb-4">Services</h4>
          <ul className="space-y-2">
            <li>
              <a href="#services" className="hover:text-cyan-400 transition">
                Branding & Strategy
              </a>
            </li>
            <li>
              <a href="#services" className="hover:text-cyan-400 transition">
                Web Design
              </a>
            </li>
            <li>
              <a href="#services" className="hover:text-cyan-400 transition">
                Film Production
              </a>
            </li>
            <li>
              <a href="#services" className="hover:text-cyan-400 transition">
                Marketing Campaigns
              </a>
            </li>
          </ul>
        </div>

        {/* Column 3 */}
        <div>
          <h4 className="text-white font-semibold mb-4">Company</h4>
          <ul className="space-y-2">
            <li>
              <a href="#about" className="hover:text-cyan-400 transition">
                About Us
              </a>
            </li>
            <li>
              <a href="#work" className="hover:text-cyan-400 transition">
                Our Work
              </a>
            </li>
            <li>
              <a href="#studio" className="hover:text-cyan-400 transition">
                Studio
              </a>
            </li>
            <li>
              <a href="#contact" className="hover:text-cyan-400 transition">
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Column 4 */}
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
              aria-label="Newsletter email"
              required
              className="flex-1 bg-[#0e0e0e] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:border-cyan-400 outline-none transition"
            />
            <button className="bg-gradient-to-r from-cyan-400 to-blue-500 px-4 py-3 rounded-xl text-black font-semibold hover:shadow-cyan-400/30 transition">
              Join
            </button>
          </form>
        </div>
      </div>
    </footer>
  );
};

/* =====================================================
   FOOTER CREDITS
   ===================================================== */

const FooterCredits = () => {
  return (
    <div className="border-t border-white/10 mt-16 pt-8 text-center text-gray-500 text-sm">
      <p>
        © {new Date().getFullYear()}{" "}
        <span className="text-cyan-400 font-semibold">Pehchaan Media</span>. All
        Rights Reserved.
      </p>
      <p className="mt-1">
        Crafted with <Heart className="inline text-cyan-400 mx-1" size={14} /> by
        our creative team.
      </p>
    </div>
  );
};

/* =====================================================
   FLOATING CTA BUTTON
   ===================================================== */

const FloatingCTA = () => {
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    const toggleVisible = () => {
      const scrolled = document.documentElement.scrollTop;
      if (scrolled > 400) {
        setVisible(true);
      } else if (scrolled <= 400) {
        setVisible(false);
      }
    };
    window.addEventListener("scroll", toggleVisible);
    return () => window.removeEventListener("scroll", toggleVisible);
  }, []);

  return (
    <motion.a
      href="#contact"
      initial={{ opacity: 0, y: 100 }}
      animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 }}
      transition={{ duration: 0.5 }}
      className="fixed bottom-8 right-8 bg-gradient-to-r from-cyan-400 to-blue-500 text-black font-semibold px-5 py-4 rounded-full shadow-xl hover:shadow-cyan-400/30 transition-all z-50 flex items-center space-x-2"
      aria-label="Start a project"
    >
      <Sparkles size={18} />
      <span>Let’s Collaborate</span>
    </motion.a>
  );
};

/* =====================================================
   SCROLL PROGRESS INDICATOR
   ===================================================== */

const ScrollProgress = () => {
  const [scroll, setScroll] = React.useState(0);

  React.useEffect(() => {
    const handleScroll = () => {
      const winScroll =
        document.body.scrollTop || document.documentElement.scrollTop;
      const height =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const scrolled = height > 0 ? (winScroll / height) * 100 : 0;
      setScroll(scrolled);
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-[3px] bg-black z-[9999]">
      <motion.div
        className="h-full bg-gradient-to-r from-cyan-400 to-blue-500"
        style={{ width: `${scroll}%` }}
      />
    </div>
  );
};

/* =====================================================
   CUSTOM CURSOR (desktop)
   ===================================================== */

const CustomCursor = () => {
  const cursorRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;
    const moveCursor = (e) => {
      cursor.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
    };
    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, []);

  return (
    <motion.div
      ref={cursorRef}
      className="hidden md:block fixed top-0 left-0 w-6 h-6 rounded-full border-2 border-cyan-400 pointer-events-none mix-blend-difference z-[10000]"
      animate={{ scale: [1, 1.3, 1] }}
      transition={{ repeat: Infinity, duration: 2 }}
      aria-hidden
    />
  );
};

/* =====================================================
   SCROLL TO TOP BUTTON
   ===================================================== */

const ScrollToTop = () => {
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    const toggleVisible = () => {
      const scrolled = document.documentElement.scrollTop;
      setVisible(scrolled > 500);
    };
    window.addEventListener("scroll", toggleVisible);
    return () => window.removeEventListener("scroll", toggleVisible);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <motion.button
      onClick={scrollToTop}
      initial={{ opacity: 0, y: 100 }}
      animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 }}
      transition={{ duration: 0.4 }}
      className="fixed bottom-8 left-8 bg-[#0e0e0e] border border-white/10 text-cyan-400 rounded-full p-3 hover:bg-cyan-400 hover:text-black transition-all z-50"
      aria-label="Scroll to top"
    >
      <ChevronUp size={20} />
    </motion.button>
  );
};

/* =====================================================
   SECTION WRAPPER — simple utility for consistent spacing
   ===================================================== */

const SectionWrapper = ({ children, id }) => (
  <section id={id} className="overflow-hidden">
    {children}
  </section>
);

/* =====================================================
   META TAGS (SEO + OpenGraph + Favicon)
   ===================================================== */

const MetaTags = () => {
  useEffect(() => {
    document.title = "Pehchaan Media | Full-Service Creative Agency";
    const metaDescription = document.createElement("meta");
    metaDescription.name = "description";
    metaDescription.content =
      "Pehchaan Media is a full-service creative agency specializing in film production, branding, design, and digital marketing — turning ideas into iconic experiences.";
    document.head.appendChild(metaDescription);

    const ogTitle = document.createElement("meta");
    ogTitle.setAttribute("property", "og:title");
    ogTitle.content = "Pehchaan Media | Full-Service Creative Agency";
    document.head.appendChild(ogTitle);

    const ogImage = document.createElement("meta");
    ogImage.setAttribute("property", "og:image");
    ogImage.content =
      "https://images.unsplash.com/photo-1508921912186-1d1a45ebb3c1?auto=format&fit=crop&w=1200&q=80";
    document.head.appendChild(ogImage);

    const favicon = document.createElement("link");
    favicon.rel = "icon";
    favicon.href = "https://cdn-icons-png.flaticon.com/512/2948/2948035.png";
    document.head.appendChild(favicon);

    // cleanup (in case of hot reload)
    return () => {
      if (metaDescription.parentNode) metaDescription.parentNode.removeChild(metaDescription);
      if (ogTitle.parentNode) ogTitle.parentNode.removeChild(ogTitle);
      if (ogImage.parentNode) ogImage.parentNode.removeChild(ogImage);
      if (favicon.parentNode) favicon.parentNode.removeChild(favicon);
    };
  }, []);

  return null;
};

/* =====================================================
   PERFORMANCE: Framer Motion lazy loading wrapper
   ===================================================== */

const AnimatedApp = () => (
  <LazyMotion features={domAnimation}>
    <MetaTags />
    <AppCore />
  </LazyMotion>
);

/* =====================================================
   MOBILE FIXES & RESPONSIVE WRAPPER
   ===================================================== */

const useMobileFixes = () => {
  useEffect(() => {
    // Prevent horizontal scroll flashes
    const html = document.documentElement;
    html.style.overflowX = "hidden";
    const body = document.body;
    body.style.overflowX = "hidden";

    // Fix for 100vh on mobile browsers
    const setVH = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    };
    setVH();
    window.addEventListener("resize", setVH);
    return () => window.removeEventListener("resize", setVH);
  }, []);
};

const ResponsiveWrapper = () => {
  useMobileFixes();

  return (
    <div className="w-screen overflow-x-hidden bg-[#030303] text-white">
      <AnimatedApp />
    </div>
  );
};

/* =====================================================
   PARALLAX BACKGROUND (subtle, low-cost)
   ===================================================== */

const ParallaxBackground = () => {
  const ref = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (ref.current) {
        const offset = window.scrollY * 0.35;
        ref.current.style.backgroundPositionY = `${offset}px`;
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      ref={ref}
      className="fixed top-0 left-0 w-full h-full bg-[url('https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=1600&q=80')] bg-cover bg-center opacity-[0.03] pointer-events-none z-0"
      aria-hidden
    />
  );
};

/* =====================================================
   ACCESSIBILITY ENHANCER (focus outlines)
   ===================================================== */

const AccessibilityEnhancer = () => {
  useEffect(() => {
    const focusOutline = (e) => {
      if (e.key === "Tab") {
        document.body.classList.add("outline-visible");
      }
    };
    window.addEventListener("keydown", focusOutline);
    return () => window.removeEventListener("keydown", focusOutline);
  }, []);

  return null;
};

/* =====================================================
   APP CORE — assembly of all sections (keeps App minimal & testable)
   ===================================================== */

const AppCore = () => {
  return (
    <div className="font-sans bg-[#030303] text-white overflow-x-hidden relative">
      <ScrollProgress />
      <CustomCursor />
      <Navbar />
      <Hero />
      <SectionWrapper id="about">
        <About />
      </SectionWrapper>
      <SectionWrapper id="services">
        <Services />
      </SectionWrapper>
      <SectionWrapper id="work">
        <Work />
      </SectionWrapper>
      <SectionWrapper id="studio">
        <Studio />
      </SectionWrapper>
      <SectionWrapper id="testimonials">
        <Testimonials />
      </SectionWrapper>
      <SectionWrapper id="contact">
        <Contact />
      </SectionWrapper>

      <Footer />
      <FooterCredits />
      <FloatingCTA />
      <ScrollToTop />

      {/* Gentle animated overlay for depth */}
      <motion.div
        className="fixed inset-0 bg-gradient-to-tr from-blue-900/10 via-transparent to-cyan-500/5 pointer-events-none"
        animate={{
          backgroundPosition: ["0% 0%", "100% 100%"],
        }}
        transition={{
          repeat: Infinity,
          duration: 20,
          ease: "linear",
        }}
        aria-hidden
      />
    </div>
  );
};

/* =====================================================
   GLOBAL WRAPPER EXPORT (final entrypoint)
   ===================================================== */

const PehchaanMediaApp = () => {
  return (
    <>
      <ParallaxBackground />
      <AccessibilityEnhancer />
      <ResponsiveWrapper />
    </>
  );
};

export default PehchaanMediaApp;
