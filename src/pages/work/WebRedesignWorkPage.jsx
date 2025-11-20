// src/pages/work/WebRedesignWorkPage.jsx
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import WorkCategoryLayout from "@/layouts/WorkCategoryLayout";
import WorkReel from "@/components/work/WorkReel";
import { WORK_BY_CATEGORY, CATEGORY_HERO } from "@/data/workData";

/**
 * Mixed Grid: 3 columns desktop, every 4th item spans 2 cols x 2 rows (tall)
 * Items show image/video, title, category and short caption
 */

export default function WebRedesignWorkPage() {
  const categoryName = "Web Redesign";
  const heroImage = CATEGORY_HERO?.[categoryName];
  const items = WORK_BY_CATEGORY?.[categoryName] || [];

  // Build reel (use items with videoEmbed)
  const reelItems = items.filter((i) => i.videoEmbed).slice(0, 8).map((it, idx) => ({
    id: `web-reel-${idx}`,
    title: it.title,
    embedUrl: it.videoEmbed,
    thumbnail: it.thumbnail,
    client: it.client,
  }));

  return (
    <WorkCategoryLayout
      title={categoryName}
      description="Conversion-focused redesigns — visual systems, UX flows and hierarchy focused on measurable lift."
      heroImage={heroImage}
    >
      <div className="mt-6">
        <div className="flex items-center justify-between gap-4">
          <p className="text-sm text-white/60">Web design projects, full-site builds and CRO-first redesigns.</p>
          <Link to="/work" className="text-xs text-white/60 hover:text-white border border-white/10 rounded-full px-3 py-2">Back to categories</Link>
        </div>

        {/* Reel */}
        {reelItems.length > 0 && (
          <div className="mt-6">
            <WorkReel items={reelItems} />
          </div>
        )}

        {/* Mixed Grid */}
        <div className="mt-8">
          <h3 className="text-sm text-white/60 uppercase tracking-wide mb-4">Project Gallery</h3>

          <div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 auto-rows-fr"
            // auto-rows-fr gives consistent row sizing for spans
          >
            {items.map((it, idx) => {
              // mixed layout: every 4th item is large
              const isTall = (idx + 1) % 4 === 0;
              const spanClasses = isTall ? "md:col-span-2 md:row-span-2" : "md:col-span-1 md:row-span-1";

              return (
                <motion.a
                  key={it.id}
                  href={it.sampleUrl || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -6 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className={`group block rounded-2xl overflow-hidden border border-white/8 bg-gradient-to-br from-white/2 to-black/10 ${spanClasses}`}
                >
                  <div className={`relative w-full h-56 ${isTall ? "md:h-full" : ""}`}>
                    {/* Show iframe if videoEmbed exists and is intended for inline preview */}
                    {it.videoEmbed ? (
                      <>
                        <img src={it.thumbnail} alt={it.title} className="w-full h-full object-cover" loading="lazy" />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-16 h-16 rounded-full bg-black/60 flex items-center justify-center opacity-90 group-hover:scale-105 transition-transform">
                            <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none"><path d="M8 5v14l11-7L8 5z" fill="currentColor"/></svg>
                          </div>
                        </div>
                      </>
                    ) : (
                      <img src={it.thumbnail} alt={it.title} className="w-full h-full object-cover" loading="lazy" />
                    )}
                  </div>

                  <div className="p-4">
                    <h4 className="text-sm font-semibold leading-tight">{it.title}</h4>
                    <p className="text-xs text-white/60 mt-1">{it.client} • {it.year}</p>
                    <p className="text-xs text-white/60 mt-2 line-clamp-3">{it.description}</p>
                  </div>
                </motion.a>
              );
            })}
          </div>
        </div>
      </div>
    </WorkCategoryLayout>
  );
}
