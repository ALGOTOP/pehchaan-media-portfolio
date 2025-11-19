// src/components/work/WorkGrid.jsx
import React from "react";
import WorkItem from "./WorkItem";
import { motion } from "framer-motion";

export default function WorkGrid({ items, onOpen }) {
  return (
    <motion.div
      layout
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 p-6"
    >
      {items.map((item) => (
        <WorkItem key={item.id} item={item} onOpen={() => onOpen(item)} />
      ))}
    </motion.div>
  );
}
