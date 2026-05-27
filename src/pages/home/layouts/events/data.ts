export type EventType = 'IRL' | 'Virtual';

export interface EventData {
  id: string;
  title: string;
  timeRange: string;
  timezone: string;
  community: string;
  type: EventType;
  date: string;
  registrationUrl?: string;
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

const LUMA_EVENTS: EventData[] = [
  {
    id: 'luma-solana-ecosystem-call-delta',
    title: 'Solana Ecosystem Call - Delta',
    timeRange: '2:00 PM - 5:00 PM',
    timezone: 'WAT',
    community: 'Spices Kitchen Restaurant and Bakery, Warri',
    type: 'IRL',
    date: '2026-05-28',
    registrationUrl: 'https://luma.com/lnlfoylx',
  },
  {
    id: 'luma-solana-ecosystem-call-nasarawa',
    title: 'Solana Ecosystem Call - Nasarawa',
    timeRange: '2:00 PM - 5:00 PM',
    timezone: 'WAT',
    community: 'Lafia City Mall, Lafia',
    type: 'IRL',
    date: '2026-05-28',
    registrationUrl: 'https://luma.com/95vv8i5x',
  },
  {
    id: 'luma-solana-ecosystem-call-jigawa',
    title: 'Solana Ecosystem Call - Jigawa',
    timeRange: '1:00 PM - 4:00 PM',
    timezone: 'WAT',
    community: 'TrueRun Plaza, Dutse',
    type: 'IRL',
    date: '2026-05-28',
    registrationUrl: 'https://luma.com/i5hdp80e',
  },
  {
    id: 'luma-solana-ecosystem-call-bauchi',
    title: 'Solana Ecosystem Call - Bauchi',
    timeRange: '2:00 PM - 5:00 PM',
    timezone: 'WAT',
    community: 'Bauchi, Nigeria',
    type: 'IRL',
    date: '2026-05-28',
    registrationUrl: 'https://luma.com/vmgryapo',
  },
  {
    id: 'solana-summit-2026',
    title: 'Solana Summit',
    timeRange: 'TBA',
    timezone: 'WAT',
    community: 'TBA',
    type: 'IRL',
    date: '2026-08-08',
  },
  {
    id: 'luma-bitcoin-pizza-day-superteamng-owerri',
    title: 'Bitcoin Pizza Day - Immaculate Golden Hotel Owerri',
    timeRange: '11:00 AM - 3:00 PM',
    timezone: 'WAT',
    community: 'Immaculate Golden Hotel Owerri',
    type: 'IRL',
    date: '2026-05-22',
    registrationUrl: 'https://luma.com/2hj9p9zp',
  },
  {
    id: 'luma-bitcoin-pizza-day-cross-river',
    title: 'Bitcoin Pizza Day - University of Calabar',
    timeRange: '1:00 PM - 4:00 PM',
    timezone: 'WAT',
    community: 'University of Calabar, Calabar',
    type: 'IRL',
    date: '2026-05-22',
    registrationUrl: 'https://luma.com/w8di4q8c',
  },
  {
    id: 'luma-adamawa-bitcoin-pizza-day',
    title: 'Bitcoin Pizza Day - Karewa, Jimeta',
    timeRange: '2:00 PM - 6:00 PM',
    timezone: 'WAT',
    community: 'Karewa, Jimeta',
    type: 'IRL',
    date: '2026-05-22',
    registrationUrl: 'https://luma.com/by0vjenn',
  },
  {
    id: 'luma-bitcoin-pizza-day-feyishola',
    title: 'Bitcoin Pizza Day - Kwara State',
    timeRange: '2:00 PM - 3:00 PM',
    timezone: 'WAT',
    community: 'Kwara State',
    type: 'IRL',
    date: '2026-05-22',
    registrationUrl: 'https://luma.com/oaetp8lj',
  },
  {
    id: 'luma-bitcoin-pizza-day-lasu',
    title: 'Bitcoin Pizza Day - LASU',
    timeRange: '2:30 PM - 3:30 PM',
    timezone: 'WAT',
    community: 'LASU, Nigeria',
    type: 'IRL',
    date: '2026-05-22',
    registrationUrl: 'https://luma.com/ptzfuqna',
  },
  {
    id: 'luma-pizza-proof-people-ibadan',
    title: 'Bitcoin Pizza Day - Ibadan',
    timeRange: '3:00 PM - 7:00 PM',
    timezone: 'WAT',
    community: 'Ibadan, Oyo',
    type: 'IRL',
    date: '2026-05-22',
    registrationUrl: 'https://luma.com/nmj2dgji',
  },
  {
    id: 'luma-solana-pizza-day',
    title: 'Bitcoin Pizza Day - Blockchain Hub Africa',
    timeRange: '3:00 PM - 5:00 PM',
    timezone: 'WAT',
    community: 'Blockchain Hub Africa',
    type: 'IRL',
    date: '2026-05-22',
    registrationUrl: 'https://luma.com/4ku7xk59',
  },
];

export const fetchEvents = async (): Promise<EventData[]> => {
  return new Promise((resolve) => {
    setTimeout(
      () =>
        resolve(
          [...generateWeeklyEvents(RECURRING_EVENTS), ...LUMA_EVENTS].sort(
            (a, b) => a.date.localeCompare(b.date),
          ),
        ),
      1500,
    );
  });
};
