import { RefObject } from "react";
import { GalleryMedia, DateFilter, MediaFilter } from "../data";

interface GalleryGridProps {
  activeDateFilter: DateFilter;
  activeFilter: MediaFilter;
  media: GalleryMedia[];
  mediaGridRef: RefObject<HTMLDivElement>;
  onPreviewOpen: (index: number) => void;
}

const GalleryGrid = ({
  activeDateFilter,
  activeFilter,
  media,
  mediaGridRef,
  onPreviewOpen,
}: GalleryGridProps) => {
  if (media.length === 0) {
    return (
      <div className="min-h-[320px] rounded-lg border border-white/10 bg-[#0F0F0F] flex flex-col items-center justify-center text-center px-6">
        <p className="text-heading-7 text-white !font-medium">No media found</p>
        <p className="text-body-5 text-[#525252] mt-2 max-w-[360px]">
          Moments for this filter will show here as soon as they are added to
          the gallery.
        </p>
      </div>
    );
  }

  return (
    <div ref={mediaGridRef} className="columns-2 md:columns-3 gap-3 md:gap-4">
      {media.map((item, index) => (
        <div
          key={`gallery-page-${activeFilter}-${activeDateFilter}-${index}`}
          className={`relative mb-3 md:mb-4 w-full break-inside-avoid rounded-lg overflow-hidden group border border-white/10 bg-[#111] cursor-pointer ${
            index % 5 === 1 || index % 5 === 4
              ? "h-[220px] md:h-[310px]"
              : "h-[160px] md:h-[230px]"
          }`}
          onClick={() => onPreviewOpen(index)}
        >
          {item.type === "video" ? (
            <video
              src={item.src}
              controls
              className="w-full h-full rounded-[inherit] object-center object-cover"
            />
          ) : (
            <img
              src={item.src}
              alt={`SuperteamNG gallery moment ${index + 1}`}
              className="w-full h-full rounded-[inherit] object-center object-cover transition-transform duration-500 will-change-transform hover:scale-110 group-hover:scale-110"
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default GalleryGrid;
