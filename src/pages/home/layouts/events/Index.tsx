import { useEffect, useMemo, useRef, useState } from "react";
import { fetchEvents, EventData } from "./data";
import { useScrollContainer } from "@/layouts/vertical-scroll-container/Index";
import EventControls from "./components/EventControls";
import EventTimeline from "./components/EventTimeline";
import {
  EventFilter,
  filterEvents,
  formatDate,
  getFilterDateRange,
  getTimeOptions,
  groupEventsByDate,
} from "./utils";

const Events = () => {
  const eventsRef = useRef<HTMLElement>(null);
  const { containerRef } = useScrollContainer();
  const [events, setEvents] = useState<EventData[]>([]);
  const [loading, setLoading] = useState(true);
  const [revealProgress, setRevealProgress] = useState(0);
  const [filter, setFilter] = useState<EventFilter>("All Events");
  const [searchQuery, setSearchQuery] = useState("");

  const [timeFilter, setTimeFilter] = useState("This Week");
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const totalRevealItems = 14;

  useEffect(() => {
    const container = containerRef?.current;
    const eventsSection = eventsRef.current;
    if (!container || !eventsSection) return;

    const updateRevealProgress = () => {
      const containerRect = container.getBoundingClientRect();
      const eventsRect = eventsSection.getBoundingClientRect();
      const eventsTop = eventsRect.top - containerRect.top + container.scrollTop;
      const viewportHeight = container.clientHeight;
      const revealRange = viewportHeight * 0.75;
      const distanceFromFullView = Math.abs(container.scrollTop - eventsTop);
      const progress = 1 - distanceFromFullView / Math.max(revealRange, 1);

      setRevealProgress(Math.min(1, Math.max(0, progress)));
    };

    updateRevealProgress();
    container.addEventListener("scroll", updateRevealProgress);
    window.addEventListener("resize", updateRevealProgress);

    return () => {
      container.removeEventListener("scroll", updateRevealProgress);
      window.removeEventListener("resize", updateRevealProgress);
    };
  }, [containerRef]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const data = await fetchEvents();
      setEvents(data);
      setLoading(false);
    };
    loadData();
  }, []);

  const today = useMemo(() => new Date(), []);
  const todayISO = formatDate(today);
  const timeOptions = useMemo(() => getTimeOptions(today), [today]);
  const filteredEvents = useMemo(
    () => filterEvents(events, filter, searchQuery),
    [events, filter, searchQuery],
  );
  const groupedEvents = useMemo(
    () => groupEventsByDate(filteredEvents),
    [filteredEvents],
  );
  const displayDatesArr = useMemo(
    () => getFilterDateRange(timeFilter, today),
    [timeFilter, today],
  );
  const isItemRevealed = (sequenceIndex: number) => {
    const threshold = sequenceIndex / Math.max(totalRevealItems, 1);
    return revealProgress >= threshold;
  };

  let sequenceIndex = -1;
  const getRevealClass = () => {
    sequenceIndex += 1;
    return isItemRevealed(sequenceIndex) ? "text-white" : "text-[#5F5F5F]";
  };

  const sparkleRotation = -45 + revealProgress * 90;

  return (
    <section
      id="events"
      ref={eventsRef}
      className="bg-[#0F0F0F] pt-14 md:pt-24 pb-24 md:pb-40 px-4 md:px-7 lg:px-10 text-white w-full"
    >
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        {/* Top Badge */}
        <div className="bg-[#131E19] text-primary text-body-5 px-4 py-1.5 rounded-full mb-8 font-medium tracking-wide flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-primary"></div> Upcoming
          Events
        </div>

        {/* Heading */}
        <h2 className="text-heading-6 md:text-heading-5 !font-medium text-center mb-16 lg:max-w-[800px] max-w-[90%]">
          <span className={`transition-colors duration-500 ${getRevealClass()}`}>
            Ideas
          </span>{" "}
          <svg
            aria-hidden="true"
            className="mx-1 inline-block h-8 w-8 align-[-0.1em] transition-colors duration-500"
            viewBox="0 0 26 26"
            fill="none"
            style={{
              color: revealProgress >= 1 ? "#00AD66" : "#5F5F5F",
              transform: `rotate(${sparkleRotation}deg)`,
              transition: "transform 500ms ease, color 500ms ease",
            }}
          >
            <path
              d="M0 5.12305C0 5.12305 4.72094 8.50112 11.1953 6.86005C17.6696 5.21898 20.2114 -1.50981e-05 20.2114 -1.50981e-05C20.2114 -1.50981e-05 16.9275 5.1097 18.4703 11.1963C20.0131 17.2828 25.3344 20.2114 25.3344 20.2114C25.3344 20.2114 20.2785 16.9434 14.1452 18.498C8.0119 20.0527 5.12306 25.3344 5.12306 25.3344C5.12306 25.3344 8.21306 19.5933 6.83235 14.1462C5.45165 8.69907 0 5.12305 0 5.12305Z"
              fill="currentColor"
            />
          </svg>
          <span className={`transition-colors duration-500 ${getRevealClass()}`}>
            hit
          </span>{" "}
          <span className={`transition-colors duration-500 ${getRevealClass()}`}>
            different
          </span>{" "}
          <span className={`transition-colors duration-500 ${getRevealClass()}`}>
            when
          </span>{" "}
          <span className={`transition-colors duration-500 ${getRevealClass()}`}>
            we
          </span>{" "}
          <span className={`transition-colors duration-500 ${getRevealClass()}`}>
            come
          </span>{" "}
          <span className={`transition-colors duration-500 ${getRevealClass()}`}>
            together,
          </span>{" "}
          <br className="hidden lg:block" />{" "}
          <span className={`transition-colors duration-500 ${getRevealClass()}`}>
            You
          </span>{" "}
          <span className={`transition-colors duration-500 ${getRevealClass()}`}>
            really
          </span>{" "}
          <span className={`transition-colors duration-500 ${getRevealClass()}`}>
            just
          </span>{" "}
          <span className={`transition-colors duration-500 ${getRevealClass()}`}>
            have
          </span>{" "}
          <span className={`transition-colors duration-500 ${getRevealClass()}`}>
            to
          </span>{" "}
          <span className={`transition-colors duration-500 ${getRevealClass()}`}>
            be
          </span>{" "}
          <span className={`transition-colors duration-500 ${getRevealClass()}`}>
            there.
          </span>
        </h2>

        <div className="lg:max-w-[89%] max-w-[100%]">
          <EventControls
            dropdownRef={dropdownRef}
            filter={filter}
            searchQuery={searchQuery}
            showDropdown={showDropdown}
            timeFilter={timeFilter}
            timeOptions={timeOptions}
            onFilterChange={setFilter}
            onSearchChange={setSearchQuery}
            onTimeFilterChange={(option) => {
              setTimeFilter(option);
              setShowDropdown(false);
            }}
            onToggleDropdown={() => setShowDropdown((isOpen) => !isOpen)}
          />

          <div className="w-full">
            <EventTimeline
              dates={displayDatesArr}
              groupedEvents={groupedEvents}
              loading={loading}
              todayISO={todayISO}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Events;
