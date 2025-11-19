// src/pages/ExtendedWork.jsx

import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CATEGORIES, WORK_ITEMS, CATEGORY_HERO } from "@/data/workData";
import { staggerContainer } from "@/utils/workAnimations";
import WorkCategoryShowcase from "@/components/work/WorkCategoryShowcase";
import WorkSamplesGrid from "@/components/work/WorkSamplesGrid";

// tiny classnames helper
const cn = (...args) => args.filter(Boolean).join(" ");

// Small accessible icon components (inline SVGs)
const IconSearch = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
    <path
      d="M21 21l-4.35-4.35"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle
      cx="11"
      cy="11"
      r="6"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const IconChevronRight = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
    <path
      d="M9 6l6 6-6 6"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const IconClose = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
    <path
      d="M18 6L6 18M6 6l12 12"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// SEO util: set page title and meta description
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

// small debounce used for search input to reduce re-renders
function debounce(fn, wait = 120) {
  let t;
  return (...args) => {
    clearTimeout(t);
    t = setTimeout(() => fn(...args), wait);
  };
}

// -------------------------
// Hero: cinematic hero with layered carousel and CTA
// -------------------------
function HeroCarousel({ heroImages = CATEGORY_HERO }) {
  const keys = Object.keys(heroImages);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(
      () => setIndex((s) => (s + 1) % keys.length),
      4500
    );
    return () => clearInterval(id);
  }, [keys.length]);

  return (
    <section
      aria-label="Showcase hero"
      className="relative overflow-hidden py-20"
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center gap-8">
        <div className="flex-1">
          <motion.h1
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl md:text-6xl font-extrabold leading-tight tracking-tight"
          >
            Extended Work —{" "}
            <span className="text-indigo-400">Curated</span> Samples
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="mt-4 max-w-2xl text-lg text-white/80"
          >
            A hand-selected archive of design work — clean thumbnails, smart
            composition, and a focused exploration flow. Use the search and
            filters below to slice by category, tags, year or client.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25 }}
            className="mt-6 flex gap-3"
          >
            <a
              href="#samples"
              className="inline-flex items-center gap-3 px-5 py-3 rounded-full bg-indigo-600/95 text-white shadow-lg transform-gpu hover:scale-101 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            >
              Explore samples
              <IconChevronRight />
            </a>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 px-4 py-3 rounded-full bg-white/6 text-white/90 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            >
              Work with us
            </a>
          </motion.div>
        </div>

        <div className="w-1/2 hidden md:block">
          <div className="relative rounded-3xl overflow-hidden shadow-2xl">
            <AnimatePresence initial={false} mode="wait">
              <motion.img
                key={keys[index]}
                src={heroImages[keys[index]]}
                alt={`${keys[index]} hero`}
                initial={{ opacity: 0, scale: 1.02 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.6 }}
                className="w-full h-56 object-cover"
                loading="eager"
              />
            </AnimatePresence>
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/30 via-transparent to-transparent" />
            <div className="absolute left-6 bottom-6 text-white/90">
              <div className="text-sm font-semibold">Featured</div>
              <div className="text-lg font-bold">{keys[index]}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// -------------------------
