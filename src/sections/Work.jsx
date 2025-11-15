// src/sections/Work.jsx
import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function Work() {
  const ref = useRef(null);
  const inView = useInView(ref, {
    once: true,
    amount: 0.3,
  });

  const projects = [
    {
      title: "AMWAJ",
      category: "Website Redesign & Development",
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
      title: "Zarrafa Coffee",
      category: "Creative Strategy",
      image: "https://i.ibb.co/LXdzRmFW/Zarraffa-s-id-IDzk-CXha-0.png",
    },
    {
      title: "Matrix",
      category: "Brand Identity",
      image: "https://i.ibb.co/0j97mTS5/matrix.jpg",
    },
    {
      title: "LUMINA",
      category: "Creative Direction & Complete Marketing Rebrand",
      image: "https://i.ibb.co/0R864csh/Your-paragraph-text-1.jpg",
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
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: "easeOut" }}
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
            whileHover={{
              y: -6, // subtle lift
              boxShadow: "0px 12px 20px rgba(0, 255, 255, 0.1)",
            }}
            className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[#101010] hover:border-cyan-400/30 transition-all shadow-md cursor-pointer"
          >
            {/* Image Block */}
            <div className="overflow-hidden bg-black flex items-center justify-center">
              <motion.img
                src={project.image}
                alt={project.title}
                className="object-contain w-full h-64 md:h-72 lg:h-80 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
                whileHover={{ scale: 1.06, rotate: -0.7 }}
                transition={{ duration: 0.4 }}
              />
            </div>

            {/* Hover Overlay */}
            <div className="absolute inset-0 flex flex-col justify-end p-6 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <motion.div
                variants={{
                  hidden: { y: 15, opacity: 0 },
                  visible: { y: 0, opacity: 1 },
                }}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                transition={{
                  delay: 0.2,
                  duration: 0.4,
                  ease: "easeOut",
                }}
                className="transform transition-transform duration-500 group-hover:-translate-y-1"
              >
                <h3 className="text-white text-xl font-semibold mb-1 tracking-tight">
                  {project.title}
                </h3>
                <p className="text-cyan-400 text-sm font-medium">
                  {project.category}
                </p>
              </motion.div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* CTA Button */}
<motion.a
  href="/extended-work"
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.97 }}
  transition={{ type: "spring", stiffness: 250 }}
  className="mt-16 inline-flex items-center bg-gradient-to-r from-cyan-400 to-blue-500 text-black font-semibold px-8 py-4 rounded-full shadow-xl hover:shadow-cyan-400/30 transition-all"
>
  View All
  <ArrowRight size={18} className="ml-2" />
</motion.a>
</section>
);
}
