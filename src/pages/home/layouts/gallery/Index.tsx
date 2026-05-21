import { useState } from "react";
import { galleryImages } from "@/data/images/Index";
import Button from "@/components/button/Index";

const Gallery = () => {
  const [images, setImages] = useState(galleryImages);

  const shuffleGallery = () => {
    const shuffled = [...images];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    setImages(shuffled);
  };

  return (
    <div
      id="gallery"
      className="w-full px-4 md:px-[5vw] lg:px-[14vw] pb-40 pt-8 scroll-smooth"
    >
      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
      <div className="max-w-[1200px] mx-auto flex flex-col gap-4 lg:gap-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <button
            onClick={shuffleGallery}
            className="w-10 h-10 bg-[#1A1A1A] rounded-full flex items-center justify-center text-white hover:bg-[#333] transition-colors"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
              />
            </svg>
          </button>
          <Button type="primary" to="/gallery">
            See More
          </Button>
        </div>
        {/* Masonry Grid */}
        <div>
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 py-10">
            {images.map((img, i) => (
              <div
                key={i}
                className="relative mb-4 w-full h-[300px] break-inside-avoid rounded-2xl overflow-hidden group"
              >
                <img
                  src={img}
                  alt={`Gallery ${i}`}
                  className="w-full h-full object-center object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gallery;
