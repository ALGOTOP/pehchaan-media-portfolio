// src/components/work/CategoryHeader.jsx
import React from "react";
import CategoryCard from "./CategoryCard";
import { CATEGORIES } from "@/data/workData";

export default function CategoryHeader({ active, onSelect }) {
  return (
    <div className="w-full flex gap-4 overflow-x-auto py-6 px-4 no-scrollbar">
      {CATEGORIES.map((cat) => (
        <CategoryCard
          key={cat}
          category={cat}
          active={active === cat}
          onClick={onSelect}
        />
      ))}
    </div>
  );
}
