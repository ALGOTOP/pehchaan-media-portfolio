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

// ---- Premium placeholder generator ----
const placeholder = (id) =>
  `https://images.unsplash.com/photo-15${900 + id}random?auto=format&fit=crop&w=1400&q=80`;

export const WORK_ITEMS = [
  {
    id: 1,
    title: "E-Commerce Revamp",
    category: "Web Redesign",
    thumbnail: placeholder(1),
    description:
      "A luxury conversion-maximised UI/UX revamp built around clarity, hierarchy and premium dark neo-aesthetic.",
  },
  {
    id: 2,
    title: "Luxury Brand Poster",
    category: "Graphics",
    thumbnail: placeholder(2),
    description: "High-contrast brand identity visual crafted for impact.",
  },
  {
    id: 3,
    title: "Cinematic Reel",
    category: "Product Videography",
    thumbnail: placeholder(3),
    description: "Fluid slow-motion product storytelling with cinematic lighting.",
  },
  {
    id: 4,
    title: "Premium Photo Set",
    category: "Product Photography",
    thumbnail: placeholder(4),
    description: "Studio-grade photographs focused on material richness.",
  },
  {
    id: 5,
    title: "Animated Logo ID",
    category: "Motion Design",
    thumbnail: placeholder(5),
    description: "A hyper-smooth identity reveal with luxury easing curves.",
  },
  {
    id: 6,
    title: "Ad Creative Pack",
    category: "Ad Creatives",
    thumbnail: placeholder(6),
    description: "CTR-driven creative pack engineered for scroll-stopping impact.",
  },
  {
    id: 7,
    title: "Marketing Visuals",
    category: "Digital Marketing",
    thumbnail: placeholder(7),
    description: "Performance-oriented visual angles for paid campaigns.",
  },
  {
    id: 8,
    title: "SMM Layout System",
    category: "Social Media Management",
    thumbnail: placeholder(8),
    description: "Identity-driven social grid with consistency rules.",
  },
  {
    id: 9,
    title: "YouTube Thumbnail Kit",
    category: "YouTube",
    thumbnail: placeholder(9),
    description: "Click-through focused visual system for channel growth.",
  },
];

export const getWorkByCategory = (category) =>
  WORK_ITEMS.filter((w) => w.category === category);
