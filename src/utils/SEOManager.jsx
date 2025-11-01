// ─────────────────────────────────────────────
// SEOManager.jsx — dynamic meta + title manager
// ─────────────────────────────────────────────
import React from "react";
import { Helmet } from "react-helmet";

export default function SEOManager({
  title = "Pehchaan Media — Creative Studio",
  description = "Discover the power of design and storytelling with Pehchaan Media. A creative digital agency crafting world-class web experiences.",
  image = "https://yourcdn.com/og-image.jpg",
  url = "https://pehchaanmedia.com",
}) {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />

      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  );
}
