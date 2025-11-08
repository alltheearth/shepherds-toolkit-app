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
    if (!reading) return <Circle size={16} className="text-gray-300" />;
    
    switch (reading.status) {
      case 'completed':
        return <CheckCircle size={16} className="text-green-500" />;
      case 'skipped':
        return <XCircle size={16} className="text-orange-500" />;
      default:
        return <Circle size={16} className="text-blue-500" />;
    }
  };

  const getStatusColor = (reading: ReadingDay | null) => {
    if (!reading) return 'bg-white';
    
    switch (reading.status) {
      case 'completed':
        return 'bg-green-50 border-green-300 hover:bg-green-100';
      case 'skipped':
        return 'bg-orange-50 border-orange-300 hover:bg-orange-100';
      default:
        return 'bg-blue-50 border-blue-300 hover:bg-blue-100';
    }
  };

  const previousMonth = () => {
    const newDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1);
    setCurrentMonth(newDate);
    if (onMonthChange) {
      onMonthChange(newDate.toISOString().split('T')[0]);
    }
  };

  const nextMonth = () => {
    const newDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1);
    setCurrentMonth(newDate);
    if (onMonthChange) {
      onMonthChange(newDate.toISOString().split('T')[0]);
    }
  };

  const goToToday = () => {
    const today = new Date();
    setCurrentMonth(today);
    if (onMonthChange) {
      onMonthChange(today.toISOString().split('T')[0]);
    }
  };

  const { daysInMonth, startingDayOfWeek, year, month } = getDaysInMonth(currentMonth);
  const today = new Date();

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-purple-50">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <BookOpen className="text-blue-600" size={24} />
            <h3 className="text-xl font-bold text-gray-800">
              {monthNames[month]} {year}
            </h3>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={previousMonth}
              className="p-2 hover:bg-white rounded-lg transition-colors"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={goToToday}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
            >
              Hoje
            </button>
            <button
              onClick={nextMonth}
              className="p-2 hover:bg-white rounded-lg transition-colors"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-2">
            <CheckCircle size={16} className="text-green-500" />
            <span className="text-gray-600">Concluída</span>
          </div>
          <div className="flex items-center gap-2">
            <Circle size={16} className="text-blue-500" />
            <span className="text-gray-600">Pendente</span>
          </div>
          <div className="flex items-center gap-2">
            <XCircle size={16} className="text-orange-500" />
            <span className="text-gray-600">Pulada</span>
          </div>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="p-4">
        {/* Weekday Headers */}
        <div className="grid grid-cols-7 gap-2 mb-2">
          {weekDays.map((day, idx) => (
            <div
              key={idx}
              className="text-center font-semibold text-gray-600 text-sm py-2"
            >
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Days */}
        <div className="grid grid-cols-7 gap-2">
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
                className={`aspect-square p-2 rounded-lg border-2 transition-all ${
                  getStatusColor(reading)
                } ${
                  isToday ? 'ring-2 ring-blue-500' : 'border-gray-200'
                } ${
                  !reading ? 'cursor-default opacity-50' : 'cursor-pointer'
                } ${
                  reading ? 'hover:shadow-md' : ''
                }`}
              >
                <div className="flex flex-col items-center justify-center h-full">
                  <span className={`text-sm font-medium mb-1 ${
                    isToday ? 'text-blue-600 font-bold' : 'text-gray-700'
                  }`}>
                    {day}
                  </span>
                  {reading && (
                    <div className="flex flex-col items-center gap-1">
                      {getStatusIcon(reading)}
                      <span className="text-xs text-gray-500">
                        Dia {reading.day_number}
                      </span>
                    </div>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Summary Footer */}
      <div className="p-4 border-t border-gray-200 bg-gray-50">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-2xl font-bold text-green-600">
              {readings.filter(r => r.status === 'completed').length}
            </p>
            <p className="text-xs text-gray-600">Concluídas</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-blue-600">
              {readings.filter(r => r.status === 'pending').length}
            </p>
            <p className="text-xs text-gray-600">Pendentes</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-orange-600">
              {readings.filter(r => r.status === 'skipped').length}
            </p>
            <p className="text-xs text-gray-600">Puladas</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarView;