import React from "react";
import { motion } from "framer-motion";

const caseStudies = [
  {
    title: "Lumina Vision Campaign",
    image: "/images/case-studies/lumina-thumb.jpg",
    link: "/case-studies/Lumina",
  },
  {
    title: "Aurix Product Film",
    image: "/images/case-studies/aurix-thumb.jpg",
    link: "/case-studies/Aurix",
  },
  {
    title: "NovaSkin Digital Launch",
    image: "/images/case-studies/novaskin-thumb.jpg",
    link: "/case-studies/NovaSkin",
  },
  {
    title: "AerialX Cinematic Campaign",
    image: "/images/case-studies/aerialx-thumb.jpg",
    link: "/case-studies/AerialX",
  },
  {
    title: "BuildSmart Web Redesign",
    image: "/images/case-studies/buildsmart-thumb.jpg",
    link: "/case-studies/BuildSmart",
  },
  {
    title: "Velo Product Branding",
    image: "/images/case-studies/velo-thumb.jpg",
    link: "/case-studies/Velo",
  },
  {
    title: "EcoRise Green Innovation",
    image: "/images/case-studies/ecorise-thumb.jpg",
    link: "/case-studies/EcoRise",
  },
  {
    title: "HelixHealth App Experience",
    image: "/images/case-studies/helixhealth-thumb.jpg",
    link: "/case-studies/HelixHealth",
  },
  {
    title: "Zenith Rebranding Strategy",
    image: "/images/case-studies/zenith-thumb.jpg",
    link: "/case-studies/Zenith",
  },
];

export default function CaseStudies() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <section className="max-w-7xl mx-auto px-6 py-20">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl font-bold mb-12 text-blue-600 text-center"
        >
          Case Studies
        </motion.h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {caseStudies.map((study, index) => (
            <motion.a
              key={index}
              href={study.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="group block rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500"
            >
              <div className="relative overflow-hidden">
                <motion.img
                  src={study.image}
                  alt={study.title}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-70 group-hover:opacity-90 transition-all duration-500"></div>
                <h2 className="absolute bottom-4 left-4 text-white text-2xl font-semibold">
                  {study.title}
                </h2>
              </div>
            </motion.a>
          ))}
        </div>
      </section>
    </div>
  );
}
