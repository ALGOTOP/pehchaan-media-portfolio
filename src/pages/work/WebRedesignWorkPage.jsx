// src/pages/work/WebRedesignWorkPage.jsx
import React from "react";
import WorkCategoryLayout from "@/layouts/WorkCategoryLayout";
import MediaMasonry from "@/components/work/MediaMasonry";
import { CATEGORY_HERO } from "@/data/workData";

const ITEMS = [
  // 15 placeholders (mix of images and mp4 / youtube)
  { id: "wr-1", media: "https://picsum.photos/seed/wr1/1200/1600", title: "E-Commerce Revamp - Hero", caption: "Homepage redesign focusing on conversion.", client: "Atlas E-Com", year: 2024 },
  { id: "wr-2", media: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4", title: "Product Hero Loop", caption: "Hero loop used in product pages.", client: "Atlas E-Com", year: 2024 },
  { id: "wr-3", media: "https://picsum.photos/seed/wr3/1200/900", title: "Checkout Flow UI", caption: "Streamlined checkout microcopy and layout.", client: "Atlas E-Com", year: 2023 },
  { id: "wr-4", media: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4", title: "Microinteraction Demo", caption: "Subtle attention-grabbing micro-interaction.", client: "Atlas E-Com", year: 2024 },
  { id: "wr-5", media: "https://picsum.photos/seed/wr5/1000/1400", title: "Product Grid Exploration", caption: "Hierarchy and spacing explorations.", client: "Atlas E-Com", year: 2022 },
  { id: "wr-6", media: "https://picsum.photos/seed/wr6/1000/700", title: "Mobile Nav UI", caption: "Mobile-first navigation pattern.", client: "Atlas E-Com", year: 2024 },
  { id: "wr-7", media: "https://samplelib.com/lib/preview/mp4/sample-5s.mp4", title: "Animated CTA A/B", caption: "Short test video for CTA variants.", client: "Atlas E-Com", year: 2024 },
  { id: "wr-8", media: "https://picsum.photos/seed/wr8/1200/1000", title: "Product Detail Variants", caption: "Different hero treatments for product pages.", client: "Atlas E-Com", year: 2023 },
  { id: "wr-9", media: "https://picsum.photos/seed/wr9/900/1300", title: "Checkout Microcopy", caption: "UX writing samples in checkout.", client: "Atlas E-Com", year: 2022 },
  { id: "wr-10", media: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4", title: "Performance Audit Clip", caption: "Before/after performance summary clip.", client: "Atlas E-Com", year: 2024 },
  { id: "wr-11", media: "https://picsum.photos/seed/wr11/1100/800", title: "Visual Language Tile", caption: "Color and type system sample.", client: "Atlas E-Com", year: 2021 },
  { id: "wr-12", media: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4", title: "Flow Prototype", caption: "Prototype demonstration.", client: "Atlas E-Com", year: 2023 },
  { id: "wr-13", media: "https://picsum.photos/seed/wr13/1200/900", title: "Landing Concepts", caption: "Conversion-oriented landing variations.", client: "Atlas E-Com", year: 2024 },
  { id: "wr-14", media: "https://picsum.photos/seed/wr14/1200/1600", title: "Navigation Experiment", caption: "Mega nav vs condensed nav tests.", client: "Atlas E-Com", year: 2023 },
  { id: "wr-15", media: "https://samplelib.com/lib/preview/mp4/sample-5s.mp4", title: "UX Flow Clip", caption: "Short walkthrough of new flows.", client: "Atlas E-Com", year: 2024 }
];

export default function WebRedesignWorkPage() {
  return (
    <WorkCategoryLayout
      title="Web Redesign"
      description="Conversion-focused redesigns — visual language, UX flows and performance."
      heroImage={CATEGORY_HERO["Web Redesign"]}
    >
      <div className="mt-6">
        <MediaMasonry items={ITEMS} />
      </div>
    </WorkCategoryLayout>
  );
}
