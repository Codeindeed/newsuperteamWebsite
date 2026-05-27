import { FaChevronDown } from "react-icons/fa";
import { DateFilter, MediaFilter, dateFilters, galleryFilters } from "../data";

interface GalleryControlsProps {
  activeFilter: MediaFilter;
  activeDateFilter: DateFilter;
  showDateFilters: boolean;
  onFilterChange: (filter: MediaFilter) => void;
  onDateFilterChange: (filter: DateFilter) => void;
  onToggleDateFilters: () => void;
}

const GalleryControls = ({
  activeFilter,
  activeDateFilter,
  showDateFilters,
  onFilterChange,
  onDateFilterChange,
  onToggleDateFilters,
}: GalleryControlsProps) => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-center gap-4 mt-12">
      <div className="flex items-center gap-1 bg-[#1F1F1F] border border-[#2B2B2B] p-1 rounded-full">
        {galleryFilters.map((filter) => (
          <button
            key={filter}
            onClick={() => onFilterChange(filter)}
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
          onClick={onToggleDateFilters}
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
                onClick={() => onDateFilterChange(filter)}
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
  );
};

export default GalleryControls;
