// src/data/workData.js

export const CATEGORIES = [
  "Web Redesign",
  "Graphics",
  "Product Videography",
  "Product Photography",
  "Motion Design",
  "Ad Creatives",
  "Digital Marketing",
  "Social Media Management",
  "YouTube",
];

// ---- Temporary placeholder thumbnails ----
// You can replace these later with your real links.

const placeholder = (id) =>
  `https://images.unsplash.com/photo-155${1000 + id}-aac?auto=format&fit=crop&w=1200&q=60`;

// ---- WORK ITEMS ----
// These are all placeholders. You can replace them with real URLs later.

export const WORK_ITEMS = [
  {
    id: 1,
    title: "E-Commerce Style Revamp",
    category: "Web Redesign",
    thumbnail: placeholder(1),
    description:
      "A conversion-focused redesign blending premium aesthetics with UX clarity. Placeholder only — replace later.",
  },
  {
    id: 2,
    title: "Luxury Branding Poster",
    category: "Graphics",
    thumbnail: placeholder(2),
    description:
      "A high-contrast luxury visual identity piece. Placeholder only — you will replace this later.",
  },
  {
    id: 3,
    title: "Cinematic Product Reel",
    category: "Product Videography",
    thumbnail: placeholder(3),
    description: "Short-form cinematic storytelling. Placeholder only.",
  },
  {
    id: 4,
    title: "Premium Product Photo Set",
    category: "Product Photography",
    thumbnail: placeholder(4),
    description: "Studio-grade product photography. Placeholder only.",
  },
  {
    id: 5,
    title: "Animated Logo Sequence",
    category: "Motion Design",
    thumbnail: placeholder(5),
    description: "Smooth, energetic motion identity. Placeholder.",
  },
  {
    id: 6,
    title: "High-Converting Ad Creatives",
    category: "Ad Creatives",
    thumbnail: placeholder(6),
    description: "CTR-optimized ad visuals. Placeholder.",
  },
  {
    id: 7,
    title: "Performance Marketing Shots",
    category: "Digital Marketing",
    thumbnail: placeholder(7),
    description: "Audience-driven digital campaign. Placeholder.",
  },
  {
    id: 8,
    title: "SMM Visual Grid Layout",
    category: "Social Media Management",
    thumbnail: placeholder(8),
    description: "Consistent identity-driven social layout. Placeholder.",
  },
  {
    id: 9,
    title: "YouTube Thumbnail Pack",
    category: "YouTube",
    thumbnail: placeholder(9),
    description: "Click-through optimized video thumbnails. Placeholder.",
  },
];

// Filtered items by category
export const getWorkByCategory = (category) =>
  WORK_ITEMS.filter((w) => w.category === category);
