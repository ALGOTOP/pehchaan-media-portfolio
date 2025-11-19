import React from "react";
import WorkCategoryLayout from "@/layouts/WorkCategoryLayout";
import { CATEGORY_HERO, WORK_BY_CATEGORY } from "@/data/workData";
import WorkReel from "@/components/work/WorkReel";
import WorkGalleryCard from "@/components/work/WorkGalleryCard";

export default function WebRedesignWorkPage() {
  const categoryName = "Web Redesign";
  const heroImage = CATEGORY_HERO?.[categoryName];
  const items = WORK_BY_CATEGORY?.[categoryName] || [];

  // reel uses videoEmbed where available
  const reel = items.slice(0, 8).map((it, i) => ({
    id: `web-r-${i}`,
    title: it.title,
    embedUrl: it.videoEmbed || "",
    thumbnail: it.thumbnail,
    client: it.client,
  }));

  return (
    <WorkCategoryLayout
      title={categoryName}
      description="Conversion-focused redesigns — rebuild visual language, UX flows and hierarchy around clarity and performance."
      heroImage={heroImage}
    >
      <div className="mt-8">
        <WorkReel items={reel} />

        <div className="mt-8">
          <h3 className="text-sm text-white/60 uppercase tracking-wide mb-4">Project Gallery</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((it) => (
              <WorkGalleryCard key={it.id} item={it} />
            ))}
          </div>
        </div>
      </div>
    </WorkCategoryLayout>
  );
}
