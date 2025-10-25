// src/App.jsx
import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiPlay,
  FiInstagram,
  FiMail,
  FiSearch,
  FiX,
  FiMenu,
  FiChevronDown,
  FiChevronRight,
  FiStar,
  FiFilm,
  FiClock,
  FiCamera,
  FiLayers,
  FiFeather,
} from "react-icons/fi";

/**
 * Pehchaan Media - Full single-file App.jsx
 * - Tailwind-based (assumes Tailwind configured in project)
 * - framer-motion for micro animations
 * - Mobile-optimized: consistent px-4 / sm:px-6, overflow-x-hidden, improved tap targets
 * - Minimal inline <style> used only for marquee animation and small glow
 */

/* --------------------
   Inline SVG logos as data URIs (fallback)
   -------------------- */
const LOGO_G2 = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns='http://www.w3.org/2000/svg' width='160' height='40' viewBox='0 0 160 40'>
  <rect rx='6' width='160' height='40' fill='%2310141A'/>
  <g transform='translate(12,8)'>
    <circle cx='8' cy='8' r='8' fill='%23ff5a5f' />
    <text x='30' y='14' font-family='Inter, Arial' font-size='12' fill='%23fff'>G2</text>
  </g>
</svg>
`)}`;

const LOGO_CAPTERRA = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns='http://www.w3.org/2000/svg' width='180' height='40' viewBox='0 0 180 40'>
  <rect rx='6' width='180' height='40' fill='%2310141A'/>
  <g transform='translate(10,8)'>
    <rect width='16' height='16' rx='3' fill='%2300b0ff' />
    <text x='34' y='14' font-family='Inter, Arial' font-size='12' fill='%23fff'>Capterra</text>
  </g>
</svg>
`)}`;

const LOGO_SOFTADVICE = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns='http://www.w3.org/2000/svg' width='200' height='40' viewBox='0 0 200 40'>
  <rect rx='6' width='200' height='40' fill='%2310141A'/>
  <g transform='translate(10,8)'>
    <path d='M0 8 L8 0 L16 8 L8 16 Z' fill='%23ffc857' />
    <text x='34' y='14' font-family='Inter, Arial' font-size='12' fill='%23fff'>SoftwareAdvice</text>
  </g>
</svg>
`)}`;

/* --------------------
   Sample data
   -------------------- */
const PROJECTS = [
  {
    id: "p1",
    title: "Cinematic FMCG Launch",
    excerpt:
      "Large-format film to launch a regional FMCG brand across TV and digital channels.",
    cover:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1400&q=80",
    role: "Production • Direction",
    year: 2024,
    duration: "2:15",
  },
  {
    id: "p2",
    title: "Luxury Brand Story",
    excerpt:
      "A minimal, emotive brand film designed to reposition a luxury label in new markets.",
    cover:
      "https://images.unsplash.com/photo-1524866049942-68e5d6a8a1b0?auto=format&fit=crop&w=1400&q=80",
    role: "Creative Direction",
    year: 2023,
    duration: "1:45",
  },
  {
    id: "p3",
    title: "Music Video — Visual EP",
    excerpt: "A stylized series of visual pieces, pushing color and kinetic editing.",
    cover:
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1400&q=80",
    role: "Director • Editor",
    year: 2025,
    duration: "3:30",
  },
  {
    id: "p4",
    title: "Documentary Short",
    excerpt:
      "Intimate short film profiling craft and culture, screened at local festivals.",
    cover:
      "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1400&q=80",
    role: "Producer",
    year: 2022,
    duration: "12:00",
  },
  {
    id: "p5",
    title: "Integrated Social Series",
    excerpt:
      "Ten-episode narrative content series designed for social-first engagement.",
    cover:
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1400&q=80",
    role: "Series Producer",
    year: 2024,
    duration: "10 × 02:00",
  },
  {
    id: "p6",
    title: "Brand Anthem",
    excerpt:
      "A stirring anthem combining archival, documentary, and fashion elements.",
    cover:
      "https://images.unsplash.com/photo-1517519014922-8fc80b65f3d7?auto=format&fit=crop&w=1400&q=80",
    role: "Creative Direction",
    year: 2025,
    duration: "1:20",
  },
];

