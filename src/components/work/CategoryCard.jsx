// src/components/work/CategoryCard.jsx
import React from "react";
import { motion } from "framer-motion";
import PropTypes from "prop-types";

/**
 * CategoryCard
 * - title: string
 * - subtitle: string
 * - onClick: fn
 * - accent: CSS gradient string
 *
 * Designed to be visually rich: glass surface, soft neon accent, sheen.
 */
export default function CategoryCard({ title, subtitle, onClick, accent }) {
  return (
    <motion.button
      onClick={() => onClick(title)}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      className="group relative w-72 h-40 rounded-2xl p-6 overflow-hidden bg-[rgba(255,255,255,0.02)] border border-white/6 backdrop-blur-sm card-sheen"
      aria-label={`Open category ${title}`}
      type="button"
    >
      {/* decorative accent */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{ mixBlendMode: "screen" }}
      >
        <div
          className="absolute -left-10 -top-6 w-48 h-48 rounded-full opacity-30"
          style={{ background: accent }}
        />
      </div>

      {/* content */}
      <div className="relative z-10 flex flex-col h-full justify-between">
        <div>
          <h4 className="text-white text-lg font-semibold tracking-tight leading-tight">{title}</h4>
          <p className="mt-2 text-sm text-gray-300/80 leading-snug">{subtitle}</p>
        </div>

        <div className="flex items-center justify-between">
          <div className="text-xs text-gray-400">Selected • curated</div>
          <div className="text-xs text-gray-400 opacity-80">View →</div>
        </div>
      </div>
    </motion.button>
  );
}

CategoryCard.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  accent: PropTypes.string,
};

CategoryCard.defaultProps = {
  subtitle: "",
  accent: "linear-gradient(135deg,#495CFF33,#A879FF22)",
};
