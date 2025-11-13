import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const dropdownRef = useRef(null);

  // ─── Animation Variants ───────────────────────────────
  const dropdownAnim = {
    hidden: { opacity: 0, y: -6 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.25, ease: "easeOut" } },
    exit: { opacity: 0, y: -6, transition: { duration: 0.2, ease: "easeIn" } },
  };

  // ─── Click Outside to Close (Desktop) ─────────────────
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="fixed w-full z-50 bg-black/80 backdrop-blur-md text-white border-b border-white/10">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        <Link to="/" className="text-2xl font-bold tracking-wide">
          Agency
        </Link>

        {/* ─── Desktop Menu ─────────────────────────────── */}
        <div
          ref={dropdownRef}
          className="hidden md:flex items-center space-x-8 text-sm font-medium relative"
        >
          <Link to="/" className="hover:text-cyan-400 transition-colors">
            Home
          </Link>

          {/* Case Studies Dropdown */}
          <div
            className="relative group"
            onMouseEnter={() => setOpenDropdown("case")}
            onMouseLeave={() => setOpenDropdown(null)}
          >
            <button className="hover:text-cyan-400 transition-colors">
              Case Studies
            </button>
            <AnimatePresence>
              {openDropdown === "case" && (
                <motion.div
                  variants={dropdownAnim}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="absolute top-full left-0 mt-2 w-40 bg-black/90 border border-white/10 rounded-lg shadow-lg overflow-hidden"
                >
                  <a
                    href="#case-studies"
                    className="block px-4 py-2 text-gray-300 hover:bg-white/10"
                  >
                    View Some
                  </a>
                  <a
                    href="/case-studies"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block px-4 py-2 text-gray-300 hover:bg-white/10"
                  >
                    View All
                  </a>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Work Dropdown */}
          <div
            className="relative group"
            onMouseEnter={() => setOpenDropdown("work")}
            onMouseLeave={() => setOpenDropdown(null)}
          >
            <button className="hover:text-cyan-400 transition-colors">
              Work
            </button>
            <AnimatePresence>
              {openDropdown === "work" && (
                <motion.div
                  variants={dropdownAnim}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="absolute top-full left-0 mt-2 w-40 bg-black/90 border border-white/10 rounded-lg shadow-lg overflow-hidden"
                >
                  <a
                    href="#work"
                    className="block px-4 py-2 text-gray-300 hover:bg-white/10"
                  >
                    View Some
                  </a>
                  <a
                    href="#"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block px-4 py-2 text-gray-300 hover:bg-white/10"
                  >
                    View All
                  </a>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Link to="/contact" className="hover:text-cyan-400 transition-colors">
            Let’s Work
          </Link>
        </div>

        {/* ─── Mobile Menu Toggle ───────────────────────── */}
        <button
          className="md:hidden text-white"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* ─── Mobile Menu ───────────────────────────────── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden bg-black/95 border-t border-white/10"
          >
            <div className="flex flex-col px-6 py-4 space-y-4">
              <Link
                to="/"
                className="hover:text-cyan-400 transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                Home
              </Link>

              {/* Case Studies (Mobile Submenu) */}
              <div>
                <button
                  onClick={() =>
                    setOpenDropdown(openDropdown === "case" ? null : "case")
                  }
                  className="w-full text-left hover:text-cyan-400 transition-colors"
                >
                  Case Studies
                </button>
                <AnimatePresence>
                  {openDropdown === "case" && (
                    <motion.div
                      variants={dropdownAnim}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="ml-4 mt-2 flex flex-col space-y-2"
                    >
                      <a
                        href="#case-studies"
                        className="text-gray-300 hover:text-white text-sm"
                        onClick={() => setMobileOpen(false)}
                      >
                        View Some
                      </a>
                      <a
                        href="/case-studies"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-300 hover:text-white text-sm"
                      >
                        View All
                      </a>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Work (Mobile Submenu) */}
              <div>
                <button
                  onClick={() =>
                    setOpenDropdown(openDropdown === "work" ? null : "work")
                  }
                  className="w-full text-left hover:text-cyan-400 transition-colors"
                >
                  Work
                </button>
                <AnimatePresence>
                  {openDropdown === "work" && (
                    <motion.div
                      variants={dropdownAnim}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="ml-4 mt-2 flex flex-col space-y-2"
                    >
                      <a
                        href="#work"
                        className="text-gray-300 hover:text-white text-sm"
                        onClick={() => setMobileOpen(false)}
                      >
                        View Some
                      </a>
                      <a
                        href="#"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-300 hover:text-white text-sm"
                      >
                        View All
                      </a>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <Link
                to="/contact"
                className="hover:text-cyan-400 transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                Let’s Work
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
