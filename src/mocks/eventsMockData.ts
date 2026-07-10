export interface MockEvent {
  id: number;
  title: string;
  description: string;
  event_type: string;
  location: string;
  start_datetime: string;
  end_datetime: string;
  all_day: boolean;
  color: string;
  reminder_minutes: number | null;
}

const today = new Date();
const iso = (daysFromNow: number, hour: number, minute = 0) => {
  const d = new Date(today);
  d.setDate(d.getDate() + daysFromNow);
  d.setHours(hour, minute, 0, 0);
  return d.toISOString();
};

export const eventsSeed: MockEvent[] = [
  {
    id: 1,
    title: 'Culto de Domingo',
    description: 'Culto de celebração e adoração.',
    event_type: 'service',
    location: 'Templo Principal',
    start_datetime: iso(2, 10),
    end_datetime: iso(2, 12),
    all_day: false,
    color: 'bg-purple-500',
    reminder_minutes: 60,
  },
  {
    id: 2,
    title: 'Reunião de Líderes',
    description: 'Alinhamento mensal com os líderes de ministério.',
    event_type: 'meeting',
    location: 'Sala de Reuniões',
    start_datetime: iso(4, 19),
    end_datetime: iso(4, 21),
    all_day: false,
    color: 'bg-blue-500',
    reminder_minutes: 30,
  },
  {
    id: 3,
    title: 'Estudo Bíblico',
    description: 'Estudo sobre o livro de Romanos.',
    event_type: 'study',
    location: 'Salão Social',
    start_datetime: iso(5, 20),
    end_datetime: iso(5, 21, 30),
    all_day: false,
    color: 'bg-green-500',
    reminder_minutes: 30,
  },
];
