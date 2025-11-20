// src/hooks/useHoverVideo.js
// Hook to manage hover-play/unmute and leave-mute-and-finish behavior for <video> elements.

import { useEffect, useRef } from "react";

/**
 * useHoverVideo
 * - returns ref to attach to <video>
 * - API: const ref = useHoverVideo();
 */
export default function useHoverVideo() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let intendedLoopWhileHover = false;

    const onEnter = async () => {
      // when hover begins -> set loop true (so it feels alive) and unmute
      try {
        el.loop = true;
        el.muted = false;
        // ensure metadata loaded for some browsers
        if (el.readyState >= 2) {
          await el.play().catch(() => {});
        } else {
          el.play().catch(() => {});
        }
        intendedLoopWhileHover = true;
      } catch (err) {
        // ignore
      }
    };

    const onLeave = () => {
      // mute and disable loop; keep playing until it ends (do not pause)
      try {
        el.muted = true;
        el.loop = false;
        intendedLoopWhileHover = false;
      } catch (err) {}
    };

    // phones/touch: clicks handled separately by component
    el.addEventListener("mouseenter", onEnter);
    el.addEventListener("mouseleave", onLeave);

    // cleanup
    return () => {
      el.removeEventListener("mouseenter", onEnter);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return ref;
}
