import React from "react";
import { motion } from "framer-motion";

export default function NovaSkin() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <section className="max-w-5xl mx-auto px-6 py-20">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl font-bold mb-6 text-blue-600"
        >
          NovaSkin E-Commerce Launch
        </motion.h1>

        <p className="text-gray-600 text-lg mb-8 leading-relaxed">
          NovaSkin, a premium skincare brand, partnered with Pehchaan Media to
          create a seamless digital shopping experience. Our goal was to blend
          minimal aesthetics with high-performance UX.
        </p>

        <motion.img
          src="/images/case-studies/novaskin-full.jpg"
          alt="NovaSkin website redesign"
          className="w-full rounded-2xl shadow-lg mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        />

        <p className="text-gray-700 leading-relaxed">
          We designed a Shopify storefront with modular UI components, mobile
          optimization, and fast checkout flow. Within 3 months, NovaSkin saw a
          12% boost in conversion rates and 15% repeat customer growth.
        </p>
      </section>
    </div>
  );
}
