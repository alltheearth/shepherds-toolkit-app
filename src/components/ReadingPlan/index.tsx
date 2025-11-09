// src/components/ReadingPlan/index.tsx - VERSÃO COMPLETA E FUNCIONAL

import React, { useState } from 'react';
import { 
  BookOpen, Plus, TrendingUp, Calendar, Target, 
  Settings, Filter, Download, Trophy, Flame
} from 'lucide-react';
import PlanCard from  './PlanCard'
import DailyReading from './DailyReading';
import CreatePlanModal from './CreatePlanModal';
import CalendarView from './CalendarView';
import ReadingHistory from './ReadingHistory';
import { 
  useGetMyPlansQuery, 
  useGetTodayReadingQuery, 
  useUpdateReadingStatusMutation,
  useGetReadingStatsQuery,
  useDeletePlanMutation,
  useGetReadingHistoryQuery
} from '../../feature/readingPlan/readingPlanApi';
import type { ReadingPlan, ReadingDay } from '../../types/readingPlan.types';
import { useNavigate } from 'react-router-dom';

const ReadingPlanComponent: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'today' | 'plans' | 'calendar' | 'history'>('today');
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState<string>(
    new Date().toISOString().split('T')[0]
  );

  const { data: plans, isLoading: plansLoading, refetch: refetchPlans } = useGetMyPlansQuery();
  const activePlan = plans?.find(p => p.is_active);
  const currentPlanId = selectedPlan || activePlan?.id;

  const { data: todayReading } = useGetTodayReadingQuery(currentPlanId!, {
    skip: !currentPlanId,
  });

  const { data: stats } = useGetReadingStatsQuery(currentPlanId!, {
    skip: !currentPlanId,
  });

  const { data: historyReadings, isLoading: historyLoading } = useGetReadingHistoryQuery({
    planId: currentPlanId!,
    month: activeTab === 'calendar' ? selectedMonth : undefined
  }, {
    skip: !currentPlanId || (activeTab !== 'calendar' && activeTab !== 'history'),
  });

  const [updateStatus, { isLoading: isUpdating }] = useUpdateReadingStatusMutation();
  const [deletePlan] = useDeletePlanMutation();

  const handleStatusChange = async (status: 'completed' | 'skipped') => {
    if (!todayReading) return;

    try {
      await updateStatus({
        reading_day_id: todayReading.id,
        status,
      }).unwrap();
    } catch (error) {
      console.error('Erro ao atualizar status:', error);
    }
  };

  const handleDeletePlan = async (planId: string) => {
    if (!confirm('Tem certeza que deseja excluir este plano?')) return;

    try {
      await deletePlan(planId).unwrap();
      if (selectedPlan === planId) {
        setSelectedPlan(null);
      }
    } catch (error) {
      console.error('Erro ao excluir plano:', error);
    }
  };

  const handleCreateSuccess = () => {
    refetchPlans();
  };

  const handleReadingClick = (reading: ReadingDay) => {
    if (reading.readings && reading.readings.length > 0) {
      const firstRef = reading.readings[0].reference;
      navigate(`/bible?ref=${encodeURIComponent(firstRef)}`);
    }
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <BookOpen className="text-blue-600" size={28} />
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Plano de Leitura</h1>
                <p className="text-sm text-gray-500">Acompanhe sua jornada através da Palavra</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowCreateModal(true)}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
              >
                <Plus size={18} />
                <span className="font-medium">Novo Plano</span>
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <Filter size={20} className="text-gray-600" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <Download size={20} className="text-gray-600" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <Settings size={20} className="text-gray-600" />
              </button>
            </div>
          </div>

          {/* Stats Cards */}
          {stats && (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4 border border-blue-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-blue-700">Progresso</span>
                  <TrendingUp className="text-blue-600" size={20} />
                </div>
                <p className="text-2xl font-bold text-blue-900">{stats.completion_rate}%</p>
                <p className="text-xs text-blue-600">
                  {stats.completed_days}/{stats.total_days} dias
                </p>
              </div>

              <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg p-4 border border-orange-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-orange-700">Sequência Atual</span>
                  <Flame className="text-orange-600" size={20} />
                </div>
                <p className="text-2xl font-bold text-orange-900">{stats.current_streak}</p>
                <p className="text-xs text-orange-600">dias seguidos</p>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-4 border border-purple-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-purple-700">Melhor Sequência</span>
                  <Trophy className="text-purple-600" size={20} />
                </div>
                <p className="text-2xl font-bold text-purple-900">{stats.longest_streak}</p>
                <p className="text-xs text-purple-600">dias consecutivos</p>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4 border border-green-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-green-700">Média Semanal</span>
                  <Calendar className="text-green-600" size={20} />
                </div>
                <p className="text-2xl font-bold text-green-900">{stats.average_per_week.toFixed(1)}</p>
                <p className="text-xs text-green-600">dias por semana</p>
              </div>
            </div>
          )}

          {/* Tabs */}
          <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-lg w-fit">
            <button
              onClick={() => setActiveTab('today')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'today'
                  ? 'bg-white text-gray-800 shadow-sm'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Hoje
            </button>
            <button
              onClick={() => setActiveTab('plans')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'plans'
                  ? 'bg-white text-gray-800 shadow-sm'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Planos ({plans?.length || 0})
            </button>
            <button
              onClick={() => setActiveTab('calendar')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'calendar'
                  ? 'bg-white text-gray-800 shadow-sm'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
              disabled={!currentPlanId}
            >
              📅 Calendário
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'history'
                  ? 'bg-white text-gray-800 shadow-sm'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
              disabled={!currentPlanId}
            >
              📊 Histórico
            </button>
          </div>
        </div>
      </header>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto p-6">
        {/* Today Tab */}
        {activeTab === 'today' && (
          <div className="max-w-4xl mx-auto">
            {!currentPlanId ? (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
                <BookOpen className="mx-auto mb-4 text-gray-300" size={64} />
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  Nenhum plano ativo
                </h3>
                <p className="text-gray-600 mb-6">
                  Comece sua jornada criando um plano de leitura bíblica
                </p>
                <button
                  onClick={() => setShowCreateModal(true)}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  Criar Meu Primeiro Plano
                </button>
              </div>
            ) : todayReading ? (
              <DailyReading
                reading={todayReading}
                onStatusChange={handleStatusChange}
                isLoading={isUpdating}
              />
            ) : (
              <div className="flex justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent" />
              </div>
            )}
          </div>
        )}

        {/* Plans Tab */}
        {activeTab === 'plans' && (
          <div>
            {plansLoading ? (
              <div className="flex justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent" />
              </div>
            ) : !plans || plans.length === 0 ? (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
                <Target className="mx-auto mb-4 text-gray-300" size={64} />
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  Nenhum plano criado ainda
                </h3>
                <p className="text-gray-600 mb-6">
                  Crie seu primeiro plano de leitura e comece sua jornada pela Palavra
                </p>
                <button
                  onClick={() => setShowCreateModal(true)}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  Criar Plano
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {plans.map((plan) => (
                  <PlanCard
                    key={plan.id}
                    plan={plan}
                    onSelect={(p) => {
                      setSelectedPlan(p.id);
                      setActiveTab('today');
                    }}
                    onDelete={handleDeletePlan}
                    isActive={plan.id === currentPlanId}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {/* Calendar Tab */}
        {activeTab === 'calendar' && (
          <div>
            {historyLoading ? (
              <div className="flex justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent" />
              </div>
            ) : (
              <CalendarView
                planId={currentPlanId!}
                readings={historyReadings || []}
                onDayClick={handleReadingClick}
                onMonthChange={setSelectedMonth}
              />
            )}
          </div>
        )}

        {/* History Tab */}
        {activeTab === 'history' && (
          <div>
            {historyLoading ? (
              <div className="flex justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent" />
              </div>
            ) : (
              <ReadingHistory
                readings={historyReadings || []}
                onReadingClick={handleReadingClick}
              />
            )}
          </div>
        )}
      </div>

      {/* Create Plan Modal */}
      <CreatePlanModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSuccess={handleCreateSuccess}
      />
    </div>
  );
};

export default ReadingPlanComponent;