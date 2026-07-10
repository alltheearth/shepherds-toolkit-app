import type {
  ReadingPlan,
  ReadingDay,
  ReadingStatus,
  ReadingStats,
  CreatePlanPayload,
  UpdateReadingPayload,
} from '../types/readingPlan.types';
import mockTemplates from './readingPlanTemplates';

const DAY_MS = 24 * 60 * 60 * 1000;
const toISODate = (d: Date) => d.toISOString().split('T')[0];
const addDays = (d: Date, n: number) => new Date(d.getTime() + n * DAY_MS);

let planIdCounter = 1;
let dayIdCounter = 1;

const daysByPlan = new Map<string, ReadingDay[]>();
const plans = new Map<string, ReadingPlan>();

const generateDays = (planId: string, startDate: Date, totalDays: number): ReadingDay[] => {
  const today = new Date();
  const windowStart = addDays(today, -14);
  const windowEnd = addDays(today, 14);
  const days: ReadingDay[] = [];

  let cursor = new Date(Math.max(startDate.getTime(), windowStart.getTime()));
  const end = new Date(Math.min(addDays(startDate, totalDays - 1).getTime(), windowEnd.getTime()));

  while (cursor <= end) {
    const dayNumber = Math.floor((cursor.getTime() - startDate.getTime()) / DAY_MS) + 1;
    const chapter = ((dayNumber - 1) % 50) + 1;
    const isPast = cursor < today && toISODate(cursor) !== toISODate(today);
    const status: ReadingStatus = isPast ? (dayNumber % 6 === 0 ? 'skipped' : 'completed') : 'pending';

    days.push({
      id: `day-${dayIdCounter++}`,
      date: toISODate(cursor),
      day_number: dayNumber,
      readings: [
        {
          book: 'Gênesis',
          book_id: 1,
          chapters: [chapter],
          reference: `Gênesis ${chapter}`,
        },
      ],
      status,
      completed_at: status === 'completed' ? new Date(cursor.getTime() + 8 * 60 * 60 * 1000).toISOString() : undefined,
      notes: undefined,
    });

    cursor = addDays(cursor, 1);
  }

  daysByPlan.set(planId, days);
  return days;
};

const withProgress = (plan: ReadingPlan): ReadingPlan => {
  const days = daysByPlan.get(plan.id) || [];
  const completed = days.filter((d) => d.status === 'completed').length;
  const total = plan.total_days;
  return {
    ...plan,
    days_completed: completed,
    progress_percentage: total > 0 ? Math.min(100, Math.round((completed / total) * 100)) : 0,
  };
};

const seedPlan = () => {
  const id = `plan-${planIdCounter++}`;
  const start = addDays(new Date(), -14);
  const total = 365;
  const plan: ReadingPlan = {
    id,
    name: 'Bíblia em 1 Ano',
    description: 'Leia toda a Bíblia em 365 dias com um plano equilibrado entre AT e NT',
    type: 'bible_year',
    start_date: toISODate(start),
    end_date: toISODate(addDays(start, total - 1)),
    total_days: total,
    days_completed: 0,
    progress_percentage: 0,
    is_active: true,
    created_at: start.toISOString(),
    updated_at: new Date().toISOString(),
  };
  plans.set(id, plan);
  generateDays(id, start, total);
};

seedPlan();

export const getMyPlans = (): ReadingPlan[] => Array.from(plans.values()).map(withProgress);

export const getPlanById = (id: string): ReadingPlan | undefined => {
  const plan = plans.get(id);
  return plan ? withProgress(plan) : undefined;
};

export const getTemplates = () => mockTemplates;

export const createPlan = (payload: CreatePlanPayload): ReadingPlan => {
  const template = mockTemplates.find((t) => t.id === payload.template_id);
  const id = `plan-${planIdCounter++}`;
  const start = payload.start_date ? new Date(payload.start_date) : new Date();
  const total = template?.duration_days || 30;
  const plan: ReadingPlan = {
    id,
    name: payload.name || template?.name || 'Novo Plano de Leitura',
    description: template?.description || 'Plano personalizado de leitura bíblica',
    type: template?.type || 'custom',
    start_date: toISODate(start),
    end_date: toISODate(addDays(start, total - 1)),
    total_days: total,
    days_completed: 0,
    progress_percentage: 0,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
  plans.set(id, plan);
  generateDays(id, start, total);
  return withProgress(plan);
};

export const deletePlan = (id: string): void => {
  plans.delete(id);
  daysByPlan.delete(id);
};

export const getTodayReading = (planId: string): ReadingDay => {
  const todayIso = toISODate(new Date());
  const days = daysByPlan.get(planId) || [];
  const existing = days.find((d) => d.date === todayIso);
  if (existing) return existing;

  const plan = plans.get(planId);
  const dayNumber = plan ? Math.floor((new Date().getTime() - new Date(plan.start_date).getTime()) / DAY_MS) + 1 : 1;
  const created: ReadingDay = {
    id: `day-${dayIdCounter++}`,
    date: todayIso,
    day_number: dayNumber,
    readings: [{ book: 'Gênesis', book_id: 1, chapters: [((dayNumber - 1) % 50) + 1], reference: `Gênesis ${((dayNumber - 1) % 50) + 1}` }],
    status: 'pending',
  };
  days.push(created);
  daysByPlan.set(planId, days);
  return created;
};

export const getReadingHistory = (planId: string, month?: string): ReadingDay[] => {
  const days = daysByPlan.get(planId) || [];
  if (!month) return days;
  return days.filter((d) => d.date.startsWith(month));
};

export const updateReadingStatus = (payload: UpdateReadingPayload): ReadingDay | undefined => {
  for (const [planId, days] of daysByPlan.entries()) {
    const idx = days.findIndex((d) => d.id === payload.reading_day_id);
    if (idx !== -1) {
      const updated: ReadingDay = {
        ...days[idx],
        status: payload.status,
        notes: payload.notes ?? days[idx].notes,
        completed_at: payload.status === 'completed' ? new Date().toISOString() : days[idx].completed_at,
      };
      days[idx] = updated;
      daysByPlan.set(planId, days);
      return updated;
    }
  }
  return undefined;
};

export const getReadingStats = (planId: string): ReadingStats => {
  const days = daysByPlan.get(planId) || [];
  const completed = days.filter((d) => d.status === 'completed');
  const sorted = [...days].sort((a, b) => a.date.localeCompare(b.date));

  let currentStreak = 0;
  for (let i = sorted.length - 1; i >= 0; i--) {
    if (sorted[i].status === 'completed') currentStreak++;
    else if (sorted[i].date < toISODate(new Date())) break;
  }

  let longestStreak = 0;
  let running = 0;
  for (const day of sorted) {
    if (day.status === 'completed') {
      running++;
      longestStreak = Math.max(longestStreak, running);
    } else {
      running = 0;
    }
  }

  const plan = plans.get(planId);
  const totalDays = plan?.total_days || days.length || 1;

  return {
    total_days: totalDays,
    completed_days: completed.length,
    current_streak: currentStreak,
    longest_streak: longestStreak,
    completion_rate: days.length ? Math.round((completed.length / days.length) * 100) : 0,
    average_per_week: Math.round((completed.length / Math.max(1, days.length / 7)) * 10) / 10,
  };
};
