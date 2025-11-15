// src/hooks/useScrollRestore.js
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * useScrollRestore
 * Stores scroll position on route change and restores it when user navigates back.
 * Applied specifically on highly interactive pages like /work-detailed.
 */
export default function useScrollRestore() {
  const location = useLocation();
  const KEY = `scroll-pos:${location.pathname}`;

  // Restore on mount
  useEffect(() => {
    const saved = sessionStorage.getItem(KEY);
    if (saved) {
      const y = parseInt(saved, 10);
      requestAnimationFrame(() => {
        window.scrollTo({ top: y, behavior: "instant" });
      });
    }
  }, [location.pathname]);

  // Save on unmount
  useEffect(() => {
    return () => {
      sessionStorage.setItem(KEY, window.scrollY.toString());
    };
  }, [location.pathname]);

  return null;
}
