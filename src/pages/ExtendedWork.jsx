// === ExtendedWork.jsx (PART 1 of 3) ===
// Save the full file as: src/pages/ExtendedWork.jsx
// Paste PART 1, then PART 2, then PART 3 (in that order).

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { CATEGORIES, WORK_ITEMS, CATEGORY_HERO } from '@/data/workData';
import {
  fadeIn,
  revealFromLeft,
  staggerContainer,
  cardHover,
} from '@/utils/workAnimations';

// tiny classnames helper
const cn = (...args) => args.filter(Boolean).join(' ');

// Small accessible icon components (inline SVGs)
const IconSearch = ({ className = 'w-4 h-4' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
    <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="11" cy="11" r="6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IconChevronRight = ({ className = 'w-4 h-4' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
    <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IconClose = ({ className = 'w-5 h-5' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
    <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// SEO util: set page title and meta description (no dependency on react-helmet)
function useSEO({ title, description }) {
  useEffect(() => {
    if (title) document.title = title;
    if (description) {
      let meta = document.querySelector('meta[name="description"]');
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute('name', 'description');
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', description);
    }
  }, [title, description]);
}

// keyboard helper: trap focus in modals (basic)
function useFocusTrap(active) {
  const ref = useRef(null);
  useEffect(() => {
    if (!active || !ref.current) return;
    const node = ref.current;
    const focusable = node.querySelectorAll('a,button,input,textarea,select,[tabindex]:not([tabindex="-1"])');
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    const handler = (e) => {
      if (e.key !== 'Tab') return;
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    first.focus();
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [active]);
}

// small debounce used for search input to reduce re-renders
function debounce(fn, wait = 120) {
  let t;
  return (...args) => {
    clearTimeout(t);
    t = setTimeout(() => fn(...args), wait);
  };
}
// === ExtendedWork.jsx (PART 2 of 3) ===
// Subcomponents implemented inline for a single-file drop-in.

// -------------------------
// Hero: cinematic hero with layered parallax, carousel and CTA
// -------------------------
function HeroCarousel({ heroImages = CATEGORY_HERO }) {
  const keys = Object.keys(heroImages);
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setIndex((s) => (s + 1) % keys.length), 4500);
    return () => clearInterval(id);
  }, [keys.length]);

  return (
    <section aria-label="Showcase hero" className="relative overflow-hidden py-20">
      <div className="max-w-7xl mx-auto px-6 flex items-center gap-8">
        <div className="flex-1">
          <motion.h1
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl md:text-6xl font-extrabold leading-tight tracking-tight"
          >
            Extended Work — <span className="text-indigo-400">Curated</span> Samples
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="mt-4 max-w-2xl text-lg text-white/80"
          >
            A hand-selected archive of design work — clean thumbnails, smart composition, and a focused
            exploration flow. Click “View” on any tile to open the full collection for that category.
          </motion.p>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25 }} className="mt-6 flex gap-3">
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
// FilterBar: search, category chips, sort
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
        <div className="flex items-center gap-3 w-full md:w-1/2">
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
              onClick={() => onSelect('All')}
              className={cn(
                'px-3 py-2 rounded-md text-sm font-medium whitespace-nowrap',
                active === 'All' ? 'bg-indigo-600 text-white' : 'bg-white/6 text-white/80',
              )}
            >
              All
            </button>

            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => onSelect(cat)}
                className={cn(
                  'px-3 py-2 rounded-md text-sm font-medium whitespace-nowrap',
                  active === cat ? 'bg-indigo-600 text-white' : 'bg-white/6 text-white/80',
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
            className="bg-white/6 text-white rounded-md px-3 py-2"
          >
            <option value="popular">Most popular</option>
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
            <option value="client">By client</option>
          </select>
        </div>
      </div>

      {/* Tags quick-filter — shows selected tags and toggles */}
      <div className="max-w-7xl mx-auto px-6 py-2">
        <div className="flex gap-2 items-center overflow-x-auto no-scrollbar">
          {tagset.slice(0, 30).map((t) => {
            const activeTag = selectedTags.includes(t);
            return (
              <button
                key={t}
                onClick={() => onToggleTag(t)}
                className={cn(
                  'px-3 py-1 rounded-full text-sm whitespace-nowrap',
                  activeTag ? 'bg-indigo-500 text-white' : 'bg-white/6 text-white/80',
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
// CategoryTiles: 9 category tiles linking to category pages
// -------------------------
function CategoryTiles({ categories, onExplore }) {
  return (
    <section className="max-w-7xl mx-auto px-6 py-10" aria-label="Categories">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {categories.map((cat) => {
          const slug = cat.toLowerCase().replace(/\s+/g, '-');
          return (
            <motion.div
              key={cat}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className="relative rounded-2xl overflow-hidden group shadow-lg"
            >
              <img
                src={CATEGORY_HERO[cat]}
                alt={`${cat} hero`}
                className="w-full h-44 object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent" />
              <div className="absolute left-4 bottom-4 flex items-center justify-between w-[calc(100%-32px)]">
                <div>
                  <h3 className="text-white font-semibold text-lg">{cat}</h3>
                  <p className="text-white/70 text-xs mt-1">Explore {cat.toLowerCase()} — {Math.floor(Math.random()*20)+12} samples</p>
                </div>

                <Link
                  to={`/work/category/${slug}`}
                  className="inline-flex items-center gap-2 px-3 py-2 rounded-full bg-white/10 text-white/95 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  aria-label={`View ${cat} samples`}
                >
                  View
                  <IconChevronRight />
                </Link>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

// -------------------------
// MasonryGrid: CSS-columns based masonry with accessibility and graceful fallback
// -------------------------
function MasonryGrid({ items, columnWidth = 320, gap = 20 }) {
  // Calculate column count based on viewport via CSS only (we keep it simple)
  return (
    <div id="samples" className="max-w-7xl mx-auto px-6 pb-20">
      <div
        className="masonry-grid"
        style={{
          columnGap: gap,
          columnWidth: columnWidth,
        }}
      >
        {items.map((it) => (
          <div key={it.id} style={{ breakInside: 'avoid' }} className="mb-5">
            <SampleCard item={it} />
          </div>
        ))}
      </div>

      {/* minimal CSS injection for masonry (Tailwind custom classes are preferred in your project) */}
      <style>{`
        .masonry-grid {
          -webkit-column-gap: ${gap}px;
          column-gap: ${gap}px;
        }
        @media (min-width: 1280px) {
          .masonry-grid { column-width: 360px; }
        }
      `}</style>
    </div>
  );
}

// -------------------------
// SampleCard: the thumbnail card with overlay button and micro-interactions
// -------------------------
function SampleCard({ item }) {
  const navigate = useNavigate();
  const handleViewCategory = (e) => {
    e.preventDefault();
    const slug = item.category.toLowerCase().replace(/\s+/g, '-');
    navigate(`/work/category/${slug}`);
  };

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      whileHover="hover"
      variants={cardHover}
      className="relative rounded-2xl overflow-hidden shadow-xl bg-white/4 focus-within:ring-2 focus-within:ring-indigo-400"
      aria-labelledby={`sample-${item.id}-title`}
    >
      <img src={item.thumbnail} alt={item.alt || item.title} className="w-full h-auto object-cover" loading="lazy" />

      {/* overlay */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/60 to-transparent" aria-hidden />

      <div className="absolute left-4 right-4 bottom-4 flex items-end justify-between gap-3 pointer-events-auto">
        <div>
          <h4 id={`sample-${item.id}-title`} className="text-white font-semibold text-sm md:text-base leading-tight">
            {item.title}
          </h4>
          <div className="text-white/70 text-xs mt-1">{item.client} · {item.year}</div>
        </div>

        <button
          onClick={handleViewCategory}
          className="px-3 py-2 rounded-full bg-white/10 backdrop-blur text-white hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          aria-label={`View more ${item.category} samples`}
        >
          View
        </button>
      </div>
    </motion.article>
  );
}
// === ExtendedWork.jsx (PART 3 of 3) ===
// Main component: combines everything above and wires interactions.

export default function ExtendedWorkPage() {
  useSEO({
    title: 'Extended Work — Pehchaan Media',
    description: 'Curated archive of design samples across branding, web, motion, product and more.',
  });

  // UI state
  const [activeCategory, setActiveCategory] = useState('All');
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState('popular');
  const [selectedTags, setSelectedTags] = useState([]);
  const [showPreview, setShowPreview] = useState(null); // if we wanted a preview modal
  const [useMasonry, setUseMasonry] = useState(true);

  // derive tagset from data
  const tagset = useMemo(() => {
    const t = new Set();
    for (const it of WORK_ITEMS) {
      (it.tags || []).forEach((x) => t.add(x));
    }
    return Array.from(t).sort();
  }, []);

  // All items (we keep data unchanged; this is just presentation layer)
  const allItems = WORK_ITEMS;

  // Filtering + sorting pipeline
  const filtered = useMemo(() => {
    let items = allItems;

    if (activeCategory !== 'All') {
      items = items.filter((i) => i.category === activeCategory);
    }

    if (selectedTags.length) {
      items = items.filter((i) => (i.tags || []).some((t) => selectedTags.includes(t)));
    }

    if (query.trim()) {
      const q = query.toLowerCase().trim();
      items = items.filter((i) => {
        return (
          i.title.toLowerCase().includes(q) ||
          (i.description || '').toLowerCase().includes(q) ||
          (i.client || '').toLowerCase().includes(q) ||
          (i.tags || []).some((t) => t.includes(q)) ||
          String(i.year).includes(q)
        );
      });
    }

    // sort
    if (sort === 'newest') items = items.slice().sort((a, b) => b.year - a.year);
    else if (sort === 'oldest') items = items.slice().sort((a, b) => a.year - b.year);
    else if (sort === 'client') items = items.slice().sort((a, b) => (a.client > b.client ? 1 : -1));
    // 'popular' keeps original order (simulated)

    return items;
  }, [allItems, activeCategory, query, sort, selectedTags]);

  // tag toggle
  const onToggleTag = (t) => {
    setSelectedTags((s) => (s.includes(t) ? s.filter((x) => x !== t) : [...s, t]));
  };

  // keyboard accessible preview modal scaffold (not used heavily, but present)
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => {
      document.documentElement.style.scrollBehavior = '';
    };
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#050305] via-[#071126] to-[#020206] text-white">
      <HeroCarousel heroImages={CATEGORY_HERO} />

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

      {/* Category tiles (overview) */}
      <CategoryTiles categories={CATEGORIES} />

      {/* Controls above samples */}
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between gap-4 py-6">
        <div className="text-sm text-white/80">
          Showing <span className="font-medium">{filtered.length}</span> samples {activeCategory !== 'All' && <>in <span className="font-medium">{activeCategory}</span></>}
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setUseMasonry((s) => !s)}
            className="px-3 py-2 rounded-md bg-white/6 text-white/90 hover:bg-white/8 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            aria-pressed={useMasonry}
          >
            {useMasonry ? 'Masonry' : 'Grid'}
          </button>

          <button
            onClick={() => {
              setActiveCategory('All');
              setQuery('');
              setSelectedTags([]);
              setSort('popular');
            }}
            className="px-3 py-2 rounded-md bg-white/6 text-white/80 hover:bg-white/8 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          >
            Reset
          </button>
        </div>
      </div>

      {/* Samples area (masonry or grid) */}
      <section aria-label="Work samples">
        <AnimatePresence mode="popLayout" initial={false}>
          {useMasonry ? (
            <MasonryGrid key="masonry" items={filtered} columnWidth={320} gap={20} />
          ) : (
            <motion.div
              key="grid"
              className="max-w-7xl mx-auto px-6 pb-24"
              initial="initial"
              animate="animate"
              variants={staggerContainer(0.04)}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filtered.map((it) => (
                  <SampleCard key={it.id} item={it} />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* Optional preview modal (scaffold only) */}
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
            <div className="absolute inset-0 bg-black/70" onClick={() => setShowPreview(null)} />
            <motion.div
              className="relative max-w-4xl w-full bg-[#06060a] rounded-2xl overflow-hidden shadow-xl"
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
            >
              <div className="p-4 flex justify-end">
                <button onClick={() => setShowPreview(null)} className="text-white/80 p-2 rounded-md hover:bg-white/6">
                  <IconClose />
                </button>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold">{showPreview.title}</h3>
                <p className="mt-2 text-white/80">{showPreview.description}</p>
                <img src={showPreview.thumbnail} alt={showPreview.alt} className="mt-4 w-full h-auto rounded-md" />
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
