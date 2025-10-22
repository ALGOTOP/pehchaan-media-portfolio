// ============================================================
// === PART 1 START — Pehchaan Media Full-Service Agency Site ===
// ============================================================

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  Play,
  Instagram,
  Linkedin,
  Mail,
  Menu,
  X,
  ChevronDown,
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
} from "lucide-react";

/* =====================================================
   GLOBAL SETTINGS
   ===================================================== */

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

const slideIn = (direction) => ({
  hidden: { opacity: 0, x: direction === "left" ? -60 : 60 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
});

/* =====================================================
   NAVBAR
   ===================================================== */

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? "bg-black/70 backdrop-blur-lg border-b border-white/10"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        <a
          href="#home"
          className="text-2xl font-bold tracking-tight bg-gradient-to-r from-cyan-400 to-blue-500 text-transparent bg-clip-text"
        >
          Pehchaan Media
        </a>

        <div className="hidden md:flex space-x-10">
          {links.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-gray-300 hover:text-cyan-400 transition-colors duration-200 text-sm font-medium uppercase tracking-wide"
            >
              {link.name}
            </a>
          ))}
        </div>

        <button
          className="md:hidden text-gray-300 hover:text-white transition"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
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
                className="text-gray-300 hover:text-cyan-400 text-lg font-medium"
              >
                {link.name}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

/* =====================================================
   HERO SECTION
   ===================================================== */

const Hero = () => {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center text-center overflow-hidden bg-gradient-to-b from-[#0a0f1f] via-[#0a0a0a] to-[#050505]"
    >
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

      <motion.div
        variants={fadeInUp}
        initial="hidden"
        animate="show"
        className="relative z-10 max-w-4xl px-6"
      >
        <h1 className="text-5xl md:text-7xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500 leading-tight">
          We make brands unforgettable.
        </h1>
        <p className="text-gray-300 text-lg md:text-xl mb-10 max-w-2xl mx-auto">
          Pehchaan Media is a full-service creative agency crafting stories that
          connect, inspire, and move audiences. From design to film to strategy
          — we create experiences that define identities.
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
      className="relative py-24 md:py-36 bg-[#080808] flex flex-col items-center justify-center"
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
            whileHover={{ scale: 1.05 }}
            className="bg-[#0f0f0f] rounded-2xl p-8 border border-white/10 hover:border-cyan-400/40 transition-all shadow-md"
          >
            <div className="mb-6">{card.icon}</div>
            <h3 className="text-xl font-semibold mb-3 text-white">
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
   SERVICES SECTION (partial continues in next part)
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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl px-6">
        {serviceData.map((srv, i) => (
          <motion.div
            key={i}
            variants={fadeInUp}
            initial="hidden"
            animate={inView ? "show" : "hidden"}
            transition={{ delay: i * 0.1 }}
            whileHover={{ scale: 1.05 }}
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
// === PART 1 END — continue with PART 2 (Work Section etc.) ===
// ============================================================
// ============================================================
// === PART 2 START — Work, Studio & Testimonials Sections ===
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
      className="relative py-24 md:py-36 bg-[#0a0a0a] flex flex-col items-center"
    >
      <motion.h2
        variants={fadeInUp}
        initial="hidden"
        animate={inView ? "show" : "hidden"}
        className="text-4xl md:text-6xl font-extrabold mb-12 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500"
      >
        Our Work
      </motion.h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl px-6">
        {projects.map((project, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: i * 0.1, duration: 0.6 }}
            className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[#101010] hover:border-cyan-400/30 transition-all shadow-md"
          >
            <div className="overflow-hidden">
              <motion.img
                src={project.image}
                alt={project.title}
                className="object-cover w-full h-64 group-hover:scale-110 transition-transform duration-700"
                whileHover={{ scale: 1.1 }}
              />
            </div>
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

      <motion.a
        href="#contact"
        whileHover={{ scale: 1.05 }}
        className="mt-14 inline-flex items-center bg-gradient-to-r from-cyan-400 to-blue-500 text-black font-semibold px-8 py-4 rounded-full shadow-xl hover:shadow-cyan-400/30 transition-all"
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
      <div className="absolute inset-0">
        <motion.div
          className="absolute w-[900px] h-[900px] rounded-full bg-blue-500/5 blur-[200px] top-[-200px] left-[-200px]"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 90, ease: "linear" }}
        />
      </div>

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

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 px-6">
        <motion.div
          variants={slideIn("left")}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="rounded-3xl overflow-hidden border border-white/10 shadow-lg"
        >
          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80"
            alt="Studio Interior"
            className="object-cover w-full h-[420px]"
          />
        </motion.div>

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
              <Sparkles className="text-cyan-400" size={16} /> <span>Design Lab</span>
            </li>
            <li className="flex items-center space-x-2">
              <Camera className="text-cyan-400" size={16} /> <span>Film Stage</span>
            </li>
            <li className="flex items-center space-x-2">
              <Heart className="text-cyan-400" size={16} /> <span>Brand Strategy</span>
            </li>
            <li className="flex items-center space-x-2">
              <Users className="text-cyan-400" size={16} /> <span>Creative Teams</span>
            </li>
          </ul>
        </motion.div>
      </div>
    </section>
  );
};

/* =====================================================
   TESTIMONIALS SECTION (part 1)
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
      className="relative py-24 md:py-36 bg-[#0a0a0a] text-center"
    >
      <motion.h2
        variants={fadeInUp}
        initial="hidden"
        animate={inView ? "show" : "hidden"}
        className="text-4xl md:text-6xl font-extrabold mb-16 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500"
      >
        What Our Clients Say
      </motion.h2>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 px-6">
        {testimonials.map((t, i) => (
          <motion.div
            key={i}
            variants={fadeInUp}
            initial="hidden"
            animate={inView ? "show" : "hidden"}
            transition={{ delay: i * 0.1 }}
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
    </section>
  );
};

// ============================================================
// === PART 2 END — continue with PART 3 (Testimonials pt2 + Contact) ===
// ============================================================
// ============================================================
// === PART 3 START — Testimonials (contd), Contact & Footer ===
// ============================================================

/* =====================================================
   TESTIMONIALS SECTION (continued with motion & visuals)
   ===================================================== */

const TestimonialsCarousel = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  const quotes = [
    {
      name: "Hassan Raza",
      title: "CEO, Stellar Motors",
      quote:
        "From strategy to storytelling, Pehchaan Media delivered with unmatched professionalism. Our automotive campaign gained over 1M organic views in the first week alone.",
    },
    {
      name: "Amina Yousaf",
      title: "Marketing Head, Luxe Apparel",
      quote:
        "They understood our luxury positioning instantly and designed visuals that amplified our message across every platform. Simply world-class execution.",
    },
    {
      name: "Daniel Farooq",
      title: "Co-Founder, Craftech",
      quote:
        "A rare team that merges creativity with technical mastery. Every frame, every pixel felt intentional. They’re our go-to for all future brand projects.",
    },
  ];

  return (
    <section
      ref={ref}
      className="relative bg-[#080808] py-24 overflow-hidden border-t border-white/5"
    >
      <div className="absolute inset-0 flex justify-center">
        <motion.div
          className="w-[700px] h-[700px] bg-blue-500/10 blur-[180px] rounded-full"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 100, ease: "linear" }}
        />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto text-center">
        <motion.h2
          variants={fadeInUp}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="text-4xl md:text-6xl font-extrabold mb-16 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500"
        >
          Loved by Visionary Brands
        </motion.h2>

        <motion.div
          className="space-y-12"
          initial="hidden"
          animate={inView ? "show" : "hidden"}
        >
          {quotes.map((item, i) => (
            <motion.div
              key={i}
              transition={{ delay: i * 0.2, duration: 0.6 }}
              className="bg-[#0e0e0e] border border-white/10 rounded-3xl p-10 shadow-xl hover:border-cyan-400/30 transition-all max-w-3xl mx-auto"
            >
              <p className="text-gray-300 italic text-lg mb-6 leading-relaxed">
                “{item.quote}”
              </p>
              <h4 className="text-white text-xl font-semibold">
                {item.name}
              </h4>
              <p className="text-cyan-400 text-sm">{item.title}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

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
      className="relative py-24 md:py-36 bg-[#060606] flex flex-col items-center"
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
        vision into impact.
      </motion.p>

      <motion.form
        variants={fadeInUp}
        initial="hidden"
        animate={inView ? "show" : "hidden"}
        transition={{ delay: 0.3 }}
        className="w-full max-w-2xl space-y-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input
            type="text"
            placeholder="Your Name"
            className="w-full bg-[#0e0e0e] border border-white/10 rounded-xl px-5 py-4 text-white placeholder-gray-500 focus:border-cyan-400 outline-none transition"
          />
          <input
            type="email"
            placeholder="Your Email"
            className="w-full bg-[#0e0e0e] border border-white/10 rounded-xl px-5 py-4 text-white placeholder-gray-500 focus:border-cyan-400 outline-none transition"
          />
        </div>
        <input
          type="text"
          placeholder="Subject"
          className="w-full bg-[#0e0e0e] border border-white/10 rounded-xl px-5 py-4 text-white placeholder-gray-500 focus:border-cyan-400 outline-none transition"
        />
        <textarea
          rows="5"
          placeholder="Your Message"
          className="w-full bg-[#0e0e0e] border border-white/10 rounded-xl px-5 py-4 text-white placeholder-gray-500 focus:border-cyan-400 outline-none transition"
        ></textarea>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          className="w-full bg-gradient-to-r from-cyan-400 to-blue-500 text-black font-semibold py-4 rounded-xl shadow-xl hover:shadow-cyan-400/30 transition-all"
        >
          Send Message
        </motion.button>
      </motion.form>

      <motion.div
        variants={fadeInUp}
        initial="hidden"
        animate={inView ? "show" : "hidden"}
        transition={{ delay: 0.5 }}
        className="flex flex-col items-center mt-20 space-y-4 text-gray-400"
      >
        <div className="flex space-x-4">
          <Instagram size={24} className="hover:text-cyan-400 transition" />
          <Mail size={24} className="hover:text-cyan-400 transition" />
          <Phone size={24} className="hover:text-cyan-400 transition" />
        </div>
        <p className="text-sm">info@pehchaanmedia.com</p>
        <p className="text-sm">+92 300 1234567</p>
      </motion.div>
    </section>
  );
};

/* =====================================================
   FOOTER SECTION (Part 1)
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
            <a
              href="#"
              className="text-gray-400 hover:text-cyan-400 transition"
            >
              <Instagram size={18} />
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-cyan-400 transition"
            >
              <Twitter size={18} />
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-cyan-400 transition"
            >
              <Facebook size={18} />
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
          <div className="flex items-center space-x-2">
            <input
              type="email"
              placeholder="Your email"
              className="flex-1 bg-[#0e0e0e] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:border-cyan-400 outline-none transition"
            />
            <button className="bg-gradient-to-r from-cyan-400 to-blue-500 px-4 py-3 rounded-xl text-black font-semibold hover:shadow-cyan-400/30 transition">
              Join
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

// ============================================================
// === PART 3 END — Next up: PART 4 (Footer pt2 + animations) ===
// ============================================================
// ============================================================
// === PART 4 START — Footer (contd), Floating CTA & Animations ===
// ============================================================

/* =====================================================
   FOOTER (Part 2 — copyright + motion elements)
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
    >
      <Sparkles size={18} />
      <span>Let’s Collaborate</span>
    </motion.a>
  );
};

/* =====================================================
   SCROLL INDICATOR COMPONENT
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
      const scrolled = (winScroll / height) * 100;
      setScroll(scrolled);
    };
    window.addEventListener("scroll", handleScroll);
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
   CUSTOM CURSOR EFFECT (for desktop devices)
   ===================================================== */

const CustomCursor = () => {
  const cursorRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const moveCursor = (e) => {
      if (!cursor) return;
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;
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
    />
  );
};

/* =====================================================
   SCROLL-TO-TOP BUTTON
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
    >
      <ChevronUp size={20} />
    </motion.button>
  );
};

/* =====================================================
   GLOBAL ANIMATIONS & SECTION WRAPPER
   ===================================================== */

const SectionWrapper = ({ children, id }) => (
  <section id={id} className="overflow-hidden">
    {children}
  </section>
);

/* =====================================================
   APP MAIN COMPONENT (assembly of all sections)
   ===================================================== */

const App = () => {
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
        <TestimonialsCarousel />
      </SectionWrapper>
      <SectionWrapper id="contact">
        <Contact />
      </SectionWrapper>
      <Footer />
      <FooterCredits />
      <FloatingCTA />
      <ScrollToTop />

      {/* Subtle background gradient animation */}
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
      />
    </div>
  );
};

/* =====================================================
   EXPORT
   ===================================================== */

// ============================================================
// === PART 4 END — Next up: PART 5 (final polish, responsiveness, SEO) ===
// ============================================================
// ============================================================
// === PART 5 START — Final Polish, SEO, Responsive Fixes ===
// ============================================================

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
    favicon.href =
      "https://cdn-icons-png.flaticon.com/512/2948/2948035.png";
    document.head.appendChild(favicon);
  }, []);

  return null;
};

/* =====================================================
   PERFORMANCE OPTIMIZATION (Framer Motion lazyMotion)
   ===================================================== */

import { LazyMotion, domAnimation } from "framer-motion";

const AnimatedApp = () => (
  <LazyMotion features={domAnimation}>
    <MetaTags />
    <App />
  </LazyMotion>
);

/* =====================================================
   RESPONSIVE OPTIMIZATION
   ===================================================== */

const useMobileFixes = () => {
  useEffect(() => {
    // Prevent unwanted horizontal scroll on small devices
    const html = document.documentElement;
    html.style.overflowX = "hidden";
    const body = document.body;
    body.style.overflowX = "hidden";

    // Adjust vh units for mobile browsers (100vh fix)
    const setVH = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    };
    setVH();
    window.addEventListener("resize", setVH);
    return () => window.removeEventListener("resize", setVH);
  }, []);
};

/* =====================================================
   RESPONSIVE TEST WRAPPER (ensures no side gaps)
   ===================================================== */

const ResponsiveWrapper = () => {
  useMobileFixes();

  return (
    <div className="w-screen overflow-x-hidden bg-[#030303] text-white">
      <AnimatedApp />
    </div>
  );
};

/* =====================================================
   PARALLAX BACKGROUND EFFECT (light & performant)
   ===================================================== */

const ParallaxBackground = () => {
  const ref = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (ref.current) {
        const offset = window.scrollY * 0.4;
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
    />
  );
};

/* =====================================================
   ACCESSIBILITY & INTERACTIONS
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
   GLOBAL WRAPPER EXPORT
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
