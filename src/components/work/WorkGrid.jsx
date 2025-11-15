// src/components/work/WorkGrid.jsx
import React from "react";
import WorkItem from "./WorkItem";

export default function WorkGrid({ items, onOpen }) {
  const safeItems = items || [];

  return (
    <section className="pt-4 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        <div
          className="
            grid grid-cols-1 
            sm:grid-cols-2 
            lg:grid-cols-3 
            gap-8
          "
        >
          {safeItems.map((item, i) => (
            <WorkItem key={item.id} item={item} index={i} onOpen={onOpen} />
          ))}
        </div>
      </div>
    </section>
  );
}
