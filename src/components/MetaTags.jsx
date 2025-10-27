import { useEffect } from "react";

export default function MetaTags() {
  useEffect(() => {
    document.title = "Pehchaan Media | Full-Service Creative Agency";

    const metaDescription = document.createElement("meta");
    metaDescription.name = "description";
    metaDescription.content =
      "Pehchaan Media is a full-service creative agency specializing in film production, branding, design, and digital marketing — turning ideas into iconic experiences.";
    document.head.appendChild(metaDescription);

    const ogTitle = document.createElement("meta");
    ogTitle.setAttribute("property", "og:title");
    ogTitle.content = "Pehchaan Media | Full-Service Creative Agency";
    document.head.appendChild(ogTitle);

    const ogImage = document.createElement("meta");
    ogImage.setAttribute("property", "og:image");
    ogImage.content =
      "https://images.unsplash.com/photo-1508921912186-1d1a45ebb3c1?auto=format&fit=crop&w=1200&q=80";
    document.head.appendChild(ogImage);

    const favicon = document.createElement("link");
    favicon.rel = "icon";
    favicon.href = "https://cdn-icons-png.flaticon.com/512/2948/2948035.png";
    document.head.appendChild(favicon);

    return () => {
      [metaDescription, ogTitle, ogImage, favicon].forEach((el) =>
        el.parentNode?.removeChild(el)
      );
    };
  }, []);

  return null;
}
