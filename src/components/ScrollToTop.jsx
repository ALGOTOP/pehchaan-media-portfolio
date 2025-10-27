import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronUp } from "lucide-react";

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisible = () => setVisible(window.scrollY > 500);
    window.addEventListener("scroll", toggleVisible);
    return () => window.removeEventListener("scroll", toggleVisible);
  }, []);

  return (
    <motion.button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      initial={{ opacity: 0, y: 100 }}
      animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 }}
      transition={{ duration: 0.4 }}
      className="fixed bottom-8 left-8 bg-[#0e0e0e] border border-white/10 text-cyan-400 rounded-full p-3 hover:bg-cyan-400 hover:text-black transition-all z-50"
    >
      <ChevronUp size={20} />
    </motion.button>
  );
}
