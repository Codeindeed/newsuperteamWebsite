import EventCard from "./EventCard";
import { EventData } from "../data";
import { formatDate, months } from "../utils";

interface EventTimelineProps {
  dates: Date[];
  groupedEvents: Record<string, EventData[]>;
  loading: boolean;
  todayISO: string;
}

const EventTimeline = ({
  dates,
  groupedEvents,
  loading,
  todayISO,
}: EventTimelineProps) => {
  if (loading) {
    return (
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
    );
  }

  return (
    <div className="flex gap-8 overflow-y-hidden overflow-x-scroll max-h-[391px] px-6 pt-7 relative custom-scrollbar scrollbar-hide bg-grey-100 rounded-2xl">
      {dates.length === 0 && (
        <div className="w-full text-center text-body-5 text-grey-60 py-20 font-medium">
          No dates found
        </div>
      )}
      {dates.map((date) => {
        const dateISO = formatDate(date);
        const dayEvents = groupedEvents[dateISO] || [];
        const isToday = dateISO === todayISO;
        const displayMonth = months[date.getMonth()].substring(0, 3);
        const displayDay = date.getDate().toString().padStart(2, "0");
        const displayDayOfWeek = date.toLocaleDateString("en-US", {
          weekday: "long",
        });
        const uiDateStr = isToday
          ? "Today"
          : `${displayMonth} ${displayDay} ${displayDayOfWeek}`;

        return (
          <div
            key={dateISO}
            className="w-[320px] overflow-y-scroll max-h-[371px] flex-shrink-0 flex flex-col gap-6 relative group pb-5"
          >
            <div className="absolute left-1.5 top-[32px] bottom-0 w-[1px] bg-white/5 z-0" />

            <div className="flex items-center gap-4 relative z-10 w-fit">
              <div
                className={`w-3 h-3 rounded-full border-[3px] box-content border-[#0A0A0A] ${isToday ? "bg-secondary" : dayEvents.length > 0 ? "bg-primary" : "bg-[#1A1A1A]"}`}
              />

              <div
                className={`text-body-5 px-3.5 py-1.5 rounded-full font-medium ${
                  isToday ? "bg-secondary/10 text-secondary" : "bg-[#1A1A1A] text-grey-30"
                }`}
              >
                {uiDateStr}
              </div>
            </div>

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
  );
};

export default EventTimeline;
