// src/hooks/useWorkFilter.js
import { useMemo, useState } from "react";

/**
 * useWorkFilter
 * @param {Array} initialList - array of media items
 * @param {Object} opts - { defaultType: 'all' }
 *
 * Returns:
 *  { list, setTypeFilter, typeFilter, setSearch, search, setTagFilter, tagFilter }
 */
export default function useWorkFilter(initialList = [], opts = {}) {
  const [typeFilter, setTypeFilter] = useState(opts.defaultType || "all"); // "all" | "image" | "video"
  const [search, setSearch] = useState("");
  const [tagFilter, setTagFilter] = useState("all"); // for future use

  const list = useMemo(() => {
    let out = initialList || [];

    if (typeFilter === "image") {
      out = out.filter((m) => (m.type || guessTypeFromSrc(m.src)) === "image");
    } else if (typeFilter === "video") {
      out = out.filter((m) => (m.type || guessTypeFromSrc(m.src)) === "video");
    }

    if (tagFilter !== "all") {
      out = out.filter((m) => (m.tags || []).includes(tagFilter));
    }

    if (search && search.trim()) {
      const s = search.trim().toLowerCase();
      out = out.filter(
        (m) =>
          (m.title || "").toLowerCase().includes(s) ||
          (m.tags || []).join(" ").toLowerCase().includes(s)
      );
    }

    return out;
  }, [initialList, typeFilter, search, tagFilter]);

  return {
    list,
    typeFilter,
    setTypeFilter,
    search,
    setSearch,
    tagFilter,
    setTagFilter,
  };
}

// helper (same logic as in workdata)
const guessTypeFromSrc = (src = "") => {
  const ext = (src.split(".").pop() || "").toLowerCase();
  if (["mp4", "webm", "mov", "m4v"].includes(ext)) return "video";
  return "image";
};
