import React from "react";
import { motion } from "framer-motion";
import { Play, Instagram } from "lucide-react";
import { Card, CardContent } from "./components/ui/card";
import { Button } from "./components/ui/button";

export default function App() {
  return (
    <div className="bg-[#0B0D17] text-white min-h-screen font-inter">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center h-screen px-6">
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-7xl font-bold mb-4"
        >
          Pehchaan Media
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-gray-400 max-w-xl mb-8"
        >
          A digital media house crafting compelling stories through visuals,
          sound, and strategy. Elevate your brand’s identity with us.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <a
            href="https://instagram.com/pehchaanmedia"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button className="flex items-center gap-2">
              <Play className="w-4 h-4" /> Explore Our Work
            </Button>
          </a>
        </motion.div>
      </section>

      {/* Portfolio Section */}
      <section className="px-8 py-20 bg-[#101223]">
        <h2 className="text-3xl font-semibold text-center mb-12">
          Featured Projects
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: "Cinematic Ad Campaign",
              desc: "High-impact storytelling through visual precision.",
            },
            {
              title: "Music Video Production",
              desc: "Where rhythm meets narrative in perfect sync.",
            },
            {
              title: "Brand Storytelling Series",
              desc: "Crafting unique digital experiences for visionary brands.",
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
            >
              <Card>
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <CardContent>{item.desc}</CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 text-center bg-[#0B0D17]">
        <motion.h3
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-3xl font-semibold mb-6"
        >
          Let’s Build Something Iconic.
        </motion.h3>

        <a
          href="https://instagram.com/pehchaanmedia"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button className="flex items-center gap-2 bg-pink-600 hover:bg-pink-700">
            <Instagram className="w-5 h-5" /> Follow Us on Instagram
          </Button>
        </a>
      </section>

      {/* Footer */}
      <footer className="py-6 text-center text-gray-500 text-sm border-t border-gray-800">
        © {new Date().getFullYear()} Pehchaan Media. All rights reserved.
      </footer>
    </div>
  );
}
