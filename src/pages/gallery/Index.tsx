import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Button from "@/components/button/Index";
import VerticalScrollContainer, {
  useScrollContainer,
} from "@/layouts/vertical-scroll-container/Index";
import Events from "@/pages/home/layouts/events/Index";
import Footer from "@/pages/home/layouts/footer/Index";
import {
  DateFilter,
  galleryMedia,
  initialVisibleMediaCount,
  MediaFilter,
  visibleMediaBatchSize,
} from "./data";
import GalleryControls from "./components/GalleryControls";
import GalleryGrid from "./components/GalleryGrid";
import GalleryPreviewModal from "./components/GalleryPreviewModal";
import GalleryScrollProgress from "./components/GalleryScrollProgress";

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

  const showPreviousPreview = useCallback(() => {
    if (filteredMedia.length === 0) return;
    setActivePreviewIndex((currentIndex) => {
      if (currentIndex === null) return 0;
      return (currentIndex - 1 + filteredMedia.length) % filteredMedia.length;
    });
  }, [filteredMedia.length]);

  const showNextPreview = useCallback(() => {
    if (filteredMedia.length === 0) return;
    setActivePreviewIndex((currentIndex) => {
      if (currentIndex === null) return 0;
      return (currentIndex + 1) % filteredMedia.length;
    });
  }, [filteredMedia.length]);

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
  }, [activePreviewIndex, showNextPreview, showPreviousPreview]);

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
          <GalleryControls
            activeDateFilter={activeDateFilter}
            activeFilter={activeFilter}
            showDateFilters={showDateFilters}
            onDateFilterChange={setActiveDateFilter}
            onFilterChange={setActiveFilter}
            onToggleDateFilters={() =>
              setShowDateFilters((isOpen) => !isOpen)
            }
          />
        </div>

        {showMediaScrollProgress && (
          <GalleryScrollProgress
            isAtMediaEnd={isAtMediaEnd}
            mediaScrollProgress={mediaScrollProgress}
          />
        )}

        <GalleryGrid
          activeDateFilter={activeDateFilter}
          activeFilter={activeFilter}
          media={visibleMedia}
          mediaGridRef={mediaGridRef}
          onPreviewOpen={setActivePreviewIndex}
        />

        {hasMoreMedia && (
          <div className="flex justify-center mt-4">
            <Button
              type="primary"
              buttonType="button"
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
      {activePreview && activePreviewIndex !== null && (
        <GalleryPreviewModal
          activePreview={activePreview}
          activePreviewIndex={activePreviewIndex}
          onClose={() => setActivePreviewIndex(null)}
          onNext={showNextPreview}
          onPrevious={showPreviousPreview}
        />
      )}
    </>
  );
};
