// src/mocks/readingPlanTemplates.ts

import { useState, useEffect } from 'react';
import type { PlanTemplate } from '../types/readingPlan.types';

const mockTemplates: PlanTemplate[] = [
  {
    id: 'bible_year',
    name: 'Bíblia em 1 Ano',
    description: 'Leia toda a Bíblia em 365 dias com um plano equilibrado entre AT e NT',
    type: 'bible_year',
    duration_days: 365,
    icon: '📖',
    color: 'from-blue-500 to-blue-600',
    readings_count: 365,
  },
  {
    id: 'nt_90days',
    name: 'Novo Testamento em 90 Dias',
    description: 'Complete todo o Novo Testamento em apenas 3 meses',
    type: 'nt_90days',
    duration_days: 90,
    icon: '✝️',
    color: 'from-green-500 to-green-600',
    readings_count: 90,
  },
  {
    id: 'psalms_month',
    name: 'Salmos em 1 Mês',
    description: 'Medite em 5 salmos por dia durante 30 dias',
    type: 'psalms_month',
    duration_days: 30,
    icon: '🎵',
    color: 'from-purple-500 to-purple-600',
    readings_count: 150,
  },
  {
    id: 'gospels_40days',
    name: 'Evangelhos em 40 Dias',
    description: 'Conheça a vida de Jesus através dos 4 evangelhos',
    type: 'custom',
    duration_days: 40,
    icon: '🕊️',
    color: 'from-pink-500 to-pink-600',
    readings_count: 89,
  },
  {
    id: 'proverbs_month',
    name: 'Provérbios em 1 Mês',
    description: 'Um capítulo de sabedoria por dia durante um mês',
    type: 'custom',
    duration_days: 31,
    icon: '💡',
    color: 'from-yellow-500 to-yellow-600',
    readings_count: 31,
  },
];

export const useMockPlanTemplates = () => {
  const [data, setData] = useState<PlanTemplate[] | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simular delay de API
    const timer = setTimeout(() => {
      setData(mockTemplates);
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return { data, isLoading };
};

export default mockTemplates;