// FilterBar: search, category chips, sort, tags
// -------------------------
function FilterBar({
  categories,
  active,
  onSelect,
  query,
  onQueryChange,
  sort,
  onSortChange,
  tagset,
  selectedTags,
  onToggleTag,
}) {
  const [local, setLocal] = useState(query);
  const debounced = useRef(debounce((v) => onQueryChange(v), 120));
  useEffect(() => setLocal(query), [query]);

  return (
    <div className="sticky top-20 z-40 backdrop-blur bg-black/30 border-b border-white/6">
      <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row gap-4 items-start md:items-center">
        <div className="flex items-center gap-3 w-full md:w-2/3">
          <div className="relative flex-1">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/60">
              <IconSearch />
            </span>
            <input
              id="extendedwork-search"
              value={local}
              onChange={(e) => {
                setLocal(e.target.value);
                debounced.current(e.target.value);
              }}
              placeholder="Search samples, clients, tags, or year — e.g. '2022' or 'branding'"
              className="w-full pl-10 pr-4 py-2 bg-white/6 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              aria-label="Search work samples"
            />
          </div>

          <div className="flex gap-2 overflow-x-auto no-scrollbar">
            <button
              onClick={() => onSelect("All")}
              className={cn(
                "px-3 py-2 rounded-md text-sm font-medium whitespace-nowrap",
                active === "All"
                  ? "bg-indigo-600 text-white"
                  : "bg-white/6 text-white/80"
              )}
            >
              All
            </button>

            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => onSelect(cat)}
                className={cn(
                  "px-3 py-2 rounded-md text-sm font-medium whitespace-nowrap",
                  active === cat
                    ? "bg-indigo-600 text-white"
                    : "bg-white/6 text-white/80"
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <select
            value={sort}
            onChange={(e) => onSortChange(e.target.value)}
            aria-label="Sort samples"
            className="bg-white/6 text-white rounded-md px-3 py-2 text-sm"
          >
            <option value="popular">Most popular</option>
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
            <option value="client">By client</option>
          </select>
        </div>
      </div>

      {/* Tags quick filter */}
      <div className="max-w-7xl mx-auto px-6 py-2">
        <div className="flex gap-2 items-center overflow-x-auto no-scrollbar">
          {tagset.slice(0, 30).map((t) => {
            const activeTag = selectedTags.includes(t);
            return (
              <button
                key={t}
                onClick={() => onToggleTag(t)}
                className={cn(
                  "px-3 py-1 rounded-full text-xs whitespace-nowrap",
                  activeTag
                    ? "bg-indigo-500 text-white"
                    : "bg-white/6 text-white/80"
                )}
                aria-pressed={activeTag}
              >
                #{t}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// -------------------------
// Main component
// -------------------------
export default function ExtendedWorkPage() {
  useSEO({
    title: "Extended Work — Pehchaan Media",
    description:
      "Curated archive of design samples across branding, web, motion, product and more.",
  });

  const [activeCategory, setActiveCategory] = useState("All");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("popular");
  const [selectedTags, setSelectedTags] = useState([]);
  const [showPreview, setShowPreview] = useState(null);

  // derive tagset from data
  const tagset = useMemo(() => {
    const t = new Set();
    for (const it of WORK_ITEMS) {
      (it.tags || []).forEach((x) => t.add(x));
    }
    return Array.from(t).sort();
  }, []);

  const allItems = WORK_ITEMS;

  // Filtering + sorting pipeline
  const filtered = useMemo(() => {
    let items = allItems;

    if (activeCategory !== "All") {
      items = items.filter((i) => i.category === activeCategory);
    }

    if (selectedTags.length) {
      items = items.filter((i) =>
        (i.tags || []).some((t) => selectedTags.includes(t))
      );
    }

    if (query.trim()) {
      const q = query.toLowerCase().trim();
      items = items.filter((i) => {
        return (
          i.title.toLowerCase().includes(q) ||
          (i.description || "").toLowerCase().includes(q) ||
          (i.client || "").toLowerCase().includes(q) ||
          (i.tags || []).some((t) => t.includes(q)) ||
          String(i.year).includes(q)
        );
      });
    }

    if (sort === "newest") items = items.slice().sort((a, b) => b.year - a.year);
    else if (sort === "oldest")
      items = items.slice().sort((a, b) => a.year - b.year);
    else if (sort === "client")
      items = items
        .slice()
        .sort((a, b) => (a.client > b.client ? 1 : -1));
    // 'popular' = keep original order (can later hook into popularity)

    return items;
  }, [allItems, activeCategory, query, sort, selectedTags]);

  const onToggleTag = (t) => {
    setSelectedTags((s) =>
      s.includes(t) ? s.filter((x) => x !== t) : [...s, t]
    );
  };

  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
    return () => {
      document.documentElement.style.scrollBehavior = "";
    };
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#050305] via-[#071126] to-[#020206] text-white">
      {/* Hero */}
      <HeroCarousel heroImages={CATEGORY_HERO} />

      {/* Filters */}
      <FilterBar
        categories={CATEGORIES}
        active={activeCategory}
        onSelect={setActiveCategory}
        query={query}
        onQueryChange={setQuery}
        sort={sort}
        onSortChange={setSort}
        tagset={tagset}
        selectedTags={selectedTags}
        onToggleTag={onToggleTag}
      />

      {/* Category overview using shared component */}
      <WorkCategoryShowcase onSelectCategory={setActiveCategory} />

      {/* Controls above samples */}
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between gap-4 py-6">
        <div className="text-sm text-white/80">
          Showing{" "}
          <span className="font-medium">{filtered.length}</span> samples{" "}
          {activeCategory !== "All" && (
            <>
              in <span className="font-medium">{activeCategory}</span>
            </>
          )}
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              setActiveCategory("All");
              setQuery("");
              setSelectedTags([]);
              setSort("popular");
            }}
            className="px-3 py-2 rounded-md bg-white/6 text-white/80 hover:bg-white/8 focus:outline-none focus:ring-2 focus:ring-indigo-400 text-sm"
          >
            Reset filters
          </button>
        </div>
      </div>

      {/* Samples area using shared grid component */}
      <section id="samples" aria-label="Work samples">
        <motion.div
          className="max-w-7xl mx-auto px-0"
          initial="initial"
          animate="animate"
          variants={staggerContainer(0.04)}
        >
          <WorkSamplesGrid
            items={filtered}
            title={
              activeCategory === "All" ? "All curated work" : activeCategory
            }
          />
        </motion.div>
      </section>

      {/* Optional preview modal (you can wire this to WorkSamplesGrid later if needed) */}
      <AnimatePresence>
        {showPreview && (
          <motion.dialog
            className="fixed inset-0 z-50 flex items-center justify-center p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            aria-modal="true"
            role="dialog"
          >
            <div
              className="absolute inset-0 bg-black/70"
              onClick={() => setShowPreview(null)}
            />
            <motion.div
              className="relative max-w-4xl w-full bg-[#06060a] rounded-2xl overflow-hidden shadow-xl"
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
            >
              <div className="p-4 flex justify-end">
                <button
                  onClick={() => setShowPreview(null)}
                  className="text-white/80 p-2 rounded-md hover:bg-white/6"
                >
                  <IconClose />
                </button>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold">{showPreview.title}</h3>
                <p className="mt-2 text-white/80">
                  {showPreview.description}
                </p>
                <img
                  src={showPreview.thumbnail}
                  alt={showPreview.alt}
                  className="mt-4 w-full h-auto rounded-md"
                />
              </div>
            </motion.div>
          </motion.dialog>
        )}
      </AnimatePresence>

      <footer className="py-16">
        <div className="max-w-7xl mx-auto px-6 text-center text-sm text-white/60">
          © {new Date().getFullYear()} Pehchaan Media — curated samples
        </div>
      </footer>
    </main>
  );
}
