import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export default function FloatingCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisible = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", toggleVisible);
    return () => window.removeEventListener("scroll", toggleVisible);
  }, []);

  return (
    <motion.a
      href="#contact"
      initial={{ opacity: 0, y: 100 }}
      animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 }}
      transition={{ duration: 0.5 }}
      className="fixed bottom-8 right-8 bg-gradient-to-r from-cyan-400 to-blue-500 text-black font-semibold px-5 py-4 rounded-full shadow-xl hover:shadow-cyan-400/30 transition-all z-50 flex items-center space-x-2"
    >
      <Sparkles size={18} />
      <span>Let’s Collaborate</span>
    </motion.a>
  );
}
