// src/components/ReadingPlan/CalendarTab.tsx
import React from 'react';
import CalendarView from './CalendarView';
import { useGetReadingHistoryQuery } from '../../feature/readingPlan/readingPlanApi';
import { Calendar as CalendarIcon } from 'lucide-react';

interface CalendarTabProps {
  planId: string;
}

const CalendarTab: React.FC<CalendarTabProps> = ({ planId }) => {
  const [selectedMonth, setSelectedMonth] = React.useState<string>(
    new Date().toISOString().split('T')[0]
  );

  const { data: readings, isLoading } = useGetReadingHistoryQuery({
    planId,
    month: selectedMonth
  });

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent" />
      </div>
    );
  }

  if (!readings || readings.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
        <CalendarIcon className="mx-auto mb-4 text-gray-300" size={64} />
        <h3 className="text-xl font-bold text-gray-800 mb-2">
          Nenhuma leitura encontrada
        </h3>
        <p className="text-gray-600">
          As leituras do seu plano aparecerão aqui
        </p>
      </div>
    );
  }

  return (
    <CalendarView
      planId={planId}
      readings={readings}
      onDayClick={(reading) => {
        console.log('Dia selecionado:', reading);
        // Você pode adicionar um modal ou navegação aqui
      }}
      onMonthChange={setSelectedMonth}
    />
  );
};

export default CalendarTab;