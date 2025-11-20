// src/pages/work/ProductPhotographyWorkPage.jsx
import React from "react";
import WorkCategoryLayout from "../../layouts/WorkCategoryLayout";
import useWorkFilter from "../../hooks/useWorkFilter";

const photographySamples = [
  { type: "image", src: "https://images.unsplash.com/photo-1551009175-0c2f5f42b38e" },
  { type: "image", src: "https://images.unsplash.com/photo-1520975698519-59cde0b30a52" },
  { type: "image", src: "https://images.unsplash.com/photo-1503602642458-232111445657" },
  { type: "image", src: "https://images.unsplash.com/photo-1511765224389-37f0e77cf0eb" },
  { type: "image", src: "https://images.unsplash.com/photo-1472289065668-ce650ac443d2" },
  { type: "image", src: "https://images.unsplash.com/photo-1527689368864-3a821dbccc34" },
  { type: "video", src: "https://videos.pexels.com/video-files/854128/854128-hd_1920_1080_30fps.mp4" },
  { type: "image", src: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2" },
  { type: "image", src: "https://images.unsplash.com/photo-1522199710521-72d69614c702" },
  { type: "image", src: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f" },
  { type: "video", src: "https://videos.pexels.com/video-files/3130141/3130141-hd_1920_1080_24fps.mp4" },
  { type: "image", src: "https://images.unsplash.com/photo-1484552338649-5bf19187add2" },
  { type: "video", src: "https://videos.pexels.com/video-files/5993626/5993626-hd_1920_1080_30fps.mp4" },
  { type: "image", src: "https://images.unsplash.com/photo-1503602642458-232111445657" },
  { type: "image", src: "https://images.unsplash.com/photo-1520975698519-59cde0b30a52" },
];

export default function ProductPhotographyWorkPage() {
  const { filteredItems, FilterBar } = useWorkFilter(photographySamples);

  return (
    <WorkCategoryLayout
      title="Product Photography"
      description="Clean, premium product visuals shot for ads, catalogs, and brand identity elevation."
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

// reuse same component
function MediaItem({ item }) {
  const videoRef = React.useRef(null);
  const [showModal, setShowModal] = React.useState(false);

  const handleEnter = () => {
    if (item.type === "video" && videoRef.current) {
      videoRef.current.muted = false;
      videoRef.current.loop = false;
      videoRef.current.currentTime = 0;
      videoRef.current.play();
    }
  };

  const handleLeave = () => {
    if (item.type === "video" && videoRef.current) {
      videoRef.current.muted = true;
      videoRef.current.pause();
    }
  };

  return (
    <>
      <div
        className="w-full rounded-xl overflow-hidden bg-[#F9F9F9] shadow-md cursor-pointer"
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
        onClick={() => item.type === "image" && setShowModal(true)}
      >
        {item.type === "video" ? (
          <video ref={videoRef} muted playsInline className="w-full h-full object-cover" preload="metadata" />
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
