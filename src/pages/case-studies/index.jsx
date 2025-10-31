import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const caseStudies = [
  { title: "Lumina", slug: "Lumina" },
  { title: "Aurix", slug: "Aurix" },
  { title: "NovaSkin", slug: "NovaSkin" },
  { title: "AerialX", slug: "AerialX" },
  { title: "BuildSmart", slug: "BuildSmart" },
  { title: "Velo", slug: "Velo" },
  { title: "EcoRise", slug: "EcoRise" },
  { title: "HelixHealth", slug: "HelixHealth" },
  { title: "Zenith", slug: "Zenith" },
];

export default function CaseStudiesHub() {
  return (
    <div className="min-h-screen bg-black text-white px-8 py-20 font-sans">
      <h1 className="text-5xl font-bold text-center mb-16 bg-gradient-to-r from-cyan-400 to-blue-500 text-transparent bg-clip-text">
        Case Studies
      </h1>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
        {caseStudies.map((study, i) => (
          <motion.a
            key={study.slug}
            href={`/case-studies/${study.slug}`}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="group relative border border-white/10 p-8 rounded-2xl bg-gradient-to-br from-white/5 to-transparent hover:from-cyan-500/10 hover:border-cyan-400/30 transition-all"
          >
            <h2 className="text-2xl font-semibold mb-3">{study.title}</h2>
            <p className="text-gray-400 text-sm">
              Discover how we transformed brands with strategy, design, and digital innovation.
            </p>
            <ArrowUpRight
              size={22}
              className="absolute top-6 right-6 text-gray-400 group-hover:text-cyan-400 transition"
            />
          </motion.a>
        ))}
      </div>
    </div>
  );
}
