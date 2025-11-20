// src/data/workdata.js
// Single source of truth for all category media.
// Replace placeholder src/poster links with your real media links.
// Schema:
// {
//   id: "unique-id",
//   src: "https://.../file.mp4 or .jpg",
//   poster: "https://.../poster.jpg" // optional,
//   title: "Short title",
//   tags: ["reel","instagram"],
//   type: "video" | "image" // optional - if omitted it will be guessed by extension
// }

const guessType = (src = "") => {
  const ext = (src.split(".").pop() || "").toLowerCase();
  if (["mp4", "webm", "mov", "m4v"].includes(ext)) return "video";
  return "image";
};

const makeMedia = (idPrefix, i, src, opts = {}) => {
  const item = {
    id: `${idPrefix}-${i + 1}`,
    src,
    title: opts.title || `${idPrefix} sample ${i + 1}`,
    tags: opts.tags || [],
    poster: opts.poster || null,
    type: opts.type || guessType(src),
  };
  return item;
};

// For placeholders I used simple example links. Replace with your CDN/host links.
// Example static placeholders (you WILL replace these):
const IMAGE_PLACEHOLDER = "https://via.placeholder.com/1200x800?text=Image+";
const VIDEO_PLACEHOLDER = "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4";
const VIDEO_POSTER_PLACEHOLDER = "https://via.placeholder.com/1200x800?text=Poster+";

const buildList = (slug, kind) => {
  // generate 15 items, alternating images and videos for sample data
  return new Array(15).fill(null).map((_, i) => {
    const index = i + 1;
    const isVideo = (i % 3 === 0 && kind !== "ProductPhotography"); // sample pattern
    if (isVideo) {
      return makeMedia(slug, i, VIDEO_PLACEHOLDER, {
        poster: `${VIDEO_POSTER_PLACEHOLDER}${index}`,
        tags: ["reel"],
        type: "video",
      });
    } else {
      return makeMedia(slug, i, `${IMAGE_PLACEHOLDER}${index}`, {
        tags: ["image"],
        type: "image",
      });
    }
  });
};

export const WORK_CATEGORIES = [
  {
    slug: "ad-creatives",
    title: "Ad Creatives",
    description: "Short caption or intro for Ad Creatives.",
    media: buildList("adcreatives", "AdCreatives"),
  },
  {
    slug: "digital-marketing",
    title: "Digital Marketing",
    description: "Campaigns, analytics and creative assets.",
    media: buildList("digitalmarketing", "DigitalMarketing"),
  },
  {
    slug: "graphics",
    title: "Graphics",
    description: "Branding and graphic design samples.",
    media: buildList("graphics", "Graphics"),
  },
  {
    slug: "motion-design",
    title: "Motion Design",
    description: "Motion and animation work.",
    media: buildList("motiondesign", "MotionDesign"),
  },
  {
    slug: "product-photography",
    title: "Product Photography",
    description: "Studio photography & product shots.",
    media: buildList("productphotography", "ProductPhotography"),
  },
  {
    slug: "product-videography",
    title: "Product Videography",
    description: "Product videos and teasers.",
    media: buildList("productvideography", "ProductVideography"),
  },
  {
    slug: "social-media-management",
    title: "Social Media Management",
    description: "Content packs and creative calendars.",
    media: buildList("socialmedia", "SocialMediaManagement"),
  },
  {
    slug: "web-redesign",
    title: "Web Redesign",
    description: "Website redesign case studies and assets.",
    media: buildList("webredesign", "WebRedesign"),
  },
  {
    slug: "youtube",
    title: "YouTube",
    description: "Long-form / short-form video samples for YouTube.",
    media: buildList("youtube", "YouTube"),
  },
];

export default WORK_CATEGORIES;
