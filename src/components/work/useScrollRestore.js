// src/components/work/useScrollRestore.js
import { useEffect } from "react";

export default function useScrollRestore() {
  useEffect(() => {
    const saved = sessionStorage.getItem("extendedWorkScroll");

    if (saved) window.scrollTo(0, parseInt(saved, 10));

    const handle = () =>
      sessionStorage.setItem("extendedWorkScroll", window.scrollY);

    window.addEventListener("scroll", handle);
    return () => window.removeEventListener("scroll", handle);
  }, []);
}
