// src/pages/ExtendedWork.jsx

import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  CATEGORIES,
  WORK_ITEMS,
  CATEGORY_HERO,
} from "@/data/workData";
import { staggerContainer } from "@/utils/workAnimations";
import WorkCategoryShowcase from "@/components/work/WorkCategoryShowcase";
import WorkSamplesGrid from "@/components/work/WorkSamplesGrid";

// small classnames helper
const cn = (...xs) => xs.filter(Boolean).join(" ");

// ---------- SEO hook ----------
function useSEO({ title, description }) {
  useEffect(() => {
    if (title) document.title = title;
    if (description) {
      let meta = document.querySelector('meta[name="description"]');
      if (!meta) {
        meta = document.createElement("meta");
        meta.setAttribute("name", "description");
        document.head.appendChild(meta);
      }
      meta.setAttribute("content", description);
    }
  }, [title, description]);
}

// ---------- HERO (aligned with main Hero.jsx vibe) ----------
function ExtendedWorkHero() {
  const heroKeys = Object.keys(CATEGORY_HERO);
  const [activeKey, setActiveKey] = useState(heroKeys[0]);

  // small auto-rotate for subtle motion
  useEffect(() => {
    if (!heroKeys.length) return;
    const id = setInterval(() => {
      setActiveKey((prev) => {
        const currentIndex = heroKeys.indexOf(prev);
        const nextIndex = (currentIndex + 1) % heroKeys.length;
        return heroKeys[nextIndex];
      });
    }, 4500);
    return () => clearInterval(id);
  }, [heroKeys]);

  return (
    <section
      className="relative overflow-hidden bg-gradient-to-b from-[#0a0f1f] via-[#050509] to-[#020206] border-b border-white/5"
      aria-label="Extended work hero"
    >
      {/* soft glow background, echoing main hero */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute w-[700px] h-[700px] rounded-full bg-cyan-500/10 blur-[220px] top-[-220px] left-[-220px]"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 60, ease: "linear" }}
        />
        <motion.div
          className="absolute w-[650px] h-[650px] rounded-full bg-blue-500/10 blur-[220px] bottom-[-220px] right-[-220px]"
          animate={{ rotate: -360 }}
          transition={{ repeat: Infinity, duration: 70, ease: "linear" }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 lg:py-24 flex flex-col lg:flex-row items-center gap-12">
        <div className="flex-1">
          <motion.p
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-xs uppercase tracking-[0.2em] text-cyan-300/80 mb-3"
          >
            Extended Work Archive
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[1.1] tracking-tight"
          >
            A deeper look at{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
              what we actually ship.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.12 }}
            className="mt-5 text-base md:text-lg text-slate-200/80 max-w-xl leading-relaxed"
          >
            Nine core service lines — from web redesigns to motion, SMM and
            YouTube systems. This page strips away the fluff and lets you
            scan real deliverables by category, client, or recency.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.2 }}
            className="mt-7 flex flex-wrap items-center gap-3 text-sm text-slate-200/80"
          >
            <span className="inline-flex items-center rounded-full border border-cyan-400/40 bg-cyan-400/10 px-3 py-1">
              <span className="h-2 w-2 rounded-full bg-cyan-400 mr-2" />
              9 core categories
            </span>
            <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1">
              Curated layouts, thumbnails & flows
            </span>
          </motion.div>
        </div>

        {/* Hero visual */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.55, delay: 0.12 }}
          className="flex-1 w-full max-w-md lg:max-w-lg"
        >
          <div className="relative rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-xl shadow-[0_32px_120px_rgba(0,0,0,0.75)] overflow-hidden">
            <div className="relative h-56 md:h-64 overflow-hidden">
              {activeKey && (
                <motion.img
                  key={activeKey}
                  src={CATEGORY_HERO[activeKey]}
                  alt={`${activeKey} hero`}
                  initial={{ opacity: 0, scale: 1.02 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6 }}
                  className="w-full h-full object-cover"
                  loading="eager"
                />
              )}

              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent pointer-events-none" />
            </div>

            <div className="p-4 flex items-center justify-between">
              <div>
                <div className="text-[11px] uppercase tracking-[0.22em] text-slate-300/70">
                  Currently spotlighting
                </div>
                <div className="mt-1 text-sm font-semibold text-slate-50">
                  {activeKey}
                </div>
              </div>

              <div className="flex gap-2">
                {heroKeys.slice(0, 4).map((k) => (
                  <button
                    key={k}
                    onClick={() => setActiveKey(k)}
                    className={cn(
                      "h-8 px-3 rounded-full text-[11px] font-medium border transition-all",
                      activeKey === k
                        ? "border-cyan-400/90 bg-cyan-400/15 text-cyan-50"
                        : "border-white/10 bg-white/5 text-slate-200/80 hover:border-cyan-300/70 hover:text-cyan-50"
                    )}
                  >
                    {k.split(" ")[0]}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ---------- FILTER BAR (simplified: search + category + sort) ----------
function FilterBar({ categories, active, onSelectCategory, query, onQueryChange, sort, onSortChange }) {
  return (
    <section
      aria-label="Filters"
      className="border-y border-white/5 bg-black/40 backdrop-blur-xl"
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        {/* Search */}
        <div className="w-full md:w-1/2">
          <label
            htmlFor="extendedwork-search"
            className="sr-only"
          >
            Search work
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300/70 text-sm">
              🔍
            </span>
            <input
              id="extendedwork-search"
              value={query}
              onChange={(e) => onQueryChange(e.target.value)}
              placeholder="Search by title, client, or year..."
              className="w-full pl-9 pr-4 py-2.5 rounded-lg bg-white/5 border border-white/10 text-sm text-slate-50 placeholder:text-slate-300/70 focus:outline-none focus:ring-2 focus:ring-cyan-400/70 focus:border-transparent"
            />
          </div>
        </div>

        {/* Category pills */}
        <div className="w-full md:w-auto overflow-x-auto no-scrollbar">
          <div className="flex gap-2 min-w-max">
            <button
              onClick={() => onSelectCategory("All")}
              className={cn(
                "px-3.5 py-1.5 rounded-full text-xs font-medium border transition-colors whitespace-nowrap",
                active === "All"
                  ? "bg-gradient-to-r from-cyan-400 to-blue-500 text-black border-transparent shadow"
                  : "bg-white/5 border-white/10 text-slate-200/80 hover:border-cyan-300/70 hover:text-cyan-50"
              )}
            >
              All
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => onSelectCategory(cat)}
                className={cn(
                  "px-3.5 py-1.5 rounded-full text-xs font-medium border transition-colors whitespace-nowrap",
                  active === cat
                    ? "bg-gradient-to-r from-cyan-400 to-blue-500 text-black border-transparent shadow"
                    : "bg-white/5 border-white/10 text-slate-200/80 hover:border-cyan-300/70 hover:text-cyan-50"
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Sort */}
        <div className="w-full md:w-auto flex md:justify-end">
          <select
            value={sort}
            onChange={(e) => onSortChange(e.target.value)}
            className="w-full md:w-auto text-xs md:text-sm rounded-lg bg-white/5 border border-white/10 text-slate-100 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-400/70 focus:border-transparent"
          >
            <option value="popular">Most popular</option>
            <option value="newest">Newest first</option>
            <option value="oldest">Oldest first</option>
            <option value="client">By client name</option>
          </select>
        </div>
      </div>
    </section>
  );
}

// ---------- MAIN PAGE ----------
export default function ExtendedWorkPage() {
  useSEO({
    title: "Extended Work — Pehchaan Media",
    description:
      "A deeper archive of Pehchaan Media’s web, graphics, motion, SMM and performance creative work.",
  });

  const [activeCategory, setActiveCategory] = useState("All");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("popular");

  const allItems = WORK_ITEMS;

  const filtered = useMemo(() => {
    let items = allItems;

    // category filter
    if (activeCategory !== "All") {
      items = items.filter((i) => i.category === activeCategory);
    }

    // simple text search
    if (query.trim()) {
      const q = query.toLowerCase().trim();
      items = items.filter((i) => {
        return (
          i.title.toLowerCase().includes(q) ||
          (i.description || "").toLowerCase().includes(q) ||
          (i.client || "").toLowerCase().includes(q) ||
          String(i.year).includes(q)
        );
      });
    }

    // sorting
    if (sort === "newest") {
      items = items.slice().sort((a, b) => b.year - a.year);
    } else if (sort === "oldest") {
      items = items.slice().sort((a, b) => a.year - b.year);
    } else if (sort === "client") {
      items = items
        .slice()
        .sort((a, b) => (a.client || "").localeCompare(b.client || ""));
    }
    // 'popular' keeps defined order (you can later use popularity field if needed)

    return items;
  }, [allItems, activeCategory, query, sort]);

  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
    return () => {
      document.documentElement.style.scrollBehavior = "";
    };
  }, []);

  return (
    <main className="min-h-screen text-slate-100 bg-gradient-to-b from-[#050305] via-[#050712] to-[#020206]">
      {/* Hero aligned with main site */}
      <ExtendedWorkHero />

      {/* Core filters (no noisy hashtag layer, no extra nav) */}
      <FilterBar
        categories={CATEGORIES}
        active={activeCategory}
        onSelectCategory={setActiveCategory}
        query={query}
        onQueryChange={setQuery}
        sort={sort}
        onSortChange={setSort}
      />

      {/* Category overview using shared component */}
      <section
        aria-label="Category overview"
        className="py-10 md:py-12 border-b border-white/5"
      >
        <WorkCategoryShowcase onSelectCategory={setActiveCategory} />
      </section>

      {/* Samples grid */}
      <section id="samples" aria-label="Work samples" className="py-10 md:py-14">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between gap-4 mb-6">
          <div className="text-xs md:text-sm text-slate-300/80">
            Showing{" "}
            <span className="font-semibold text-slate-50">
              {filtered.length}
            </span>{" "}
            sample{filtered.length === 1 ? "" : "s"}{" "}
            {activeCategory !== "All" && (
              <>
                in{" "}
                <span className="font-semibold text-slate-50">
                  {activeCategory}
                </span>
              </>
            )}
          </div>

          <button
            onClick={() => {
              setActiveCategory("All");
              setQuery("");
              setSort("popular");
            }}
            className="text-xs md:text-sm px-3 py-1.5 rounded-full border border-white/10 bg-white/5 text-slate-200/80 hover:border-cyan-300/70 hover:text-cyan-50 transition-colors"
          >
            Reset view
          </button>
        </div>

        <motion.div
          className="max-w-7xl mx-auto px-0 md:px-2"
          initial="initial"
          animate="animate"
          variants={staggerContainer(0.04)}
        >
          <WorkSamplesGrid
            items={filtered}
            title={
              activeCategory === "All"
                ? "All curated work"
                : activeCategory
            }
          />
        </motion.div>
      </section>

      <footer className="py-12 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 text-center text-xs md:text-sm text-slate-400/80">
          © {new Date().getFullYear()} Pehchaan Media · Extended work archive
        </div>
      </footer>
    </main>
  );
}
