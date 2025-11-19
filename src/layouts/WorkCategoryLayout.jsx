// src/layouts/WorkCategoryLayout.jsx
import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

export default function WorkCategoryLayout({ title, description, heroImage, children }) {
  return (
    <main className="min-h-screen bg-[#050505] text-white">
      <section className="relative border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-8 md:py-12 flex flex-col gap-6 md:gap-8">
          <div className="flex items-start justify-between gap-4 w-full">
            <div className="flex-1">
              <p className="text-xs uppercase tracking-[0.22em] text-white/50">Extended Work</p>
              <h1 className="text-2xl md:text-4xl font-semibold mt-2 tracking-tight">{title}</h1>
              {description && <p className="text-sm text-white/60 mt-3 max-w-3xl">{description}</p>}
            </div>

            <div className="hidden md:flex items-center justify-end">
              <Link
                to="/work"
                className="text-xs md:text-sm text-white/60 hover:text-white border border-white/15 rounded-full px-4 py-2 transition-all"
              >
                ← Back to categories
              </Link>
            </div>
          </div>

          {heroImage && (
            <div className="w-full overflow-hidden rounded-2xl border border-white/10 mt-6 relative">
              <img src={heroImage} alt={`${title} header`} className="w-full h-56 object-cover opacity-95" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent pointer-events-none" />
            </div>
          )}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 pt-4 md:pt-6">
        <div className="md:hidden mb-4">
          <Link to="/work" className="text-xs text-white/60 hover:text-white border border-white/15 rounded-full px-3 py-1.5 transition-all">
            ← Back to categories
          </Link>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 pb-24">{children}</section>
    </main>
  );
}

WorkCategoryLayout.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  heroImage: PropTypes.string,
  children: PropTypes.node.isRequired,
};
