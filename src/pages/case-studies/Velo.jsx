import React from "react";
import { motion } from "framer-motion";

export default function Velo() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <section className="max-w-5xl mx-auto px-6 py-20">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl font-bold mb-6 text-blue-600"
        >
          Velo Product Branding
        </motion.h1>

        <p className="text-gray-600 text-lg mb-8 leading-relaxed">
          Velo is a global mobility startup redefining urban transport. Our team
          at Pehchaan Media created a brand ecosystem that merges performance,
          lifestyle, and sustainability through bold visual storytelling.
        </p>

        <motion.img
          src="/images/case-studies/velo-full.jpg"
          alt="Velo branding"
          className="w-full rounded-2xl shadow-lg mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        />

        <p className="text-gray-700 leading-relaxed">
          The visual identity featured kinetic typography, a dynamic color
          palette, and 3D product renders. The launch materials helped Velo
          raise Series A funding within 4 months of release.
        </p>
      </section>
    </div>
  );
}
