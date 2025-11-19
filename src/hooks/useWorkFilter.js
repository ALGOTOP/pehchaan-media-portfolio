// src/hooks/useWorkFilter.js
import { useMemo } from "react";
import { ALL_WORK_ITEMS, normalizeWorkItem } from "@/data/workData";

/**
 * useWorkFilter
 *
 * Centralized filter/sort logic for the Extended Work archive.
 * You can feed it:
 * - category
 * - searchQuery
 * - selectedTags (array)
 * - sortMode
 * - sourceItems (optional) – if you want to pass a custom list (e.g. only Graphics).
 */
export function useWorkFilter({
  category = "All",
  searchQuery = "",
  selectedTags = [],
  sortMode = "featured", // 'featured' | 'recent' | 'oldest' | 'alpha'
  sourceItems = ALL_WORK_ITEMS, // default: use everything
} = {}) {
  const normalizedSource = useMemo(
    () => sourceItems.map(normalizeWorkItem),
    [sourceItems]
  );

  const query = searchQuery.trim().toLowerCase();

  const filtered = useMemo(() => {
    return normalizedSource
      .filter((item) => {
        // 1) Category filter (if not "All")
        if (category && category !== "All" && category !== "Everything") {
          if (item.category !== category) return false;
        }

        // 2) Tag filter (all selected tags must be present)
        if (selectedTags.length > 0) {
          const tagsLower = (item.tags || []).map((t) => t.toLowerCase());
          const hasAllTags = selectedTags.every((tag) =>
            tagsLower.includes(tag.toLowerCase())
          );
          if (!hasAllTags) return false;
        }

        // 3) Text search: title, client, category, type, tags, description
        if (query) {
          const haystack = [
            item.title,
            item.client,
            item.category,
            item.type,
            item.description,
            ...(item.tags || []),
          ]
            .join(" ")
            .toLowerCase();

          if (!haystack.includes(query)) return false;
        }

        return true;
      })
      .sort((a, b) => {
        // 4) Sorting
        switch (sortMode) {
          case "recent":
            return Number(b.year || 0) - Number(a.year || 0);
          case "oldest":
            return Number(a.year || 0) - Number(b.year || 0);
          case "alpha":
            return (a.title || "").localeCompare(b.title || "");
          case "featured":
          default:
            // Use popularity as "featured" signal. Tie-breaker = recent.
            if (b.popularity !== a.popularity) {
              return b.popularity - a.popularity;
            }
            return Number(b.year || 0) - Number(a.year || 0);
        }
      });
  }, [normalizedSource, category, query, selectedTags, sortMode]);

  return {
    items: filtered,
    count: filtered.length,
  };
}
