import React from "react";
import { motion } from "framer-motion";

export default function EcoRise() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <section className="max-w-5xl mx-auto px-6 py-20">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl font-bold mb-6 text-blue-600"
        >
          EcoRise Green Innovation Campaign
        </motion.h1>

        <p className="text-gray-600 text-lg mb-8 leading-relaxed">
          EcoRise partnered with Pehchaan Media to develop a global awareness
          campaign centered on clean energy and design-led sustainability. The
          challenge was to make the message emotionally relatable without losing
          scientific accuracy.
        </p>

        <motion.img
          src="/images/case-studies/ecorise-full.jpg"
          alt="EcoRise Campaign"
          className="w-full rounded-2xl shadow-lg mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        />

        <p className="text-gray-700 leading-relaxed">
          Through cinematic storytelling and minimalist data visualization, the
          campaign achieved a 60% engagement increase and became a model for
          purpose-driven branding across EcoRise’s digital channels.
        </p>
      </section>
    </div>
  );
}
