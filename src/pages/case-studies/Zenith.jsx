import React from "react";
import { motion } from "framer-motion";

export default function Zenith() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <section className="max-w-5xl mx-auto px-6 py-20">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl font-bold mb-6 text-blue-600"
        >
          Zenith Rebranding Strategy
        </motion.h1>

        <p className="text-gray-600 text-lg mb-8 leading-relaxed">
          Zenith, a global B2B consultancy, engaged Pehchaan Media to reposition
          its identity from a traditional firm to an innovation-first brand. We
          developed a holistic brand strategy with visuals, tone, and campaign
          guidelines.
        </p>

        <motion.img
          src="/images/case-studies/zenith-full.jpg"
          alt="Zenith Rebranding"
          className="w-full rounded-2xl shadow-lg mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        />

        <p className="text-gray-700 leading-relaxed">
          The rebrand was rolled out globally with a unified digital framework.
          Zenith’s client engagement increased by 48%, and the project won a
          regional design excellence award for visual identity.
        </p>
      </section>
    </div>
  );
}