const SERVICES = [
  { id: "s1", icon: <FiFilm />, title: "Film & Video Production", desc: "Full production: pre-pro, production, post." },
  { id: "s2", icon: <FiLayers />, title: "Creative Direction", desc: "Concepting, storyboards, styleframes." },
  { id: "s3", icon: <FiFeather />, title: "Script & Storytelling", desc: "Narrative design focused on brand voice." },
  { id: "s4", icon: <FiCamera />, title: "Cinematography", desc: "Lighting, camera, movement." },
  { id: "s5", icon: <FiClock />, title: "Post Production", desc: "Editing, color, sound design & motion." },
];

const TEAM = [
  { name: "Zara Khan", role: "Creative Director", blurb: "Leads creative strategy and directs narrative films." },
  { name: "Hamza Raza", role: "Director of Photography", blurb: "20 years lighting and crafting cinematic palettes." },
  { name: "Ayesha Q", role: "Producer", blurb: "Manages production end-to-end across locations." },
  { name: "Bilal Shah", role: "Editor & Colorist", blurb: "Rhythm-first editor with documentary background." },
  { name: "Maria Lopez", role: "Sound Designer", blurb: "Designs immersive soundscapes for broadcast & digital." },
];

const BLOG = [
  { id: "b1", title: "Building a Cinematic Language for Brands", excerpt: "Tactical approaches for translating brand values into moving-image language.", date: "2024-07-10", cover: "https://picsum.photos/seed/blog1/800/500" },
  { id: "b2", title: "On-Camera Lighting in Small Spaces", excerpt: "How to light cinematic shots in confined environments.", date: "2024-03-22", cover: "https://picsum.photos/seed/blog2/800/500" },
  { id: "b3", title: "The Editor's Rhythm: Cutting with Intention", excerpt: "Why pacing can make or break the emotional impact.", date: "2023-11-12", cover: "https://picsum.photos/seed/blog3/800/500" },
];

const TESTIMONIALS = [
  { quote: "Pehchaan Media amplified our campaign with cinematic clarity — exceptional craft and cadence.", author: "Sara Malik, Creative Director @ LuxeHouse" },
  { quote: "They delivered beyond expectations; their narrative approach produced measurable uplift.", author: "Adil Hussain, CEO @ CoreVision" },
  { quote: "A production partner who understands both art and delivery timelines.", author: "Leah Martin, Head of Marketing @ Solace" },
];

/* --------------------
   Small helper components
   -------------------- */
const IconButton = ({ children, className = "", ...props }) => (
  <button {...props} className={`inline-flex items-center justify-center gap-2 px-3 py-2 rounded-2xl bg-[#11131a] hover:bg-[#141622] transition ${className}`}>
    {children}
  </button>
);

function Stars({ count = 5 }) {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: count }).map((_, i) => (
        <FiStar key={i} className="text-yellow-400 w-4 h-4" />
      ))}
    </div>
  );
}

/* --------------------
   Modal gallery for project detail
   -------------------- */
function ProjectModal({ project, open, onClose }) {
  const ref = useRef(null);
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      if (ref.current) ref.current.focus();
    } else {
      document.body.style.overflow = "";
    }
    return () => (document.body.style.overflow = "");
  }, [open]);
  if (!open || !project) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70" onClick={() => onClose()} />
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 12 }} className="relative z-50 w-full max-w-4xl bg-[#12141D] border border-gray-800 rounded-2xl overflow-hidden shadow-2xl">
        <div className="md:flex">
          <div className="md:w-1/2">
            <img src={project.cover} alt={project.title} className="w-full h-64 md:h-full object-cover" />
          </div>
          <div className="md:w-1/2 p-6">
            <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
            <p className="text-sm text-gray-400 mb-4">{project.role} • {project.year} • {project.duration}</p>
            <p className="text-gray-300 mb-6">{project.excerpt}</p>
            <div className="flex items-center gap-3">
              <a onClick={() => { onClose(); window.location.hash = "#contact"; }} className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-2xl cursor-pointer">
                <FiPlay /> View Similar
              </a>
              <button onClick={() => onClose()} className="px-4 py-2 rounded-2xl border border-gray-700">Close</button>
            </div>
            <div className="mt-6 text-xs text-gray-500">Shot on RED, graded in DaVinci Resolve</div>
          </div>
        </div>
        <button ref={ref} onClick={() => onClose()} aria-label="Close modal" className="absolute top-4 right-4 p-2 rounded-full bg-black/30 hover:bg-black/50">
          <FiX />
        </button>
      </motion.div>
    </div>
  );
}

