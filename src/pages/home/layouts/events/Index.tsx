import { useEffect, useState, useRef } from "react";
import { fetchEvents, EventData } from "./data";
import EventCard from "./components/EventCard";
import { FaSearch, FaChevronDown } from "react-icons/fa";
import sparkle from "@/assets/graphics/sparkle.svg";

const Events = () => {
  const [events, setEvents] = useState<EventData[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"All Events" | "IRL" | "Virtual">(
    "All Events",
  );
  const [searchQuery, setSearchQuery] = useState("");

  const [timeFilter, setTimeFilter] = useState("This Week");
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

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

  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = `${date.getMonth() + 1}`.padStart(2, "0");
    const day = `${date.getDate()}`.padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  const filteredEvents = events.filter((e) => {
    const matchesType = filter === "All Events" || e.type === filter;
    const normalizedSearch = searchQuery.trim().toLowerCase();
    const matchesSearch =
      normalizedSearch.length === 0 ||
      [e.title, e.community, e.timeRange, e.timezone, e.type]
        .join(" ")
        .toLowerCase()
        .includes(normalizedSearch);

    return matchesType && matchesSearch;
  });

  const groupedEvents = filteredEvents.reduce<Record<string, EventData[]>>(
    (acc, event) => {
      if (!acc[event.date]) {
        acc[event.date] = [];
      }
      acc[event.date].push(event);
      return acc;
    },
    {},
  );

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const today = new Date();
  const todayISO = formatDate(today);

  // Options for time filter
  const timeOptions = ["This Week", "This Month"];
  for (let i = 1; i < 6; i++) {
    timeOptions.push(months[(today.getMonth() + i) % 12]);
  }

  const getFilterDateRange = () => {
    const dates: Date[] = [];

    if (timeFilter === "This Week") {
      for (let i = 0; i < 7; i++) {
        const d = new Date(today);
        d.setDate(today.getDate() + i);
        dates.push(d);
      }
    } else if (timeFilter === "This Month") {
      const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
      const daysLeft = endOfMonth.getDate() - today.getDate() + 1;
      for (let i = 0; i < daysLeft; i++) {
        const d = new Date(
          today.getFullYear(),
          today.getMonth(),
          today.getDate() + i,
        );
        dates.push(d);
      }
    } else {
      const targetMonth = months.indexOf(timeFilter);
      if (targetMonth !== -1) {
        const isNextYear = targetMonth < today.getMonth();
        const year = today.getFullYear() + (isNextYear ? 1 : 0);
        const endOfMonth = new Date(year, targetMonth + 1, 0);
        for (let i = 1; i <= endOfMonth.getDate(); i++) {
          dates.push(new Date(year, targetMonth, i));
        }
      }
    }
    return dates;
  };

  const displayDatesArr = getFilterDateRange();

  return (
    <section
      id="events"
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
          <span className="text-white">Ideas</span>{" "}
          <span className="text-[#5F5F5F]">
            <img src={sparkle} alt="" className="inline mr-1 h-8" />
            hit different when we come together,
          </span>{" "}
          <br className="hidden lg:block" />{" "}
          <span className="text-[#5F5F5F]">
            You really just have to be there.
          </span>
        </h2>

        <div className="lg:max-w-[89%] max-w-[100%]">
          {/* Controls Bar */}
          <div className="w-full flex flex-col md:flex-row justify-between items-center gap-4 mb-4 lg:mb-14 ">
            {/* Filters */}
            <div className="flex bg-grey-100 p-1 rounded-3xl">
              {["All Events", "IRL", "Virtual"].map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f as any)}
                  className={`px-4 py-2 rounded-full text-body-5 transition-colors ${
                    filter === f
                      ? "bg-[#1A1A1A] text-white"
                      : "text-[#5F5F5F] hover:text-grey-80"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>

            {/* Search & Sort */}
            <div className="hidden md:flex gap-4 w-full md:w-auto items-center">
              <div className="flex-1 md:flex-none flex items-center gap-2 bg-grey-100 p-1.5 rounded-full">
                <input
                  type="text"
                  placeholder="Search"
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  className="bg-[#1A1A1A] text-white placeholder-[#5F5F5F] text-body-5 rounded-full px-2.5 py-2 md:px-3 md:py-3 w-32 md:w-48 focus:outline-none focus:ring-1 focus:ring-white/20 transition-all font-medium border border-transparent focus:border-white/10"
                />
                <button>
                  <FaSearch className="block text-[#5F5F5F] p-2" size={32} />
                </button>
              </div>

              <div className="relative h-full" ref={dropdownRef}>
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
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
                    {timeOptions.map((opt) => (
                      <button
                        key={opt}
                        onClick={() => {
                          setTimeFilter(opt);
                          setShowDropdown(false);
                        }}
                        className={`w-full text-left px-5 py-2 text-sm transition-colors ${timeFilter === opt ? "bg-primary/10 text-primary" : "text-gray-400 hover:bg-white/5 hover:text-white"}`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Timeline Board Container */}
          <div className="w-full">
            {loading ? (
              <div className="flex gap-8 overflow-x-auto pb-8 scrollbar-hide">
                {[1, 2, 3, 4].map((idx) => (
                  <div
                    key={idx}
                    className="w-[320px] flex-shrink-0 flex flex-col gap-6 animate-pulse"
                  >
                    <div className="w-24 h-6 bg-[#1A1A1A] rounded-full ml-8"></div>
                    <div className="h-[240px] bg-[#111111] rounded-2xl ml-8"></div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex gap-8 overflow-y-hidden overflow-x-scroll max-h-[391px] px-6 pt-7 relative custom-scrollbar scrollbar-hide bg-grey-100 rounded-2xl">
                {displayDatesArr.length === 0 && (
                  <div className="w-full text-center text-body-5 text-grey-60 py-20 font-medium">
                    No dates found
                  </div>
                )}
                {displayDatesArr.map((dateObj) => {
                  const dateISO = formatDate(dateObj);
                  const dayEvents = groupedEvents[dateISO] || [];
                  const isToday = dateISO === todayISO;

                  const displayMonth = months[dateObj.getMonth()].substring(
                    0,
                    3,
                  );
                  const displayDay = dateObj
                    .getDate()
                    .toString()
                    .padStart(2, "0");
                  const daysOfWeek = [
                    "Sunday",
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Friday",
                    "Saturday",
                  ];
                  const displayDayOfWeek = daysOfWeek[dateObj.getDay()];

                  const uiDateStr = isToday
                    ? "Today"
                    : `${displayMonth} ${displayDay} ${displayDayOfWeek}`;

                  return (
                    <div
                      key={dateISO}
                      className="w-[320px] overflow-y-scroll max-h-[371px] flex-shrink-0 flex flex-col gap-6 relative group pb-5"
                    >
                      {/* Vertical line connecting the timeline */}
                      <div className="absolute left-1.5 top-[32px] bottom-0 w-[1px] bg-white/5 z-0" />

                      {/* Date Badge */}
                      <div className="flex items-center gap-4 relative z-10 w-fit">
                        {/* Timeline dot */}
                        <div
                          className={`w-3 h-3 rounded-full border-[3px] box-content border-[#0A0A0A] ${isToday ? "bg-secondary" : dayEvents.length > 0 ? "bg-primary" : "bg-[#1A1A1A]"}`}
                        />

                        <div
                          className={`text-body-5 px-3.5 py-1.5 rounded-full font-medium ${
                            isToday
                              ? "bg-secondary/10 text-secondary"
                              : "bg-[#1A1A1A] text-grey-30"
                          }`}
                        >
                          {uiDateStr}
                        </div>
                      </div>

                      {/* Cards */}
                      <div className="flex flex-col gap-4 pl-8 relative z-10 w-full pr-2">
                        {dayEvents.length > 0 ? (
                          dayEvents.map((event) => (
                            <EventCard key={event.id} event={event} />
                          ))
                        ) : (
                          <div className="text-grey-60 text-body-5 font-medium mt-1">
                            No events scheduled
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Events;
