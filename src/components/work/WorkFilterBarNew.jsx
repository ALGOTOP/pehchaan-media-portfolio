// src/components/work/FilterBar.jsx
import React from "react";

export default function FilterBar({ filter, setFilter }) {
  return (
    <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
      <div className="inline-flex items-center gap-2">
        <button
          onClick={() => setFilter("all")}
          className={`px-3 py-1.5 rounded-full text-sm transition ${
            filter === "all" ? "bg-white/6 text-white" : "text-white/60 bg-transparent"
          }`}
          aria-pressed={filter === "all"}
        >
          All
        </button>
        <button
          onClick={() => setFilter("images")}
          className={`px-3 py-1.5 rounded-full text-sm transition ${
            filter === "images" ? "bg-white/6 text-white" : "text-white/60 bg-transparent"
          }`}
          aria-pressed={filter === "images"}
        >
          Images
        </button>
        <button
          onClick={() => setFilter("videos")}
          className={`px-3 py-1.5 rounded-full text-sm transition ${
            filter === "videos" ? "bg-white/6 text-white" : "text-white/60 bg-transparent"
          }`}
          aria-pressed={filter === "videos"}
        >
          Reels
        </button>
      </div>
    </div>
  );
}
