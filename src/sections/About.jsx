import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { fadeInUp } from "@/utils/animations";
import { Camera, Palette, Users } from "lucide-react";

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const cards = [
    {
      icon: <Camera className="text-cyan-400" size={36} />,
      title: "Visual Storytelling",
      desc: "We capture emotion through design and film to make every brand story unforgettable.",
    },
    {
      icon: <Palette className="text-cyan-400" size={36} />,
      title: "Creative Strategy",
      desc: "We craft narratives that align creativity with business goals for meaningful impact.",
    },
    {
      icon: <Users className="text-cyan-400" size={36} />,
      title: "Collaborative Approach",
      desc: "Our team works as an extension of yours — open, transparent, and relentlessly passionate.",
    },
  ];

  return (
    <section
      id="about"
      ref={ref}
      className="relative py-24 md:py-36 bg-[#080808] flex flex-col items-center justify-center overflow-hidden"
    >
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        animate={isInView ? "show" : "hidden"}
        className="max-w-5xl text-center px-6"
      >
        <h2 className="text-4xl md:text-6xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
          Who We Are
        </h2>

        <p className="text-gray-400 text-lg leading-relaxed mb-10 max-w-3xl mx-auto">
          We are thinkers, storytellers, and dreamers. At Pehchaan Media, we
          blend strategy with creativity to build experiences that transform
          businesses into beloved brands.
        </p>
      </motion.div>

      <motion.div
        variants={fadeInUp}
        initial="hidden"
        animate={isInView ? "show" : "hidden"}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10 max-w-6xl px-6"
      >
        {cards.map((card, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.05, rotate: 0.5 }}
            className="bg-[#0f0f0f] rounded-2xl p-8 border border-white/10 hover:border-cyan-400/40 transition-all shadow-md backdrop-blur-sm"
          >
            <div className="mb-6">{card.icon}</div>
            <h3 className="text-xl font-semibold mb-3 text-white tracking-wide">
              {card.title}
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">{card.desc}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
