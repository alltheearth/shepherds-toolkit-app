// src/types/readingPlan.types.ts

export type PlanType = 'bible_year' | 'nt_90days' | 'psalms_month' | 'custom';

export type ReadingStatus = 'pending' | 'completed' | 'skipped';

export interface ReadingDay {
  id: string;
  date: string;
  day_number: number;
  readings: ReadingReference[];
  status: ReadingStatus;
  completed_at?: string;
  notes?: string;
}

export interface ReadingReference {
  book: string;
  book_id: number;
  chapters: number[];
  verses?: string; // Ex: "1-10" ou "5,7,9"
  reference: string; // Ex: "João 3:1-16"
}

export interface ReadingPlan {
  id: string;
  name: string;
  description: string;
  type: PlanType;
  start_date: string;
  end_date: string;
  total_days: number;
  days_completed: number;
  progress_percentage: number;
  is_active: boolean;
  current_day?: ReadingDay;
  created_at: string;
  updated_at: string;
}

export interface PlanTemplate {
  id: string;
  name: string;
  description: string;
  type: PlanType;
  duration_days: number;
  icon: string;
  color: string;
  readings_count: number;
}

export interface PlanTemplateResponse {
  "results": PlanTemplate[]
}

export interface CreatePlanPayload {
  template_id?: string;
  name: string;
  start_date: string;
  custom_readings?: ReadingReference[];
}

export interface UpdateReadingPayload {
  reading_day_id: string;
  status: ReadingStatus;
  notes?: string;
}

export interface ReadingStats {
  total_days: number;
  completed_days: number;
  current_streak: number;
  longest_streak: number;
  completion_rate: number;
  average_per_week: number;
}