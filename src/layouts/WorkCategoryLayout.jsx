// src/layouts/WorkCategoryLayout.jsx
import React from "react";

/**
 * WorkCategoryLayout
 * Props:
 *  - category: { title, description }
 *  - children: media grid
 *  - filterControls: optional area for filter buttons (pass your filter UI)
 */
export default function WorkCategoryLayout({ category = {}, children, filterControls }) {
  return (
    <main className="work-category-page min-h-screen">
      <header className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-6">
          <h1 className="text-4xl font-semibold tracking-tight">{category.title}</h1>
          {category.description && (
            <p className="mt-2 text-gray-500 max-w-2xl">{category.description}</p>
          )}
        </div>

        <div className="flex items-center justify-between gap-4">
          {/* Left: filter controls (passed from page) */}
          <div>{filterControls}</div>

          {/* Right: small meta */}
          <div className="text-sm text-gray-500">Showing {category.media?.length ?? 0} samples</div>
        </div>
      </header>

      <section className="max-w-7xl mx-auto px-6 pb-20">{children}</section>
    </main>
  );
}
