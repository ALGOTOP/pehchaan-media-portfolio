import React from "react";
import WorkCategoryLayout from "@/layouts/WorkCategoryLayout";
import { CATEGORY_HERO, WORK_BY_CATEGORY } from "@/data/workData";
import WorkReel from "@/components/work/WorkReel";
import WorkGalleryCard from "@/components/work/WorkGalleryCard";

export default function ProductVideographyWorkPage() {
  const categoryName = "Product Videography";
  const heroImage = CATEGORY_HERO?.[categoryName];
  const items = WORK_BY_CATEGORY?.[categoryName] || [];

  const reel = items.slice(0, 10).map((it, i) => ({
    id: `pv-${i}`,
    title: it.title,
    embedUrl: it.videoEmbed || "",
    thumbnail: it.thumbnail,
    client: it.client,
  }));

  return (
    <WorkCategoryLayout
      title={categoryName}
      description="Crisp product films and hero clips designed to highlight tactile details and motion."
      heroImage={heroImage}
    >
      <WorkReel items={reel} />
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((it) => <WorkGalleryCard key={it.id} item={it} />)}
      </div>
    </WorkCategoryLayout>
  );
}
