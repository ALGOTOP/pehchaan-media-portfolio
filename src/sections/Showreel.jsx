// src/sections/Showreel.jsx
import React from "react";
import SEOManager from "@/components/SEOManager"; // optional but recommended
import ReelCard from "@/components/ReelCard";

/**
 * Add your reel items here. Each item supports:
 * - src: string (direct mp4/webm url OR youtube/vimeo link)
 * - poster: optional thumbnail url
 * - brand: string
 * - tools: array of strings (softwares or gear names)
 * - type: "graphical" | "real"
 */
const REELS = [
  {
    id: "lumina",
    src: "https://cdn.example.com/videos/lumina.mp4", // direct file URL example
    poster: "https://cdn.example.com/videos/lumina-poster.jpg",
    brand: "Lumina",
    tools: ["After Effects", "Premiere Pro"],
    type: "graphical",
  },
  {
    id: "aurix",
    src: "https://youtu.be/XXXXXXXXXXX", // youtube example
    poster: "https://cdn.example.com/videos/aurix-poster.jpg",
    brand: "Aurix",
    tools: ["Red Komodo", "DaVinci Resolve"],
    type: "real",
  },
  {
    id: "zenith",
    src: "https://vimeo.com/123456789", // vimeo example
    poster: "https://cdn.example.com/videos/zenith-poster.jpg",
    brand: "Zenith",
    tools: ["Cinema 4D", "Octane Render"],
    type: "graphical",
  },
  // add more reels...
];

export default function Showreel() {
  return (
    <>
      <SEOManager
        title="Showreel — Pehchaan Media"
        description="Cinematic showreel — selected works and case reels."
        image="https://yourcdn.com/showreel-og.jpg"
        url="https://pehchaanmedia.com/#showreel"
      />

      <section
        id="showreel"
        className="relative bg-black text-white py-20 px-6 md:px-12"
      >
        <div className="max-w-7xl mx-auto">
          <header className="mb-10 text-center">
            <h2 className="text-3xl md:text-5xl font-bold">Showreel Highlights</h2>
            <p className="text-gray-400 mt-3 max-w-2xl mx-auto">
              A curated selection — hover on desktop to preview with sound, tap on
              mobile to open.
            </p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {REELS.map((r) => (
              <ReelCard key={r.id} reel={r} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
