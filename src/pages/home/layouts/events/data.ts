export type EventType = 'IRL' | 'Virtual';

export interface EventData {
  id: string;
  title: string;
  timeRange: string;
  timezone: string;
  community: string;
  type: EventType;
  date: string;
}

interface RecurringEventData extends Omit<EventData, 'id' | 'date'> {
  id: string;
  weekday: number;
}

const formatDate = (date: Date) => {
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, '0');
  const day = `${date.getDate()}`.padStart(2, '0');

  return `${year}-${month}-${day}`;
};

const getCalendarEndDate = () => {
  const today = new Date();
  return new Date(today.getFullYear(), today.getMonth() + 6, 0);
};

const generateWeeklyEvents = (events: RecurringEventData[]) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const calendarEndDate = getCalendarEndDate();

  return events.flatMap((event) => {
    const firstEventDate = new Date(today);
    const daysUntilEvent = (event.weekday - today.getDay() + 7) % 7;
    firstEventDate.setDate(today.getDate() + daysUntilEvent);

    const eventDates: EventData[] = [];
    const currentDate = new Date(firstEventDate);

    while (currentDate <= calendarEndDate) {
      const date = formatDate(currentDate);
      eventDates.push({
        ...event,
        id: `${event.id}-${date}`,
        date,
      });
      currentDate.setDate(currentDate.getDate() + 7);
    }

    return eventDates;
  });
};

const RECURRING_EVENTS: RecurringEventData[] = [
  {
    id: 'superteamng-weekly-call',
    title: 'SuperteamNG Weekly Community Call',
    timeRange: '6:00 PM - 7:00 PM',
    timezone: 'WAT',
    community: 'YouTube Channel',
    type: 'Virtual',
    weekday: 4,
  },
  {
    id: 'developers-call',
    title: 'Developers Call',
    timeRange: '8:00 PM - 9:00 PM',
    timezone: 'WAT',
    community: 'Google Meet',
    type: 'Virtual',
    weekday: 0,
  },
  {
    id: 'writers-call',
    title: "Writers Call",
    timeRange: '7:00 PM - 8:00 PM',
    timezone: 'WAT',
    community: 'Google Meet',
    type: 'Virtual',
    weekday: 2,
  },
  {
    id: 'designers-call',
    title: 'Designers Call',
    timeRange: '8:00 PM - 9:00 PM',
    timezone: 'WAT',
    community: 'Google Meet',
    type: 'Virtual',
    weekday: 2,
  },
];

export const fetchEvents = async (): Promise<EventData[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(generateWeeklyEvents(RECURRING_EVENTS)), 1500);
  });
};
