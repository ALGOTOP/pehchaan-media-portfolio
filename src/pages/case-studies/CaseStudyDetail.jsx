// src/pages/case-studies/CaseStudyDetail.jsx
import React from "react";
import { useParams, Navigate } from "react-router-dom";
import { caseStudies } from "@/CaseStudiesData"; // change path if necessary
import { motion } from "framer-motion";

export default function CaseStudyDetail() {
  const { slug } = useParams();
  const study = caseStudies.find((s) => s.slug === slug);

  if (!study) {
    // optional: a 404 or redirect to hub
    return <Navigate to="/case-studies" replace />;
  }

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <section className="max-w-6xl mx-auto px-6 py-20">
        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold mb-6"
        >
          {study.title}
        </motion.h1>

        <div className="mb-8">
          <img src={study.image} alt={study.title} className="w-full rounded-md" />
        </div>

        <div className="prose max-w-none">
          <p>{study.description}</p>
          {/* Replace this with the richer content fields you want:
              study.brief, study.challenges, study.solution, study.results, study.gallery, etc.
              You can add these properties to CaseStudiesData.js.
          */}
        </div>
      </section>
    </div>
  );
}
