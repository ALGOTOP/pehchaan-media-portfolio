import React from "react";
import { motion } from "framer-motion";

export default function Aurix() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <section className="max-w-5xl mx-auto px-6 py-20">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl font-bold mb-6 text-blue-600"
        >
          Social Media Strategy for Aurix
        </motion.h1>

        <p className="text-gray-600 text-lg mb-8 leading-relaxed">
          Aurix approached Pehchaan Media to strengthen their digital presence
          through engaging social media storytelling. We devised a strategy
          that emphasized community building and modern visual trends.
        </p>

        <motion.img
          src="/images/case-studies/aurix-full.jpg"
          alt="Aurix social campaign"
          className="w-full rounded-2xl shadow-lg mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        />

        <p className="text-gray-700 leading-relaxed">
          The campaign leveraged video-first content, UGC collaborations, and
          data-driven ad placement. Within six months, engagement improved by
          230%, and organic followers grew by 120%.
        </p>
      </section>
    </div>
  );
}
