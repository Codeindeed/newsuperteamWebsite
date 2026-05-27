interface GalleryScrollProgressProps {
  isAtMediaEnd: boolean;
  mediaScrollProgress: number;
}

const GalleryScrollProgress = ({
  isAtMediaEnd,
  mediaScrollProgress,
}: GalleryScrollProgressProps) => {
  return (
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
  );
};

export default GalleryScrollProgress;
