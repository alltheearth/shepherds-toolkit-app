// src/components/ReadingPlan/HistoryTab.tsx
import React from 'react';
import ReadingHistory from './ReadingHistory';
import { useGetReadingHistoryQuery } from '../../feature/readingPlan/readingPlanApi';
import { useNavigate } from 'react-router-dom';
import type { ReadingDay } from '../../types/readingPlan.types';

interface HistoryTabProps {
  planId: string;
}

const HistoryTab: React.FC<HistoryTabProps> = ({ planId }) => {
  const navigate = useNavigate();
  const { data: readings, isLoading } = useGetReadingHistoryQuery({ planId });

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent" />
      </div>
    );
  }

  const handleReadingClick = (reading: ReadingDay) => {
    // Navegar para a primeira referência da leitura
    if (reading.readings && reading.readings.length > 0) {
      const firstRef = reading.readings[0].reference;
      navigate(`/bible?ref=${encodeURIComponent(firstRef)}`);
    }
  };

  return (
    <ReadingHistory
      readings={readings || []}
      onReadingClick={handleReadingClick}
    />
  );
};

export default HistoryTab;