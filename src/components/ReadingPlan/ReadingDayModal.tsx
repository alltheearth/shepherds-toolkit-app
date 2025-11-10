import React, { useState } from 'react';
import { X, CheckCircle, Circle, Book, Calendar, MessageSquare, ChevronRight, Save, XCircle as XIcon } from 'lucide-react';

// Tipos
interface ReadingReference {
  book: string;
  book_id: number;
  chapters: number[];
  verses?: string;
  reference: string;
}

interface ReadingDay {
  id: string;
  date: string;
  day_number: number;
  readings: ReadingReference[];
  status: 'pending' | 'completed' | 'skipped';
  completed_at?: string;
  notes?: string;
}

interface ReadingDayModalProps {
  reading: ReadingDay | null;
  isOpen: boolean;
  onClose: () => void;
  onStatusChange: (readingId: string, status: 'completed' | 'skipped' | 'pending') => Promise<void>;
  onNotesUpdate: (readingId: string, notes: string) => Promise<void>;
  onReadNow: (reference: string) => void;
}

const ReadingDayModal: React.FC<ReadingDayModalProps> = ({
  reading,
  isOpen,
  onClose,
  onStatusChange,
  onNotesUpdate,
  onReadNow,
}) => {
  const [notes, setNotes] = useState('');
  const [isEditingNotes, setIsEditingNotes] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Atualizar notas quando a leitura mudar
  React.useEffect(() => {
    if (reading) {
      setNotes(reading.notes || '');
      setIsEditingNotes(false);
    }
  }, [reading]);

  if (!isOpen || !reading) return null;

  const isCompleted = reading.status === 'completed';
  const isSkipped = reading.status === 'skipped';
  const isPending = reading.status === 'pending';

  const handleSaveNotes = async () => {
    if (notes === reading.notes) {
      setIsEditingNotes(false);
      return;
    }

    setIsSaving(true);
    try {
      await onNotesUpdate(reading.id, notes);
      setIsEditingNotes(false);
    } catch (error) {
      console.error('Erro ao salvar notas:', error);
      alert('Erro ao salvar notas. Tente novamente.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleStatusChange = async (newStatus: 'completed' | 'skipped' | 'pending') => {
    try {
      await onStatusChange(reading.id, newStatus);
    } catch (error) {
      console.error('Erro ao atualizar status:', error);
      alert('Erro ao atualizar status. Tente novamente.');
    }
  };

  const getStatusColor = () => {
    if (isCompleted) return 'bg-green-100 border-green-300';
    if (isSkipped) return 'bg-orange-100 border-orange-300';
    return 'bg-blue-100 border-blue-300';
  };

  const getStatusIcon = () => {
    if (isCompleted) return <CheckCircle className="text-green-600" size={24} />;
    if (isSkipped) return <XIcon className="text-orange-600" size={24} />;
    return <Circle className="text-blue-600" size={24} />;
  };

  const getStatusText = () => {
    if (isCompleted) return 'Concluída';
    if (isSkipped) return 'Pulada';
    return 'Pendente';
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className={`p-6 border-b border-gray-200 ${getStatusColor()}`}>
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div className={`w-14 h-14 rounded-full flex items-center justify-center ${
                isCompleted ? 'bg-green-200' : isSkipped ? 'bg-orange-200' : 'bg-blue-200'
              }`}>
                {getStatusIcon()}
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800">
                  Dia {reading.day_number}
                </h2>
                <p className="text-sm text-gray-600">
                  {new Date(reading.date).toLocaleDateString('pt-BR', {
                    weekday: 'long',
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                  })}
                </p>
                <span className={`inline-block mt-1 px-3 py-1 rounded-full text-xs font-medium ${
                  isCompleted ? 'bg-green-600 text-white' :
                  isSkipped ? 'bg-orange-600 text-white' :
                  'bg-blue-600 text-white'
                }`}>
                  {getStatusText()}
                </span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/50 rounded-lg transition-colors"
            >
              <X size={24} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Reading List */}
          <div className="mb-6">
            <h3 className="text-lg font-bold text-gray-800 mb-3">Leituras:</h3>
            <div className="space-y-3">
              {reading.readings.map((ref, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-100 hover:shadow-md transition-all group cursor-pointer"
                  onClick={() => onReadNow(ref.reference)}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Book className="text-white" size={18} />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">{ref.reference}</p>
                      <p className="text-xs text-gray-600">
                        {ref.chapters.length === 1
                          ? `Capítulo ${ref.chapters[0]}`
                          : `Capítulos ${ref.chapters.join(', ')}`}
                        {ref.verses && ` (${ref.verses})`}
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
          </div>

          {/* Notes Section */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                <MessageSquare size={20} />
                Anotações
              </h3>
              {!isEditingNotes && reading.notes && (
                <button
                  onClick={() => setIsEditingNotes(true)}
                  className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                >
                  Editar
                </button>
              )}
            </div>

            {isEditingNotes ? (
              <div className="space-y-3">
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Escreva suas reflexões sobre esta leitura..."
                  className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm resize-none"
                  rows={6}
                  autoFocus
                />
                <div className="flex gap-2">
                  <button
                    onClick={handleSaveNotes}
                    disabled={isSaving}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                  >
                    <Save size={16} />
                    {isSaving ? 'Salvando...' : 'Salvar Anotações'}
                  </button>
                  <button
                    onClick={() => {
                      setNotes(reading.notes || '');
                      setIsEditingNotes(false);
                    }}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            ) : reading.notes ? (
              <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-sm text-gray-700 whitespace-pre-wrap">
                  {reading.notes}
                </p>
              </div>
            ) : (
              <button
                onClick={() => setIsEditingNotes(true)}
                className="w-full p-8 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition-all text-gray-500 hover:text-blue-600"
              >
                <MessageSquare className="mx-auto mb-2" size={32} />
                <p className="text-sm font-medium">Clique para adicionar anotações</p>
              </button>
            )}
          </div>

          {/* Completion Info */}
          {reading.completed_at && (
            <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
              <p className="text-xs text-gray-600">
                <span className="font-semibold">Concluída em:</span>{' '}
                {new Date(reading.completed_at).toLocaleString('pt-BR', {
                  day: '2-digit',
                  month: 'long',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </p>
            </div>
          )}
        </div>

        {/* Footer - Status Actions */}
        <div className="p-6 border-t border-gray-200 bg-gray-50">
          <div className="flex items-center gap-3">
            <button
              onClick={() => handleStatusChange('completed')}
              disabled={isCompleted}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium transition-all ${
                isCompleted
                  ? 'bg-green-100 text-green-700 cursor-not-allowed'
                  : 'bg-green-600 text-white hover:bg-green-700'
              }`}
            >
              <CheckCircle size={18} />
              {isCompleted ? 'Concluída' : 'Marcar como Concluída'}
            </button>
            
            {!isPending && (
              <button
                onClick={() => handleStatusChange('pending')}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-all"
              >
                <Circle size={18} />
                Marcar como Pendente
              </button>
            )}
            
            {!isSkipped && (
              <button
                onClick={() => handleStatusChange('skipped')}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 border-2 border-orange-600 text-orange-600 rounded-lg hover:bg-orange-50 font-medium transition-all"
              >
                <XIcon size={18} />
                {isPending ? 'Pular' : 'Marcar como Pulada'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReadingDayModal;
