import React, { useRef, useMemo } from "react";
import { motion, useInView } from "framer-motion";
import { fadeInUp } from "@/utils/animations";

export default function Testimonials() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  const testimonials = useMemo(() => [
    { name: "Ayesha Khan", company: "Glow Beauty Co.", quote: "Working with Pehchaan Media transformed our entire brand presence. Their team understood our story and brought it to life visually in ways we couldn’t have imagined." },
    { name: "Rizwan Malik", company: "NextGen Technologies", quote: "They don’t just make designs — they create experiences. From our website to our film launch, everything reflected our identity perfectly." },
    { name: "Sara Ahmed", company: "Urban Brew", quote: "The passion and dedication Pehchaan Media brings is unmatched. They became an integral part of our team during the rebrand and helped us grow exponentially." },
    { name: "Omar Farooq", company: "Blue Harbor Logistics", quote: "Pehchaan Media turned a bland corporate message into a human story. The result increased our leads and made internal stakeholders finally agree on one voice." },
    { name: "Lina Rodriguez", company: "Solstice Apparel", quote: "They modernised our ecommerce look and simplified the UX in ways that actually reduced bounce rates. Design choices were bold but data-driven." },
    { name: "Hassan Iqbal", company: "Cedar Financial", quote: "We hired them for a short campaign and ended up extending the contract — their deliverables were on time, and the brand film still wins conversations months later." },
    { name: "Meera Patel", company: "Minima Studio", quote: "What surprised me most was how they listen. Feedback cycles were concise and meaningful — the final product felt like a clear collaboration, not a handoff." },
    { name: "Daniel Kim", company: "Arcadia Media", quote: "Their visual storytelling is next level. The showreel they made for us opened doors to three festivals and two commercial partnerships." },
    { name: "Fatima Noor", company: "GreenRoots NGO", quote: "Working with Pehchaan Media made our outreach warmer and more human. Donations increased after the campaign because people actually understood our mission." },
    { name: "Marcus Li", company: "Vantage VR", quote: "Technical briefs turned into accessible, beautiful interfaces. They balanced creative and engineering constraints smartly — a rare combo." },
    { name: "Zara Khan", company: "Lumen Studios", quote: "Their cinematography and direction gave our launch the polish it needed. On launch day our social engagement doubled compared to previous campaigns." },
    { name: "Priya Reddy", company: "Harvest Foods", quote: "We saw a measurable uptick in brand recall after their campaign. The creative brief they wrote was worth the price alone — so organized and strategic." },
  ], []);

  const marqueeList = useMemo(() => [...testimonials, ...testimonials], [testimonials]);
  const loopDuration = 35;

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
        className="text-4xl md:text-6xl font-extrabold mb-14 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500"
      >
        What Our Clients Say
      </motion.h2>

      {/* Carousel */}
      <div className="max-w-6xl mx-auto px-6 overflow-hidden relative">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            x: { repeat: Infinity, repeatType: "loop", ease: "linear", duration: loopDuration },
          }}
          whileHover={{ animationPlayState: "paused" }}
          className="flex items-stretch w-[200%]"
        >
          {marqueeList.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ duration: 0.6, delay: (i % testimonials.length) * 0.05 }}
              whileHover={{ scale: 1.03 }}
              className="min-w-[100%] md:min-w-[33.3333%] p-6"
            >
              <div className="bg-[#101010] border border-white/10 rounded-2xl p-8 shadow-lg hover:border-cyan-400/30 transition-all h-full flex flex-col justify-between">
                <p className="text-gray-300 italic mb-6 leading-relaxed text-sm md:text-base">
                  “{t.quote}”
                </p>
                <div>
                  <h4 className="text-white font-semibold text-base">{t.name}</h4>
                  <p className="text-cyan-400 text-sm">{t.company}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Gradient edges */}
        <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#0a0a0a] to-transparent pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#0a0a0a] to-transparent pointer-events-none" />
      </div>

      {/* Glow */}
      <motion.div
        className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-cyan-500/10 blur-[160px] -z-10"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 100, ease: "linear" }}
      />

      {/* Achievements Row */}
      <div className="mt-24">
        <div className="flex flex-wrap justify-center items-center gap-6 px-6">
          {[
            { num: "40+", label: "International Brands", desc: "Built identities and campaigns that traveled globally." },
            { num: "3.2×", label: "Higher Noticeability", desc: "Average visual recall improvement across digital assets." },
            { num: "92%", label: "Client Retention", desc: "Most of our partners stay with us for multiple projects." },
            { num: "70+", label: "Global Campaigns", desc: "Executed across 4 continents in film, digital & print." },
            { num: "28 days", label: "Avg. Turnaround", desc: "Swift creative delivery without compromising detail." },
          ].map((stat, i) => (
            <motion.div
              key={i}
              variants={fadeInUp}
              initial="hidden"
              animate={inView ? "show" : "hidden"}
              transition={{ delay: 0.1 * i }}
              className="flex-1 min-w-[260px] bg-gradient-to-br from-[#101010] to-[#0c0c0c] border border-cyan-500/20 rounded-2xl p-6 text-left shadow-md hover:shadow-cyan-500/10 transition-all"
            >
              <h3 className="text-3xl md:text-4xl font-extrabold text-white mb-1">
                {stat.num}
              </h3>
              <p className="text-cyan-400 font-semibold text-sm uppercase tracking-wide mb-2">
                {stat.label}
              </p>
              <p className="text-gray-400 text-sm leading-snug">
                {stat.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
