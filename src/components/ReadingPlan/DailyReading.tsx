// src/components/ReadingPlan/DailyReading.tsx

import React from 'react';
import { CheckCircle, Circle, Book, Calendar, MessageSquare, ChevronRight } from 'lucide-react';
import type { ReadingDay } from '../../types/readingPlan.types';
import { useNavigate } from 'react-router-dom';
import { useUpdateReadingStatusMutation } from '../../feature/readingPlan/readingPlanApi';

interface DailyReadingProps {
  reading: ReadingDay;
  onStatusChange: (status: 'completed' | 'skipped') => void;
  isLoading?: boolean;
}

const DailyReading: React.FC<DailyReadingProps> = ({ reading, onStatusChange, isLoading }) => {
  const navigate = useNavigate();
  const [showNotes, setShowNotes] = React.useState(false);
  const [notes, setNotes] = React.useState(reading.notes || '');
  const [isSavingNotes, setIsSavingNotes] = React.useState(false);
  
  // ✅ Hook para salvar notas
  const [updateReading] = useUpdateReadingStatusMutation();

  const isCompleted = reading.status === 'completed';
  const isSkipped = reading.status === 'skipped';

  const handleReadNow = (reference: string) => {
    // Navegar para a Bíblia com a referência específica
    navigate(`/bible?ref=${encodeURIComponent(reference)}`);
  };

  // ✅ IMPLEMENTADO: Função para salvar notas
  const handleSaveNotes = async () => {
    if (notes === reading.notes) {
      alert('Nenhuma alteração foi feita nas notas');
      return;
    }

    setIsSavingNotes(true);
    try {
      await updateReading({
        reading_day_id: reading.id,
        status: reading.status,
        notes: notes,
      }).unwrap();
      
      alert('Notas salvas com sucesso!');
      setShowNotes(false);
    } catch (error) {
      console.error('Erro ao salvar notas:', error);
      alert('Erro ao salvar notas. Tente novamente.');
    } finally {
      setIsSavingNotes(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
            isCompleted ? 'bg-green-100' : 'bg-blue-100'
          }`}>
            {isCompleted ? (
              <CheckCircle className="text-green-600" size={24} />
            ) : (
              <Calendar className="text-blue-600" size={24} />
            )}
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-800">
              {isCompleted ? 'Leitura Concluída!' : 'Leitura do Dia'}
            </h3>
            <p className="text-sm text-gray-600">
              Dia {reading.day_number} • {new Date(reading.date).toLocaleDateString('pt-BR', { 
                weekday: 'long', 
                day: 'numeric', 
                month: 'long' 
              })}
            </p>
          </div>
        </div>

        {!isCompleted && (
          <button
            onClick={() => onStatusChange('completed')}
            disabled={isLoading}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
          >
            <CheckCircle size={18} />
            <span>Marcar como Lida</span>
          </button>
        )}
      </div>

      {/* Reading List */}
      <div className="space-y-3 mb-6">
        <h4 className="text-sm font-semibold text-gray-700 mb-3">Leituras de Hoje:</h4>
        {reading.readings.map((ref, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-100 hover:shadow-md transition-all group cursor-pointer"
            onClick={() => handleReadNow(ref.reference)}
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
                <Book className="text-white" size={16} />
              </div>
              <div>
                <p className="font-semibold text-gray-800">{ref.reference}</p>
                <p className="text-xs text-gray-600">
                  {ref.chapters.length} {ref.chapters.length === 1 ? 'capítulo' : 'capítulos'}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-blue-600 font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                Ler agora
              </span>
              <ChevronRight className="text-blue-600" size={20} />
            </div>
          </div>
        ))}
      </div>

      {/* Notes Section */}
      <div className="pt-4 border-t border-gray-200">
        <button
          onClick={() => setShowNotes(!showNotes)}
          className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors mb-3"
        >
          <MessageSquare size={16} />
          {showNotes ? 'Ocultar anotações' : reading.notes ? 'Ver/Editar anotações' : 'Adicionar anotações'}
        </button>

        {showNotes && (
          <div className="space-y-3">
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Escreva suas reflexões sobre a leitura de hoje..."
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm resize-none"
              rows={4}
            />
            <div className="flex gap-2">
              <button
                onClick={handleSaveNotes}
                disabled={isSavingNotes || notes === reading.notes}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSavingNotes ? 'Salvando...' : 'Salvar Anotações'}
              </button>
              <button
                onClick={() => {
                  setNotes(reading.notes || '');
                  setShowNotes(false);
                }}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm"
              >
                Cancelar
              </button>
            </div>
          </div>
        )}

        {/* Show existing notes preview when collapsed */}
        {!showNotes && reading.notes && (
          <div className="mt-2 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-sm text-gray-700 line-clamp-2">
              {reading.notes}
            </p>
          </div>
        )}
      </div>

      {/* Quick Actions */}
      {!isCompleted && (
        <div className="flex gap-2 mt-4 pt-4 border-t border-gray-200">
          <button
            onClick={() => onStatusChange('skipped')}
            disabled={isLoading}
            className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm disabled:opacity-50"
          >
            Pular Hoje
          </button>
        </div>
      )}

      {isCompleted && reading.completed_at && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <p className="text-xs text-gray-500">
            Concluída em {new Date(reading.completed_at).toLocaleString('pt-BR')}
          </p>
        </div>
      )}
    </div>
  );
};

export default DailyReading;