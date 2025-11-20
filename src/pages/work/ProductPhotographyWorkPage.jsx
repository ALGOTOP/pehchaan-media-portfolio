// src/pages/work/ProductVideographyWorkPage.jsx
import React from "react";
import WorkCategoryLayout from "@/layouts/WorkCategoryLayout";
import MediaMasonry from "@/components/work/MediaMasonry";
import { CATEGORY_HERO } from "@/data/workData";

const ITEMS = [
  { id: "pv-1", media: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4", title: "Hero Product Film", caption: "30s hero clip for product A.", client: "Orion Goods", year: 2024 },
  { id: "pv-2", media: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4", title: "Detail Loop", caption: "Close-up detail loop.", client: "Orion Goods", year: 2023 },
  { id: "pv-3", media: "https://picsum.photos/seed/pv3/1200/1400", title: "Still: Product Shot", caption: "Color study and lighting.", client: "Orion Goods", year: 2023 },
  { id: "pv-4", media: "https://samplelib.com/lib/preview/mp4/sample-5s.mp4", title: "Unboxing Clip", caption: "Short unboxing sequence.", client: "Orion Goods", year: 2024 },
  { id: "pv-5", media: "https://picsum.photos/seed/pv5/1200/900", title: "Lifestyle Frame", caption: "Lifestyle photo used in hero.", client: "Orion Goods", year: 2022 },
  { id: "pv-6", media: "https://picsum.photos/seed/pv6/1000/1500", title: "Stills Set", caption: "Multiple angle stills.", client: "Orion Goods", year: 2024 },
  { id: "pv-7", media: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4", title: "Motion Bumper", caption: "5s motion bumper for social.", client: "Orion Goods", year: 2024 },
  { id: "pv-8", media: "https://picsum.photos/seed/pv8/1100/900", title: "Detail Shot", caption: "Macro detail photography.", client: "Orion Goods", year: 2023 },
  { id: "pv-9", media: "https://picsum.photos/seed/pv9/1200/1600", title: "Packaging Still", caption: "Product packaging shot.", client: "Orion Goods", year: 2024 },
  { id: "pv-10", media: "https://samplelib.com/lib/preview/mp4/sample-5s.mp4", title: "Hero Snippet", caption: "Short hero snippet for ads.", client: "Orion Goods", year: 2024 },
  { id: "pv-11", media: "https://picsum.photos/seed/pv11/1200/900", title: "Set Design Photo", caption: "Set design exploration.", client: "Orion Goods", year: 2022 },
  { id: "pv-12", media: "https://picsum.photos/seed/pv12/1000/1300", title: "Thumbs & Frames", caption: "Thumbnail options for YT.", client: "Orion Goods", year: 2023 },
  { id: "pv-13", media: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4", title: "Loop A", caption: "Short loop for hero card.", client: "Orion Goods", year: 2024 },
  { id: "pv-14", media: "https://picsum.photos/seed/pv14/1200/1400", title: "Lifestyle Still", caption: "Lifestyle hero frame.", client: "Orion Goods", year: 2024 },
  { id: "pv-15", media: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4", title: "Macro Clip", caption: "Micro detail slow-motion.", client: "Orion Goods", year: 2024 }
];

export default function ProductVideographyWorkPage() {
  return (
    <WorkCategoryLayout
      title="Product Videography"
      description="Hero product films and platform-ready short-form edits for socials and landing pages."
      heroImage={CATEGORY_HERO["Product Videography"]}
    >
      <div className="mt-6">
        <MediaMasonry items={ITEMS} />
      </div>
    </WorkCategoryLayout>
  );
}
