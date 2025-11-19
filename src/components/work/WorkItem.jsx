// src/components/work/WorkItem.jsx
import React from "react";
import { motion } from "framer-motion";
import { itemHover } from "@/utils/workAnimations";

export default function WorkItem({ item, onOpen }) {
  return (
    <motion.div
      variants={itemHover}
      whileHover="hover"
      onClick={onOpen}
      className="group cursor-pointer relative rounded-2xl overflow-hidden border border-white/10 bg-[#0a0a0a] shadow-xl"
    >
      <img
        src={item.thumbnail}
        className="w-full h-60 object-cover opacity-90 group-hover:opacity-100 transition duration-300"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-70 group-hover:opacity-90 transition"></div>

      <div className="absolute bottom-4 left-4">
        <h3 className="text-xl text-white font-semibold tracking-tight">
          {item.title}
        </h3>
        <p className="text-gray-300 text-sm">{item.category}</p>
      </div>
    </motion.div>
  );
}
