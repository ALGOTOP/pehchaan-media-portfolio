// src/sections/CaseStudiesPreview.jsx
import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import caseStudies from "@/CaseStudiesData"; // ✅ Imported from root
import { ArrowRight } from "lucide-react";

export default function CaseStudiesPreview() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  // Show only the first 3 case studies
  const preview = caseStudies.slice(0, 3);

  return (
    <section
      id="case-studies-preview"
      ref={ref}
      className="relative py-24 md:py-36 bg-[#0a0a0a] flex flex-col items-center overflow-hidden"
    >
      {/* Section Title */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-4xl md:text-6xl font-extrabold mb-14 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500 text-center"
      >
        Case Studies
      </motion.h2>

      {/* Thumbnails Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl px-6">
        {preview.map((item, i) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{
              delay: i * 0.08,
              duration: 0.6,
              ease: [0.25, 0.1, 0.25, 1],
            }}
            whileHover={{
              y: -6,
              boxShadow: "0px 12px 20px rgba(0, 255, 255, 0.1)",
            }}
            className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[#101010] hover:border-cyan-400/30 transition-all shadow-md cursor-pointer"
          >
            {/* Clickable Image → Opens Detail Page */}
            <Link to={`/case-studies/${item.slug}`} aria-label={`Read ${item.title} case study`}>
              <div className="overflow-hidden bg-black flex items-center justify-center">
                <motion.img
                  src={item.image}
                  alt={item.title}
                  className="object-contain w-full h-64 md:h-72 lg:h-80 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
                />
              </div>

              {/* Overlay */}
              <div className="absolute inset-0 flex flex-col justify-end p-6 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <motion.div
                  initial={{ y: 15, opacity: 0 }}
                  animate={inView ? { y: 0, opacity: 1 } : {}}
                  transition={{ delay: 0.15, duration: 0.4, ease: "easeOut" }}
                  className="transition-transform duration-500 group-hover:-translate-y-1"
                >
                  <h3 className="text-white text-xl font-semibold tracking-tight">
                    {item.title}
                  </h3>
                  <p className="text-cyan-400 text-sm font-medium">
                    {item.category}
                  </p>
                </motion.div>
              </div>

              {/* Text Block */}
              <div className="p-6">
                <p className="text-xs uppercase text-cyan-400 tracking-wider">
                  {item.category}
                </p>
                <h4 className="text-xl font-semibold mt-2">{item.title}</h4>
                <p className="text-gray-400 mt-2 text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* CTA */}
      <motion.a
        href="/case-studies"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.97 }}
        transition={{ type: "spring", stiffness: 250 }}
        className="mt-16 inline-flex items-center bg-gradient-to-r from-cyan-400 to-blue-500 text-black font-semibold px-8 py-4 rounded-full shadow-xl hover:shadow-cyan-400/30 transition-all"
      >
        View All Case Studies
        <ArrowRight size={18} className="ml-2" />
      </motion.a>
    </section>
  );
}
