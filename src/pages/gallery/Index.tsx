import { useEffect, useMemo, useRef, useState } from "react";
import { galleryImages } from "@/data/images/Index";
import Button from "@/components/button/Index";
import VerticalScrollContainer, {
  useScrollContainer,
} from "@/layouts/vertical-scroll-container/Index";
import Events from "@/pages/home/layouts/events/Index";
import Footer from "@/pages/home/layouts/footer/Index";
import { FaChevronDown } from "react-icons/fa";
import {
  HiOutlineChevronLeft,
  HiOutlineChevronRight,
} from "react-icons/hi";
import { createPortal } from "react-dom";

type MediaFilter = "All Media" | "Photos" | "Videos";
type DateFilter = "Most Recent" | "May 2026" | "April 2026" | "March 2026";

type GalleryMedia = {
  src: string;
  type: "photo" | "video";
  uploadedAt: string;
};

const galleryMedia: GalleryMedia[] = [
  ...galleryImages,
  ...galleryImages.slice(0, 5),
  ...galleryImages.slice(1, 5),
].map((src, index) => ({
  src,
  type: "photo",
  uploadedAt:
    index < 7 ? "2026-05-18" : index < 13 ? "2026-04-21" : "2026-03-16",
}));

const GalleryPage = () => {
  return (
    <VerticalScrollContainer showProgress={true} showScrollIndicator={true}>
      <GalleryShowcase />
      <Events />
      <Footer />
    </VerticalScrollContainer>
  );
};

export default GalleryPage;

const galleryFilters: MediaFilter[] = ["All Media", "Photos", "Videos"];
const dateFilters: DateFilter[] = [
  "Most Recent",
  "May 2026",
  "April 2026",
  "March 2026",
];
const initialVisibleMediaCount = 12;
const visibleMediaBatchSize = 6;

