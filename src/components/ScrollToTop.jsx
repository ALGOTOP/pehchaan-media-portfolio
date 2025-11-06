// src/components/ScrollToTop.jsx
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // If lenis is present on window (we expose it in App.jsx below), use it for smooth scrolling.
    const lenis = window.__lenis;

    if (lenis && typeof lenis.scrollTo === "function") {
      // small timeout to allow route/DOM to settle
      setTimeout(() => {
        try {
          lenis.scrollTo(0, { duration: 600, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
        } catch (e) {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      }, 12);
    } else {
      // Fallback native smooth scroll
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, 12);
    }
  }, [pathname]);

  return null;
}