/* --------------------
   Lightweight carousel used on case-studies small tiles (auto-rotate)
   -------------------- */
function SimpleCarousel({ items }) {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setIndex((s) => (s + 1) % items.length), 4200);
    return () => clearInterval(id);
  }, [items.length]);
  return (
    <div className="relative">
      <div className="grid md:grid-cols-3 gap-6">
        {items.slice(index, index + 3).concat(items.slice(0, Math.max(0, index + 3 - items.length))).map((it) => (
          <a key={it.id} href={`#project-${it.id}`} className="group block bg-gradient-to-b from-[#0f1724]/30 to-[#12141D]/30 rounded-2xl overflow-hidden border border-gray-800">
            <div className="relative h-56 md:h-48 lg:h-64">
              <img src={it.cover} alt={it.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute left-6 bottom-6 text-white z-10">
                <div className="text-sm text-indigo-300">{it.role} • {it.year}</div>
                <h4 className="text-xl font-semibold">{it.title}</h4>
                <p className="text-sm text-gray-300 max-w-xs mt-2">{it.excerpt}</p>
              </div>
            </div>
          </a>
        ))}
      </div>
      <div className="flex justify-center gap-3 mt-6">
        <button onClick={() => setIndex((i) => (i - 1 + items.length) % items.length)} className="px-4 py-2 rounded-full bg-gray-800/60 hover:bg-gray-800/80">Prev</button>
        <button onClick={() => setIndex((i) => (i + 1) % items.length)} className="px-4 py-2 rounded-full bg-indigo-600 hover:bg-indigo-700">Next</button>
      </div>
    </div>
  );
}

/* --------------------
   Contact form
   -------------------- */
