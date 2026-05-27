import { RefObject } from "react";
import { FaChevronDown, FaSearch } from "react-icons/fa";
import { EventFilter } from "../utils";

interface EventControlsProps {
  dropdownRef: RefObject<HTMLDivElement>;
  filter: EventFilter;
  searchQuery: string;
  showDropdown: boolean;
  timeFilter: string;
  timeOptions: string[];
  onFilterChange: (filter: EventFilter) => void;
  onSearchChange: (query: string) => void;
  onTimeFilterChange: (filter: string) => void;
  onToggleDropdown: () => void;
}

const eventFilters: EventFilter[] = ["All Events", "IRL", "Virtual"];

const EventControls = ({
  dropdownRef,
  filter,
  searchQuery,
  showDropdown,
  timeFilter,
  timeOptions,
  onFilterChange,
  onSearchChange,
  onTimeFilterChange,
  onToggleDropdown,
}: EventControlsProps) => {
  return (
    <div className="w-full flex flex-col md:flex-row justify-between items-center gap-4 mb-4 lg:mb-14 ">
      <div className="flex bg-grey-100 p-1 rounded-3xl">
        {eventFilters.map((eventFilter) => (
          <button
            key={eventFilter}
            onClick={() => onFilterChange(eventFilter)}
            className={`px-4 py-2 rounded-full text-body-5 transition-colors ${
              filter === eventFilter
                ? "bg-[#1A1A1A] text-white"
                : "text-[#5F5F5F] hover:text-grey-80"
            }`}
          >
            {eventFilter}
          </button>
        ))}
      </div>

      <div className="hidden md:flex gap-4 w-full md:w-auto items-center">
        <div className="flex-1 md:flex-none flex items-center gap-2 bg-grey-100 p-1.5 rounded-full">
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(event) => onSearchChange(event.target.value)}
            className="bg-[#1A1A1A] text-white placeholder-[#5F5F5F] text-body-5 rounded-full px-2.5 py-2 md:px-3 md:py-3 w-32 md:w-48 focus:outline-none focus:ring-1 focus:ring-white/20 transition-all font-medium border border-transparent focus:border-white/10"
          />
          <button type="button">
            <FaSearch className="block text-[#5F5F5F] p-2" size={32} />
          </button>
        </div>

        <div className="relative h-full" ref={dropdownRef}>
          <button
            type="button"
            onClick={onToggleDropdown}
            className="bg-[#1A1A1A] h-[52px] text-gray-400 text-body-5 px-5 py-2 rounded-full flex items-center gap-3 font-medium hover:bg-[#222222] transition-colors whitespace-nowrap"
          >
            {timeFilter}{" "}
            <FaChevronDown
              size={12}
              className={`text-gray-500 transition-transform ${showDropdown ? "rotate-180" : ""}`}
            />
          </button>
          {showDropdown && (
            <div className="absolute top-full right-0 mt-2 bg-[#1A1A1A] rounded-xl border border-white/5 py-2 w-48 shadow-xl z-50 overflow-hidden">
              {timeOptions.map((option) => (
                <button
                  key={option}
                  onClick={() => onTimeFilterChange(option)}
                  className={`w-full text-left px-5 py-2 text-sm transition-colors ${timeFilter === option ? "bg-primary/10 text-primary" : "text-gray-400 hover:bg-white/5 hover:text-white"}`}
                >
                  {option}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventControls;
