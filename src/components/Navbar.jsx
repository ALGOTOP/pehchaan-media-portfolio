import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sparkles } from "lucide-react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const location = useLocation();
  const navigate = useNavigate();

  // ───────────────────────────────
  // SCROLL DETECTION FOR NAV STYLING
  // ───────────────────────────────
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ───────────────────────────────
  // ACTIVE SECTION HIGHLIGHT
  // ───────────────────────────────
  useEffect(() => {
    if (location.pathname !== "/") return;
    const sections = document.querySelectorAll("section[id]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { threshold: 0.4 }
    );
    sections.forEach((sec) => observer.observe(sec));
    return () => sections.forEach((sec) => observer.unobserve(sec));
  }, [location.pathname]);

  // ───────────────────────────────
  // LINK HANDLER (SMART CASE STUDIES LOGIC)
  // ───────────────────────────────
  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMenuOpen(false);

    // ✅ CASE 1: Case Studies link from main site → open in new tab
    if (href === "/case-studies" && !location.pathname.startsWith("/case-studies")) {
      window.open(href, "_blank");
      return;
    }

    // ✅ CASE 2: Internal route navigation (within case studies)
    if (href.startsWith("/")) {
      navigate(href);
      return;
    }

    // ✅ CASE 3: Smooth scroll for in-page sections
    const target = document.querySelector(href);
    if (!target) return;

    if (window.lenis && typeof window.lenis.scrollTo === "function") {
      window.lenis.scrollTo(href);
    } else {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  // ───────────────────────────────
  // NAVIGATION LINKS
  // ───────────────────────────────
  const links = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Services", href: "#services" },
    { name: "Case Studies", href: "/case-studies" }, // ✅ Updated route-based link
    { name: "Showreel", href: "#showreel" },
    { name: "Work", href: "#work" },
    { name: "Testimonials", href: "#testimonials" },
    { name: "Contact", href: "#contact" },
  ];

  // ───────────────────────────────
  // JSX MARKUP
  // ───────────────────────────────
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
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        {/* LOGO */}
        <a
          href="#home"
          onClick={(e) => handleNavClick(e, "#home")}
          className="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-cyan-400 to-blue-500 text-transparent bg-clip-text hover:opacity-90 transition"
        >
          Pehchaan Media
        </a>

        {/* DESKTOP LINKS */}
        <div className="hidden md:flex space-x-10">
          {links.map((link) => (
            <button
              key={link.name}
              onClick={(e) => handleNavClick(e, link.href)}
              className={`text-sm font-medium uppercase tracking-wide transition-colors duration-300 ${
                activeSection === link.href.replace("#", "")
                  ? "text-cyan-400"
                  : "text-gray-300 hover:text-cyan-400"
              }`}
            >
              {link.name}
            </button>
          ))}
        </div>

        {/* CTA BUTTON */}
        <div className="hidden md:flex items-center space-x-4">
          <motion.a
            href="#contact"
            onClick={(e) => handleNavClick(e, "#contact")}
            whileHover={{ scale: 1.05 }}
            className="px-4 py-2 text-sm rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 text-black font-semibold shadow-md hover:shadow-cyan-400/30 transition"
          >
            Let’s Talk
          </motion.a>
        </div>

        {/* MOBILE MENU TOGGLE */}
        <button
          className="md:hidden text-gray-300 hover:text-white transition"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* MOBILE MENU */}
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
              <button
                key={link.name}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-gray-300 hover:text-cyan-400 text-lg font-medium transition-colors duration-200"
              >
                {link.name}
              </button>
            ))}

            <motion.a
              href="#contact"
              onClick={(e) => handleNavClick(e, "#contact")}
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
}
