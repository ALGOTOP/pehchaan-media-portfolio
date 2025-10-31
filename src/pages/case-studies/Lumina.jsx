import React from "react";
import { motion } from "framer-motion";

export default function Lumina() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <section className="max-w-5xl mx-auto px-6 py-20">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl font-bold mb-6 text-blue-600"
        >
          Lumina Brand Identity
        </motion.h1>

        <p className="text-gray-600 text-lg mb-8 leading-relaxed">
          Pehchaan Media was tasked with reimagining Lumina’s visual identity
          for a rapidly growing SaaS platform. We focused on clarity, trust,
          and simplicity — creating a logo system and color palette that reflect
          their innovative yet accessible nature.
        </p>

        <motion.img
          src="/images/case-studies/lumina-full.jpg"
          alt="Lumina Brand Design"
          className="w-full rounded-2xl shadow-lg mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        />

        <p className="text-gray-700 leading-relaxed">
          The rebrand rollout included refreshed digital assets, motion
          graphics, and a complete redesign of their product interface. The
          outcome? A cohesive experience that increased user retention by 37%.
        </p>
      </section>
    </div>
  );
}
