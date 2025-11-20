// src/utils/mediaType.js
// Utility to guess media type by file extension or content.

export const guessMediaType = (src = "") => {
  if (!src || typeof src !== "string") return "image";
  const ext = src.split(".").pop().split("?")[0].toLowerCase();
  if (["mp4", "webm", "mov", "m4v"].includes(ext)) return "video";
  if (["jpg", "jpeg", "png", "gif", "webp", "avif"].includes(ext)) return "image";
  // fallback: try to detect words
  if (src.includes("video") || src.includes("reel")) return "video";
  return "image";
};
