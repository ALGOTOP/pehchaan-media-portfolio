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
  FiUser,
  FiFilm,
  FiClock,
  FiCamera,
  FiLayers,
  FiFeather,
} from "react-icons/fi";

/*
  Pehchaan Media - One-file React portfolio (paste to App.jsx)
  - Uses Tailwind classes for styling (assumes tailwind is set up)
  - Uses framer-motion for animations
  - Uses react-icons for icons
  - Embedded placeholder logos as inline SVG data URIs (guarantees they show)
  - Includes many sections: navbar, hero, projects, services, case studies carousel,
    team, blog, testimonials, contact with front-end validation, modal gallery, footer
  - Designed to be deployable on Vercel out-of-the-box (after installing dependencies)
*/

/* --------------------
   Inline SVG logos (data URI) so logos always appear
   -------------------- */
const LOGO_G2 = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns='http://www.w3.org/2000/svg' width='160' height='40' viewBox='0 0 160 40'>
  <rect rx='6' width='160' height='40' fill='%230a0f1b'/>
  <g transform='translate(12,8)'>
    <circle cx='8' cy='8' r='8' fill='%23ff5a5f' />
    <text x='30' y='14' font-family='Inter, Arial' font-size='12' fill='%23fff'>G2</text>
  </g>
</svg>
`)}`;

const LOGO_CAPTERRA = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns='http://www.w3.org/2000/svg' width='180' height='40' viewBox='0 0 180 40'>
  <rect rx='6' width='180' height='40' fill='%230a0f1b'/>
  <g transform='translate(10,8)'>
    <rect width='16' height='16' rx='3' fill='%2300b0ff' />
    <text x='34' y='14' font-family='Inter, Arial' font-size='12' fill='%23fff'>Capterra</text>
  </g>
</svg>
`)}`;

const LOGO_SOFTADVICE = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns='http://www.w3.org/2000/svg' width='200' height='40' viewBox='0 0 200 40'>
  <rect rx='6' width='200' height='40' fill='%230a0f1b'/>
  <g transform='translate(10,8)'>
    <path d='M0 8 L8 0 L16 8 L8 16 Z' fill='%23ffc857' />
    <text x='34' y='14' font-family='Inter, Arial' font-size='12' fill='%23fff'>SoftwareAdvice</text>
  </g>
</svg>
`)}`;

/* --------------------
   sample data (lots of items so page feels full)
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
  {
    id: "s1",
    icon: <FiFilm />,
    title: "Film & Video Production",
    desc:
      "Full production: pre-pro, production, post — teams for every scale of work.",
  },
  {
    id: "s2",
    icon: <FiLayers />,
    title: "Creative Direction",
    desc: "Concepting, storyboards, styleframes and visual treatments.",
  },
  {
    id: "s3",
    icon: <FiFeather />,
    title: "Script & Storytelling",
    desc: "Narrative design focused on brand voice and emotional arcs.",
  },
  {
    id: "s4",
    icon: <FiCamera />,
    title: "Cinematography",
    desc: "Lighting, camera, movement — cinematic imagery for high-impact storytelling.",
  },
  {
    id: "s5",
    icon: <FiClock />,
    title: "Post Production",
    desc: "Editing, color, sound design, and motion graphics.",
  },
];

const TEAM = [
  {
    name: "Zara Khan",
    role: "Creative Director",
    blurb:
      "Leads creative strategy and directs narrative films — background in advertising & cinema.",
  },
  {
    name: "Hamza Raza",
    role: "Director of Photography",
    blurb: "20 years lighting and crafting cinematic palettes.",
  },
  {
    name: "Ayesha Q",
    role: "Producer",
    blurb: "Manages production end-to-end across locations and budgets.",
  },
  {
    name: "Bilal Shah",
    role: "Editor & Colorist",
    blurb: "Rhythm-first editor with a background in long-form documentary.",
  },
  {
    name: "Maria Lopez",
    role: "Sound Designer",
    blurb: "Designs immersive soundscapes for broadcast & digital.",
  },
];

const BLOG = [
  {
    id: "b1",
    title: "Building a Cinematic Language for Brands",
    excerpt:
      "Tactical approaches for translating brand values into moving-image language.",
    date: "2024-07-10",
    cover: "https://picsum.photos/seed/blog1/800/500",
  },
  {
    id: "b2",
    title: "On-Camera Lighting in Small Spaces",
    excerpt: "How to light cinematic shots in confined environments.",
    date: "2024-03-22",
    cover: "https://picsum.photos/seed/blog2/800/500",
  },
  {
    id: "b3",
    title: "The Editor's Rhythm: Cutting with Intention",
    excerpt: "Why pacing can make or break the emotional impact.",
    date: "2023-11-12",
    cover: "https://picsum.photos/seed/blog3/800/500",
  },
];

const TESTIMONIALS = [
  {
    quote:
      "Pehchaan Media amplified our campaign with cinematic clarity — exceptional craft and cadence.",
    author: "Sara Malik, Creative Director @ LuxeHouse",
  },
  {
    quote:
      "They delivered beyond expectations; their narrative approach produced measurable uplift.",
    author: "Adil Hussain, CEO @ CoreVision",
  },
  {
    quote: "A production partner who understands both art and delivery timelines.",
    author: "Leah Martin, Head of Marketing @ Solace",
  },
];

/* --------------------
   small helper components
   -------------------- */
