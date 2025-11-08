// src/components/ReadingPlan/CreatePlanModal.tsx

import React from 'react';
import { X, BookOpen, Calendar, Check } from 'lucide-react';
import { useGetPlanTemplatesQuery, useCreatePlanMutation } from '../../feature/readingPlan/readingPlanApi';
import { useMockPlanTemplates } from '../../mocks/readingPlanTemplates';
import type { PlanTemplate } from '../../types/readingPlan.types';

interface CreatePlanModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const CreatePlanModal: React.FC<CreatePlanModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [step, setStep] = React.useState(1);
  const [selectedTemplate, setSelectedTemplate] = React.useState<PlanTemplate | null>(null);
  const [planName, setPlanName] = React.useState('');
  const [startDate, setStartDate] = React.useState(
    new Date().toISOString().split('T')[0]
  );

  const USE_MOCK = import.meta.env.VITE_USE_MOCK_DATA === 'true';
  
  const { data: templates, isLoading } = USE_MOCK 
    ? useMockPlanTemplates()
    : useGetPlanTemplatesQuery();
    
  const [createPlan, { isLoading: isCreating }] = useCreatePlanMutation();

  const handleTemplateSelect = (template: PlanTemplate) => {
    setSelectedTemplate(template);
    setPlanName(template.name);
    setStep(2);
  };

  const handleCreatePlan = async () => {
    if (!selectedTemplate) return;

    try {
      await createPlan({
        template_id: selectedTemplate.id,
        name: planName,
        start_date: startDate,
      }).unwrap();

      onSuccess();
      handleClose();
    } catch (error) {
      console.error('Erro ao criar plano:', error);
    }
  };

  const handleClose = () => {
    setStep(1);
    setSelectedTemplate(null);
    setPlanName('');
    setStartDate(new Date().toISOString().split('T')[0]);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-purple-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                <BookOpen className="text-white" size={24} />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800">Criar Plano de Leitura</h2>
                <p className="text-sm text-gray-600">
                  {step === 1 ? 'Escolha um plano' : 'Configure seu plano'}
                </p>
              </div>
            </div>
            <button
              onClick={handleClose}
              className="p-2 hover:bg-white rounded-lg transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          {/* Progress Steps */}
          <div className="flex items-center gap-4 mt-6">
            <div className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                step >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'
              }`}>
                {step > 1 ? <Check size={16} /> : '1'}
              </div>
              <span className={`text-sm font-medium ${step >= 1 ? 'text-gray-800' : 'text-gray-500'}`}>
                Escolher Plano
              </span>
            </div>
            <div className="flex-1 h-1 bg-gray-200 rounded">
              <div
                className={`h-full bg-blue-600 rounded transition-all ${step >= 2 ? 'w-full' : 'w-0'}`}
              />
            </div>
            <div className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                step >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'
              }`}>
                2
              </div>
              <span className={`text-sm font-medium ${step >= 2 ? 'text-gray-800' : 'text-gray-500'}`}>
                Configurar
              </span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {step === 1 && (
            <div>
              <h3 className="text-lg font-bold text-gray-800 mb-4">Escolha um Plano</h3>
              {isLoading ? (
                <div className="flex justify-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent" />
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {templates?.map((template) => (
                    <div
                      key={template.id}
                      onClick={() => handleTemplateSelect(template)}
                      className="p-6 border-2 border-gray-200 rounded-xl hover:border-blue-500 hover:shadow-lg transition-all cursor-pointer group"
                    >
                      <div className="flex items-start gap-4 mb-4">
                        <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-2xl bg-gradient-to-br ${template.color}`}>
                          {template.icon}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-bold text-gray-800 mb-1 group-hover:text-blue-600 transition-colors">
                            {template.name}
                          </h4>
                          <p className="text-sm text-gray-600">{template.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <Calendar size={14} />
                          <span>{template.duration_days} dias</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <BookOpen size={14} />
                          <span>{template.readings_count} leituras</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {step === 2 && selectedTemplate && (
            <div className="max-w-2xl mx-auto">
              <h3 className="text-lg font-bold text-gray-800 mb-6">Configure seu Plano</h3>

              {/* Selected Template Preview */}
              <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200 mb-6">
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-2xl bg-gradient-to-br ${selectedTemplate.color}`}>
                    {selectedTemplate.icon}
                  </div>
                  <div>
                    <p className="font-bold text-gray-800">{selectedTemplate.name}</p>
                    <p className="text-sm text-gray-600">{selectedTemplate.description}</p>
                  </div>
                </div>
              </div>

              {/* Form */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Nome do Plano
                  </label>
                  <input
                    type="text"
                    value={planName}
                    onChange={(e) => setPlanName(e.target.value)}
                    placeholder="Ex: Meu Plano de Leitura 2025"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Data de Início
                  </label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    O plano terminará em aproximadamente{' '}
                    {new Date(
                      new Date(startDate).getTime() + selectedTemplate.duration_days * 24 * 60 * 60 * 1000
                    ).toLocaleDateString('pt-BR')}
                  </p>
                </div>

                {/* Summary */}
                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <h4 className="text-sm font-semibold text-gray-700 mb-3">Resumo</h4>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex justify-between">
                      <span>Duração:</span>
                      <span className="font-medium text-gray-800">{selectedTemplate.duration_days} dias</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Total de leituras:</span>
                      <span className="font-medium text-gray-800">{selectedTemplate.readings_count}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Data de início:</span>
                      <span className="font-medium text-gray-800">
                        {new Date(startDate).toLocaleDateString('pt-BR')}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 bg-gray-50">
          <div className="flex gap-3">
            <button
              onClick={step === 1 ? handleClose : () => setStep(1)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors font-medium"
            >
              {step === 1 ? 'Cancelar' : 'Voltar'}
            </button>
            {step === 2 && (
              <button
                onClick={handleCreatePlan}
                disabled={isCreating || !planName || !startDate}
                className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isCreating ? 'Criando...' : 'Criar Plano'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePlanModal;