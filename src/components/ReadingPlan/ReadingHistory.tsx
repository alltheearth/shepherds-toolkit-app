// src/components/ReadingPlan/ReadingHistory.tsx

import React, { useState } from 'react';
import { 
  CheckCircle, XCircle, Calendar, Book, MessageSquare, 
  Download, Filter, Search, ChevronDown, Eye
} from 'lucide-react';
import type { ReadingDay } from '../../types/readingPlan.types';

interface ReadingHistoryProps {
  readings: ReadingDay[];
  onReadingClick: (reading: ReadingDay) => void;
}

const ReadingHistory: React.FC<ReadingHistoryProps> = ({ readings, onReadingClick }) => {
  const [filterStatus, setFilterStatus] = useState<'all' | 'completed' | 'skipped'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  // Filtrar e ordenar leituras
  const filteredReadings = readings
    .filter(reading => {
      if (filterStatus === 'all') return reading.status !== 'pending';
      return reading.status === filterStatus;
    })
    .filter(reading => {
      if (!searchTerm) return true;
      const term = searchTerm.toLowerCase();
      return reading.readings.some(ref => 
        ref.reference.toLowerCase().includes(term) ||
        ref.book.toLowerCase().includes(term)
      );
    })
    .sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return sortOrder === 'desc' ? dateB - dateA : dateA - dateB;
    });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
            <CheckCircle size={14} />
            Concluída
          </span>
        );
      case 'skipped':
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-medium">
            <XCircle size={14} />
            Pulada
          </span>
        );
      default:
        return null;
    }
  };

  const toggleExpanded = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const exportHistory = () => {
    // Função para exportar histórico
    const csvContent = filteredReadings.map(reading => ({
      data: reading.date,
      dia: reading.day_number,
      status: reading.status,
      leituras: reading.readings.map(r => r.reference).join('; '),
      notas: reading.notes || ''
    }));

    console.log('Exportar histórico:', csvContent);
    alert('Funcionalidade de exportação em desenvolvimento!');
  };

  return (
    <div className="space-y-6">
      {/* Header Controls */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-xl font-bold text-gray-800">Histórico de Leituras</h3>
            <p className="text-sm text-gray-600 mt-1">
              {filteredReadings.length} {filteredReadings.length === 1 ? 'leitura' : 'leituras'} registradas
            </p>
          </div>
          <button
            onClick={exportHistory}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Download size={18} />
            <span className="font-medium">Exportar</span>
          </button>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar por livro ou referência..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as any)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          >
            <option value="all">Todas as leituras</option>
            <option value="completed">Apenas concluídas</option>
            <option value="skipped">Apenas puladas</option>
          </select>

          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc')}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          >
            <option value="desc">Mais recentes primeiro</option>
            <option value="asc">Mais antigas primeiro</option>
          </select>
        </div>
      </div>

      {/* History List */}
      {filteredReadings.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
          <Calendar className="mx-auto mb-4 text-gray-300" size={64} />
          <h3 className="text-xl font-bold text-gray-800 mb-2">
            Nenhuma leitura encontrada
          </h3>
          <p className="text-gray-600">
            {searchTerm 
              ? 'Tente ajustar seus filtros de busca' 
              : 'Complete algumas leituras para ver seu histórico'}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredReadings.map((reading) => {
            const isExpanded = expandedId === reading.id;
            
            return (
              <div
                key={reading.id}
                className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-all"
              >
                {/* Main Content */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start gap-4 flex-1">
                      <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                        reading.status === 'completed' 
                          ? 'bg-green-100' 
                          : 'bg-orange-100'
                      }`}>
                        {reading.status === 'completed' ? (
                          <CheckCircle className="text-green-600" size={24} />
                        ) : (
                          <XCircle className="text-orange-600" size={24} />
                        )}
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="font-bold text-gray-800">
                            Dia {reading.day_number}
                          </h4>
                          {getStatusBadge(reading.status)}
                        </div>
                        
                        <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                          <div className="flex items-center gap-1">
                            <Calendar size={14} />
                            <span>
                              {new Date(reading.date).toLocaleDateString('pt-BR', {
                                weekday: 'long',
                                day: 'numeric',
                                month: 'long',
                                year: 'numeric'
                              })}
                            </span>
                          </div>
                          {reading.completed_at && (
                            <div className="flex items-center gap-1">
                              <CheckCircle size={14} />
                              <span>
                                Concluída às {new Date(reading.completed_at).toLocaleTimeString('pt-BR', {
                                  hour: '2-digit',
                                  minute: '2-digit'
                                })}
                              </span>
                            </div>
                          )}
                        </div>

                        {/* Reading References */}
                        <div className="flex flex-wrap gap-2">
                          {reading.readings.map((ref, idx) => (
                            <div
                              key={idx}
                              className="flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-700 rounded-lg text-sm"
                            >
                              <Book size={14} />
                              <span className="font-medium">{ref.reference}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {reading.notes && (
                        <div className="flex items-center gap-1 text-sm text-gray-500">
                          <MessageSquare size={16} />
                          <span>Com anotações</span>
                        </div>
                      )}
                      <button
                        onClick={() => toggleExpanded(reading.id)}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        <ChevronDown 
                          className={`transition-transform ${isExpanded ? 'rotate-180' : ''}`} 
                          size={20} 
                        />
                      </button>
                    </div>
                  </div>

                  {/* Expanded Content */}
                  {isExpanded && (
                    <div className="pt-4 border-t border-gray-200 space-y-4">
                      {/* Detailed Readings */}
                      <div>
                        <h5 className="text-sm font-semibold text-gray-700 mb-2">
                          Detalhes das Leituras:
                        </h5>
                        <div className="space-y-2">
                          {reading.readings.map((ref, idx) => (
                            <div
                              key={idx}
                              className="p-3 bg-gray-50 rounded-lg"
                            >
                              <div className="flex items-center justify-between">
                                <div>
                                  <p className="font-medium text-gray-800">{ref.book}</p>
                                  <p className="text-sm text-gray-600">
                                    {ref.chapters.length === 1 
                                      ? `Capítulo ${ref.chapters[0]}`
                                      : `Capítulos ${ref.chapters.join(', ')}`
                                    }
                                    {ref.verses && ` (${ref.verses})`}
                                  </p>
                                </div>
                                <button
                                  onClick={() => onReadingClick(reading)}
                                  className="flex items-center gap-2 px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                                >
                                  <Eye size={14} />
                                  Ver na Bíblia
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Notes */}
                      {reading.notes && (
                        <div>
                          <h5 className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                            <MessageSquare size={16} />
                            Minhas Anotações:
                          </h5>
                          <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                            <p className="text-sm text-gray-700 whitespace-pre-wrap">
                              {reading.notes}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Statistics Summary */}
      {filteredReadings.length > 0 && (
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-200 p-6">
          <h4 className="font-bold text-gray-800 mb-4">Resumo Estatístico</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <p className="text-3xl font-bold text-blue-600">
                {filteredReadings.length}
              </p>
              <p className="text-sm text-gray-600">Total</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-green-600">
                {filteredReadings.filter(r => r.status === 'completed').length}
              </p>
              <p className="text-sm text-gray-600">Concluídas</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-orange-600">
                {filteredReadings.filter(r => r.status === 'skipped').length}
              </p>
              <p className="text-sm text-gray-600">Puladas</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-purple-600">
                {filteredReadings.filter(r => r.notes).length}
              </p>
              <p className="text-sm text-gray-600">Com Notas</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReadingHistory;