// Pehchaan Media — Enhanced Rewrite
// File: PehchaanMedia_App_Rewrite_Parted.jsx
// NOTE: This file is organized into FIVE logical parts as requested.
// Part 1 — Imports, Theme variables & Global Styles
// Part 2 — Layout, Navbar, Routing + Nav-click animations
// Part 3 — Major Sections (Hero, About, Services, Work, Studio, Testimonials, Contact, Footer)
// Part 4 — Utilities, Hooks, Accessibility, Performance Optimizations
// Part 5 — App assembly, export, and developer notes

/* =====================================================
   PART 1 — IMPORTS, THEME VARIABLES & GLOBAL STYLES
   ===================================================== */

import React, { useEffect, useState, useRef, useMemo } from "react";
import { createRoot } from "react-dom/client";
import {
  motion,
  AnimatePresence,
  LazyMotion,
  domAnimation,
  useInView,
} from "framer-motion";
import {
  Menu,
  X,
  ChevronDown,
  Play,
  Sparkles,
  Camera,
  Palette,
  PenTool,
  Film,
  Globe,
  Megaphone,
  Heart,
  Users,
  Phone,
  Mail,
  Instagram,
  Linkedin,
  Twitter,
  Facebook,
  ChevronUp,
  ArrowRight,
} from "lucide-react";

// Theme Colors (Purple-forward)
const THEME = {
  primaryLight: "from-purple-400",
  primaryDark: "to-indigo-600",
  accent: "text-purple-300",
  bg: "bg-gradient-to-b from-[#0b0614] via-[#0e0820] to-[#06040b]",
  surface: "bg-[#0b0710]",
};

// Utility: safeWindow (SSR friendly)
const safeWindow = typeof window !== "undefined" ? window : null;

// Small helper for prefers-reduced-motion
const usePrefersReducedMotion = () => {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    if (!safeWindow || !safeWindow.matchMedia) return;
    const media = safeWindow.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(media.matches);
    const handler = () => setReduced(media.matches);
    media.addEventListener("change", handler);
    return () => media.removeEventListener("change", handler);
  }, []);
  return reduced;
};

/* =====================================================
   Global CSS-in-JS for a few micro tweaks (Tailwind still primary)
   These class strings are meant for tailwind usage and a few inline styles.
   ===================================================== */

const globalStyles = {
  contentMaxWidth: "max-w-7xl mx-auto px-6 sm:px-8 lg:px-12",
};

/* =====================================================
   Animation presets
   ===================================================== */

const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};
const subtleScale = { hover: { scale: 1.03 }, tap: { scale: 0.98 } };

/* =====================================================
   PART 2 — LAYOUT, NAVBAR, NAV-CLICK ANIMATIONS
   ===================================================== */

// Smooth scroll to ID with framer-friendly animation hooks
const scrollToId = (id, offset = 0, behavior = "smooth") => {
  try {
    const el = document.getElementById(id);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.pageYOffset + offset;
    window.scrollTo({ top, behavior });
  } catch (e) {
    // fallback
    const el = document.getElementById(id);
    el && el.scrollIntoView({ behavior: "smooth" });
  }
};

