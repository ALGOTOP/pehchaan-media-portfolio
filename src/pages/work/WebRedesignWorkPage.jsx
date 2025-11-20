// src/pages/work/WebRedesignWorkPage.jsx
import React from "react";
import WorkCategoryLayout from "../../layouts/WorkCategoryLayout";
import useWorkFilter from "../../hooks/useWorkFilter";

const webRedesignSamples = [
  { type: "video", src: "https://videos.pexels.com/video-files/3195399/3195399-uhd_2560_1440_25fps.mp4" },
  { type: "image", src: "https://images.unsplash.com/photo-1550439062-609e1531270e" },
  { type: "video", src: "https://videos.pexels.com/video-files/853801/853801-hd_1920_1080_25fps.mp4" },
  { type: "image", src: "https://images.unsplash.com/photo-1555066931-4365d14bab8c" },
  { type: "image", src: "https://images.unsplash.com/photo-1558365913-4f4f63f430d1" },
  { type: "video", src: "https://videos.pexels.com/video-files/1815045/1815045-hd_1920_1080_25fps.mp4" },
  { type: "image", src: "https://images.unsplash.com/photo-1581276879432-15a19d654956" },
  { type: "video", src: "https://videos.pexels.com/video-files/4348691/4348691-uhd_2560_1440_25fps.mp4" },
  { type: "image", src: "https://images.unsplash.com/photo-1509114397022-ed747cca3f65" },
  { type: "video", src: "https://videos.pexels.com/video-files/3043072/3043072-uhd_2560_1440_25fps.mp4" },
  { type: "image", src: "https://images.unsplash.com/photo-1555774698-0b77e0d5fac6" },
  { type: "image", src: "https://images.unsplash.com/photo-1551033406-611cf9a28f67" },
  { type: "video", src: "https://videos.pexels.com/video-files/853799/853799-hd_1920_1080_25fps.mp4" },
  { type: "image", src: "https://images.unsplash.com/photo-1557804506-669a67965ba0" },
  { type: "video", src: "https://videos.pexels.com/video-files/4341191/4341191-hd_1920_1080_25fps.mp4" },
];

export default function WebRedesignWorkPage() {
  const { filteredItems, FilterBar } = useWorkFilter(webRedesignSamples);

  return (
    <WorkCategoryLayout
      title="Web Redesign"
      description="Transforming outdated sites into modern, high-performance digital experiences with creative storytelling, design, and motion."
    >
      <FilterBar />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {filteredItems.map((item, idx) => (
          <MediaItem key={idx} item={item} />
        ))}
      </div>
    </WorkCategoryLayout>
  );
}

function MediaItem({ item }) {
  const videoRef = React.useRef(null);
  const [showModal, setShowModal] = React.useState(false);

  const enter = () => {
    if (item.type === "video" && videoRef.current) {
      videoRef.current.muted = false;
      videoRef.current.loop = false;
      videoRef.current.currentTime = 0;
      videoRef.current.play();
    }
  };

  const leave = () => {
    if (item.type === "video" && videoRef.current) {
      videoRef.current.pause();
      videoRef.current.muted = true;
    }
  };

  return (
    <>
      <div
        className="w-full rounded-xl overflow-hidden bg-[#F9F9F9] shadow-md cursor-pointer"
        onMouseEnter={enter}
        onMouseLeave={leave}
        onClick={() => item.type === "image" && setShowModal(true)}
      >
        {item.type === "video" ? (
          <video
            ref={videoRef}
            src={item.src}
            muted
            playsInline
            className="w-full h-full object-cover"
            preload="metadata"
          />
        ) : (
          <img src={item.src} className="w-full h-full object-cover" />
        )}
      </div>

      {showModal && item.type === "image" && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-4 max-w-3xl shadow-xl relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-2 right-2 text-black text-xl font-bold"
            >
              ✕
            </button>
            <img src={item.src} className="max-h-[80vh] w-auto rounded-lg" />
          </div>
        </div>
      )}
    </>
  );
}
