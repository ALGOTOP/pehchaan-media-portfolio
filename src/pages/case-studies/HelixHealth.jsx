import React from "react";
import { motion } from "framer-motion";

export default function HelixHealth() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <section className="max-w-5xl mx-auto px-6 py-20">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl font-bold mb-6 text-blue-600"
        >
          HelixHealth App Experience
        </motion.h1>

        <p className="text-gray-600 text-lg mb-8 leading-relaxed">
          HelixHealth approached Pehchaan Media to reimagine the digital
          experience for its telehealth application. Our team focused on clarity
          in interaction design and emotional storytelling in visuals.
        </p>

        <motion.img
          src="/images/case-studies/helixhealth-full.jpg"
          alt="HelixHealth App"
          className="w-full rounded-2xl shadow-lg mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        />

        <p className="text-gray-700 leading-relaxed">
          The final product offered a seamless, human-first user journey. With
          refreshed color language and iconography, HelixHealth saw a 2.5×
          increase in daily active users within 3 months post-launch.
        </p>
      </section>
    </div>
  );
}
