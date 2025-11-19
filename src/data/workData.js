// src/data/workData.js
// Full workData with placeholder generation (16 items per category).
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

export const WORK_CATEGORIES = CATEGORIES;

// Simple unsplash-like placeholder function (non-sensitive)
const PLACEHOLDER_IMG = (n) =>
  `https://images.unsplash.com/photo-15${900 + (n % 100)}?auto=format&fit=crop&w=1400&q=80`;

// Hero images (placeholders) - one per category
export const CATEGORY_HERO = {
  "Web Redesign": PLACEHOLDER_IMG(21),
  Graphics: PLACEHOLDER_IMG(22),
  "Product Videography": PLACEHOLDER_IMG(23),
  "Product Photography": PLACEHOLDER_IMG(24),
  "Motion Design": PLACEHOLDER_IMG(25),
  "Ad Creatives": PLACEHOLDER_IMG(26),
  "Digital Marketing": PLACEHOLDER_IMG(27),
  "Social Media Management": PLACEHOLDER_IMG(28),
  YouTube: PLACEHOLDER_IMG(29),
};

function idSafe(category, i) {
  return `${category.toLowerCase().replace(/\s+/g, "-")}-${i}`;
}

/**
 * createPlaceholders(category, count)
 * Produces items with a consistent shape your UI expects.
 */
export function createPlaceholders(category, count = 16) {
  const items = [];
  for (let i = 1; i <= count; i++) {
    const id = idSafe(category, i);
    items.push({
      id,
      title: `${category} Sample ${i}`,
      category,
      thumbnail: PLACEHOLDER_IMG(i + category.length),
      sampleUrl: `https://example.com/${id}`,
      description: `${category} sample ${i} — AI-generated placeholder text summarizing purpose, visual approach and expected impact.`,
      client: `${category.split(" ")[0]} Client ${i}`,
      year: 2022 + (i % 4),
      type: `${category} sample`,
      tags: [category.toLowerCase().replace(/\s+/g, "-"), "placeholder", "demo"],
      popularity: Math.floor(60 + Math.random() * 40),
      // every third item gets a demo YouTube embed to populate the reels
      videoEmbed: i % 3 === 0 ? `https://www.youtube.com/embed/dQw4w9WgXcQ?rel=0` : "",
    });
  }
  return items;
}

// Build the mapping
export const WORK_BY_CATEGORY = (function build() {
  const map = {};
  for (const category of CATEGORIES) {
    map[category] = createPlaceholders(category, 16); // 16 items = within 15-20 range
  }
  return map;
})();