const Navbar = ({ sections }) => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState(sections[0]?.id || "home");
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (!safeWindow) return;
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { threshold: 0.5 }
    );
    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    return () => observer && observer.disconnect();
  }, [sections]);

  const handleNavClick = (id) => {
    // buttery scroll + section enter animation trigger
    setOpen(false);
    // small offset for fixed navbar
    scrollToId(id, -90, reduced ? "auto" : "smooth");
    // focus for accessibility
    const el = document.getElementById(id);
    if (el) el.focus({ preventScroll: true });
  };

  return (
    <nav
      role="navigation"
      aria-label="Primary"
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? "backdrop-blur-md bg-black/60 border-b border-white/5" : "bg-transparent"
      }`}
    >
      <div className={`${globalStyles.contentMaxWidth} flex items-center justify-between py-4`}>
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick("home");
          }}
          className="font-extrabold text-lg tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-300 to-indigo-400"
        >
          Pehchaan Media
        </a>

        <div className="hidden md:flex items-center space-x-8">
          {sections.map((s) => (
            <button
              key={s.id}
              onClick={() => handleNavClick(s.id)}
              className={`uppercase tracking-wider text-sm font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-purple-400/30 px-2 py-1 rounded ${
                active === s.id ? "text-purple-300" : "text-gray-300 hover:text-purple-300"
              }`}
              aria-current={active === s.id ? "page" : undefined}
            >
              {s.label}
            </button>
          ))}
        </div>

        <div className="hidden md:flex items-center space-x-4">
          <motion.a
            whileHover={{ scale: 1.02 }}
            className="px-4 py-2 rounded-full font-semibold bg-gradient-to-r from-purple-400 to-indigo-600 text-black shadow-md"
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick("contact");
            }}
          >
            Let's Talk
          </motion.a>
        </div>

        <button
          className="md:hidden p-2 rounded text-gray-200"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-nav"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28 }}
            className="md:hidden bg-black/80 backdrop-blur py-6"
          >
            <div className="flex flex-col items-center space-y-4">
              {sections.map((s) => (
                <button
                  key={s.id}
                  onClick={() => handleNavClick(s.id)}
                  className="text-white text-lg font-medium"
                >
                  {s.label}
                </button>
              ))}

              <motion.a
                whileHover={{ scale: 1.02 }}
                className="mt-4 inline-flex items-center bg-gradient-to-r from-purple-400 to-indigo-600 text-black px-6 py-3 rounded-full font-semibold"
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick("contact");
                }}
              >
                <Sparkles size={16} className="mr-2" />
                Start a Project
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

/* =====================================================
   PART 3 — MAJOR SECTIONS (each with entry animation on nav click)
   ===================================================== */

// Helper: Section container with focusable and in-view animation trigger
const Section = ({ id, title, subtitle, children, className = "", onEnter }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, amount: 0.35 });

  useEffect(() => {
    if (inView && typeof onEnter === "function") onEnter();
  }, [inView, onEnter]);

  return (
    <section
      id={id}
      ref={ref}
      tabIndex={-1}
      aria-labelledby={`${id}-title`}
      className={`pt-32 pb-20 ${className}`}
    >
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        animate={inView ? "show" : "hidden"}
        className="max-w-4xl mx-auto text-center px-6 sm:px-8"
      >
        {title && (
          <h2 id={`${id}-title`} className="text-4xl md:text-5xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-300 to-indigo-400">
            {title}
          </h2>
        )}
        {subtitle && <p className="text-gray-300 max-w-2xl mx-auto mb-8">{subtitle}</p>}
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8">{children}</div>
    </section>
  );
};

// HERO
const Hero = ({ onView }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });

  useEffect(() => {
    if (inView && onView) onView();
  }, [inView, onView]);

  return (
    <header id="home" className={`${THEME.bg} min-h-screen flex items-center relative overflow-hidden`}>
      <div className="absolute inset-0 pointer-events-none">
        {/* Decorative subtle animated purple blobs — reduce on mobile for perf */}
        <motion.div
          initial={{ opacity: 0.06 }}
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 60, ease: "linear" }}
          className="absolute w-[900px] h-[900px] rounded-full bg-purple-600/10 blur-[120px] top-[-120px] left-[-120px]"
        />
        <motion.div
          initial={{ opacity: 0.04 }}
          animate={{ rotate: -360 }}
          transition={{ repeat: Infinity, duration: 90, ease: "linear" }}
          className="absolute w-[700px] h-[700px] rounded-full bg-indigo-600/8 blur-[90px] bottom-[-120px] right-[-120px]"
        />
      </div>

      <div className="relative z-10 w-full">
        <div className="max-w-5xl mx-auto px-6 text-center py-28 sm:py-40">
          <motion.h1
            ref={ref}
            variants={fadeInUp}
            initial="hidden"
            animate={inView ? "show" : "hidden"}
            className="text-4xl md:text-6xl font-extrabold leading-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-300 to-indigo-400"
          >
            We craft stories with purple precision.
          </motion.h1>

          <motion.p variants={fadeInUp} initial="hidden" animate={inView ? "show" : "hidden"} className="text-gray-300 max-w-3xl mx-auto mb-8">
            Pehchaan Media blends cinematic craft with strategic thinking — building identities that move people. We design, film, and launch brands with heart and clarity.
          </motion.p>

          <motion.div className="inline-flex space-x-4" initial={{ opacity: 0, y: 12 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.2 }}>
            <motion.a whileHover={{ scale: 1.03 }} className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-purple-400 to-indigo-600 text-black font-semibold shadow" href="#work" onClick={(e)=>{e.preventDefault(); scrollToId('work', -90);}}>
              <Play size={16} className="mr-2" /> View Work
            </motion.a>
            <motion.a whileHover={{ scale: 1.03 }} className="inline-flex items-center px-6 py-3 rounded-full border border-white/10 text-white" href="#contact" onClick={(e)=>{e.preventDefault(); scrollToId('contact', -90);}}>
              Get in touch
            </motion.a>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <ChevronDown className="animate-bounce text-purple-300" size={28} />
      </div>
    </header>
  );
};

// ABOUT
const About = () => {
  return (
    <Section id="about" title="Who We Are" subtitle="We’re makers, strategists, and directors. We build brands with a human-first ethos.">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
        {[{
          icon: <Camera size={36} className="text-purple-300" />,
          title: "Visual Storytelling",
          desc: "Cinematic craft for brand-first narratives.",
        },{
          icon: <Palette size={36} className="text-purple-300" />,
          title: "Creative Strategy",
          desc: "Design decisions grounded in business outcomes.",
        },{
          icon: <Users size={36} className="text-purple-300" />,
          title: "Collaboration",
          desc: "We integrate with teams to deliver consistent work.",
        }].map((c,i)=> (
          <motion.div key={i} variants={fadeInUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="p-6 rounded-2xl bg-[#0d0913] border border-white/6">
            <div className="mb-4">{c.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{c.title}</h3>
            <p className="text-gray-300 text-sm">{c.desc}</p>
          </motion.div>
        ))}
      </div>
    </Section>
  );
};

// SERVICES
const Services = () => {
  const items = [
    { title: "Brand Identity", desc: "Logos, systems, and brand books", icon: <PenTool size={28} className="text-purple-300" /> },
    { title: "Film & Production", desc: "Cinematic films and social-first edits", icon: <Film size={28} className="text-purple-300" /> },
    { title: "Web & Experience", desc: "High-performance, delightful websites", icon: <Globe size={28} className="text-purple-300" /> },
    { title: "Campaigns", desc: "Integrated launches and audience growth", icon: <Megaphone size={28} className="text-purple-300" /> },
  ];

  return (
    <Section id="services" title="What We Do" subtitle="Integrated creative services for ambitious brands.">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
        {items.map((s, i) => (
          <motion.div key={i} variants={fadeInUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="rounded-2xl p-6 bg-[#0d0913] border border-white/6">
            <div className="mb-4">{s.icon}</div>
            <h4 className="font-semibold mb-2">{s.title}</h4>
            <p className="text-gray-300 text-sm">{s.desc}</p>
          </motion.div>
        ))}
      </div>
    </Section>
  );
};

// WORK
const Work = () => {
  const projects = useMemo(() => [
    { title: "Luminous Skincare", cat: "Film", src: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=1200&q=80" },
    { title: "Drift E-Sports", cat: "Branding", src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80" },
    { title: "OceanX", cat: "Web", src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80" },
    { title: "Aurum Film", cat: "Cinematography", src: "https://images.unsplash.com/photo-1542744173-05336fcc7ad4?auto=format&fit=crop&w=1200&q=80" },
  ], []);

  return (
    <Section id="work" title="Our Work" subtitle="Selected projects — a mix of film, brand, and digital experiences.">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
        {projects.map((p, i) => (
          <motion.article key={i} variants={fadeInUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="rounded-2xl overflow-hidden bg-[#0d0913] border border-white/6">
            <div className="relative h-64">
              <img loading="lazy" src={p.src} alt={p.title} className="object-cover w-full h-full" width="1200" height="800" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 hover:opacity-100 transition-opacity flex items-end p-6">
                <div>
                  <h3 className="text-white font-semibold">{p.title}</h3>
                  <p className="text-purple-300 text-sm">{p.cat}</p>
                </div>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </Section>
  );
};

// STUDIO
const Studio = () => (
  <Section id="studio" title="Inside Our Studio" subtitle="A look at where the work is made.">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
      <motion.div variants={fadeInUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="rounded-2xl overflow-hidden bg-[#0d0913] border border-white/6">
        <img loading="lazy" src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80" alt="Studio" className="w-full h-96 object-cover" width="1200" height="800" />
      </motion.div>

      <motion.div variants={fadeInUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="flex flex-col justify-center">
        <h3 className="text-2xl font-semibold mb-4">A Creative Home</h3>
        <p className="text-gray-300 mb-4">Our studio blends a film stage with a design lab to provide the full spectrum of creative production.</p>
        <ul className="grid grid-cols-2 gap-2 text-sm text-gray-300">
          <li className="flex items-center"><Sparkles size={14} className="mr-2 text-purple-300" /> Design Lab</li>
          <li className="flex items-center"><Camera size={14} className="mr-2 text-purple-300" /> Film Stage</li>
          <li className="flex items-center"><Users size={14} className="mr-2 text-purple-300" /> Collaborative Teams</li>
          <li className="flex items-center"><Heart size={14} className="mr-2 text-purple-300" /> Brand Strategy</li>
        </ul>
      </motion.div>
    </div>
  </Section>
);

// TESTIMONIALS
const Testimonials = () => {
  const data = [
    { name: "Ayesha Khan", company: "Glow Beauty Co.", quote: "They understood our story and amplified it." },
    { name: "Rizwan Malik", company: "NextGen", quote: "Professional, creative, and obsessed with results." },
    { name: "Sara Ahmed", company: "Urban Brew", quote: "They became part of our team during rebrand." },
  ];

  return (
    <Section id="testimonials" title="What Our Clients Say" subtitle={null}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        {data.map((d, i) => (
          <motion.blockquote key={i} variants={fadeInUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="p-6 bg-[#0d0913] border border-white/6 rounded-2xl">
            <p className="text-gray-300 italic mb-4">“{d.quote}”</p>
            <footer className="text-white font-semibold">{d.name} <span className="text-purple-300 text-sm">— {d.company}</span></footer>
          </motion.blockquote>
        ))}
      </div>
    </Section>
  );
};

// CONTACT
const Contact = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const data = new FormData(form);
    // Demo UX: graceful success state — integrate EmailJS or backend in production
    const btn = form.querySelector("button[type=submit]");
    if (btn) {
      btn.disabled = true;
      btn.innerText = "Sending...";
    }
    setTimeout(() => {
      btn.disabled = false;
      btn.innerText = "Send Message";
      alert("Message sent (demo). Replace with EmailJS or your backend for production.");
      form.reset();
    }, 900);
  };

  return (
    <Section id="contact" title="Let’s Build Your Story" subtitle="Drop a message and we’ll respond within 48 hours.">
      <form onSubmit={handleSubmit} className="max-w-2xl mx-auto mt-8 grid grid-cols-1 gap-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input aria-label="Your name" name="name" required className="px-4 py-3 rounded bg-[#0b0710] border border-white/6" placeholder="Your name" />
          <input aria-label="Your email" name="email" type="email" required className="px-4 py-3 rounded bg-[#0b0710] border border-white/6" placeholder="you@company.com" />
        </div>
        <input aria-label="Subject" name="subject" className="px-4 py-3 rounded bg-[#0b0710] border border-white/6" placeholder="Subject" />
        <textarea aria-label="Message" name="message" rows={6} className="px-4 py-3 rounded bg-[#0b0710] border border-white/6" placeholder="Tell us about your project" />
        <div className="flex items-center justify-between">
          <button type="submit" className="bg-gradient-to-r from-purple-400 to-indigo-600 text-black px-6 py-3 rounded font-semibold">Send Message</button>
          <div className="text-sm text-gray-300">Or email us at <a href="mailto:info@pehchaanmedia.com" className="text-purple-300">info@pehchaanmedia.com</a></div>
        </div>
      </form>
    </Section>
  );
};

// FOOTER
const Footer = () => (
  <footer className="mt-12 border-t border-white/6 py-8 text-gray-300">
    <div className={`${globalStyles.contentMaxWidth} grid grid-cols-1 md:grid-cols-3 gap-8 items-start`}>
      <div>
        <h4 className="text-white font-semibold mb-2">Pehchaan Media</h4>
        <p className="text-sm text-gray-300">Cinematic production, brand design, and digital experiences.</p>
      </div>
      <div>
        <h5 className="font-semibold mb-2">Services</h5>
        <ul className="space-y-1 text-sm">
          <li>Branding</li>
          <li>Film</li>
          <li>Web</li>
        </ul>
      </div>
      <div>
        <h5 className="font-semibold mb-2">Contact</h5>
        <p className="text-sm">info@pehchaanmedia.com</p>
        <p className="text-sm">+92 300 1234567</p>
      </div>
    </div>

    <div className={`${globalStyles.contentMaxWidth} mt-8 text-center text-sm text-gray-500`}>
      © {new Date().getFullYear()} Pehchaan Media. All rights reserved.
    </div>
  </footer>
);

/* =====================================================
   PART 4 — UTILITIES, HOOKS, ACCESSIBILITY, PERFORMANCE
   ===================================================== */

const ScrollProgress = () => {
  const [pct, setPct] = useState(0);
  useEffect(() => {
    const handle = () => {
      const scrolled = window.scrollY;
      const h = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const p = h > 0 ? (scrolled / h) * 100 : 0;
      setPct(p);
    };
    window.addEventListener("scroll", handle);
    handle();
    return () => window.removeEventListener("scroll", handle);
  }, []);
  return (
    <div className="fixed top-0 left-0 right-0 h-[3px] z-[9999] bg-black">
      <motion.div className="h-full bg-gradient-to-r from-purple-400 to-indigo-600" style={{ width: `${pct}%` }} />
    </div>
  );
};

const FloatingCTA = () => {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <AnimatePresence>
      {visible && (
        <motion.a
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ duration: 0.32 }}
          href="#contact"
          onClick={(e) => { e.preventDefault(); scrollToId('contact', -90); }}
          className="fixed right-6 bottom-6 z-50 inline-flex items-center space-x-2 px-4 py-3 rounded-full bg-gradient-to-r from-purple-400 to-indigo-600 text-black font-semibold shadow-lg"
        >
          <Sparkles size={16} />
          <span>Start a Project</span>
        </motion.a>
      )}
    </AnimatePresence>
  );
};

// Reduced-motion friendly animated cursor (hidden when reduced)
const CustomCursor = () => {
  const ref = useRef(null);
  const reduced = usePrefersReducedMotion();
  useEffect(() => {
    if (reduced || !safeWindow) return;
    const move = (e) => {
      if (ref.current) ref.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [reduced]);
  if (reduced) return null;
  return <div ref={ref} className="hidden md:block fixed top-0 left-0 w-4 h-4 rounded-full border-2 border-purple-300 pointer-events-none mix-blend-difference z-[9999]" />;
};

/* =====================================================
   PART 5 — APP ASSEMBLY, META TAGS, EXPORT
   ===================================================== */

const MetaTags = () => {
  useEffect(() => {
    document.title = "Pehchaan Media | Creative Studio";
    const description = document.createElement("meta");
    description.name = "description";
    description.content = "Pehchaan Media blends cinematic film, brand strategy and digital experiences to craft identity-driven campaigns.";
    document.head.appendChild(description);

    const canonical = document.createElement("link");
    canonical.rel = "canonical";
    canonical.href = safeWindow ? safeWindow.location.href : "";
    document.head.appendChild(canonical);

    const ogTitle = document.createElement("meta");
    ogTitle.setAttribute("property", "og:title");
    ogTitle.content = "Pehchaan Media | Creative Studio";
    document.head.appendChild(ogTitle);

    const ogDesc = document.createElement("meta");
    ogDesc.setAttribute("property", "og:description");
    ogDesc.content = description.content;
    document.head.appendChild(ogDesc);

    const ogImage = document.createElement("meta");
    ogImage.setAttribute("property", "og:image");
    ogImage.content = "https://images.unsplash.com/photo-1508921912186-1d1a45ebb3c1?auto=format&fit=crop&w=1200&q=80";
    document.head.appendChild(ogImage);

    return () => {
      [description, canonical, ogTitle, ogDesc, ogImage].forEach((el) => {
        if (el && el.parentNode) el.parentNode.removeChild(el);
      });
    };
  }, []);
  return null;
};

const sections = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "services", label: "Services" },
  { id: "work", label: "Work" },
  { id: "studio", label: "Studio" },
  { id: "testimonials", label: "Testimonials" },
  { id: "contact", label: "Contact" },
];

const App = () => {
  return (
    <LazyMotion features={domAnimation}>
      <MetaTags />
      <div className="min-h-screen text-white bg-[#04020a]">
        <ScrollProgress />
        <CustomCursor />
        <Navbar sections={sections} />
        <main className="pt-20">
          <Hero />
          <About />
          <Services />
          <Work />
          <Studio />
          <Testimonials />
          <Contact />
          <Footer />
        </main>
        <FloatingCTA />
      </div>
    </LazyMotion>
  );
};

export default App;

/* =====================================================
   Developer Notes (bottom of file) —
   - This rewrite focuses on a purple-forward theme, improved accessibility,
     section-entry animations and buttery smooth scroll on nav clicks.
   - Images use lazy loading and include width/height attributes for layout stability.
   - To complete production readiness: hook contact form to EmailJS or your backend,
     add server-side rendering meta tag injection where appropriate, and compress images for best LCP.

   PART DELIVERY:
   - This single file contains the 5 logical parts you asked for (clearly demarcated).
   - If you want this split into 5 separate files (e.g., Part1.jsx ... Part5.jsx) I can provide that split next.

   END
   ===================================================== */
