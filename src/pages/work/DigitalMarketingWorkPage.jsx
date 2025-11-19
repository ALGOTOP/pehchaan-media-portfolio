import React from "react";
import WorkCategoryLayout from "@/layouts/WorkCategoryLayout";
import { CATEGORY_HERO, WORK_BY_CATEGORY } from "@/data/workData";
import WorkGalleryCard from "@/components/work/WorkGalleryCard";

export default function DigitalMarketingWorkPage() {
  const categoryName = "Digital Marketing";
  const heroImage = CATEGORY_HERO?.[categoryName];
  const items = WORK_BY_CATEGORY?.[categoryName] || [];

  return (
    <WorkCategoryLayout
      title={categoryName}
      description="Campaign case work across channels: performance, CRO, and creative testing."
      heroImage={heroImage}
    >
      <div className="mt-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((it) => <WorkGalleryCard key={it.id} item={it} />)}
        </div>
      </div>
    </WorkCategoryLayout>
  );
}
