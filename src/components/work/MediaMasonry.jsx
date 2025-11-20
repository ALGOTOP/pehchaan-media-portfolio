// src/components/work/MediaMasonry.jsx
import React, { useState } from "react";
import MediaCard from "./MediaCard.jsx";
import MediaModal from "./MediaModal.jsx";

/**
 * Masonry using CSS columns for performance.
 * Props:
 * - items: array of media items (id, media, title, caption, client, year)
 * - initialFilter: 'all' | 'images' | 'videos'
 */
export default function MediaMasonry({ items = [], initialFilter = "all" }) {
  const [filter, setFilter] = useState(initialFilter);
  const [modalItem, setModalItem] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const isVideoUrl = (url) => {
    if (!url) return false;
    const u = url.toLowerCase();
    if (u.includes("youtube.com") || u.includes("youtu.be") || u.includes("vimeo.com")) return true;
    return /\.mp4|\.webm|\.mov|\.m3u8/i.test(u);
  };

  const filtered = items.filter((it) => {
    if (filter === "all") return true;
    if (filter === "images") return !isVideoUrl(it.media);
    if (filter === "videos") return isVideoUrl(it.media);
    return true;
  });

  const openModal = (item) => {
    setModalItem(item);
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
    setModalItem(null);
  };

  // CSS columns style inlined (tailwind classes plus custom style)
  const colStyle = {
    columnGap: "1.25rem",
    MozColumnGap: "1.25rem",
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <button onClick={() => setFilter("all")} className={`px-3 py-1 rounded-full text-sm ${filter === "all" ? "bg-white/6 text-white" : "text-white/60"}`}>All</button>
          <button onClick={() => setFilter("images")} className={`px-3 py-1 rounded-full text-sm ${filter === "images" ? "bg-white/6 text-white" : "text-white/60"}`}>Images</button>
          <button onClick={() => setFilter("videos")} className={`px-3 py-1 rounded-full text-sm ${filter === "videos" ? "bg-white/6 text-white" : "text-white/60"}`}>Reels</button>
        </div>
        <div className="text-xs text-white/50">{filtered.length} items</div>
      </div>

      <div
        className="masonry"
        style={colStyle}
      >
        {filtered.map((it) => (
          <MediaCard key={it.id} item={it} onOpen={openModal} />
        ))}
      </div>

      <style jsx>{`
        .masonry {
          column-count: 1;
        }
        @media (min-width: 700px) {
          .masonry {
            column-count: 2;
          }
        }
        @media (min-width: 1100px) {
          .masonry {
            column-count: 3;
          }
        }
        /* ensure masonry children do not break */
        .masonry > * {
          display: inline-block;
          width: 100%;
        }
      `}</style>

      <MediaModal open={modalOpen} onClose={closeModal} item={modalItem} />
    </div>
  );
}
