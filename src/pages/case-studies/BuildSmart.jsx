import React from "react";
import { motion } from "framer-motion";

export default function BuildSmart() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <section className="max-w-5xl mx-auto px-6 py-20">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl font-bold mb-6 text-blue-600"
        >
          BuildSmart Web Redesign
        </motion.h1>

        <p className="text-gray-600 text-lg mb-8 leading-relaxed">
          BuildSmart, a construction-tech SaaS, wanted a digital interface that
          translated its technical expertise into a frictionless UX. We led a
          complete design audit and interface overhaul.
        </p>

        <motion.img
          src="/images/case-studies/buildsmart-full.jpg"
          alt="BuildSmart UI UX"
          className="w-full rounded-2xl shadow-lg mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        />

        <p className="text-gray-700 leading-relaxed">
          Our redesign introduced a modular design system, improved navigation,
          and refined brand tone. Result: +58 % increase in demo sign-ups and a
          measurable uplift in brand trust perception.
        </p>
      </section>
    </div>
  );
}
