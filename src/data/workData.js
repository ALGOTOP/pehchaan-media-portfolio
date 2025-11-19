// src/data/workData.js

// ===== Extended Work Data (NOT case studies) =====

// Base category list used across ExtendedWork, filters, and showcases
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

// Alias for components that expect WORK_CATEGORIES
export const WORK_CATEGORIES = CATEGORIES;

// ---- Premium placeholder generator ----
// You can later replace with real image URLs
const placeholder = (id) =>
  `https://images.unsplash.com/photo-15${900 + id}random?auto=format&fit=crop&w=1400&q=80`;

// Hero / cover image for each category (used in hero + category showcase)
export const CATEGORY_HERO = {
  "Web Redesign": placeholder(21),
  Graphics: placeholder(22),
  "Product Videography": placeholder(23),
  "Product Photography": placeholder(24),
  "Motion Design": placeholder(25),
  "Ad Creatives": placeholder(26),
  "Digital Marketing": placeholder(27),
  "Social Media Management": placeholder(28),
  YouTube: placeholder(29),
};

// Core extended work items.
// You can freely add more items later for each category (aim for 15–20 per category).
export const WORK_ITEMS = [
  {
    id: 1,
    title: "E-Commerce Revamp",
    category: "Web Redesign",
    thumbnail: placeholder(1),
    sampleUrl: placeholder(101),
    description:
      "A luxury conversion-maximised UI/UX revamp built around clarity, hierarchy and premium dark neo-aesthetic.",
    client: "Atlas E-Com",
    year: 2024,
    type: "Full Web Redesign",
    tags: ["web", "ecommerce", "ui/ux", "revamp"],
    popularity: 96,
  },
  {
    id: 2,
    title: "Luxury Brand Poster",
    category: "Graphics",
    thumbnail: placeholder(2),
    sampleUrl: placeholder(102),
    description:
      "High-contrast brand identity visual crafted for impact in both digital and print.",
    client: "Noir Studio",
    year: 2023,
    type: "Campaign Visual",
    tags: ["poster", "print", "branding"],
    popularity: 90,
  },
  {
    id: 3,
    title: "Cinematic Reel",
    category: "Product Videography",
    thumbnail: placeholder(3),
    sampleUrl: placeholder(103),
    description:
      "Fluid slow-motion product storytelling with cinematic lighting and close-up hero shots.",
    client: "Mi-Vida",
    year: 2023,
    type: "Product Reel",
    tags: ["reels", "video", "slow motion"],
    popularity: 92,
  },
  {
    id: 4,
    title: "Premium Photo Set",
    category: "Product Photography",
    thumbnail: placeholder(4),
    sampleUrl: placeholder(104),
    description:
      "Studio-grade photographs focused on material richness, reflections and subtle grain.",
    client: "Aurora Home",
    year: 2022,
    type: "Studio Photoshoot",
    tags: ["photography", "studio", "products"],
    popularity: 88,
  },
  {
    id: 5,
    title: "Animated Logo ID",
    category: "Motion Design",
    thumbnail: placeholder(5),
    sampleUrl: placeholder(105),
    description:
      "A hyper-smooth identity reveal with luxury easing curves and chromatic blurs.",
    client: "Pehchaan Internal",
    year: 2024,
    type: "Logo Animation",
    tags: ["motion", "logo", "reveal"],
    popularity: 94,
  },
  {
    id: 6,
    title: "Ad Creative Pack",
    category: "Ad Creatives",
    thumbnail: placeholder(6),
    sampleUrl: placeholder(106),
    description:
      "CTR-driven creative pack engineered for scroll-stopping impact and fast iteration.",
    client: "GrowthFlow",
    year: 2023,
    type: "Performance Ads",
    tags: ["ads", "creatives", "performance"],
    popularity: 89,
  },
  {
    id: 7,
    title: "Marketing Visuals",
    category: "Digital Marketing",
    thumbnail: placeholder(7),
    sampleUrl: placeholder(107),
    description:
      "Performance-oriented visual angles for paid campaigns across multiple platforms.",
    client: "Northline",
    year: 2022,
    type: "Campaign Kit",
    tags: ["marketing", "campaign", "assets"],
    popularity: 87,
  },
  {
    id: 8,
    title: "SMM Layout System",
    category: "Social Media Management",
    thumbnail: placeholder(8),
    sampleUrl: placeholder(108),
    description:
      "Identity-driven social grid with typography rules, spacing system and content pillars.",
    client: "Linea Studio",
    year: 2024,
    type: "SMM System",
    tags: ["smm", "grid", "system"],
    popularity: 93,
  },
  {
    id: 9,
    title: "YouTube Thumbnail Kit",
    category: "YouTube",
    thumbnail: placeholder(9),
    sampleUrl: placeholder(109),
    description:
      "Click-through focused visual system for channel growth and episodic series.",
    client: "Creator Hub",
    year: 2023,
    type: "Thumbnail System",
    tags: ["youtube", "thumbnail", "content"],
    popularity: 91,
  },
];

// Helper: list by category
export const getWorkByCategory = (category) =>
  WORK_ITEMS.filter((w) => w.category === category);

// Map-style structure for components that expect WORK_BY_CATEGORY
export const WORK_BY_CATEGORY = WORK_CATEGORIES.reduce((acc, category) => {
  acc[category] = getWorkByCategory(category);
  return acc;
}, {});
