// src/pages/case-studies/index.jsx
import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { caseStudies } from "@/CaseStudiesData"; // adjust alias/path if needed

export default function CaseStudiesHub() {
  return (
    <div className="min-h-screen bg-black text-white px-8 py-20 font-sans">
      <h1 className="text-5xl font-bold text-center mb-12 bg-gradient-to-r from-cyan-400 to-blue-500 text-transparent bg-clip-text">
        Case Studies
      </h1>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
        {caseStudies.map((study) => (
          <motion.div
            key={study.slug}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            whileHover={{ scale: 1.02 }}
            className="rounded-xl overflow-hidden bg-zinc-900 shadow-lg"
          >
            <Link to={`/case-studies/${study.slug}`} className="block group">
              <div
                className="h-48 bg-cover bg-center"
                style={{ backgroundImage: `url(${study.image})` }}
                aria-hidden="true"
              />
              <div className="p-6">
                <h3 className="text-2xl font-semibold mb-2">{study.title}</h3>
                <p className="text-sm text-zinc-400 mb-4">{study.description}</p>
                <div className="text-xs uppercase tracking-wider text-zinc-300">
                  {study.category}
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
