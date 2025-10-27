import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { fadeInUp } from "@/utils/animations";
import { PenTool, Film, Globe, Megaphone, Heart, ArrowRight } from "lucide-react";

export default function Services() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  const services = [
    {
      icon: <PenTool size={32} className="text-cyan-400" />,
      title: "Brand Identity & Design",
      desc: "From logos to full brand systems, we design visuals that communicate your essence.",
    },
    {
      icon: <Film size={32} className="text-cyan-400" />,
      title: "Film & Production",
      desc: "Cinematic storytelling that builds emotional connections and elevates your message.",
    },
    {
      icon: <Globe size={32} className="text-cyan-400" />,
      title: "Web & Digital Presence",
      desc: "Responsive, elegant, and high-performance digital experiences for your brand.",
    },
    {
      icon: <Megaphone size={32} className="text-cyan-400" />,
      title: "Marketing & Strategy",
      desc: "Integrated campaigns that combine creativity with data-driven growth strategies.",
    },
    {
      icon: <Heart size={32} className="text-cyan-400" />,
      title: "Community Building",
      desc: "We help brands form emotional connections through long-term, human-first engagement.",
    },
  ];

  return (
    <section
      id="services"
      ref={ref}
      className="relative py-24 md:py-36 bg-[#0b0b0b] flex flex-col items-center"
    >
      <motion.h2
        variants={fadeInUp}
        initial="hidden"
        animate={inView ? "show" : "hidden"}
        className="text-4xl md:text-6xl font-extrabold mb-12 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500"
      >
        What We Do
      </motion.h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 max-w-7xl px-6">
        {services.map((srv, i) => (
          <motion.div
            key={i}
            variants={fadeInUp}
            initial="hidden"
            animate={inView ? "show" : "hidden"}
            transition={{ delay: i * 0.1 }}
            whileHover={{ scale: 1.05, y: -5 }}
            className="bg-[#101010] border border-white/10 hover:border-cyan-400/40 rounded-2xl p-8 text-center shadow-md"
          >
            <div className="flex justify-center mb-5">{srv.icon}</div>
            <h3 className="text-lg font-semibold mb-3">{srv.title}</h3>
            <p className="text-gray-400 text-sm leading-relaxed">{srv.desc}</p>
          </motion.div>
        ))}
      </div>

      <motion.a
        href="#work"
        whileHover={{ scale: 1.05 }}
        className="mt-14 inline-flex items-center bg-gradient-to-r from-cyan-400 to-blue-500 text-black font-semibold px-8 py-4 rounded-full shadow-xl hover:shadow-cyan-400/30 transition-all"
      >
        Explore Our Projects
        <ArrowRight size={18} className="ml-2" />
      </motion.a>
    </section>
  );
}
