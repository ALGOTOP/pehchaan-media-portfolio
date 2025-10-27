import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { fadeInUp } from "@/utils/animations";
import { ArrowRight } from "lucide-react";

export default function Work() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  const projects = [
    {
      title: "Luminous Skincare Campaign",
      category: "Film Production",
      image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=1000&q=80",
    },
    {
      title: "Drift E-Sports Branding",
      category: "Brand Identity",
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80",
    },
    {
      title: "OceanX Web Experience",
      category: "Web Design",
      image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=80",
    },
    {
      title: "Aurum Fashion Film",
      category: "Cinematography",
      image: "https://images.unsplash.com/photo-1542744173-05336fcc7ad4?auto=format&fit=crop&w=1000&q=80",
    },
    {
      title: "Rise Coffee Rebrand",
      category: "Creative Strategy",
      image: "https://images.unsplash.com/photo-1510626176961-4b57d4fbad03?auto=format&fit=crop&w=1000&q=80",
    },
    {
      title: "Urban Tech Product Launch",
      category: "Marketing Campaign",
      image: "https://images.unsplash.com/photo-1581093588401-22c1f0af9ab9?auto=format&fit=crop&w=1000&q=80",
    },
  ];

  return (
    <section
      id="work"
      ref={ref}
      className="relative py-24 md:py-36 bg-[#0a0a0a] flex flex-col items-center overflow-hidden"
    >
      <motion.h2
        variants={fadeInUp}
        initial="hidden"
        animate={inView ? "show" : "hidden"}
        className="text-4xl md:text-6xl font-extrabold mb-12 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500"
      >
        Our Work
      </motion.h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl px-6">
        {projects.map((project, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: i * 0.1, duration: 0.6 }}
            whileHover={{ scale: 1.02 }}
            className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[#101010] hover:border-cyan-400/30 transition-all shadow-md"
          >
            <div className="overflow-hidden">
              <motion.img
                src={project.image}
                alt={project.title}
                className="object-cover w-full h-64 group-hover:scale-110 transition-transform duration-700"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6">
              <h3 className="text-white text-xl font-semibold mb-2">
                {project.title}
              </h3>
              <p className="text-cyan-400 text-sm font-medium">
                {project.category}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.a
        href="#contact"
        whileHover={{ scale: 1.05 }}
        className="mt-16 inline-flex items-center bg-gradient-to-r from-cyan-400 to-blue-500 text-black font-semibold px-8 py-4 rounded-full shadow-xl hover:shadow-cyan-400/30 transition-all"
      >
        Start Your Project
        <ArrowRight size={18} className="ml-2" />
      </motion.a>
    </section>
  );
}
