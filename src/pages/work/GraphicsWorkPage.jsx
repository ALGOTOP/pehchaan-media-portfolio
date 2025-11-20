// src/pages/work/GraphicsWorkPage.jsx
import React from "react";
import WorkCategoryLayout from "@/layouts/WorkCategoryLayout";
import MediaMasonry from "@/components/work/MediaMasonry";
import { CATEGORY_HERO } from "@/data/workData";

const ITEMS = [
  { id: "g-1", media: "https://picsum.photos/seed/g1/1200/1400", title: "Branding: Mark Study", caption: "Mark variations and lockups.", client: "Velo", year: 2024 },
  { id: "g-2", media: "https://picsum.photos/seed/g2/1200/800", title: "Campaign Poster", caption: "Large-format poster design.", client: "Velo", year: 2023 },
  { id: "g-3", media: "https://samplelib.com/lib/preview/mp4/sample-5s.mp4", title: "Animated Micro-ID", caption: "Short animated logo.", client: "Velo", year: 2024 },
  { id: "g-4", media: "https://picsum.photos/seed/g4/1000/1300", title: "Packaging Mock", caption: "Label and dieline mockups.", client: "Velo", year: 2023 },
  { id: "g-5", media: "https://picsum.photos/seed/g5/1100/900", title: "Social Carousel", caption: "Carousel design suite.", client: "Velo", year: 2024 },
  { id: "g-6", media: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4", title: "Motion Poster", caption: "Short motion poster loop.", client: "Velo", year: 2022 },
  { id: "g-7", media: "https://picsum.photos/seed/g7/1200/900", title: "Icon Set", caption: "Custom iconography exploration.", client: "Velo", year: 2021 },
  { id: "g-8", media: "https://picsum.photos/seed/g8/1200/1600", title: "Editorial Spread", caption: "Layout and typography study.", client: "Velo", year: 2023 },
  { id: "g-9", media: "https://picsum.photos/seed/g9/1300/900", title: "Poster Variant", caption: "Alternate poster concepts.", client: "Velo", year: 2024 },
  { id: "g-10", media: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4", title: "Animated CTA", caption: "Micro animation for CTAs.", client: "Velo", year: 2024 },
  { id: "g-11", media: "https://picsum.photos/seed/g11/1000/1400", title: "Pattern Library", caption: "Brand pattern exploration.", client: "Velo", year: 2022 },
  { id: "g-12", media: "https://picsum.photos/seed/g12/1000/800", title: "Typography Specimen", caption: "Type style system mock.", client: "Velo", year: 2023 },
  { id: "g-13", media: "https://picsum.photos/seed/g13/1200/900", title: "Ad Banner", caption: "Static social banner variants.", client: "Velo", year: 2024 },
  { id: "g-14", media: "https://picsum.photos/seed/g14/1200/1600", title: "Brand Board", caption: "Full brand board export.", client: "Velo", year: 2024 },
  { id: "g-15", media: "https://samplelib.com/lib/preview/mp4/sample-5s.mp4", title: "Animated Loop", caption: "Looped social animation.", client: "Velo", year: 2024 }
];

export default function GraphicsWorkPage() {
  return (
    <WorkCategoryLayout
      title="Graphics"
      description="Branding, packaging and campaign graphics with a premium visual language."
      heroImage={CATEGORY_HERO["Graphics"]}
    >
      <div className="mt-6">
        <MediaMasonry items={ITEMS} />
      </div>
    </WorkCategoryLayout>
  );
}
