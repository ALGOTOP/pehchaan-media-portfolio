// src/pages/work/GraphicsWorkPage.jsx
import React, { useState } from "react";
import WORK_CATEGORIES from "../../data/workData";
import useWorkFilter from "../../hooks/useWorkFilter";
import WorkSampleCard from "../../components/work/WorkSampleCard";
import WorkModalView from "../../components/work/WorkModalView";
import { motion } from "framer-motion";
import { staggerContainer, thumbReveal } from "../../utils/workAnimations";

export default function GraphicsWorkPage() {
  const category = WORK_CATEGORIES.find((c) => c.slug === "graphics");
  const { list, typeFilter, setTypeFilter } = useWorkFilter(category.media);

  const [selected, setSelected] = useState(null);

  return (
    <main className="min-h-screen bg-[#050505] text-white pb-20">
      {/* Hero */}
      <header className="max-w-6xl mx-auto px-6 pt-20 pb-10">
        <h1 className="font-[Montserrat] text-5xl md:text-6xl tracking-tight">
          Graphics
        </h1>
        <p className="mt-4 text-white/70 text-lg max-w-xl">
          Branding, illustration, posters, thumbnails, editorial layouts, and
          digital design assets—all visually driven and identity-focused.
        </p>
      </header>

      {/* Filter Bar */}
      <div className="max-w-6xl mx-auto px-6 pb-6 flex gap-3">
        <button
          onClick={() => setTypeFilter("all")}
          className={`px-4 py-2 rounded-full text-sm ${
            typeFilter === "all"
              ? "bg-[#FF6F61] text-white"
              : "bg-white/10 text-white/70"
          }`}
        >
          All
        </button>
        <button
          onClick={() => setTypeFilter("image")}
          className={`px-4 py-2 rounded-full text-sm ${
            typeFilter === "image"
              ? "bg-[#FF6F61] text-white"
              : "bg-white/10 text-white/70"
          }`}
        >
          Images
        </button>
        <button
          onClick={() => setTypeFilter("video")}
          className={`px-4 py-2 rounded-full text-sm ${
            typeFilter === "video"
              ? "bg-[#FF6F61] text-white"
              : "bg-white/10 text-white/70"
          }`}
        >
          Reels
        </button>
      </div>

      {/* Grid */}
      <section className="max-w-7xl mx-auto px-6">
        <motion.div
          variants={staggerContainer(0.05)}
          initial="initial"
          animate="animate"
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {list.map((item, i) => (
            <motion.div key={item.id} variants={thumbReveal} custom={i}>
              <WorkSampleCard item={item} onOpen={setSelected} />
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Modal */}
      <WorkModalView open={!!selected} item={selected} onClose={() => setSelected(null)} />
    </main>
  );
}
