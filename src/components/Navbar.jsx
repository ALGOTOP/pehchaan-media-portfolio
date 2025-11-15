import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sparkles, ChevronDown } from "lucide-react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [submenuOpen, setSubmenuOpen] = useState(null);
  const [hoverTimeout, setHoverTimeout] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const location = useLocation();
  const navigate = useNavigate();

  // ───────────────────────────────
  // SCROLL DETECTION
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
  // HANDLE LINKS
  // ───────────────────────────────
  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMenuOpen(false);

    // Open external or full pages
    if (href.startsWith("http")) return window.open(href, "_blank");
    if (href.startsWith("/case-studies")) return window.open(href, "_blank");

    // Navigate to homepage section if not already there
    if (href.startsWith("#") && location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        const target = document.querySelector(href);
        if (target)
          target.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 800);
      return;
    }

    // Normal in-page scroll
    const target = document.querySelector(href);
    if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // ───────────────────────────────
  // NAVIGATION LINKS
  // ───────────────────────────────
  const links = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Services", href: "#services" },
    {
      name: "Case Studies",
      submenu: [
        { label: "View Some", href: "#case-studies-preview" }, // ✅ scrolls correctly now
        { label: "View All", href: "/case-studies" },
      ],
    },
    { name: "Showreel", href: "#showreel" },
    {
      name: "Work",
      submenu: [
        { label: "View Some", href: "#work" },
        { label: "View All", href: "extended-work" },
      ],
    },
    { name: "Testimonials", href: "#testimonials" },
    { name: "Contact", href: "#contact" },
  ];

  // ───────────────────────────────
  // COMPONENT
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

        {/* DESKTOP NAVIGATION */}
        <div className="hidden md:flex space-x-10">
          {links.map((link) =>
            link.submenu ? (
              <div
                key={link.name}
                className="relative group"
                onMouseEnter={() => {
                  if (hoverTimeout) clearTimeout(hoverTimeout);
                  setSubmenuOpen(link.name);
                }}
                onMouseLeave={() => {
                  const timeout = setTimeout(() => {
                    setSubmenuOpen((prev) =>
                      prev === link.name ? null : prev
                    );
                  }, 1200); // 👈 hover delay
                  setHoverTimeout(timeout);
                }}
              >
                <button
                  className={`flex items-center text-sm font-medium uppercase tracking-wide transition-colors duration-300 ${
                    activeSection === link.href?.replace("#", "")
                      ? "text-cyan-400"
                      : "text-gray-300 hover:text-cyan-400"
                  }`}
                >
                  {link.name}
                  <ChevronDown
                    size={14}
                    className={`ml-1 mt-[2px] transition-transform duration-300 ${
                      submenuOpen === link.name
                        ? "rotate-180 text-cyan-400"
                        : "text-gray-400"
                    }`}
                  />
                </button>

                {/* APPLE-STYLE DROPDOWN */}
                <AnimatePresence>
                  {submenuOpen === link.name && (
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{
                        duration: 0.25,
                        ease: [0.25, 0.1, 0.25, 1], // cubic ease for soft motion
                      }}
                      className="absolute left-0 mt-2 w-40 rounded-md bg-black/90 border border-white/10 shadow-lg backdrop-blur-md py-2 z-40"
                    >
                      {link.submenu.map((item) => (
                        <button
                          key={item.label}
                          onClick={(e) => handleNavClick(e, item.href)}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:text-cyan-400 hover:bg-white/5 transition-colors duration-200"
                        >
                          {item.label}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
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
            )
          )}
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

        {/* MOBILE MENU BUTTON */}
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
            {links.map((link) =>
              link.submenu ? (
                <div key={link.name} className="w-full text-center">
                  <button
                    onClick={() =>
                      setSubmenuOpen(
                        submenuOpen === link.name ? null : link.name
                      )
                    }
                    className="text-gray-300 hover:text-cyan-400 text-lg font-medium transition flex justify-center items-center w-full"
                  >
                    {link.name}
                    <ChevronDown
                      size={16}
                      className={`ml-2 transition-transform duration-300 ${
                        submenuOpen === link.name
                          ? "rotate-180 text-cyan-400"
                          : ""
                      }`}
                    />
                  </button>
                  <AnimatePresence>
                    {submenuOpen === link.name && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="flex flex-col mt-2 space-y-2"
                      >
                        {link.submenu.map((item) => (
                          <button
                            key={item.label}
                            onClick={(e) => handleNavClick(e, item.href)}
                            className="text-gray-400 hover:text-cyan-400 text-sm transition"
                          >
                            {item.label}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <button
                  key={link.name}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="text-gray-300 hover:text-cyan-400 text-lg font-medium transition-colors duration-200"
                >
                  {link.name}
                </button>
              )
            )}

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