const IconButton = ({ children, className = "", ...props }) => (
  <button
    {...props}
    className={`inline-flex items-center justify-center gap-2 px-3 py-2 rounded-2xl bg-gray-900/50 hover:bg-gray-900/70 transition ${className}`}
  >
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
      <div className="absolute inset-0 bg-black/70" onClick={() => onClose()} />
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.98 }}
        className="relative z-50 max-w-4xl w-full bg-[#0b0d17] border border-gray-800 rounded-3xl overflow-hidden shadow-2xl"
      >
        <div className="md:flex">
          <div className="md:w-1/2">
            <img
              src={project.cover}
              alt={project.title}
              className="w-full h-72 md:h-full object-cover"
            />
          </div>
          <div className="md:w-1/2 p-6">
            <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
            <p className="text-sm text-gray-400 mb-4">
              {project.role} • {project.year} • {project.duration}
            </p>
            <p className="text-gray-300 mb-6">{project.excerpt}</p>
            <div className="flex gap-3 items-center">
              <a
                className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-2xl"
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  onClose();
                  window.location.hash = "#contact";
                }}
              >
                <FiPlay /> View Similar
              </a>
              <button
                onClick={() => onClose()}
                className="px-4 py-2 rounded-2xl border border-gray-800"
              >
                Close
              </button>
            </div>
            <div className="mt-6 text-xs text-gray-500">
              Shot on RED, graded in DaVinci Resolve
            </div>
          </div>
        </div>
        <button
          ref={ref}
          onClick={() => onClose()}
          aria-label="Close modal"
          className="absolute top-4 right-4 p-2 rounded-full bg-black/40 hover:bg-black/60"
        >
          <FiX />
        </button>
      </motion.div>
    </div>
  );
}

/* --------------------
   Carousel (simple) for case studies
   -------------------- */
