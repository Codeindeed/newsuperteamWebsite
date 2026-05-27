import { createPortal } from "react-dom";
import {
  HiOutlineChevronLeft,
  HiOutlineChevronRight,
} from "react-icons/hi";
import { GalleryMedia } from "../data";

interface GalleryPreviewModalProps {
  activePreview: GalleryMedia;
  activePreviewIndex: number;
  onClose: () => void;
  onNext: () => void;
  onPrevious: () => void;
}

const GalleryPreviewModal = ({
  activePreview,
  activePreviewIndex,
  onClose,
  onNext,
  onPrevious,
}: GalleryPreviewModalProps) => {
  return createPortal(
    <div
      className="fixed inset-0 z-[90] flex items-center justify-center overflow-hidden px-4 py-10"
      style={{
        backgroundColor: "#0F0F0FE5",
        backdropFilter: "blur(16.049999237060547px)",
        WebkitBackdropFilter: "blur(16.049999237060547px)",
      }}
      role="dialog"
      aria-modal="true"
      aria-label="Gallery preview"
      onClick={onClose}
      onWheel={(event) => event.preventDefault()}
      onTouchMove={(event) => event.preventDefault()}
    >
      <button
        type="button"
        aria-label="Previous image"
        onClick={(event) => {
          event.stopPropagation();
          onPrevious();
        }}
        className="absolute left-4 md:left-8 z-[2] flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white transition-colors duration-700 hover:bg-white/20"
      >
        <HiOutlineChevronLeft className="text-[28px]" />
      </button>

      <div
        className="relative z-[1] flex max-h-[82vh] max-w-[92vw] items-center justify-center overflow-hidden"
        onClick={(event) => event.stopPropagation()}
      >
        {activePreview.type === "video" ? (
          <video
            src={activePreview.src}
            controls
            autoPlay
            className="max-h-[82vh] max-w-[92vw] object-contain"
          />
        ) : (
          <img
            src={activePreview.src}
            alt={`SuperteamNG gallery preview ${activePreviewIndex + 1}`}
            className="max-h-[82vh] max-w-[92vw] object-contain"
          />
        )}
      </div>

      <button
        type="button"
        aria-label="Next image"
        onClick={(event) => {
          event.stopPropagation();
          onNext();
        }}
        className="absolute right-4 md:right-8 z-[2] flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white transition-colors duration-700 hover:bg-white/20"
      >
        <HiOutlineChevronRight className="text-[28px]" />
      </button>
    </div>,
    document.body,
  );
};

export default GalleryPreviewModal;
