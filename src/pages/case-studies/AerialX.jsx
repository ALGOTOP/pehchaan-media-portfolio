import React from "react";
import { motion } from "framer-motion";

export default function AerialX() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <section className="max-w-5xl mx-auto px-6 py-20">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl font-bold mb-6 text-blue-600"
        >
          AerialX Cinematic Campaign
        </motion.h1>

        <p className="text-gray-600 text-lg mb-8 leading-relaxed">
          Pehchaan Media collaborated with AerialX to produce a cinematic
          storytelling campaign capturing the emotion of innovation in
          next-gen drone technology. We blended product demonstration with
          narrative cinematography.
        </p>

        <motion.img
          src="/images/case-studies/aerialx-full.jpg"
          alt="AerialX Campaign"
          className="w-full rounded-2xl shadow-lg mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        />

        <p className="text-gray-700 leading-relaxed">
          The campaign spanned social reels, a hero film, and digital banners.
          It generated over 2.3 million views within the first week and
          positioned AerialX as a premium drone brand with emotional impact.
        </p>
      </section>
    </div>
  );
}
