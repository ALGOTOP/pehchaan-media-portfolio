// src/pages/ExtendedWork.jsx
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

import CategoryHeader from "../components/work/CategoryHeader";
import WorkGrid from "../components/work/WorkGrid";
import CaseStudyModal from "../components/work/CaseStudyModal";
import { fadeInUp } from "../utils/motionVariants";
import "../styles/work-detailed.css";

// 🔹 data for the grid
import { WORK_ITEMS, getWorkByCategory } from "../data/workData";

export default function ExtendedWork() {
  const [activeCategory, setActiveCategory] = useState(null);
  const [openItem, setOpenItem] = useState(null);
  const [mounted, setMounted] = useState(false);

  // nice entrance animation
  useEffect(() => {
    setMounted(true);
  }, []);

  // open modal + push history state so Back closes modal
  function handleOpen(item) {
    setOpenItem(item);
    try {
      window.history.pushState({ pehchaan_modal: true }, "");
    } catch (e) {
      // ignore push errors
    }
  }

  // when user hits Back, close modal if open
  useEffect(() => {
    function onPop() {
      if (openItem) {
        setOpenItem(null);
      }
    }
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, [openItem]);

  function handleClose() {
    setOpenItem(null);
    try {
      const state = window.history.state;
      if (state && state.pehchaan_modal) {
        window.history.back();
      }
    } catch (e) {
      // ignore
    }
  }

  function handleSelectCategory(cat) {
    setActiveCategory((current) => (current === cat ? null : cat));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // 🔹 derive items for the grid
  const itemsForGrid =
    activeCategory && activeCategory !== "All"
      ? getWorkByCategory(activeCategory)
      : WORK_ITEMS;

  return (
    <main className="min-h-screen bg-gradient-to-b from-black via-[#060607] to-[#0b0b0c] text-white work-grain">
      {/* floating back arrow (floating left) */}
      <div className="back-float hidden md:block">
        <a
          href="/"
          className="text-gray-300 hover:text-white flex items-center gap-2"
          aria-label="Back to Home"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            className="inline-block"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15 18L9 12L15 6"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Home
        </a>
      </div>

      <AnimatePresence mode="wait">
        {mounted && (
          <motion.div
            key="work-page"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={{
              hidden: { opacity: 0, y: 10 },
              visible: {
                opacity: 1,
                y: 0,
                transition: {
                  duration: 0.55,
                  ease: [0.2, 0.9, 0.2, 1],
                },
              },
            }}
          >
            <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-12">
              <header className="pt-8 pb-4">
                <nav className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    {/* small clickable back for mobile */}
                    <a
                      href="/"
                      className="md:hidden text-gray-300 hover:text-white inline-flex items-center gap-2"
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        className="inline-block"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M15 18L9 12L15 6"
                          stroke="currentColor"
                          strokeWidth="1.4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      Home
                    </a>

                    <div>
                      <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight">
                        Work That Sets the Standard.
                      </h1>
                      <p className="mt-2 text-gray-300 max-w-2xl">
                        Curated projects across design, motion and product.
                        Click a category to reveal premium case highlights.
                      </p>
                    </div>
                  </div>

                  <div className="hidden md:flex items-center gap-4">
                    <a
                      className="text-sm text-gray-300/80 hover:text-white"
                      href="#contact"
                    >
                      Start a Project
                    </a>
                  </div>
                </nav>
              </header>

              {/* category header */}
              <motion.section
                className="mt-6"
                variants={fadeInUp}
                initial="hidden"
                animate="visible"
              >
                <CategoryHeader onSelect={handleSelectCategory} />
              </motion.section>

              {/* grid */}
              <motion.section
                className="mt-4"
                initial="hidden"
                animate="visible"
                variants={fadeInUp}
              >
                <WorkGrid items={itemsForGrid} onOpen={handleOpen} />
              </motion.section>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* modal overlay */}
      <CaseStudyModal open={!!openItem} item={openItem} onClose={handleClose} />
    </main>
  );
}
