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

const getRelativeDateStr = (daysOffset: number) => {
  const d = new Date();
  d.setDate(d.getDate() + daysOffset);
  return d.toISOString().split('T')[0];
};

export const MOCK_EVENTS: EventData[] = [
  {
    id: '1',
    title: 'SuperteamNG Weekly Community Call',
    timeRange: '3:30 PM - 6:30 PM',
    timezone: 'GMT+1',
    community: 'Superteam Nigeria',
    type: 'Virtual',
    date: getRelativeDateStr(0),
  },
  {
    id: '2',
    title: 'Solana Summer, Abuja, Nigeria',
    timeRange: '3:30 PM - 6:30 PM',
    timezone: 'GMT+1',
    community: 'Solana',
    type: 'IRL',
    date: getRelativeDateStr(2),
  },
  {
    id: '3',
    title: "Writer's Community Call",
    timeRange: '3:30 PM - 6:30 PM',
    timezone: 'GMT+1',
    community: 'Outis & Asiel',
    type: 'Virtual',
    date: getRelativeDateStr(2),
  },
  {
    id: '4',
    title: 'Lagos State Weekly Community Call',
    timeRange: '3:30 PM - 6:30 PM',
    timezone: 'GMT+1',
    community: 'Manyo',
    type: 'Virtual',
    date: getRelativeDateStr(10),
  },
  {
    id: '5',
    title: 'Imo State Weekly Community Call',
    timeRange: '3:30 PM - 6:30 PM',
    timezone: 'GMT+1',
    community: 'Toochukwu',
    type: 'Virtual',
    date: getRelativeDateStr(15),
  }
];

export const fetchEvents = async (): Promise<EventData[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(MOCK_EVENTS), 1500); // Simulate network delay
  });
};
