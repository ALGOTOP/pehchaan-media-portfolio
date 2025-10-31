// src/pages/CaseStudies.jsx
import React from "react";
import { motion } from "framer-motion";
import { caseStudies } from "../data/caseStudiesData";

export default function CaseStudies() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* ─── Hero Section ───────────────────────────── */}
      <section className="text-center py-24 bg-gradient-to-b from-blue-50 to-white">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl font-bold mb-4 tracking-tight"
        >
          Case Studies
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-lg text-gray-600 max-w-2xl mx-auto"
        >
          A closer look at how Pehchaan Media crafts digital experiences that
          move people and brands forward.
        </motion.p>
      </section>

      {/* ─── Case Studies Grid ───────────────────────────── */}
      <section className="max-w-6xl mx-auto px-6 pb-24">
        <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10">
          {caseStudies.map((study, index) => (
            <motion.div
              key={study.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.03 }}
              className="bg-white rounded-3xl shadow-lg overflow-hidden cursor-pointer group hover:shadow-2xl transition-all duration-300"
              onClick={() =>
                window.open(`/case-studies/${study.slug}`, "_blank")
              }
            >
              <div className="relative w-full h-56 overflow-hidden">
                <img
                  src={study.image}
                  alt={study.title}
                  className="object-cover w-full h-full transform group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-60 group-hover:opacity-70 transition-opacity" />
              </div>

              <div className="p-6">
                <h3 className="text-2xl font-semibold mb-2">{study.title}</h3>
                <p className="text-gray-600 text-sm mb-3">
                  {study.description}
                </p>
                <span className="text-blue-600 font-medium text-sm">
                  {study.category}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
