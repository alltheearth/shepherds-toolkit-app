import { useState } from 'react';
import { 
  Target, Plus, Calendar, Clock, Users, CheckCircle, AlertCircle,
  TrendingUp, MoreVertical, Edit, Trash2, Eye, ChevronRight,
  Filter, Search, Settings, Download, Flag, Play, Pause, X
} from 'lucide-react';

const Goals = () => {
  const [activeView, setActiveView] = useState('kanban');
  const [selectedGoal, setSelectedGoal] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const goals = [
    {
      id: 1,
      title: 'Treinamento de Líderes',
      description: 'Capacitar 20 novos líderes para ministérios',
      category: 'Igreja',
      priority: 'high',
      status: 'in_progress',
      progress: 65,
      startDate: '2025-09-01',
      endDate: '2025-12-31',
      responsible: 'Pr. João',
      tasks: [
        { id: 1, title: 'Selecionar candidatos', completed: true },
        { id: 2, title: 'Criar material didático', completed: true },
        { id: 3, title: 'Realizar 8 encontros', completed: false, progress: 50 },
        { id: 4, title: 'Avaliação final', completed: false },
      ],
      team: ['Pr. João', 'Pb. Carlos', 'Irmã Ana'],
      budget: 2500,
      spent: 1200
    },
    {
      id: 2,
      title: 'Reforma do Templo',
      description: 'Renovar pintura e sistema elétrico',
      category: 'Infraestrutura',
      priority: 'high',
      status: 'in_progress',
      progress: 40,
      startDate: '2025-10-01',
      endDate: '2025-11-30',
      responsible: 'Diácono Pedro',
      tasks: [
        { id: 1, title: 'Orçamentos', completed: true },
        { id: 2, title: 'Aprovação da liderança', completed: true },
        { id: 3, title: 'Execução da pintura', completed: false, progress: 30 },
        { id: 4, title: 'Sistema elétrico', completed: false },
      ],
      team: ['Diácono Pedro', 'Equipe de Manutenção'],
      budget: 15000,
      spent: 6000
    },
    {
      id: 3,
      title: 'Campanha de Evangelismo',
      description: 'Alcançar 500 pessoas no bairro',
      category: 'Evangelismo',
      priority: 'medium',
      status: 'not_started',
      progress: 0,
      startDate: '2025-11-01',
      endDate: '2025-12-15',
      responsible: 'Ministério de Evangelismo',
      tasks: [
        { id: 1, title: 'Planejar estratégia', completed: false },
        { id: 2, title: 'Treinar equipe', completed: false },
        { id: 3, title: 'Produzir material', completed: false },
        { id: 4, title: 'Executar campanha', completed: false },
      ],
      team: ['Pr. Marcos', 'Equipe de Evangelismo'],
      budget: 1500,
      spent: 0
    },
    {
      id: 4,
      title: 'Retiro Espiritual',
      description: 'Organizar retiro para 150 pessoas',
      category: 'Eventos',
      priority: 'medium',
      status: 'in_progress',
      progress: 75,
      startDate: '2025-08-01',
      endDate: '2025-10-20',
      responsible: 'Ministério de Eventos',
      tasks: [
        { id: 1, title: 'Reservar local', completed: true },
        { id: 2, title: 'Confirmar palestrantes', completed: true },
        { id: 3, title: 'Inscrições', completed: true },
        { id: 4, title: 'Logística final', completed: false, progress: 80 },
      ],
      team: ['Irmã Maria', 'Equipe de Eventos'],
      budget: 8000,
      spent: 5500
    },
    {
      id: 5,
      title: 'Crescimento de Jovens',
      description: 'Aumentar participação dos jovens em 30%',
      category: 'Ministérios',
      priority: 'high',
      status: 'in_progress',
      progress: 55,
      startDate: '2025-09-01',
      endDate: '2026-03-31',
      responsible: 'Pastor de Jovens',
      tasks: [
        { id: 1, title: 'Pesquisa de interesse', completed: true },
        { id: 2, title: 'Novos programas', completed: false, progress: 60 },
        { id: 3, title: 'Eventos atrativos', completed: false },
        { id: 4, title: 'Mentoria individual', completed: false },
      ],
      team: ['Pr. Lucas', 'Líderes de Jovens'],
      budget: 3000,
      spent: 1800
    },
    {
      id: 6,
      title: 'Sistema de Som',
      description: 'Adquirir novo equipamento de áudio',
      category: 'Infraestrutura',
      priority: 'low',
      status: 'completed',
      progress: 100,
      startDate: '2025-07-01',
      endDate: '2025-09-30',
      responsible: 'Ministério de Louvor',
      tasks: [
        { id: 1, title: 'Pesquisa de mercado', completed: true },
        { id: 2, title: 'Aprovação do orçamento', completed: true },
        { id: 3, title: 'Compra', completed: true },
        { id: 4, title: 'Instalação', completed: true },
      ],
      team: ['Diácono José', 'Equipe de Som'],
      budget: 12000,
      spent: 11500
    },
  ];

  const categories = [
    { name: 'Igreja', color: 'bg-blue-500', count: 8 },
    { name: 'Ministérios', color: 'bg-purple-500', count: 12 },
    { name: 'Evangelismo', color: 'bg-green-500', count: 5 },
    { name: 'Infraestrutura', color: 'bg-orange-500', count: 6 },
    { name: 'Eventos', color: 'bg-pink-500', count: 4 },
  ];

  const getPriorityColor = (priority) => {
    const colors = {
      high: 'bg-red-100 text-red-700 border-red-300',
      medium: 'bg-yellow-100 text-yellow-700 border-yellow-300',
      low: 'bg-green-100 text-green-700 border-green-300',
    };
    return colors[priority];
  };

  const getStatusColor = (status) => {
    const colors = {
      not_started: 'bg-gray-100 text-gray-700',
      in_progress: 'bg-blue-100 text-blue-700',
      completed: 'bg-green-100 text-green-700',
      paused: 'bg-orange-100 text-orange-700',
    };
    return colors[status];
  };

  const getStatusText = (status) => {
    const texts = {
      not_started: 'Não Iniciada',
      in_progress: 'Em Andamento',
      completed: 'Concluída',
      paused: 'Pausada',
    };
    return texts[status];
  };

  const kanbanColumns = [
    { id: 'not_started', title: 'Não Iniciadas', goals: goals.filter(g => g.status === 'not_started') },
    { id: 'in_progress', title: 'Em Andamento', goals: goals.filter(g => g.status === 'in_progress') },
    { id: 'completed', title: 'Concluídas', goals: goals.filter(g => g.status === 'completed') },
  ];

  return (
    
    <div className="flex-1 flex flex-col overflow-hidden bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <Target className="text-orange-600" size={28} />
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Metas e Objetivos</h1>
                <p className="text-sm text-gray-500">Gerencie e acompanhe o progresso das metas da igreja</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors shadow-sm">
                <Plus size={18} />
                <span className="font-medium">Nova Meta</span>
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
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4 border border-blue-200">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-blue-700 font-medium">Total de Metas</span>
                <Target className="text-blue-600" size={20} />
              </div>
              <p className="text-2xl font-bold text-blue-900">{goals.length}</p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4 border border-green-200">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-green-700 font-medium">Concluídas</span>
                <CheckCircle className="text-green-600" size={20} />
              </div>
              <p className="text-2xl font-bold text-green-900">
                {goals.filter(g => g.status === 'completed').length}
              </p>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg p-4 border border-orange-200">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-orange-700 font-medium">Em Andamento</span>
                <TrendingUp className="text-orange-600" size={20} />
              </div>
              <p className="text-2xl font-bold text-orange-900">
                {goals.filter(g => g.status === 'in_progress').length}
              </p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-4 border border-purple-200">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-purple-700 font-medium">Taxa de Sucesso</span>
                <Flag className="text-purple-600" size={20} />
              </div>
              <p className="text-2xl font-bold text-purple-900">
                {Math.round((goals.filter(g => g.status === 'completed').length / goals.length) * 100)}%
              </p>
            </div>
          </div>

          {/* View Tabs and Filters */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-lg">
              <button
                onClick={() => setActiveView('kanban')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeView === 'kanban'
                    ? 'bg-white text-gray-800 shadow-sm'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                Kanban
              </button>
              <button
                onClick={() => setActiveView('list')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeView === 'list'
                    ? 'bg-white text-gray-800 shadow-sm'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                Lista
              </button>
              <button
                onClick={() => setActiveView('timeline')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeView === 'timeline'
                    ? 'bg-white text-gray-800 shadow-sm'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                Timeline
              </button>
            </div>

            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  placeholder="Buscar metas..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
              <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <Filter size={18} />
                <span>Filtros</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto p-6">
        {/* Kanban View */}
        {activeView === 'kanban' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {kanbanColumns.map((column) => (
              <div key={column.id} className="bg-gray-100 rounded-xl p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-gray-800">{column.title}</h3>
                  <span className="px-2 py-1 bg-white rounded-full text-xs font-medium text-gray-600">
                    {column.goals.length}
                  </span>
                </div>

                <div className="space-y-3">
                  {column.goals.map((goal) => (
                    <div
                      key={goal.id}
                      onClick={() => {
                        setSelectedGoal(goal);
                        setShowModal(true);
                      }}
                      className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-all cursor-pointer border border-gray-200"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <h4 className="font-semibold text-gray-800 flex-1">{goal.title}</h4>
                        <button className="p-1 hover:bg-gray-100 rounded transition-colors">
                          <MoreVertical size={16} className="text-gray-400" />
                        </button>
                      </div>

                      <p className="text-sm text-gray-600 mb-3 line-clamp-2">{goal.description}</p>

                      <div className="flex items-center gap-2 mb-3">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${goal.category === 'Igreja' ? 'bg-blue-100 text-blue-700' : goal.category === 'Ministérios' ? 'bg-purple-100 text-purple-700' : goal.category === 'Evangelismo' ? 'bg-green-100 text-green-700' : goal.category === 'Infraestrutura' ? 'bg-orange-100 text-orange-700' : 'bg-pink-100 text-pink-700'}`}>
                          {goal.category}
                        </span>
                        <span className={`px-2 py-1 rounded border text-xs font-medium ${getPriorityColor(goal.priority)}`}>
                          {goal.priority === 'high' ? 'Alta' : goal.priority === 'medium' ? 'Média' : 'Baixa'}
                        </span>
                      </div>

                      <div className="mb-3">
                        <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
                          <span>Progresso</span>
                          <span className="font-medium">{goal.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-orange-500 h-2 rounded-full transition-all"
                            style={{ width: `${goal.progress}%` }}
                          ></div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <div className="flex items-center gap-1">
                          <Calendar size={12} />
                          <span>{new Date(goal.endDate).toLocaleDateString('pt-BR')}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users size={12} />
                          <span>{goal.team.length}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* List View */}
        {activeView === 'list' && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Meta</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Categoria</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Prioridade</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Progresso</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Prazo</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Responsável</th>
                    <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {goals.map((goal) => (
                    <tr key={goal.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-medium text-gray-800">{goal.title}</p>
                          <p className="text-sm text-gray-500 line-clamp-1">{goal.description}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${goal.category === 'Igreja' ? 'bg-blue-100 text-blue-700' : goal.category === 'Ministérios' ? 'bg-purple-100 text-purple-700' : goal.category === 'Evangelismo' ? 'bg-green-100 text-green-700' : goal.category === 'Infraestrutura' ? 'bg-orange-100 text-orange-700' : 'bg-pink-100 text-pink-700'}`}>
                          {goal.category}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded border text-xs font-medium ${getPriorityColor(goal.priority)}`}>
                          {goal.priority === 'high' ? 'Alta' : goal.priority === 'medium' ? 'Média' : 'Baixa'}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-orange-500 h-2 rounded-full"
                              style={{ width: `${goal.progress}%` }}
                            ></div>
                          </div>
                          <span className="text-sm font-medium text-gray-700 min-w-[3rem] text-right">
                            {goal.progress}%
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {new Date(goal.endDate).toLocaleDateString('pt-BR')}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">{goal.responsible}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center gap-2">
                          <button 
                            onClick={() => {
                              setSelectedGoal(goal);
                              setShowModal(true);
                            }}
                            className="p-2 hover:bg-gray-200 rounded transition-colors" 
                            title="Visualizar"
                          >
                            <Eye size={16} className="text-gray-600" />
                          </button>
                          <button className="p-2 hover:bg-gray-200 rounded transition-colors" title="Editar">
                            <Edit size={16} className="text-gray-600" />
                          </button>
                          <button className="p-2 hover:bg-red-100 rounded transition-colors" title="Excluir">
                            <Trash2 size={16} className="text-red-600" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Timeline View */}
        {activeView === 'timeline' && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-6">Cronograma de Metas</h3>
            <div className="space-y-6">
              {goals.map((goal, idx) => (
                <div key={goal.id} className="flex gap-6">
                  <div className="flex flex-col items-center">
                    <div className={`w-4 h-4 rounded-full ${goal.status === 'completed' ? 'bg-green-500' : goal.status === 'in_progress' ? 'bg-orange-500' : 'bg-gray-300'}`}></div>
                    {idx < goals.length - 1 && (
                      <div className="w-0.5 h-full bg-gray-200 my-2"></div>
                    )}
                  </div>

                  <div className="flex-1 pb-6">
                    <div className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors cursor-pointer"
                         onClick={() => {
                           setSelectedGoal(goal);
                           setShowModal(true);
                         }}>
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-semibold text-gray-800">{goal.title}</h4>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(goal.status)}`}>
                          {getStatusText(goal.status)}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">{goal.description}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <Calendar size={14} />
                          {new Date(goal.startDate).toLocaleDateString('pt-BR')} - {new Date(goal.endDate).toLocaleDateString('pt-BR')}
                        </span>
                        <span className="flex items-center gap-1">
                          <Users size={14} />
                          {goal.responsible}
                        </span>
                        <span className="flex items-center gap-1">
                          <TrendingUp size={14} />
                          {goal.progress}%
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Goal Detail Modal */}
      {showModal && selectedGoal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
            <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-orange-50 to-red-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                    <Target className="text-white" size={24} />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800">{selectedGoal.title}</h2>
                    <p className="text-sm text-gray-600">{selectedGoal.category}</p>
                  </div>
                </div>
                <button 
                  onClick={() => setShowModal(false)}
                  className="p-2 hover:bg-white rounded-lg transition-colors"
                >
                  <X size={24} />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="text-sm font-semibold text-gray-700 mb-2">Progresso Geral</h3>
                  <div className="flex items-center gap-3">
                    <div className="flex-1">
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div
                          className="bg-orange-500 h-3 rounded-full transition-all"
                          style={{ width: `${selectedGoal.progress}%` }}
                        ></div>
                      </div>
                    </div>
                    <span className="text-2xl font-bold text-orange-600">{selectedGoal.progress}%</span>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="text-sm font-semibold text-gray-700 mb-2">Orçamento</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Total:</span>
                      <span className="font-medium">R$ {selectedGoal.budget.toLocaleString('pt-BR')}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Gasto:</span>
                      <span className="font-medium text-red-600">R$ {selectedGoal.spent.toLocaleString('pt-BR')}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Disponível:</span>
                      <span className="font-medium text-green-600">R$ {(selectedGoal.budget - selectedGoal.spent).toLocaleString('pt-BR')}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-sm font-semibold text-gray-700 mb-3">Descrição</h3>
                <p className="text-gray-600">{selectedGoal.description}</p>
              </div>

              <div className="mb-6">
                <h3 className="text-sm font-semibold text-gray-700 mb-3">Informações</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="flex items-center gap-2 text-gray-600 text-xs mb-1">
                      <Calendar size={14} />
                      <span>Início</span>
                    </div>
                    <p className="font-medium text-gray-800">
                      {new Date(selectedGoal.startDate).toLocaleDateString('pt-BR')}
                    </p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="flex items-center gap-2 text-gray-600 text-xs mb-1">
                      <Calendar size={14} />
                      <span>Término</span>
                    </div>
                    <p className="font-medium text-gray-800">
                      {new Date(selectedGoal.endDate).toLocaleDateString('pt-BR')}
                    </p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="flex items-center gap-2 text-gray-600 text-xs mb-1">
                      <Users size={14} />
                      <span>Responsável</span>
                    </div>
                    <p className="font-medium text-gray-800">{selectedGoal.responsible}</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="flex items-center gap-2 text-gray-600 text-xs mb-1">
                      <Flag size={14} />
                      <span>Prioridade</span>
                    </div>
                    <p className="font-medium text-gray-800">
                      {selectedGoal.priority === 'high' ? 'Alta' : selectedGoal.priority === 'medium' ? 'Média' : 'Baixa'}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-sm font-semibold text-gray-700 mb-3">Equipe</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedGoal.team.map((member, idx) => (
                    <div key={idx} className="flex items-center gap-2 px-3 py-2 bg-blue-50 text-blue-700 rounded-lg">
                      <div className="w-6 h-6 bg-blue-200 rounded-full flex items-center justify-center">
                        <Users size={12} />
                      </div>
                      <span className="text-sm font-medium">{member}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-semibold text-gray-700">Tarefas ({selectedGoal.tasks.filter(t => t.completed).length}/{selectedGoal.tasks.length})</h3>
                  <button className="text-sm text-orange-600 hover:text-orange-700 font-medium">
                    + Adicionar Tarefa
                  </button>
                </div>
                <div className="space-y-2">
                  {selectedGoal.tasks.map((task) => (
                    <div
                      key={task.id}
                      className={`flex items-center gap-3 p-3 rounded-lg border-2 transition-all ${
                        task.completed
                          ? 'bg-green-50 border-green-200'
                          : 'bg-white border-gray-200 hover:border-orange-300'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={task.completed}
                        className="w-5 h-5 rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                        readOnly
                      />
                      <div className="flex-1">
                        <p className={`font-medium ${task.completed ? 'text-green-700 line-through' : 'text-gray-800'}`}>
                          {task.title}
                        </p>
                        {task.progress !== undefined && !task.completed && (
                          <div className="mt-2">
                            <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
                              <span>Progresso da tarefa</span>
                              <span className="font-medium">{task.progress}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-1.5">
                              <div
                                className="bg-orange-400 h-1.5 rounded-full transition-all"
                                style={{ width: `${task.progress}%` }}
                              ></div>
                            </div>
                          </div>
                        )}
                      </div>
                      {task.completed && <CheckCircle className="text-green-600" size={20} />}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 bg-gray-50">
              <div className="flex gap-3">
                <button
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors font-medium"
                >
                  Fechar
                </button>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center gap-2">
                  <Edit size={18} />
                  Editar Meta
                </button>
                <button className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors font-medium flex items-center gap-2">
                  {selectedGoal.status === 'in_progress' ? (
                    <>
                      <Pause size={18} />
                      Pausar
                    </>
                  ) : (
                    <>
                      <Play size={18} />
                      Retomar
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Goals;
        