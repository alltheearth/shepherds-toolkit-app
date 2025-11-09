// src/components/ReadingPlan/CalendarView.tsx

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, CheckCircle, Circle, XCircle, BookOpen } from 'lucide-react';
import type { ReadingDay } from '../../types/readingPlan.types';

interface CalendarViewProps {
  planId: string;
  readings: ReadingDay[];
  onDayClick: (reading: ReadingDay) => void;
  onMonthChange?: (month: string) => void;
}

const CalendarView: React.FC<CalendarViewProps> = ({ 
  readings, 
  onDayClick,
  onMonthChange 
}) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const monthNames = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];

  const weekDays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    
    return { daysInMonth, startingDayOfWeek, year, month };
  };

  const getReadingForDate = (date: Date): ReadingDay | null => {
    const dateStr = date.toISOString().split('T')[0];
    return readings.find(r => r.date === dateStr) || null;
  };

  const getStatusIcon = (reading: ReadingDay | null) => {
    if (!reading) return <Circle size={14} className="text-gray-300" />;
    
    switch (reading.status) {
      case 'completed':
        return <CheckCircle size={14} className="text-green-500" />;
      case 'skipped':
        return <XCircle size={14} className="text-orange-500" />;
      default:
        return <Circle size={14} className="text-blue-500" />;
    }
  };

  const getStatusColor = (reading: ReadingDay | null) => {
    if (!reading) return 'bg-white border-gray-100';
    
    switch (reading.status) {
      case 'completed':
        return 'bg-green-50 border-green-200 hover:bg-green-100';
      case 'skipped':
        return 'bg-orange-50 border-orange-200 hover:bg-orange-100';
      default:
        return 'bg-blue-50 border-blue-200 hover:bg-blue-100';
    }
  };

  const previousMonth = () => {
    const newDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1);
    setCurrentMonth(newDate);
    if (onMonthChange) {
      // ✅ CORREÇÃO: Enviar apenas YYYY-MM
      const year = newDate.getFullYear();
      const month = String(newDate.getMonth() + 1).padStart(2, '0');
      onMonthChange(`${year}-${month}`);
    }
  };

  const nextMonth = () => {
    const newDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1);
    setCurrentMonth(newDate);
    if (onMonthChange) {
      // ✅ CORREÇÃO: Enviar apenas YYYY-MM
      const year = newDate.getFullYear();
      const month = String(newDate.getMonth() + 1).padStart(2, '0');
      onMonthChange(`${year}-${month}`);
    }
  };

  const goToToday = () => {
    const today = new Date();
    setCurrentMonth(today);
    if (onMonthChange) {
      // ✅ CORREÇÃO: Enviar apenas YYYY-MM
      const year = today.getFullYear();
      const month = String(today.getMonth() + 1).padStart(2, '0');
      onMonthChange(`${year}-${month}`);
    }
  };

  const { daysInMonth, startingDayOfWeek, year, month } = getDaysInMonth(currentMonth);
  const today = new Date();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Calendário - 2/3 da largura */}
      <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {/* Header */}
        <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-purple-50">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <BookOpen className="text-blue-600" size={20} />
              <h3 className="text-lg font-bold text-gray-800">
                {monthNames[month]} {year}
              </h3>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={previousMonth}
                className="p-1.5 hover:bg-white rounded-lg transition-colors"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={goToToday}
                className="px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-xs font-medium"
              >
                Hoje
              </button>
              <button
                onClick={nextMonth}
                className="p-1.5 hover:bg-white rounded-lg transition-colors"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>

          {/* Legend */}
          <div className="flex items-center gap-3 text-xs">
            <div className="flex items-center gap-1.5">
              <CheckCircle size={12} className="text-green-500" />
              <span className="text-gray-600">Concluída</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Circle size={12} className="text-blue-500" />
              <span className="text-gray-600">Pendente</span>
            </div>
            <div className="flex items-center gap-1.5">
              <XCircle size={12} className="text-orange-500" />
              <span className="text-gray-600">Pulada</span>
            </div>
          </div>
        </div>

        {/* Calendar Grid */}
        <div className="p-3">
          {/* Weekday Headers */}
          <div className="grid grid-cols-7 gap-1 mb-1">
            {weekDays.map((day, idx) => (
              <div
                key={idx}
                className="text-center font-semibold text-gray-600 text-xs py-1"
              >
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Days */}
          <div className="grid grid-cols-7 gap-1">
            {/* Empty cells before first day */}
            {Array.from({ length: startingDayOfWeek }).map((_, idx) => (
              <div key={`empty-${idx}`} className="aspect-square" />
            ))}

            {/* Days of month */}
            {Array.from({ length: daysInMonth }).map((_, idx) => {
              const day = idx + 1;
              const date = new Date(year, month, day);
              const reading = getReadingForDate(date);
              const isToday = 
                today.getDate() === day &&
                today.getMonth() === month &&
                today.getFullYear() === year;

              return (
                <button
                  key={day}
                  onClick={() => reading && onDayClick(reading)}
                  disabled={!reading}
                  className={`aspect-square p-1 rounded-lg border transition-all ${
                    getStatusColor(reading)
                  } ${
                    isToday ? 'ring-2 ring-blue-500' : ''
                  } ${
                    !reading ? 'cursor-default opacity-40' : 'cursor-pointer'
                  } ${
                    reading ? 'hover:shadow-md' : ''
                  }`}
                >
                  <div className="flex flex-col items-center justify-center h-full">
                    <span className={`text-xs font-medium mb-0.5 ${
                      isToday ? 'text-blue-600 font-bold' : 'text-gray-700'
                    }`}>
                      {day}
                    </span>
                    {reading && (
                      <div className="flex flex-col items-center">
                        {getStatusIcon(reading)}
                      </div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Painel Lateral - 1/3 da largura */}
      <div className="space-y-4">
        {/* Summary Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <h4 className="text-sm font-bold text-gray-800 mb-3">Resumo do Mês</h4>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                  <CheckCircle size={16} className="text-green-600" />
                </div>
                <span className="text-sm text-gray-600">Concluídas</span>
              </div>
              <span className="text-xl font-bold text-green-600">
                {readings.filter(r => r.status === 'completed').length}
              </span>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Circle size={16} className="text-blue-600" />
                </div>
                <span className="text-sm text-gray-600">Pendentes</span>
              </div>
              <span className="text-xl font-bold text-blue-600">
                {readings.filter(r => r.status === 'pending').length}
              </span>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                  <XCircle size={16} className="text-orange-600" />
                </div>
                <span className="text-sm text-gray-600">Puladas</span>
              </div>
              <span className="text-xl font-bold text-orange-600">
                {readings.filter(r => r.status === 'skipped').length}
              </span>
            </div>
          </div>
        </div>

        {/* Progress Card */}
        <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl border border-blue-200 p-4">
          <h4 className="text-sm font-bold text-gray-800 mb-2">Progresso</h4>
          <div className="mb-2">
            <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
              <span>Conclusão</span>
              <span className="font-bold">
                {readings.length > 0 
                  ? Math.round((readings.filter(r => r.status === 'completed').length / readings.length) * 100)
                  : 0}%
              </span>
            </div>
            <div className="w-full bg-white rounded-full h-2">
              <div
                className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all"
                style={{ 
                  width: `${readings.length > 0 
                    ? (readings.filter(r => r.status === 'completed').length / readings.length) * 100 
                    : 0}%` 
                }}
              />
            </div>
          </div>
          <p className="text-xs text-gray-600 mt-2">
            {readings.filter(r => r.status === 'completed').length} de {readings.length} leituras completadas
          </p>
        </div>

        {/* Quick Info */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <h4 className="text-sm font-bold text-gray-800 mb-2">Dica</h4>
          <p className="text-xs text-gray-600 leading-relaxed">
            Clique em qualquer dia no calendário para ver os detalhes da leitura e suas anotações.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CalendarView;