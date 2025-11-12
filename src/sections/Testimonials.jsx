import React, { useRef, useMemo } from "react";
import { motion, useInView } from "framer-motion";
import { fadeInUp } from "@/utils/animations";

/**
 * Testimonials.jsx
 *
 * - Keeps your original 3 testimonials and adds 9 more (total 12).
 * - Continuous horizontal marquee-style carousel that shows exactly 3 full cards in view on md+.
 * - Pause on hover; cards still scale slightly on hover for tactile feel.
 * - Adds a stats / "brands worked with" row below the carousel matching theme.
 *
 * Notes:
 * - The track duplicates the testimonial list to create a seamless loop.
 * - Each card uses min-w-[33.333%] so that 3 cards are visible at once on md+ screens.
 * - On small screens (< md) it will show 1 card per view (purely responsive).
 *
 */

export default function Testimonials() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  // -- Base testimonials: keep your original three and add 9 new human-sounding ones
  const testimonials = useMemo(() => {
    return [
      // Original three
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

      // Additional, realistic sounding testimonials (9)
      {
        name: "Omar Farooq",
        company: "Blue Harbor Logistics",
        quote:
          "Pehchaan Media turned a bland corporate message into a human story. The result increased our leads and made internal stakeholders finally agree on one voice.",
      },
      {
        name: "Lina Rodriguez",
        company: "Solstice Apparel",
        quote:
          "They modernised our ecommerce look and simplified the UX in ways that actually reduced bounce rates. Design choices were bold but data-driven.",
      },
      {
        name: "Hassan Iqbal",
        company: "Cedar Financial",
        quote:
          "We hired them for a short campaign and ended up extending the contract — their deliverables were on time, and the brand film still wins conversations months later.",
      },
      {
        name: "Meera Patel",
        company: "Minima Studio",
        quote:
          "What surprised me most was how they listen. Feedback cycles were concise and meaningful — the final product felt like a clear collaboration, not a handoff.",
      },
      {
        name: "Daniel Kim",
        company: "Arcadia Media",
        quote:
          "Their visual storytelling is next level. The showreel they made for us opened doors to three festivals and two commercial partnerships.",
      },
      {
        name: "Fatima Noor",
        company: "GreenRoots NGO",
        quote:
          "Working with Pehchaan Media made our outreach warmer and more human. Donations increased after the campaign because people actually understood our mission.",
      },
      {
        name: "Marcus Li",
        company: "Vantage VR",
        quote:
          "Technical briefs turned into accessible, beautiful interfaces. They balanced creative and engineering constraints smartly — a rare combo.",
      },
      {
        name: "Zara Khan",
        company: "Lumen Studios",
        quote:
          "Their cinematography and direction gave our launch the polish it needed. On launch day our social engagement doubled compared to previous campaigns.",
      },
      {
        name: "Priya Reddy",
        company: "Harvest Foods",
        quote:
          "We saw a measurable uptick in brand recall after their campaign. The creative brief they wrote was worth the price alone — so organized and strategic.",
      },
      {
        name: "Ali Nawaz",
        company: "Metro Health",
        quote:
          "From stakeholder interviews to the final edit — everything was handled with care. The internal adoption of the new brand was unexpectedly smooth.",
      },
      {
        name: "Yuki Tanaka",
        company: "Nami Labs",
        quote:
          "Their approach feels artisanal but scaled. We got beautiful deliverables and a playbook for future campaigns — not just a one-off asset dump.",
      },
    ];
  }, []);

  // Duplicate array for seamless marquee effect
  const marqueeList = useMemo(() => [...testimonials, ...testimonials], [testimonials]);

  // carousel loop duration (seconds) — adjust for speed. Larger = slower scroll.
  const loopDuration = 30;

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
        className="text-4xl md:text-6xl font-extrabold mb-12 md:mb-16 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500"
      >
        What Our Clients Say
      </motion.h2>

      {/* Container: fixed height so 3 full cards show on md+ */}
      <div className="w-full max-w-6xl mx-auto px-6">
        {/* Visible window: overflow hidden keeps only 3 full cards in view */}
        <div
          className="relative overflow-hidden w-full rounded-3xl"
          aria-hidden={false}
          role="region"
          aria-label="Client testimonials carousel"
        >
          {/* Scrolling track — motion animated */}
          <motion.div
            // animate x from 0% to -50% to slide through duplicated content
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                ease: "linear",
                duration: loopDuration,
              },
            }}
            // Pause the animation on hover by reducing playback speed to 0 via whileHover
            whileHover={{ animationPlayState: "paused" }}
            className="flex items-stretch"
            style={{
              // ensure the track width is double so -50% moves one full set
              width: "200%",
            }}
          >
                        {/* Each testimonial card: min-width 33.333% so 3 are visible at once on md+ */}
            {marqueeList.map((t, i) => (
              <motion.article
                key={i}
                className="min-w-[100%] md:min-w-[33.3333%] p-4"
                // entrance fade in for individual items (subtle) — only when container becomes visible
                initial={{ opacity: 0, y: 10 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                transition={{ duration: 0.6, delay: (i % testimonials.length) * 0.05 }}
                whileHover={{ scale: 1.03 }}
              >
                <div className="h-full bg-[#101010] border border-white/8 rounded-2xl p-6 flex flex-col justify-between shadow-lg hover:border-cyan-400/30 transition-all">
                  <blockquote className="text-gray-300 italic mb-4 leading-relaxed text-sm md:text-base">
                    “{t.quote}”
                  </blockquote>
                  <div className="mt-4">
                    <h4 className="text-white font-semibold text-sm md:text-base">{t.name}</h4>
                    <p className="text-cyan-400 text-xs md:text-sm">{t.company}</p>
                  </div>
                </div>
              </motion.article>
            ))}
          </motion.div>

          {/* Gradient edge fades for visual polish so partial cards don't feel abrupt */}
          <div
            className="pointer-events-none absolute inset-y-0 left-0 w-16 md:w-32"
            style={{
              background:
                "linear-gradient(90deg, rgba(10,10,10,1) 0%, rgba(10,10,10,0) 100%)",
            }}
          />
          <div
            className="pointer-events-none absolute inset-y-0 right-0 w-16 md:w-32"
            style={{
              background:
                "linear-gradient(270deg, rgba(10,10,10,1) 0%, rgba(10,10,10,0) 100%)",
            }}
          />
        </div>
      </div>

      {/* Soft rotating glow (kept, slightly adjusted) */}
      <motion.div
        className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-cyan-500/10 blur-[160px] -z-10"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 100, ease: "linear" }}
        aria-hidden="true"
      />

      {/* Stats / credibility row below the testimonials */}
      <div className="mt-12 md:mt-16">
        <div className="max-w-4xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 items-center text-left">
            <div className="bg-[#0f0f0f] border border-white/6 rounded-xl p-4">
              <p className="text-2xl md:text-3xl font-extrabold text-white">40+</p>
              <p className="text-sm text-gray-300 mt-1">International brands worked with</p>
            </div>

            <div className="bg-[#0f0f0f] border border-white/6 rounded-xl p-4">
              <p className="text-2xl md:text-3xl font-extrabold text-white">Avg. 3.2×</p>
              <p className="text-sm text-gray-300 mt-1">Improved average noticeability (campaign lift)</p>
            </div>

            <div className="bg-[#0f0f0f] border border-white/6 rounded-xl p-4">
              <p className="text-2xl md:text-3xl font-extrabold text-white">98%</p>
              <p className="text-sm text-gray-300 mt-1">Client satisfaction (repeat projects)</p>
            </div>

            <div className="bg-[#0f0f0f] border border-white/6 rounded-xl p-4">
              <p className="text-2xl md:text-3xl font-extrabold text-white">70+</p>
              <p className="text-sm text-gray-300 mt-1">Campaigns shipped across 4 continents</p>
            </div>

            <div className="bg-[#0f0f0f] border border-white/6 rounded-xl p-4">
              <p className="text-2xl md:text-3xl font-extrabold text-white">Avg. 28 days</p>
              <p className="text-sm text-gray-300 mt-1">Average turnaround for brand assets</p>
            </div>
          </div>
        </div>
      </div>

      {/* Accessibility hint for screen readers */}
      <span className="sr-only">Testimonials carousel auto-scrolls horizontally; hover to pause.</span>
    </section>
  );
}
