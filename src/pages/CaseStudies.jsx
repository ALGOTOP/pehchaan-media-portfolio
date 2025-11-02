// ────────────────────────────────────────────────
// CaseStudies.jsx — Refined On-Theme Case Studies Section
// ────────────────────────────────────────────────

import React from "react";
import { motion } from "framer-motion";

// Case Studies Data (You can add more projects here)
const CASE_STUDIES = [
  {
    title: "Brand Transformation — Lumen Skincare",
    description:
      "Revamped the digital identity and motion design for Lumen, aligning the brand’s clean ethos with a vibrant, high-conversion landing experience.",
    image:
      "https://images.unsplash.com/photo-1607083206173-8d4c8d7a216d?auto=format&fit=crop&w=1400&q=80",
    tags: ["Branding", "Web Design", "Motion"],
  },
  {
    title: "Campaign Film — Vision Motors",
    description:
      "Directed a high-energy product film highlighting innovation, speed, and sustainability for Vision Motors’ EV launch.",
    image:
      "https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=1400&q=80",
    tags: ["Film", "Direction", "Post Production"],
  },
  {
    title: "Interactive Showcase — Flow Interior Studio",
    description:
      "Built a minimalist interactive portfolio for Flow Studio — balancing elegance, whitespace, and subtle parallax interactions.",
    image:
      "https://images.unsplash.com/photo-1581090700227-1e37b190418e?auto=format&fit=crop&w=1400&q=80",
    tags: ["UI/UX", "Development", "Creative Direction"],
  },
];

export default function CaseStudies() {
  return (
    <section
      id="case-studies"
      className="relative py-32 px-6 md:px-20 bg-gradient-to-b from-[#001233] via-[#020617] to-[#000] text-white overflow-hidden"
    >
      {/* Section Heading */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="text-center mb-20"
      >
        <h2 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-4">
          Case Studies
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          A glimpse into how we help brands craft powerful stories through design, motion, and strategy.
        </p>
      </motion.div>

      {/* Case Studies Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
        {CASE_STUDIES.map((project, i) => (
          <motion.div
            key={project.title}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: i * 0.15 }}
            className="group relative rounded-2xl overflow-hidden bg-white/5 border border-white/10 backdrop-blur-lg hover:bg-white/10 transition-all duration-500"
          >
            <div className="relative overflow-hidden">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-64 object-cover transform group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent opacity-80"></div>
            </div>

            <div className="p-6 flex flex-col justify-between h-[250px]">
              <div>
                <h3 className="text-2xl font-semibold mb-2 text-cyan-400">
                  {project.title}
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed mb-4">
                  {project.description}
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs bg-white/10 border border-white/20 px-3 py-1 rounded-full text-gray-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
