// src/components/ReadingPlan/CalendarTab.tsx
import React, { useState } from 'react';
import CalendarView from './CalendarView';
import ReadingDayModal from './ReadingDayModal';
import { useGetReadingHistoryQuery, useUpdateReadingStatusMutation } from '../../feature/readingPlan/readingPlanApi';
import { Calendar as CalendarIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import type { ReadingDay } from '../../types/readingPlan.types';

interface CalendarTabProps {
  planId: string;
}

const CalendarTab: React.FC<CalendarTabProps> = ({ planId }) => {
  const navigate = useNavigate();
  const [selectedMonth, setSelectedMonth] = React.useState<string>(
    new Date().toISOString().split('T')[0].substring(0, 7)
  );
  const [selectedReading, setSelectedReading] = useState<ReadingDay | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: readings, isLoading, refetch } = useGetReadingHistoryQuery({
    planId,
    month: selectedMonth
  });

  const [updateStatus] = useUpdateReadingStatusMutation();

  const handleMonthChange = (newMonth: string) => {
    const formattedMonth = newMonth.substring(0, 7);
    setSelectedMonth(formattedMonth);
  };

  const handleDayClick = (reading: ReadingDay) => {
    setSelectedReading(reading);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedReading(null);
  };

  const handleStatusChange = async (readingId: string, status: 'completed' | 'skipped' | 'pending') => {
    try {
      await updateStatus({
        reading_day_id: readingId,
        status: status,
      }).unwrap();
      
      // Refetch data e atualizar reading selecionado
      await refetch();
      
      // Atualizar o estado local do selectedReading
      if (selectedReading && selectedReading.id === readingId) {
        const updatedReading = readings?.find(r => r.id === readingId);
        if (updatedReading) {
          setSelectedReading(updatedReading);
        }
      }
    } catch (error) {
      console.error('Erro ao atualizar status:', error);
      throw error;
    }
  };

  const handleNotesUpdate = async (readingId: string, notes: string) => {
    try {
      // Buscar reading atual para pegar o status
      const currentReading = readings?.find(r => r.id === readingId);
      if (!currentReading) throw new Error('Leitura não encontrada');

      await updateStatus({
        reading_day_id: readingId,
        status: currentReading.status,
        notes: notes,
      }).unwrap();
      
      // Refetch data e atualizar reading selecionado
      await refetch();
      
      if (selectedReading && selectedReading.id === readingId) {
        const updatedReading = readings?.find(r => r.id === readingId);
        if (updatedReading) {
          setSelectedReading(updatedReading);
        }
      }
    } catch (error) {
      console.error('Erro ao atualizar notas:', error);
      throw error;
    }
  };

  const handleReadNow = (reference: string) => {
    navigate(`/bible?ref=${encodeURIComponent(reference)}`);
  };

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
    <>
      <CalendarView
        planId={planId}
        readings={readings}
        onDayClick={handleDayClick}
        onMonthChange={handleMonthChange}
      />
      
      <ReadingDayModal
        reading={selectedReading}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onStatusChange={handleStatusChange}
        onNotesUpdate={handleNotesUpdate}
        onReadNow={handleReadNow}
      />
    </>
  );
};

export default CalendarTab;