import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { fadeInUp } from "@/utils/animations";

export default function Testimonials() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  const testimonials = [
    {
      name: "Ayesha Khan",
      company: "Glow Beauty Co.",
      quote:
        "Working with Pehchaan Media transformed our entire brand presence. Their team understood our story and brought it to life visually in ways we couldn’t have imagined.",
    },
    {
      name: "Rizwan Malik",
      company: "NextGen Technologies",
      quote:
        "They don’t just make designs — they create experiences. From our website to our film launch, everything reflected our identity perfectly.",
    },
    {
      name: "Sara Ahmed",
      company: "Urban Brew",
      quote:
        "The passion and dedication Pehchaan Media brings is unmatched. They became an integral part of our team during the rebrand and helped us grow exponentially.",
    },
  ];

  return (
    <section
      id="testimonials"
      ref={ref}
      className="relative py-24 md:py-36 bg-[#0a0a0a] text-center overflow-hidden"
    >
      <motion.h2
        variants={fadeInUp}
        initial="hidden"
        animate={inView ? "show" : "hidden"}
        className="text-4xl md:text-6xl font-extrabold mb-16 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500"
      >
        What Our Clients Say
      </motion.h2>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 px-6">
        {testimonials.map((t, i) => (
          <motion.div
            key={i}
            variants={fadeInUp}
            initial="hidden"
            animate={inView ? "show" : "hidden"}
            transition={{ delay: i * 0.15 }}
            whileHover={{ scale: 1.03 }}
            className="bg-[#101010] border border-white/10 rounded-2xl p-8 shadow-lg hover:border-cyan-400/30 transition-all"
          >
            <p className="text-gray-300 italic mb-6 leading-relaxed">
              “{t.quote}”
            </p>
            <h4 className="text-white font-semibold">{t.name}</h4>
            <p className="text-cyan-400 text-sm">{t.company}</p>
          </motion.div>
        ))}
      </div>

      {/* Soft rotating glow */}
      <motion.div
        className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-cyan-500/10 blur-[160px] -z-10"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 100, ease: "linear" }}
      />
    </section>
  );
}