const GalleryShowcase = () => {
  const [activeFilter, setActiveFilter] = useState<MediaFilter>("All Media");
  const [activeDateFilter, setActiveDateFilter] =
    useState<DateFilter>("Most Recent");
  const [showDateFilters, setShowDateFilters] = useState(false);
  const [visibleMediaCount, setVisibleMediaCount] = useState(
    initialVisibleMediaCount,
  );
  const [activePreviewIndex, setActivePreviewIndex] = useState<number | null>(
    null,
  );
  const [mediaScrollProgress, setMediaScrollProgress] = useState(0);
  const [showMediaScrollProgress, setShowMediaScrollProgress] = useState(false);
  const isAtMediaEnd = mediaScrollProgress >= 96;
  const mediaGridRef = useRef<HTMLDivElement>(null);
  const { containerRef } = useScrollContainer();

  const filteredMedia = useMemo(() => {
    const media = [...galleryMedia].sort((firstItem, secondItem) =>
      secondItem.uploadedAt.localeCompare(firstItem.uploadedAt),
    );

    const dateFilteredMedia =
      activeDateFilter === "Most Recent"
        ? media
        : media.filter((item) => {
            const date = new Date(`${item.uploadedAt}T00:00:00`);
            return (
              date.toLocaleDateString("en-US", {
                month: "long",
                year: "numeric",
              }) === activeDateFilter
            );
          });

    if (activeFilter === "Photos") {
      return dateFilteredMedia.filter((item) => item.type === "photo");
    }

    if (activeFilter === "Videos") {
      return dateFilteredMedia.filter((item) => item.type === "video");
    }

    return dateFilteredMedia;
  }, [activeDateFilter, activeFilter]);

  const visibleMedia = filteredMedia.slice(0, visibleMediaCount);
  const hasMoreMedia = visibleMediaCount < filteredMedia.length;

  const activePreview =
    activePreviewIndex === null ? null : filteredMedia[activePreviewIndex];

  const showPreviousPreview = () => {
    if (filteredMedia.length === 0) return;
    setActivePreviewIndex((currentIndex) => {
      if (currentIndex === null) return 0;
      return (currentIndex - 1 + filteredMedia.length) % filteredMedia.length;
    });
  };

  const showNextPreview = () => {
    if (filteredMedia.length === 0) return;
    setActivePreviewIndex((currentIndex) => {
      if (currentIndex === null) return 0;
      return (currentIndex + 1) % filteredMedia.length;
    });
  };

  useEffect(() => {
    const container = containerRef?.current;
    const mediaGrid = mediaGridRef.current;
    if (!container || !mediaGrid || visibleMedia.length === 0) {
      setShowMediaScrollProgress(false);
      return;
    }

    const updateMediaProgress = () => {
      const start = mediaGrid.offsetTop;
      const end = mediaGrid.offsetTop + mediaGrid.offsetHeight - container.clientHeight;
      const scrollTop = container.scrollTop;
      const scrollRange = Math.max(end - start, 1);
      const progress = ((scrollTop - start) / scrollRange) * 100;

      setMediaScrollProgress(Math.min(100, Math.max(0, progress)));
      setShowMediaScrollProgress(scrollTop >= start && scrollTop <= end + 20);
    };

    updateMediaProgress();
    container.addEventListener("scroll", updateMediaProgress);
    window.addEventListener("resize", updateMediaProgress);

    return () => {
      container.removeEventListener("scroll", updateMediaProgress);
      window.removeEventListener("resize", updateMediaProgress);
    };
  }, [containerRef, visibleMedia.length]);

  useEffect(() => {
    setActivePreviewIndex(null);
    setVisibleMediaCount(initialVisibleMediaCount);
    setShowDateFilters(false);
  }, [activeDateFilter, activeFilter]);

  useEffect(() => {
    if (activePreviewIndex === null) return;

    const container = containerRef?.current;
    const previousBodyOverflow = document.body.style.overflow;
    const previousDocumentOverflow = document.documentElement.style.overflow;
    const previousContainerOverflow = container?.style.overflow;
    const previousContainerOverscroll = container?.style.overscrollBehavior;

    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    if (container) {
      container.style.overflow = "hidden";
      container.style.overscrollBehavior = "contain";
    }

    return () => {
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow = previousDocumentOverflow;

      if (container) {
        container.style.overflow = previousContainerOverflow ?? "";
        container.style.overscrollBehavior = previousContainerOverscroll ?? "";
      }
    };
  }, [activePreviewIndex, containerRef]);

  useEffect(() => {
    if (activePreviewIndex === null) return;

    const handlePreviewKeydown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActivePreviewIndex(null);
      }

      if (event.key === "ArrowLeft") {
        showPreviousPreview();
      }

      if (event.key === "ArrowRight") {
        showNextPreview();
      }
    };

    document.addEventListener("keydown", handlePreviewKeydown);
    return () => document.removeEventListener("keydown", handlePreviewKeydown);
  }, [activePreviewIndex, filteredMedia.length]);

  const previewOverlay = activePreview
    ? createPortal(
        <div
          className="fixed inset-0 z-[90] flex items-center justify-center overflow-hidden px-4 py-10"
          style={{
            backgroundColor: "#0F0F0FE5",
            backdropFilter: "blur(16.049999237060547px)",
          }}
          role="dialog"
          aria-modal="true"
          aria-label="Gallery preview"
          onClick={() => setActivePreviewIndex(null)}
          onWheel={(event) => event.preventDefault()}
          onTouchMove={(event) => event.preventDefault()}
        >
          <button
            type="button"
            aria-label="Previous image"
            onClick={(event) => {
              event.stopPropagation();
              showPreviousPreview();
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
                alt={`SuperteamNG gallery preview ${(activePreviewIndex ?? 0) + 1}`}
                className="max-h-[82vh] max-w-[92vw] object-contain"
              />
            )}
          </div>

          <button
            type="button"
            aria-label="Next image"
            onClick={(event) => {
              event.stopPropagation();
              showNextPreview();
            }}
            className="absolute right-4 md:right-8 z-[2] flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white transition-colors duration-700 hover:bg-white/20"
          >
            <HiOutlineChevronRight className="text-[28px]" />
          </button>
        </div>,
        document.body,
      )
    : null;

  return (
    <>
      <section
        id="gallery-wall"
        className="relative w-full min-h-screen bg-black px-4 md:px-[5vw] lg:px-[12vw] pt-28 pb-28 text-white overflow-hidden"
      >
        <div className="max-w-[960px] mx-auto">
        <div className="flex flex-col items-center text-center mb-12 md:mb-16">
          <h1 className="text-[52px] leading-[0.95] md:text-[88px] lg:text-[112px] md:leading-[0.95] !font-medium text-white">
            From Where We Stand
          </h1>
          <p className="text-[#525252] text-body-3 md:text-[28px] leading-[1.2] mt-8 max-w-[760px]">
            Capturing the Little Moments that make us, us.
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 mt-12">
            <div className="flex items-center gap-1 bg-[#1F1F1F] border border-[#2B2B2B] p-1 rounded-full">
              {galleryFilters.map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`relative overflow-hidden px-5 md:px-6 py-3 rounded-full text-body-5 md:text-body-4 transition-colors duration-700 before:absolute before:inset-y-1 before:left-1 before:rounded-full before:bg-[#000000] before:content-[''] before:transition-all before:duration-700 ${
                    activeFilter === filter
                      ? "text-white before:w-[calc(100%-8px)]"
                      : "text-[#6F6F6F] before:w-0 hover:text-white hover:before:w-[calc(100%-8px)]"
                  }`}
                >
                  <span className="relative z-[1]">{filter}</span>
                </button>
              ))}
            </div>
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowDateFilters((isOpen) => !isOpen)}
                className="group relative flex items-center gap-4 overflow-hidden bg-[#1F1F1F] border border-[#2B2B2B] p-1 rounded-full text-body-5 md:text-body-4 text-white transition-colors duration-700 before:absolute before:inset-y-1 before:left-1 before:w-[calc(100%-46px)] before:rounded-full before:bg-[#000000] before:content-[''] before:transition-all before:duration-700 hover:before:w-[calc(100%-8px)]"
              >
                <span className="relative z-[1] px-5 md:px-6 py-3">
                  {activeDateFilter}
                </span>
                <FaChevronDown
                  className={`relative z-[1] mr-4 text-white text-body-5 transition-transform duration-700 ${
                    showDateFilters ? "rotate-180" : "group-hover:rotate-180"
                  }`}
                />
              </button>

              {showDateFilters && (
                <div className="absolute left-0 right-0 top-[calc(100%+10px)] z-20 overflow-hidden rounded-2xl border border-[#2B2B2B] bg-[#1A1A1A] p-1 shadow-2xl">
                  {dateFilters.map((filter) => (
                    <button
                      key={filter}
                      type="button"
                      onClick={() => setActiveDateFilter(filter)}
                      className={`block w-full rounded-xl px-4 py-3 text-left text-body-5 transition-colors duration-500 ${
                        activeDateFilter === filter
                          ? "bg-black text-white"
                          : "text-[#777] hover:bg-black hover:text-white"
                      }`}
                    >
                      {filter}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {showMediaScrollProgress && (
          <div className="fixed right-4 md:right-7 top-1/2 -translate-y-1/2 z-50 hidden sm:flex h-[146px] w-[76px] flex-col items-center justify-center gap-5 rounded-2xl border border-white/5 bg-[#2A2A2A]/95 backdrop-blur-sm">
            <div className="relative h-14 w-2.5 overflow-hidden rounded-full bg-[#7A7A7A]">
              <div
                className="absolute left-0 top-0 w-full rounded-full bg-white transition-[height,opacity] duration-300 ease-out"
                style={{
                  height: isAtMediaEnd
                    ? "100%"
                    : `${Math.max(22, mediaScrollProgress)}%`,
                  opacity: isAtMediaEnd ? 0.45 : 1,
                }}
              />
            </div>
            <div
              className={`h-2.5 w-2.5 rounded-full transition-colors duration-300 ${
                isAtMediaEnd ? "bg-white" : "bg-[#7A7A7A]"
              }`}
            />
          </div>
        )}

        {visibleMedia.length > 0 ? (
          <div
            ref={mediaGridRef}
            className="columns-2 md:columns-3 gap-3 md:gap-4"
          >
            {visibleMedia.map((media, index) => (
              <div
                key={`gallery-page-${activeFilter}-${activeDateFilter}-${index}`}
                className={`relative mb-3 md:mb-4 w-full break-inside-avoid rounded-lg overflow-hidden [clip-path:inset(0_round_0.5rem)] group border border-white/10 bg-[#111] cursor-pointer ${
                  index % 5 === 1 || index % 5 === 4
                    ? "h-[220px] md:h-[310px]"
                    : "h-[160px] md:h-[230px]"
                }`}
                onClick={() => setActivePreviewIndex(index)}
              >
                {media.type === "video" ? (
                  <video
                    src={media.src}
                    controls
                    className="w-full h-full rounded-[inherit] object-center object-cover"
                  />
                ) : (
                  <img
                    src={media.src}
                    alt={`SuperteamNG gallery moment ${index + 1}`}
                    className="w-full h-full rounded-[inherit] object-center object-cover transition-transform duration-500 will-change-transform hover:scale-110 group-hover:scale-110"
                  />
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="min-h-[320px] rounded-lg border border-white/10 bg-[#0F0F0F] flex flex-col items-center justify-center text-center px-6">
            <p className="text-heading-7 text-white !font-medium">
              No media found
            </p>
            <p className="text-body-5 text-[#525252] mt-2 max-w-[360px]">
              Moments for this filter will show here as soon as they are added
              to the gallery.
            </p>
          </div>
        )}

        {hasMoreMedia && (
          <div className="flex justify-center mt-4">
            <Button
              type="primary"
              typeoF="button"
              onClick={() =>
                setVisibleMediaCount((count) => count + visibleMediaBatchSize)
              }
              className="text-body-3"
            >
              Load More
            </Button>
          </div>
        )}
      </div>

      </section>
      {previewOverlay}
    </>
  );
};
