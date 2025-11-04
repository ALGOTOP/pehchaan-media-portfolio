import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sparkles } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const location = useLocation();
  const navigate = useNavigate();

  // Navbar scroll effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Observe sections for active link (only on main page)
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

  // Smooth scroll or route navigation
  const handleNavClick = (e, href, newTab = false) => {
    e.preventDefault();
    setMenuOpen(false);

    // Case Studies Hub → open in new tab
    if (newTab) {
      window.open(href, "_blank");
      return;
    }

    // Route-based navigation
    if (href.startsWith("/")) {
      navigate(href);
      return;
    }

    // Section scroll
    const target = document.querySelector(href);
    if (!target) return;

    if (window.lenis && typeof window.lenis.scrollTo === "function") {
      window.lenis.scrollTo(href);
    } else {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  const links = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Services", href: "#services" },
    { name: "Work", href: "#work" },
    { name: "Case Studies", href: "/case-studies", newTab: true }, // ✅ opens in new tab
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
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        <a
          href="#home"
          onClick={(e) => handleNavClick(e, "#home")}
          className="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-cyan-400 to-blue-500 text-transparent bg-clip-text hover:opacity-90 transition"
        >
          Pehchaan Media
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-10">
          {links.map((link) => {
            const isActive =
              (link.href.startsWith("#") &&
                activeSection === link.href.replace("#", "")) ||
              (link.href.startsWith("/") &&
                location.pathname.startsWith(link.href));

            return (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) =>
                  handleNavClick(e, link.href, link.newTab || false)
                }
                target={link.newTab ? "_blank" : "_self"}
                rel={link.newTab ? "noopener noreferrer" : undefined}
                className={`text-sm font-medium uppercase tracking-wide transition-colors duration-300 ${
                  isActive
                    ? "text-cyan-400"
                    : "text-gray-300 hover:text-cyan-400"
                }`}
              >
                {link.name}
              </a>
            );
          })}
        </div>

        {/* Desktop CTA */}
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

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-300 hover:text-white transition"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Menu */}
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
                target={link.newTab ? "_blank" : "_self"}
                rel={link.newTab ? "noopener noreferrer" : undefined}
                onClick={(e) => handleNavClick(e, link.href, link.newTab)}
                className="text-gray-300 hover:text-cyan-400 text-lg font-medium transition-colors duration-200"
              >
                {link.name}
              </a>
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
