// src/components/work/CategoryHeader.jsx
import React from "react";
import CategoryCard from "./CategoryCard";
import { CATEGORIES } from "../../data/workData";

export default function CategoryHeader({ onSelect }) {
  const ACCENTS = [
    "linear-gradient(135deg,#495CFF88,#A879FF44)",
    "linear-gradient(135deg,#00E8FF66,#495CFF33)",
    "linear-gradient(135deg,#A879FF88,#FF7AC666)",
    "linear-gradient(135deg,#FF7AC688,#A879FF44)",
    "linear-gradient(135deg,#00E8FF44,#A879FF88)",
  ];

  const cats = CATEGORIES || [];

  return (
    <section aria-label="Work categories" className="pt-6 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-6">
          <div className="flex items-baseline justify-between gap-4">
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              Explore by Category
            </h2>
            <p className="text-sm text-gray-400 max-w-lg hidden md:block">
              Targeted case highlights across disciplines — design systems,
              motion, product, and growth.
            </p>
          </div>
        </div>

        <div className="relative">
          {/* horizontal scroll container */}
          <div className="flex gap-6 overflow-x-auto pb-3 -ml-1">
            {cats.map((cat, i) => (
              <div key={cat} className="flex-shrink-0">
                <CategoryCard
                  title={cat}
                  subtitle={`Selected ${cat} projects`}
                  accent={ACCENTS[i % ACCENTS.length]}
                  onClick={onSelect}
                />
              </div>
            ))}
          </div>

          {/* optional small indicator for scroll (desktop hidden) */}
          <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 pr-2 pointer-events-none">
            <div className="w-10 h-24 bg-gradient-to-l from-black/0 to-black/50 rounded-l-xl" />
          </div>
        </div>
      </div>
    </section>
  );
}