function ContactForm() {
  const [name, setName] = useState("");
  const [org, setOrg] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  function submit(e) {
    e.preventDefault();
    if (!name || !email || !message) {
      setStatus({ type: "error", text: "Please complete all required fields." });
      return;
    }
    setLoading(true);
    setStatus(null);
    setTimeout(() => {
      setLoading(false);
      setStatus({ type: "success", text: "Thanks — we received your message." });
      setName(""); setOrg(""); setEmail(""); setMessage("");
    }, 1200);
  }

  return (
    <form onSubmit={submit} className="max-w-3xl mx-auto text-left">
      <div className="grid md:grid-cols-2 gap-4">
        <label className="block">
          <span className="text-sm text-gray-300">Full name</span>
          <input value={name} onChange={(e) => setName(e.target.value)} className="mt-2 w-full rounded-lg bg-[#0f1318] border border-gray-800 p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Zara Khan" />
        </label>
        <label className="block">
          <span className="text-sm text-gray-300">Company (optional)</span>
          <input value={org} onChange={(e) => setOrg(e.target.value)} className="mt-2 w-full rounded-lg bg-[#0f1318] border border-gray-800 p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Company name" />
        </label>
      </div>
      <label className="block mt-4">
        <span className="text-sm text-gray-300">Email</span>
        <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" className="mt-2 w-full rounded-lg bg-[#0f1318] border border-gray-800 p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="hello@company.com" />
      </label>
      <label className="block mt-4">
        <span className="text-sm text-gray-300">Message</span>
        <textarea value={message} onChange={(e) => setMessage(e.target.value)} rows={6} className="mt-2 w-full rounded-lg bg-[#0f1318] border border-gray-800 p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Tell us about your project…" />
      </label>
      <div className="flex items-center gap-4 mt-4">
        <button type="submit" disabled={loading} className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 rounded-2xl text-white font-medium">
          {loading ? "Sending…" : "Send Message"}
        </button>
        {status && <div className={`text-sm ${status.type === "error" ? "text-red-400" : "text-green-400"}`}>{status.text}</div>}
      </div>
    </form>
  );
}

/* --------------------
   Main App
   -------------------- */
export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [projectModal, setProjectModal] = useState({ open: false, project: null });
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  function openProject(p) { setProjectModal({ open: true, project: p }); }
  function closeProject() { setProjectModal({ open: false, project: null }); }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#10121A] to-[#0f1116] text-white font-sans overflow-x-hidden">
      {/* Inline style for marquee/glow (kept minimal) */}
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .marquee {
          display: flex;
          gap: 1.25rem;
          will-change: transform;
          animation: marquee 24s linear infinite;
        }
        .glow-hover:hover { box-shadow: 0 8px 28px rgba(99,102,241,0.15); transform: translateY(-4px); }
      `}</style>

      {/* header */}
      <header className="fixed top-0 left-0 w-full z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between bg-black/30 backdrop-blur-sm border-b border-gray-800 rounded-b-3xl">
          <div className="flex items-center gap-4">
            <a href="#" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-tr from-[#6366f1] to-[#7e22ce] flex items-center justify-center text-white font-bold shadow-md">
                PM
              </div>
              <div className="text-sm font-semibold">Pehchaan Media</div>
            </a>
            <nav className="hidden md:flex items-center gap-6 text-gray-300">
              <a href="#work" className="hover:text-indigo-300">Work</a>
              <a href="#services" className="hover:text-indigo-300">Services</a>
              <a href="#case-studies" className="hover:text-indigo-300">Case Studies</a>
              <a href="#about" className="hover:text-indigo-300">About</a>
            </nav>
          </div>

          <div className="flex items-center gap-3">
            <button onClick={() => setSearchOpen((s) => !s)} className="p-2 rounded-md bg-[#0f1318] hover:bg-[#13161b] hidden md:inline-flex">
              <FiSearch className="w-4 h-4" />
            </button>
            <a href="#contact" className="hidden md:inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 transition px-4 py-2 rounded-2xl font-semibold">
              <FiMail /> Contact
            </a>
            <button onClick={() => setMenuOpen((s) => !s)} className="p-2 rounded-md bg-[#0f1318] md:hidden">
              {menuOpen ? <FiX className="w-5 h-5"/> : <FiMenu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* mobile menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="md:hidden bg-[#0f1116] border-t border-gray-800">
              <div className="px-4 py-4 flex flex-col gap-3">
                <a href="#work" className="py-3 border-b border-gray-800">Work</a>
                <a href="#services" className="py-3 border-b border-gray-800">Services</a>
                <a href="#case-studies" className="py-3 border-b border-gray-800">Case Studies</a>
                <a href="#about" className="py-3">About</a>
                <a href="#contact" className="mt-2 inline-flex items-center gap-3 px-4 py-3 rounded-2xl bg-indigo-600">Contact</a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main className="pt-28">
        {/* hero */}
        <section id="work" className="relative h-[86vh] md:h-screen flex items-center justify-center text-center overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            {/* subtle gradient layers for depth */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#0f1116] via-[#11131a66] to-transparent opacity-80"></div>
            <div className="absolute -left-32 top-8 w-96 h-96 rounded-full bg-gradient-to-tr from-[#6366f1] to-[#7e22ce] opacity-5 blur-3xl"></div>
            <div className="absolute right-0 bottom-0 w-80 h-80 rounded-full bg-gradient-to-tr from-[#7e22ce] to-[#6366f1] opacity-4 blur-3xl"></div>
          </div>

          <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
            <motion.h1 initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9 }} className="text-4xl md:text-6xl font-extrabold leading-tight">
              Crafting Iconic Narratives
            </motion.h1>

            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="mt-6 text-gray-300 max-w-2xl mx-auto">
              A full-service creative agency shaping stories through visuals.
            </motion.p>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="mt-8 flex items-center justify-center gap-3 flex-wrap">
              <a href="#case-studies" className="inline-flex items-center gap-3 bg-indigo-600 hover:bg-indigo-700 px-5 py-3 rounded-2xl font-semibold">
                <FiPlay /> View Work
              </a>
              <a href="#contact" className="inline-flex items-center gap-3 px-5 py-3 rounded-2xl border border-gray-700">Let's Talk</a>
            </motion.div>
          </div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }} className="absolute bottom-8 text-gray-400">
            <FiChevronDown className="w-8 h-8 animate-bounce" />
          </motion.div>
        </section>

        {/* projects */}
        <section id="projects" className="py-20 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto">
            <motion.h2 initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-3xl md:text-4xl font-bold text-center mb-6">Featured Projects</motion.h2>
            <p className="text-center text-gray-400 max-w-2xl mx-auto mb-10">Selected works spanning brand films, music videos, and documentary shorts.</p>

            <div className="grid md:grid-cols-3 gap-8">
              {PROJECTS.map((p) => (
                <motion.div key={p.id} whileHover={{ y: -6 }} className="group bg-[#0f1318] rounded-2xl p-0 border border-gray-800 overflow-hidden">
                  <div onClick={() => openProject(p)} className="cursor-pointer">
                    <div className="overflow-hidden rounded-t-2xl mb-4">
                      <img src={p.cover} alt={p.title} className="w-full h-56 object-cover transform transition duration-700 group-hover:scale-105" />
                    </div>
                    <div className="px-4 pb-4">
                      <h3 className="text-lg font-semibold">{p.title}</h3>
                      <p className="text-gray-400 text-sm mb-3">{p.excerpt}</p>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <div>{p.role}</div>
                        <div>{p.year} • {p.duration}</div>
                      </div>
                    </div>
                  </div>
                  <div className="px-4 pb-4 flex items-center gap-3">
                    <button onClick={() => openProject(p)} className="px-3 py-2 rounded-full border border-gray-700 text-sm">View details</button>
                    <a href="#" className="text-indigo-300 text-sm inline-flex items-center gap-1">See case study <FiChevronRight /></a>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* services */}
        <section id="services" className="py-16 bg-[#0f1116] border-t border-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="flex items-center justify-between mb-8 gap-4">
              <div>
                <h3 className="text-2xl md:text-3xl font-bold">Services</h3>
                <p className="text-gray-400">End-to-end production services and creative direction.</p>
              </div>
              <div className="hidden md:flex gap-3">
                <button className="px-4 py-2 rounded-md border border-gray-700">Capabilities</button>
                <button className="px-4 py-2 rounded-md border border-gray-700">Pricing</button>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {SERVICES.map((s) => (
                <motion.div key={s.id} whileHover={{ scale: 1.02 }} className="p-6 rounded-2xl border border-gray-800 bg-[#10131a]">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-[#0e1116] flex items-center justify-center text-indigo-400 text-2xl">{s.icon}</div>
                    <div>
                      <div className="font-semibold">{s.title}</div>
                      <div className="text-sm text-gray-400">{s.desc}</div>
                    </div>
                  </div>
                  <div className="mt-4 flex justify-between items-center">
                    <div className="text-sm text-gray-400">Learn more</div>
                    <FiChevronRight />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ===================================================== */}
        {/* Case Studies - cinematic responsive grid */}
        {/* ===================================================== */}
        <section id="case-studies" className="py-20 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
              <div>
                <h3 className="text-3xl font-bold">Selected Case Studies</h3>
                <p className="text-gray-400">Deep dives into strategy, craft, and outcome — curated to highlight storytelling and impact.</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-sm text-gray-400 hidden md:block">Trusted on</div>
                <div className="flex gap-3 items-center">
                  <img src={LOGO_G2} alt="G2" className="h-8 object-contain" />
                  <img src={LOGO_CAPTERRA} alt="Capterra" className="h-8 object-contain" />
                  <img src={LOGO_SOFTADVICE} alt="SoftwareAdvice" className="h-8 object-contain" />
                </div>
              </div>
            </div>

            <div className="mb-8 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-400 mr-2">Filter</span>
                <CaseStudiesFilters />
              </div>
              <div className="text-sm text-gray-400">Showing <span id="cs-count" className="text-white font-semibold">All</span></div>
            </div>

            <CaseStudiesGrid projects={PROJECTS} onOpen={openProject} />
          </div>
        </section>

        {/* about & team */}
        <section id="about" className="py-20 bg-[#0f1116] border-t border-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 grid md:grid-cols-2 gap-8 items-start">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold mb-2">Our Philosophy</h3>
              <p className="text-gray-400 mb-6">We believe in cinematic storytelling that connects. Every frame is an opportunity to tell the right story, to the right people.</p>

              <ol className="space-y-4">
                <li className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-lg bg-indigo-600 flex items-center justify-center">01</div>
                  <div>
                    <div className="font-semibold">Discovery</div>
                    <div className="text-sm text-gray-400">We start with research and audiences, not just visuals.</div>
                  </div>
                </li>
                <li className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-lg bg-pink-600 flex items-center justify-center">02</div>
                  <div>
                    <div className="font-semibold">Creative Direction</div>
                    <div className="text-sm text-gray-400">Concept to treatment to production — a single guiding vision.</div>
                  </div>
                </li>
                <li className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-lg bg-green-600 flex items-center justify-center">03</div>
                  <div>
                    <div className="font-semibold">Delivery</div>
                    <div className="text-sm text-gray-400">Post, distribution, and measurement — every project closes the loop.</div>
                  </div>
                </li>
              </ol>
            </div>

            <div>
              <h4 className="text-xl font-semibold mb-4">Meet the team</h4>
              <div className="grid sm:grid-cols-2 gap-4">
                {TEAM.map((t) => (
                  <div key={t.name} className="p-4 rounded-2xl bg-[#0f1318] border border-gray-800">
                    <div className="flex gap-4 items-start">
                      <div className="w-14 h-14 rounded-lg bg-gradient-to-tr from-[#6366f1] to-[#7e22ce] flex items-center justify-center text-white font-bold">
                        {t.name.split(" ")[0][0]}
                      </div>
                      <div>
                        <div className="font-semibold">{t.name}</div>
                        <div className="text-sm text-gray-400">{t.role}</div>
                        <div className="text-sm text-gray-300 mt-2">{t.blurb}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* insights (blog) */}
        <section id="insights" className="py-16 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl md:text-3xl font-bold">Insights</h3>
              <a href="#blog" className="text-indigo-300 underline">View all posts</a>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {BLOG.map((b) => (
                <article key={b.id} className="rounded-2xl overflow-hidden border border-gray-800 bg-[#0f1318]">
                  <img src={b.cover} alt={b.title} className="w-full h-40 object-cover" />
                  <div className="p-4">
                    <div className="text-xs text-gray-400">{b.date}</div>
                    <h4 className="font-semibold mt-2">{b.title}</h4>
                    <p className="text-sm text-gray-300 mt-2">{b.excerpt}</p>
                    <a href="#" className="mt-3 inline-flex items-center gap-2 text-sm text-indigo-300">Read →</a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ===================================================== */}
        {/* Voices of Collaboration — testimonials + moving brand carousel */}
        {/* ===================================================== */}
        <section id="reviews" className="py-20 bg-[#0f1116] border-t border-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
            <motion.div initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <h3 className="text-3xl font-bold">Voices of Collaboration</h3>
              <p className="text-gray-400 mt-2">Partnerships across industries — brands, creators, and organizations we've helped tell their stories.</p>
            </motion.div>

            <motion.div className="mt-8 grid md:grid-cols-3 gap-6" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
              {TESTIMONIALS.map((t, i) => (
                <motion.div key={i} className="p-6 rounded-2xl border border-gray-800 bg-[#0f1318] hover:border-indigo-600 transition-all" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
                  <p className="text-gray-300 italic">“{t.quote}”</p>
                  <div className="mt-4 font-semibold">{t.author}</div>
                </motion.div>
              ))}
            </motion.div>

            {/* moving brand carousel (marquee) */}
            <div className="mt-8 overflow-hidden">
              <div className="flex items-center gap-4">
                <div className="marquee">
                  {/* duplicate the items so marquee loops smoothly */}
                  {MARQUEE_ITEMS.map((m, idx) => <BrandMarqueeItem key={`a-${idx}`} {...m} />)}
                  {MARQUEE_ITEMS.map((m, idx) => <BrandMarqueeItem key={`b-${idx}`} {...m} />)}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* contact */}
        <section id="contact" className="py-20 bg-gradient-to-t from-[#0f1116] to-transparent border-t border-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold">Let’s Build Something Iconic</h3>
              <p className="text-gray-400 mt-3">Whether you're an artist, brand or entrepreneur — tell us the goal and we'll create the path.</p>

              <div className="mt-6 bg-[#0f1318] rounded-2xl p-6 border border-gray-800">
                <ContactForm />
              </div>

              <div className="mt-6 text-sm text-gray-400">Or email: <a href="mailto:pehchaanmedia@email.com" className="underline">pehchaanmedia@email.com</a></div>
            </div>

            <div>
              <h4 className="text-lg font-semibold">Offices</h4>
              <div className="mt-4 grid gap-4">
                <div className="p-4 bg-[#0f1318] rounded-xl border border-gray-800">
                  <div className="font-semibold">Karachi, Pakistan</div>
                  <div className="text-sm text-gray-400">Studio & creative HQ</div>
                </div>
                <div className="p-4 bg-[#0f1318] rounded-xl border border-gray-800">
                  <div className="font-semibold">London, UK</div>
                  <div className="text-sm text-gray-400">Production partners</div>
                </div>
              </div>

              <div className="mt-6">
                <h5 className="font-semibold">Careers</h5>
                <p className="text-sm text-gray-400 mt-2">Email <a className="underline" href="mailto:jobs@pehchaanmedia.com">jobs@pehchaanmedia.com</a> to apply.</p>
              </div>
            </div>
          </div>
        </section>

        {/* footer */}
        <footer className="py-8 border-t border-gray-800 bg-[#0f1116]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-tr from-[#6366f1] to-[#7e22ce] flex items-center justify-center font-bold text-white">PM</div>
              <div className="text-sm text-gray-300">© {new Date().getFullYear()} Pehchaan Media</div>
            </div>

            <div className="flex flex-col md:flex-row items-center gap-4 text-sm text-gray-400">
              <div className="flex items-center gap-4">
                <a href="#privacy" className="hover:text-white transition">Privacy</a>
                <a href="#terms" className="hover:text-white transition">Terms</a>
                <a href="#sitemap" className="hover:text-white transition">Sitemap</a>
              </div>

              <div className="flex items-center gap-3">
                <a href="https://www.instagram.com/pehchaanmediahouse/" target="_blank" rel="noreferrer" className="p-2 rounded-xl bg-[#0e1116] hover:bg-gradient-to-tr hover:from-pink-500 hover:to-yellow-500 transition">
                  <FiInstagram className="w-5 h-5" />
                </a>
                <a href="https://youtube.com/@pehchaanmedia" target="_blank" rel="noreferrer" className="p-2 rounded-xl bg-[#0e1116] hover:bg-red-600 transition">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M10 15l5.19-3L10 9v6z"/><path d="M5 3h14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z"/></svg>
                </a>
                <a href="https://tiktok.com/@pehchaanmedia" target="_blank" rel="noreferrer" className="p-2 rounded-xl bg-[#0e1116] hover:bg-[#25F4EE] transition">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2c1.1 0 2 .9 2 2v12a2 2 0 1 1-4 0V9h-2v7a4 4 0 1 0 8 0V6h-2V2h-2z"/></svg>
                </a>
              </div>
            </div>
          </div>
        </footer>
      </main>

      {/* floating CTA */}
      <div className="fixed right-4 md:right-6 bottom-6 z-40">
        <a href="#contact" className="inline-flex items-center gap-3 bg-indigo-600 hover:bg-indigo-700 px-4 md:px-5 py-3 rounded-2xl shadow-2xl">
          <FiMail className="w-4 h-4" /> Book a Call
        </a>
      </div>

      {/* search overlay */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-start justify-center pt-28">
            <div className="absolute inset-0 bg-black/60" onClick={() => setSearchOpen(false)} />
            <motion.div initial={{ y: -12 }} animate={{ y: 0 }} exit={{ y: -12 }} className="relative z-50 w-full max-w-2xl px-4 sm:px-6">
              <div className="rounded-2xl bg-[#0f1318] border border-gray-800 p-6">
                <div className="flex items-center gap-3">
                  <input autoFocus placeholder="Search case studies, blog, team..." className="flex-1 bg-transparent outline-none placeholder:text-gray-500 text-white p-3" />
                  <button onClick={() => setSearchOpen(false)} className="p-2 rounded-md bg-[#0e1116]"><FiX /></button>
                </div>
                <div className="mt-4 text-sm text-gray-400">Tip: try “music video” or “brand film”</div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* project modal */}
      <AnimatePresence>
        {projectModal.open && (
          <ProjectModal project={projectModal.project} open={projectModal.open} onClose={closeProject} />
        )}
      </AnimatePresence>
    </div>
  );
}

/* --------------------
   Helper components used inside replaced sections
   -------------------- */

function CaseStudiesFilters() {
  const [active, setActive] = useState("All");
  const filters = ["All", "Film", "Branding", "Campaign"];

  useEffect(() => {
    const el = document.getElementById("cs-count");
    if (el) el.textContent = active;
  }, [active]);

  return (
    <div className="flex gap-3 flex-wrap">
      {filters.map((f) => (
        <button key={f} onClick={() => setActive(f)} className={`px-3 py-2 rounded-lg text-sm font-medium transition ${active === f ? "bg-indigo-600 text-white" : "bg-[#0f1318] text-gray-300 hover:bg-indigo-500 hover:text-white"}`}>
          {f}
        </button>
      ))}
    </div>
  );
}

function CaseStudiesGrid({ projects, onOpen }) {
  const featured = projects[0];
  const others = projects.slice(1);
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} className="lg:col-span-7 rounded-3xl overflow-hidden bg-gradient-to-br from-[#0f1724]/30 to-[#12141D]/20 border border-gray-800">
        <div className="relative h-72 md:h-[480px]">
          <img src={featured.cover} alt={featured.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute left-6 bottom-6 text-white z-10 max-w-xl">
            <div className="text-sm text-indigo-300 mb-2">{featured.role} • {featured.year}</div>
            <h3 className="text-2xl md:text-3xl font-bold mb-2">{featured.title}</h3>
            <p className="text-gray-300">{featured.excerpt}</p>
            <div className="mt-6 flex items-center gap-4">
              <button onClick={() => onOpen(featured)} className="px-4 py-2 rounded-full bg-indigo-600 hover:bg-indigo-700">View Project</button>
              <a href="#" className="text-sm text-indigo-300 inline-flex items-center gap-1">Read case study <FiChevronRight /></a>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-6">
        {others.map((p, i) => (
          <motion.div key={p.id} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }} className="rounded-2xl overflow-hidden bg-[#0f1318] border border-gray-800 group">
            <div className="relative h-40 sm:h-44">
              <img src={p.cover} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              <div className="absolute left-4 bottom-4 text-white">
                <div className="text-xs text-indigo-300">{p.role}</div>
                <h4 className="font-semibold">{p.title}</h4>
              </div>
            </div>
            <div className="p-4">
              <p className="text-gray-400 text-sm">{p.excerpt}</p>
              <div className="mt-3 flex items-center justify-between">
                <button onClick={() => onOpen(p)} className="px-3 py-2 rounded-full border border-gray-700 text-sm">View</button>
                <div className="text-xs text-gray-500">{p.year} • {p.duration}</div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* --------------------
   Marquee / Brand carousel helpers
   -------------------- */
const MARQUEE_ITEMS = [
  { name: "Studio X", color1: "#FF7A59", color2: "#FFB86B" },
  { name: "LuxeHouse", color1: "#6B8CFF", color2: "#9BD3FF" },
  { name: "CoreVision", color1: "#8AFFC1", color2: "#1BC47D" },
  { name: "Solace", color1: "#E07BFF", color2: "#7B61FF" },
  { name: "PulseMedia", color1: "#FFD166", color2: "#FF6B6B" },
  { name: "Arc Collective", color1: "#7BE9FF", color2: "#55A8FF" },
];

function BrandMarqueeItem({ name, color1, color2 }) {
  const initials = name.split(" ").map((s) => s[0]).slice(0, 2).join("");
  return (
    <div className="flex items-center gap-3 px-3 py-2 rounded-md bg-[#0f1318] border border-gray-800 glow-hover">
      <div className="w-12 h-12 rounded-md flex items-center justify-center font-bold text-white" style={{ background: `linear-gradient(135deg, ${color1}, ${color2})`, boxShadow: `0 8px 24px ${color2}22` }}>
        {initials}
      </div>
      <div className="text-left">
        <div className="font-semibold text-white text-sm">{name}</div>
        <div className="text-xs text-gray-300">Trusted partner</div>
      </div>
    </div>
  );
}
