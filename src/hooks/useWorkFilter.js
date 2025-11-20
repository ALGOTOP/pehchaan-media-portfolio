// src/hooks/useWorkFilter.js
import { useMemo, useState } from "react";
import { guessMediaType } from "../utils/mediaType";

/**
 * useWorkFilter
 * - initialList: array of media items
 * - returns: { list, typeFilter, setTypeFilter, search, setSearch }
 */
export default function useWorkFilter(initialList = []) {
  const [typeFilter, setTypeFilter] = useState("all"); // all | image | video
  const [search, setSearch] = useState("");

  const list = useMemo(() => {
    if (!Array.isArray(initialList)) return [];
    let out = [...initialList];

    if (typeFilter === "image") {
      out = out.filter((m) => (m.type ? m.type === "image" : guessMediaType(m.src) === "image"));
    } else if (typeFilter === "video") {
      out = out.filter((m) => (m.type ? m.type === "video" : guessMediaType(m.src) === "video"));
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
  }, [initialList, typeFilter, search]);

  return { list, typeFilter, setTypeFilter, search, setSearch };
}
