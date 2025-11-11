// src/components/ReadingPlan/CalendarTab.tsx
import React, { useState, useEffect } from 'react';
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
  const [selectedMonth, setSelectedMonth] = useState<string>(
    new Date().toISOString().split('T')[0].substring(0, 7)
  );
  const [selectedReading, setSelectedReading] = useState<ReadingDay | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // ✅ CORREÇÃO: Adicionar refetchOnMountOrArgChange
  const { data: readings, isLoading, error, refetch } = useGetReadingHistoryQuery(
    {
      planId,
      month: selectedMonth
    },
    {
      refetchOnMountOrArgChange: true, // ← FORÇA REFETCH
    }
  );

  const [updateStatus] = useUpdateReadingStatusMutation();

  // ✅ DEBUG MELHORADO
  useEffect(() => {
    console.log('📊 CalendarTab - Estado:', {
      planId,
      selectedMonth,
      isLoading,
      error,
      readingsCount: readings?.length || 0,
      readingsByStatus: readings ? {
        pending: readings.filter(r => r.status === 'pending').length,
        completed: readings.filter(r => r.status === 'completed').length,
        skipped: readings.filter(r => r.status === 'skipped').length,
      } : null,
      firstReadings: readings?.slice(0, 3).map(r => ({
        date: r.date,
        status: r.status,
        day: r.day_number
      }))
    });
  }, [planId, selectedMonth, isLoading, error, readings]);

  const handleMonthChange = (newMonth: string) => {
    const formattedMonth = newMonth.substring(0, 7);
    console.log('📅 Mudando mês para:', formattedMonth);
    setSelectedMonth(formattedMonth);
    // Força refetch imediatamente
    setTimeout(() => refetch(), 100);
  };

  const handleDayClick = (reading: ReadingDay) => {
    console.log('📖 Dia clicado:', reading);
    setSelectedReading(reading);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedReading(null);
  };

  const handleStatusChange = async (readingId: string, status: 'completed' | 'skipped' | 'pending') => {
    try {
      console.log('🔄 Atualizando status:', { readingId, status });
      
      await updateStatus({
        reading_day_id: readingId,
        status: status,
      }).unwrap();
      
      // Refetch data
      await refetch();
      
      // Atualizar selectedReading
      if (selectedReading && selectedReading.id === readingId) {
        const updatedReading = readings?.find(r => r.id === readingId);
        if (updatedReading) {
          setSelectedReading(updatedReading);
        }
      }
      
      console.log('✅ Status atualizado');
    } catch (error) {
      console.error('❌ Erro ao atualizar status:', error);
      throw error;
    }
  };

  const handleNotesUpdate = async (readingId: string, notes: string) => {
    try {
      console.log('📝 Atualizando notas:', { readingId, notesLength: notes.length });
      
      const currentReading = readings?.find(r => r.id === readingId);
      if (!currentReading) throw new Error('Leitura não encontrada');

      await updateStatus({
        reading_day_id: readingId,
        status: currentReading.status,
        notes: notes,
      }).unwrap();
      
      await refetch();
      
      if (selectedReading && selectedReading.id === readingId) {
        const updatedReading = readings?.find(r => r.id === readingId);
        if (updatedReading) {
          setSelectedReading(updatedReading);
        }
      }
      
      console.log('✅ Notas atualizadas');
    } catch (error) {
      console.error('❌ Erro ao atualizar notas:', error);
      throw error;
    }
  };

  const handleReadNow = (reference: string) => {
    navigate(`/bible?ref=${encodeURIComponent(reference)}`);
  };

  if (isLoading) {
    return (
      <div className="flex flex-col justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent mb-4" />
        <p className="text-gray-600">Carregando leituras de {selectedMonth}...</p>
      </div>
    );
  }

  if (error) {
    console.error('❌ Erro ao carregar calendário:', error);
    return (
      <div className="bg-white rounded-xl shadow-sm border border-red-200 p-12 text-center">
        <CalendarIcon className="mx-auto mb-4 text-red-300" size={64} />
        <h3 className="text-xl font-bold text-red-800 mb-2">
          Erro ao carregar calendário
        </h3>
        <p className="text-red-600 mb-4">
          {(error as any)?.data?.detail || 'Ocorreu um erro ao buscar as leituras'}
        </p>
        <button
          onClick={() => refetch()}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Tentar Novamente
        </button>
        <div className="mt-4 text-left">
          <details className="text-xs text-gray-500">
            <summary className="cursor-pointer">Ver detalhes do erro</summary>
            <pre className="mt-2 p-2 bg-gray-100 rounded">
              {JSON.stringify(error, null, 2)}
            </pre>
          </details>
        </div>
      </div>
    );
  }

  if (!readings || readings.length === 0) {
    console.warn('⚠️ Nenhuma leitura encontrada para:', { planId, selectedMonth });
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
        <CalendarIcon className="mx-auto mb-4 text-gray-300" size={64} />
        <h3 className="text-xl font-bold text-gray-800 mb-2">
          Nenhuma leitura encontrada
        </h3>
        <p className="text-gray-600 mb-4">
          Não há leituras programadas para {selectedMonth}
        </p>
        <button
          onClick={() => {
            const today = new Date();
            const currentMonth = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}`;
            setSelectedMonth(currentMonth);
          }}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Ir para Mês Atual
        </button>
      </div>
    );
  }

  console.log('✅ Renderizando calendário com', readings.length, 'leituras');

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