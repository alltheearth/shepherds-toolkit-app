// src/components/ReadingPlan/PlanCard.tsx

import React from 'react';
import { Calendar, BookOpen, TrendingUp, MoreVertical, Play, Pause, Trash2 } from 'lucide-react';
import type { ReadingPlan } from '../../types/readingPlan.types';

interface PlanCardProps {
  plan: ReadingPlan;
  onSelect: (plan: ReadingPlan) => void;
  onDelete: (planId: string) => void;
  isActive?: boolean;
}

const PlanCard: React.FC<PlanCardProps> = ({ plan, onSelect, onDelete, isActive }) => {
  const [showMenu, setShowMenu] = React.useState(false);

  const getTypeColor = (type: string) => {
    const colors = {
      bible_year: 'from-blue-500 to-blue-600',
      nt_90days: 'from-green-500 to-green-600',
      psalms_month: 'from-purple-500 to-purple-600',
      custom: 'from-orange-500 to-orange-600',
    };
    return colors[type] || colors.custom;
  };

  const getTypeName = (type: string) => {
    const names = {
      bible_year: 'Bíblia em 1 Ano',
      nt_90days: 'NT em 90 Dias',
      psalms_month: 'Salmos em 1 Mês',
      custom: 'Plano Personalizado',
    };
    return names[type] || 'Plano Personalizado';
  };

  return (
    <div
      onClick={() => onSelect(plan)}
      className={`bg-white rounded-xl shadow-sm border-2 p-6 hover:shadow-md transition-all cursor-pointer ${
        isActive ? 'border-blue-500 ring-2 ring-blue-100' : 'border-gray-200'
      }`}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`w-12 h-12 bg-gradient-to-br ${getTypeColor(plan.type)} rounded-lg flex items-center justify-center`}>
            <BookOpen className="text-white" size={24} />
          </div>
          <div>
            <h3 className="font-bold text-gray-800">{plan.name}</h3>
            <p className="text-xs text-gray-500">{getTypeName(plan.type)}</p>
          </div>
        </div>

        <div className="relative">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowMenu(!showMenu);
            }}
            className="p-1 hover:bg-gray-100 rounded transition-colors"
          >
            <MoreVertical size={18} className="text-gray-400" />
          </button>

          {showMenu && (
            <>
              <div
                className="fixed inset-0 z-10"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowMenu(false);
                }}
              />
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 z-20">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    // Toggle active
                    setShowMenu(false);
                  }}
                  className="w-full flex items-center gap-2 px-4 py-2 hover:bg-gray-50 text-left text-sm"
                >
                  {plan.is_active ? <Pause size={16} /> : <Play size={16} />}
                  {plan.is_active ? 'Pausar plano' : 'Retomar plano'}
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete(plan.id);
                    setShowMenu(false);
                  }}
                  className="w-full flex items-center gap-2 px-4 py-2 hover:bg-red-50 text-left text-sm text-red-600"
                >
                  <Trash2 size={16} />
                  Excluir plano
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="flex items-center justify-between text-sm mb-2">
          <span className="text-gray-600">Progresso</span>
          <span className="font-bold text-gray-800">{plan.progress_percentage}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div
            className={`bg-gradient-to-r ${getTypeColor(plan.type)} h-2.5 rounded-full transition-all`}
            style={{ width: `${plan.progress_percentage}%` }}
          />
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-200">
        <div className="text-center">
          <div className="flex items-center justify-center gap-1 text-gray-500 mb-1">
            <Calendar size={14} />
          </div>
          <p className="text-xs text-gray-500">Dias</p>
          <p className="font-bold text-gray-800">{plan.days_completed}/{plan.total_days}</p>
        </div>
        <div className="text-center border-l border-r border-gray-200">
          <div className="flex items-center justify-center gap-1 text-gray-500 mb-1">
            <TrendingUp size={14} />
          </div>
          <p className="text-xs text-gray-500">Status</p>
          <p className="font-bold text-gray-800">
            {plan.is_active ? (
              <span className="text-green-600">Ativo</span>
            ) : (
              <span className="text-orange-600">Pausado</span>
            )}
          </p>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center gap-1 text-gray-500 mb-1">
            <BookOpen size={14} />
          </div>
          <p className="text-xs text-gray-500">Início</p>
          <p className="font-bold text-gray-800 text-xs">
            {new Date(plan.start_date).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' })}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PlanCard;