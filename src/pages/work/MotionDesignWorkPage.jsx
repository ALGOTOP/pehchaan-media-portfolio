import React from "react";
import WorkCategoryLayout from "@/layouts/WorkCategoryLayout";
import { CATEGORY_HERO, WORK_BY_CATEGORY } from "@/data/workData";
import WorkReel from "@/components/work/WorkReel";
import WorkGalleryCard from "@/components/work/WorkGalleryCard";

export default function MotionDesignWorkPage() {
  const categoryName = "Motion Design";
  const heroImage = CATEGORY_HERO?.[categoryName];
  const items = WORK_BY_CATEGORY?.[categoryName] || [];

  const reel = items.slice(0, 12).map((it, i) => ({
    id: `md-${i}`,
    title: it.title,
    embedUrl: it.videoEmbed || "",
    thumbnail: it.thumbnail,
    client: it.client,
  }));

  return (
    <WorkCategoryLayout
      title={categoryName}
      description="Kinetic branding, explainer motion and social-first shorts."
      heroImage={heroImage}
    >
      <WorkReel items={reel} />
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((it) => <WorkGalleryCard key={it.id} item={it} />)}
      </div>
    </WorkCategoryLayout>
  );
}