function SimpleCarousel({ items }) {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const id = setInterval(() => {
      setIndex((s) => (s + 1) % items.length);
    }, 4500);
    return () => clearInterval(id);
  }, [items.length]);

  return (
    <div className="relative">
      <div className="grid md:grid-cols-3 gap-6">
        {items
          .slice(index, index + 3)
          .concat(items.slice(0, Math.max(0, index + 3 - items.length)))
          .map((it) => (
            <motion.a
              key={it.id}
              whileHover={{ y: -6, scale: 1.02 }}
              className="group block bg-gradient-to-b from-[#0f1724]/30 to-[#0b0d17]/30 rounded-2xl overflow-hidden border border-gray-800"
              href={`#project-${it.id}`}
            >
              <div className="relative h-56 md:h-48 lg:h-64">
                <img src={it.cover} alt={it.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute left-6 bottom-6 text-white z-10">
                  <div className="text-sm text-indigo-300">{it.role} • {it.year}</div>
                  <h4 className="text-xl font-semibold">{it.title}</h4>
                  <p className="text-sm text-gray-300 max-w-xs mt-2">{it.excerpt}</p>
                </div>
              </div>
            </motion.a>
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
   Contact form (front-end only)
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
    // simulate submit
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
          <input value={name} onChange={(e) => setName(e.target.value)} className="mt-2 w-full rounded-lg bg-gray-900 border border-gray-800 p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Zara Khan" />
        </label>
        <label className="block">
          <span className="text-sm text-gray-300">Company (optional)</span>
          <input value={org} onChange={(e) => setOrg(e.target.value)} className="mt-2 w-full rounded-lg bg-gray-900 border border-gray-800 p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Company name" />
        </label>
      </div>
      <label className="block mt-4">
        <span className="text-sm text-gray-300">Email</span>
        <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" className="mt-2 w-full rounded-lg bg-gray-900 border border-gray-800 p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="hello@company.com" />
      </label>
      <label className="block mt-4">
        <span className="text-sm text-gray-300">Message</span>
        <textarea value={message} onChange={(e) => setMessage(e.target.value)} rows={6} className="mt-2 w-full rounded-lg bg-gray-900 border border-gray-800 p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Tell us about your project…" />
      </label>
      <div className="flex items-center gap-4 mt-4">
        <button type="submit" disabled={loading} className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 rounded-2xl text-white font-medium">
          {loading ? "Sending…" : "Send Message"}
        </button>
        {status && (
          <div className={`text-sm ${status.type === "error" ? "text-red-400" : "text-green-400"}`}>{status.text}</div>
        )}
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

  useEffect(() => {
    setMounted(true);
  }, []);

  function openProject(p) {
    setProjectModal({ open: true, project: p });
  }
  function closeProject() {
    setProjectModal({ open: false, project: null });
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#02040a] to-[#070812] text-white font-sans">
      {/* navigation */}
      <header className="fixed top-0 left-0 w-full z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between bg-black/40 backdrop-blur-sm border-b border-gray-800 rounded-b-3xl">
          <div className="flex items-center gap-4">
            <a href="#" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-tr from-indigo-500 to-pink-500 flex items-center justify-center text-white font-bold shadow">
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
            <button onClick={() => setSearchOpen((s) => !s)} className="p-2 rounded-md bg-gray-800/30 hover:bg-gray-800/50 hidden md:inline-flex">
              <FiSearch className="w-4 h-4" />
            </button>
            <a href="#contact" className="hidden md:inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 transition px-4 py-2 rounded-2xl font-semibold">
              <FiMail /> Contact
            </a>
            <button onClick={() => setMenuOpen((s) => !s)} className="p-2 rounded-md bg-gray-800/30 md:hidden">
              {menuOpen ? <FiX className="w-5 h-5"/> : <FiMenu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* mobile menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="md:hidden bg-[#070812] border-t border-gray-800">
              <div className="px-6 py-4 flex flex-col gap-3">
                <a href="#work" className="py-3 border-b border-gray-800">Work</a>
                <a href="#services" className="py-3 border-b border-gray-800">Services</a>
                <a href="#case-studies" className="py-3 border-b border-gray-800">Case Studies</a>
                <a href="#about" className="py-3">About</a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main className="pt-28">
        {/* hero */}
        <section id="work" className="relative h-screen flex items-center justify-center text-center overflow-hidden">
          <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover opacity-30">
            <source src="https://cdn.pixabay.com/video/2019/08/29/26742-361072681_large.mp4" type="video/mp4" />
          </video>

          <div className="relative z-10 max-w-6xl px-6">
            <motion.h1 initial={{ opacity: 0, y: -40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} className="text-5xl md:text-7xl font-extrabold leading-tight">
              Crafting Iconic Narratives
            </motion.h1>

            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="mt-6 text-gray-300 max-w-3xl mx-auto">
              We are a creative studio that turns ideas into cinematic identities — brand films, music videos, and integrated series.
            </motion.p>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }} className="mt-8 flex items-center justify-center gap-4">
              <a href="#case-studies" className="inline-flex items-center gap-3 bg-indigo-600 hover:bg-indigo-700 px-6 py-3 rounded-2xl font-semibold">
                <FiPlay /> View Work
              </a>
              <a href="#contact" className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl border border-gray-700">Let's Talk</a>
            </motion.div>
          </div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4 }} className="absolute bottom-10 text-gray-400">
            <FiChevronDown className="w-8 h-8 animate-bounce" />
          </motion.div>
        </section>

        {/* projects */}
        <section id="projects" className="py-24 px-6">
          <div className="max-w-7xl mx-auto">
            <motion.h2 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl font-bold text-center mb-6">Featured Projects</motion.h2>
            <p className="text-center text-gray-400 max-w-2xl mx-auto mb-10">Selected works spanning brand films, music videos, and documentary shorts.</p>

            <div className="grid md:grid-cols-3 gap-8">
              {PROJECTS.map((p, i) => (
                <motion.div key={p.id} whileHover={{ y: -6 }} className="group">
                  <div onClick={() => openProject(p)} className="cursor-pointer">
                    <div className="overflow-hidden rounded-2xl mb-4">
                      <img src={p.cover} alt={p.title} className="w-full h-64 object-cover transform transition duration-700 group-hover:scale-110" />
                    </div>
                    <h3 className="text-xl font-semibold">{p.title}</h3>
                    <p className="text-gray-400 text-sm mb-3">{p.excerpt}</p>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <div>{p.role}</div>
                      <div>{p.year} • {p.duration}</div>
                    </div>
                  </div>
                  <div className="mt-3 flex items-center gap-3">
                    <button onClick={() => openProject(p)} className="px-3 py-2 rounded-full border border-gray-700 text-sm">View details</button>
                    <a href="#" className="text-indigo-300 text-sm inline-flex items-center gap-1">See case study <FiChevronRight /></a>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* services */}
        <section id="services" className="py-20 bg-[#090b12] border-t border-gray-800">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-3xl font-bold">Services</h3>
                <p className="text-gray-400">End-to-end production services and creative direction.</p>
              </div>
              <div className="hidden md:flex gap-3">
                <button className="px-4 py-2 rounded-md border border-gray-700">Download Capabilities</button>
                <button className="px-4 py-2 rounded-md border border-gray-700">Pricing Guide</button>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {SERVICES.map((s, i) => (
                <motion.div key={s.id} whileHover={{ scale: 1.02 }} className="p-6 rounded-2xl border border-gray-800 bg-[#0b0d17]/50">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-[#0b0d17] flex items-center justify-center text-indigo-400 text-2xl">{s.icon}</div>
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
        {/* UPDATED: Case Studies - Modern Cinematic Grid (replaces previous carousel section) */}
        {/* ===================================================== */}
        <section id="case-studies" className="py-24">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-3xl font-bold">Selected Case Studies</h3>
                <p className="text-gray-400">Deep dives into strategy, craft, and outcome — curated to highlight storytelling and impact.</p>
              </div>

              {/* Trusted logos - kept, but smaller and subtle */}
              <div className="hidden md:flex gap-3 items-center">
                <div className="text-sm text-gray-400">Trusted on</div>
                <img src={LOGO_G2} alt="G2" className="h-9" />
                <img src={LOGO_CAPTERRA} alt="Capterra" className="h-9" />
                <img src={LOGO_SOFTADVICE} alt="SoftwareAdvice" className="h-9" />
              </div>
            </div>

            {/* Filters + featured highlight */}
            <div className="mb-8 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-400 mr-2">Filter</span>
                {/* filter buttons powered by local state; to keep single-file, we implement small internal state */}
                <CaseStudiesFilters />
              </div>

              <div className="text-sm text-gray-400">
                Showing <span id="cs-count" className="text-white font-semibold">All</span> projects
              </div>
            </div>

            {/* Grid: large featured tile + smaller tiles */}
            <CaseStudiesGrid projects={PROJECTS} onOpen={openProject} />
          </div>
        </section>

        {/* about & team */}
        <section id="about" className="py-24 bg-[#0a0c14] border-t border-gray-800">
          <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-8 items-start">
            <div>
              <h3 className="text-3xl font-bold mb-2">Our Philosophy</h3>
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
                  <div key={t.name} className="p-4 rounded-2xl bg-[#0b0d17]/60 border border-gray-800">
                    <div className="flex gap-4 items-start">
                      <div className="w-14 h-14 rounded-lg bg-gradient-to-tr from-indigo-500 to-pink-500 flex items-center justify-center text-white font-bold">
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
        <section id="insights" className="py-24">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-3xl font-bold">Insights</h3>
              <a href="#blog" className="text-indigo-300 underline">View all posts</a>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {BLOG.map((b) => (
                <article key={b.id} className="rounded-2xl overflow-hidden border border-gray-800 bg-[#0b0d17]/30">
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
        {/* UPDATED: Voices of Collaboration (replaces previous testimonials) */}
        {/* ===================================================== */}
        <section id="reviews" className="py-24 bg-[#0b0d17] border-t border-gray-800">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
              <h3 className="text-3xl font-bold">Voices of Collaboration</h3>
              <p className="text-gray-400 mt-2">Partnerships across industries — brands, creators, and organizations we've helped tell their stories.</p>
            </motion.div>

            <motion.div className="mt-8 grid md:grid-cols-3 gap-6" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
              {TESTIMONIALS.map((t, i) => (
                <motion.div key={i} className="p-6 rounded-2xl border border-gray-800 bg-[#0b0d17]/30 hover:border-indigo-600 transition-all" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.12 }}>
                  <p className="text-gray-300 italic">“{t.quote}”</p>
                  <div className="mt-4 font-semibold">{t.author}</div>
                </motion.div>
              ))}
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} viewport={{ once: true }} className="mt-8 flex justify-center gap-6 flex-wrap">
              {/* Colorful brand placeholders — not SaaS-specific — represent diverse clients */}
              <BrandBadge name="Studio X" color1="#FF7A59" color2="#FFB86B" />
              <BrandBadge name="LuxeHouse" color1="#6B8CFF" color2="#9BD3FF" />
              <BrandBadge name="CoreVision" color1="#8AFFC1" color2="#1BC47D" />
              <BrandBadge name="Solace" color1="#E07BFF" color2="#7B61FF" />
              <BrandBadge name="PulseMedia" color1="#FFD166" color2="#FF6B6B" />
              <BrandBadge name="Arc Collective" color1="#7BE9FF" color2="#55A8FF" />
            </motion.div>
          </div>
        </section>

        {/* contact */}
        <section id="contact" className="py-24 bg-gradient-to-t from-[#070812] to-transparent border-t border-gray-800">
          <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-8 items-start">
            <div>
              <h3 className="text-3xl font-bold">Let’s Build Something Iconic</h3>
              <p className="text-gray-400 mt-3">Whether you're an artist, brand or entrepreneur — tell us the goal and we'll create the path.</p>

              <div className="mt-6 bg-[#0b0d17]/60 rounded-2xl p-6 border border-gray-800">
                <ContactForm />
              </div>

              <div className="mt-6 text-sm text-gray-400">Or email: <a href="mailto:pehchaanmedia@email.com" className="underline">pehchaanmedia@email.com</a></div>
            </div>

            <div>
              <h4 className="text-lg font-semibold">Offices</h4>
              <div className="mt-4 grid gap-4">
                <div className="p-4 bg-[#0b0d17]/50 rounded-xl border border-gray-800">
                  <div className="font-semibold">Karachi, Pakistan</div>
                  <div className="text-sm text-gray-400">Studio & creative HQ</div>
                </div>
                <div className="p-4 bg-[#0b0d17]/50 rounded-xl border border-gray-800">
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
<footer className="py-8 border-t border-gray-800 bg-[#0a0c14]">
  <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
    
    {/* left side: logo + copyright */}
    <div className="flex items-center gap-4">
      <div className="w-10 h-10 rounded-lg bg-gradient-to-tr from-indigo-500 to-pink-500 flex items-center justify-center font-bold">
        PM
      </div>
      <div className="text-sm text-gray-300">
        © {new Date().getFullYear()} Pehchaan Media
      </div>
    </div>

    {/* right side: links + social icons */}
    <div className="flex flex-col md:flex-row items-center gap-4 text-sm text-gray-400">
      <div className="flex items-center gap-4">
        <a href="#privacy" className="hover:text-white transition">Privacy</a>
        <a href="#terms" className="hover:text-white transition">Terms</a>
        <a href="#sitemap" className="hover:text-white transition">Sitemap</a>
      </div>

      {/* social icons */}
      <div className="flex items-center gap-3">
        {/* Instagram */}
        <a
          href="https://www.instagram.com/pehchaanmediahouse/"
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded-xl bg-[#11121b] hover:bg-gradient-to-tr hover:from-pink-500 hover:to-yellow-500 hover:text-white transition"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 24 24"
            className="w-5 h-5"
          >
            <path d="M7.5 2C4.46 2 2 4.46 2 7.5v9C2 19.54 4.46 22 7.5 22h9c3.04 0 5.5-2.46 5.5-5.5v-9C22 4.46 19.54 2 16.5 2h-9Zm0 2h9c1.93 0 3.5 1.57 3.5 3.5v9c0 1.93-1.57 3.5-3.5 3.5h-9A3.49 3.49 0 0 1 4 16.5v-9C4 5.57 5.57 4 7.5 4ZM12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10Zm0 2a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm4.75-.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" />
          </svg>
        </a>

        {/* YouTube */}
        <a
          href="https://youtube.com/@pehchaanmedia"
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded-xl bg-[#11121b] hover:bg-red-600 hover:text-white transition"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 24 24"
            className="w-5 h-5"
          >
            <path d="M10 15l5.19-3L10 9v6zm12-3c0-1.66-1.34-3-3-3H5c-1.66 0-3 1.34-3 3s1.34 3 3 3h14c1.66 0 3-1.34 3-3z" />
          </svg>
        </a>

        {/* TikTok */}
        <a
          href="https://tiktok.com/@pehchaanmedia"
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded-xl bg-[#11121b] hover:bg-[#25F4EE] hover:text-black transition"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 24 24"
            className="w-5 h-5"
          >
            <path d="M12 2c1.1 0 2 .9 2 2v12a2 2 0 1 1-4 0V9h-2v7a4 4 0 1 0 8 0V6h-2V2h-2Z" />
          </svg>
        </a>
      </div>
    </div>
  </div>
</footer>
        
</main>

      {/* floating CTA */}
      <div className="fixed right-6 bottom-6 z-40">
        <a href="#contact" className="inline-flex items-center gap-3 bg-indigo-600 hover:bg-indigo-700 px-5 py-3 rounded-2xl shadow-2xl">
          <FiMail className="w-4 h-4" /> Book a Call
        </a>
      </div>

      {/* search overlay (simple) */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-start justify-center pt-24">
            <div className="absolute inset-0 bg-black/60" onClick={() => setSearchOpen(false)} />
            <motion.div initial={{ y: -20 }} animate={{ y: 0 }} exit={{ y: -20 }} className="relative z-50 w-full max-w-2xl px-6">
              <div className="rounded-2xl bg-[#0b0d17] border border-gray-800 p-6">
                <div className="flex items-center gap-3">
                  <input autoFocus placeholder="Search case studies, blog, team..." className="flex-1 bg-transparent outline-none placeholder:text-gray-500 text-white p-3" />
                  <button onClick={() => setSearchOpen(false)} className="p-2 rounded-md bg-gray-800/50"><FiX /></button>
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
   - placed at bottom to keep main App code clean
   -------------------- */

function CaseStudiesFilters() {
  // local filter state inside this small helper to keep everything single-file and encapsulated
  const [active, setActive] = useState("All");
  const filters = ["All", "Film", "Branding", "Campaign"];

  // communicate selection to the displayed label (we update #cs-count manually for minimal coupling)
  useEffect(() => {
    const el = document.getElementById("cs-count");
    if (el) el.textContent = active;
  }, [active]);

  return (
    <div className="flex gap-3">
      {filters.map((f) => (
        <button
          key={f}
          onClick={() => setActive(f)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
            active === f ? "bg-indigo-600 text-white" : "bg-gray-800 text-gray-300 hover:bg-indigo-500 hover:text-white"
          }`}
        >
          {f}
        </button>
      ))}
    </div>
  );
}

function CaseStudiesGrid({ projects, onOpen }) {
  // We'll create an elegant grid with a featured tile + smaller tiles. Lightweight motion used.
  // Choose first item as featured for visual hierarchy.
  const featured = projects[0];
  const others = projects.slice(1);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className="lg:col-span-7 rounded-3xl overflow-hidden bg-gradient-to-br from-[#0f1724]/40 to-[#0b0d17]/30 border border-gray-800">
        <div className="relative h-96 lg:h-[520px]">
          <img src={featured.cover} alt={featured.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
          <div className="absolute left-8 bottom-8 text-white z-10 max-w-xl">
            <div className="text-sm text-indigo-300 mb-2">{featured.role} • {featured.year}</div>
            <h3 className="text-3xl font-bold mb-2">{featured.title}</h3>
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
          <motion.div key={p.id} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }} className="rounded-2xl overflow-hidden bg-gray-900 border border-gray-800 group">
            <div className="relative h-44">
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

function BrandBadge({ name, color1 = "#6B8CFF", color2 = "#9BD3FF" }) {
  return (
    <motion.div
      whileHover={{ scale: 1.06 }}
      className="flex items-center gap-3 px-4 py-2 rounded-lg shadow-sm"
      style={{
        background: `linear-gradient(135deg, ${color1}20 0%, ${color2}12 100%)`,
        border: "1px solid rgba(255,255,255,0.04)",
      }}
    >
      <div
        className="w-10 h-10 rounded-md flex items-center justify-center font-bold text-white"
        style={{
          background: `linear-gradient(135deg, ${color1}, ${color2})`,
          boxShadow: `0 6px 18px ${color2}33`,
        }}
      >
        {name.split(" ").map((s) => s[0]).slice(0,2).join("")}
      </div>
      <div className="text-left">
        <div className="font-semibold text-white text-sm">{name}</div>
        <div className="text-xs text-gray-300">Trusted partner</div>
      </div>
    </motion.div>
  );
}
