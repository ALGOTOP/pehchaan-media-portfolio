import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { fadeInUp } from "@/utils/animations";
import { ArrowRight } from "lucide-react";

export default function Work() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  // Project Data
  const projects = [
    {
      title: "AMWAJ",
      category: "Web Redesign & Development",
      image: "https://i.ibb.co/d4p5RzTB/awsim.jpg",
    },
    {
      title: "Tech Launch",
      category: "Product Launch Planning & Marketing",
      image: "https://i.ibb.co/YBDkQ69X/tech-launch.jpg",
    },
    {
      title: "Streams",
      category: "Digital Infrastructure & Product Photography",
      image: "https://i.ibb.co/zTvZF0G3/streams.png",
    },
    {
      title: "Rise Coffee",
      category: "Creative Strategy",
      image: "https://i.ibb.co/dw32jwLQ/rise-coffee.jpg",
    },
    {
      title: "Matrix",
      category: "Brand Identity",
      image: "https://i.ibb.co/0j97mTS5/matrix.jpg",
    },
    {
      title: "LUMINA",
      category: "Creative Direction & Complete Marketing",
      image: "https://i.ibb.co/RkwzFn42/lumina.jpg",
    },
  ];

  return (
    <section
      id="work"
      ref={ref}
      className="relative py-24 md:py-36 bg-[#0a0a0a] flex flex-col items-center overflow-hidden"
    >
      {/* Section Title */}
      <motion.h2
        variants={fadeInUp}
        initial="hidden"
        animate={inView ? "show" : "hidden"}
        className="text-4xl md:text-6xl font-extrabold mb-12 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500"
      >
        Our Work
      </motion.h2>

      {/* Project Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl px-6">
        {projects.map((project, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{
              delay: i * 0.1,
              duration: 0.6,
              ease: [0.25, 0.1, 0.25, 1],
            }}
            whileHover={{ scale: 1.03 }}
            className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[#101010] hover:border-cyan-400/30 transition-all shadow-md hover:shadow-cyan-500/10"
          >
            {/* Image container */}
            <div className="overflow-hidden bg-black flex items-center justify-center">
              <motion.img
                src={project.image}
                alt={project.title}
                className="object-contain w-full h-64 md:h-72 lg:h-80 group-hover:scale-105 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
                whileHover={{ rotate: 0.5, scale: 1.05 }}
                transition={{ duration: 0.6 }}
              />
            </div>

            {/* Overlay info (fade + slide up) */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6"
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
            >
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                whileHover={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                <h3 className="text-white text-xl font-semibold mb-1">
                  {project.title}
                </h3>
                <p className="text-cyan-400 text-sm font-medium">
                  {project.category}
                </p>
              </motion.div>
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* Call to Action */}
      <motion.a
        href="#contact"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.97 }}
        transition={{ type: "spring", stiffness: 250 }}
        className="mt-16 inline-flex items-center bg-gradient-to-r from-cyan-400 to-blue-500 text-black font-semibold px-8 py-4 rounded-full shadow-xl hover:shadow-cyan-400/30 transition-all"
      >
        Start Your Project
        <ArrowRight size={18} className="ml-2" />
      </motion.a>
    </section>
  );
}
