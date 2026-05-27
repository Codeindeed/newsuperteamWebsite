import { EventData } from "./data";

export const months = [
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

export type EventFilter = "All Events" | "IRL" | "Virtual";

export const formatDate = (date: Date) => {
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, "0");
  const day = `${date.getDate()}`.padStart(2, "0");

  return `${year}-${month}-${day}`;
};

export const getTimeOptions = (today: Date) => {
  const timeOptions = ["This Week", "This Month"];

  for (let i = 1; i < 6; i++) {
    timeOptions.push(months[(today.getMonth() + i) % 12]);
  }

  return timeOptions;
};

export const getFilterDateRange = (timeFilter: string, today: Date) => {
  const dates: Date[] = [];

  if (timeFilter === "This Week") {
    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      dates.push(date);
    }
    return dates;
  }

  if (timeFilter === "This Month") {
    const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    const daysLeft = endOfMonth.getDate() - today.getDate() + 1;
    for (let i = 0; i < daysLeft; i++) {
      dates.push(
        new Date(today.getFullYear(), today.getMonth(), today.getDate() + i),
      );
    }
    return dates;
  }

  const targetMonth = months.indexOf(timeFilter);
  if (targetMonth === -1) return dates;

  const isNextYear = targetMonth < today.getMonth();
  const year = today.getFullYear() + (isNextYear ? 1 : 0);
  const endOfMonth = new Date(year, targetMonth + 1, 0);

  for (let i = 1; i <= endOfMonth.getDate(); i++) {
    dates.push(new Date(year, targetMonth, i));
  }

  return dates;
};

export const filterEvents = (
  events: EventData[],
  filter: EventFilter,
  searchQuery: string,
) => {
  const normalizedSearch = searchQuery.trim().toLowerCase();

  return events.filter((event) => {
    const matchesType = filter === "All Events" || event.type === filter;
    const matchesSearch =
      normalizedSearch.length === 0 ||
      [
        event.title,
        event.community,
        event.timeRange,
        event.timezone,
        event.type,
      ]
        .join(" ")
        .toLowerCase()
        .includes(normalizedSearch);

    return matchesType && matchesSearch;
  });
};

export const groupEventsByDate = (events: EventData[]) => {
  return events.reduce<Record<string, EventData[]>>((acc, event) => {
    if (!acc[event.date]) {
      acc[event.date] = [];
    }

    acc[event.date].push(event);
    return acc;
  }, {});
};
