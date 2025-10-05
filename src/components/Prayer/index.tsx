import React, { useState } from 'react';
import { 
  Book, FileText, Target, Calendar, Users, DollarSign, Heart, BookOpen,
  Menu, X, User, Settings, Search, Plus, Filter, CheckCircle, Clock,
  AlertCircle, Sparkles, Send, Edit3, Trash2, Copy, Share2, Tag,
  ChevronDown, ChevronRight, MoreVertical, Star, MapPin, Phone, Mail
} from 'lucide-react';

const Prayer = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeModule, setActiveModule] = useState('prayer');
  const [activeTab, setActiveTab] = useState('requests');
  const [showAIModal, setShowAIModal] = useState(false);
  const [showPrayerModal, setShowPrayerModal] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [aiPrompt, setAiPrompt] = useState('');
  const [generatedPrayer, setGeneratedPrayer] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const modules = [
    { id: 'dashboard', name: 'Dashboard', icon: Menu, color: 'bg-blue-500' },
    { id: 'bible', name: 'Bíblia', icon: Book, color: 'bg-purple-500' },
    { id: 'sermons', name: 'Sermões', icon: FileText, color: 'bg-green-500' },
    { id: 'goals', name: 'Metas', icon: Target, color: 'bg-orange-500' },
    { id: 'calendar', name: 'Agenda', icon: Calendar, color: 'bg-pink-500' },
    { id: 'members', name: 'Membros', icon: Users, color: 'bg-indigo-500' },
    { id: 'finances', name: 'Finanças', icon: DollarSign, color: 'bg-emerald-500' },
    { id: 'prayer', name: 'Oração', icon: Heart, color: 'bg-red-500' },
    { id: 'library', name: 'Biblioteca', icon: BookOpen, color: 'bg-amber-500' },
  ];

  const prayerRequests = [
    {
      id: 1,
      title: 'Cura da Irmã Maria',
      description: 'Pedido de oração pela recuperação após cirurgia cardíaca',
      category: 'Saúde',
      status: 'active',
      priority: 'high',
      requester: 'João Silva',
      date: '2025-10-01',
      updates: 3,
      praying: 12
    },
    {
      id: 2,
      title: 'Emprego para Pedro',
      description: 'Busca por nova oportunidade profissional há 6 meses',
      category: 'Trabalho',
      status: 'active',
      priority: 'medium',
      requester: 'Ana Santos',
      date: '2025-09-28',
      updates: 1,
      praying: 8
    },
    {
      id: 3,
      title: 'Restauração Familiar',
      description: 'Reconciliação entre casal em crise',
      category: 'Família',
      status: 'active',
      priority: 'high',
      requester: 'Privado',
      date: '2025-09-25',
      updates: 5,
      praying: 15
    },
    {
      id: 4,
      title: 'Missão na África',
      description: 'Provisão financeira e proteção para equipe missionária',
      category: 'Missões',
      status: 'active',
      priority: 'medium',
      requester: 'Pr. Carlos',
      date: '2025-09-20',
      updates: 2,
      praying: 20
    },
    {
      id: 5,
      title: 'Libertação de Vício',
      description: 'Irmão lutando contra dependência química',
      category: 'Libertação',
      status: 'active',
      priority: 'high',
      requester: 'Confidencial',
      date: '2025-09-18',
      updates: 7,
      praying: 18
    },
    {
      id: 6,
      title: 'Aprovação em Concurso',
      description: 'Estudando para concurso público há 2 anos',
      category: 'Estudos',
      status: 'answered',
      priority: 'low',
      requester: 'Lucas Ferreira',
      date: '2025-08-15',
      updates: 4,
      praying: 10
    },
  ];

  const myPrayers = [
    {
      id: 1,
      title: 'Oração pela Família',
      content: 'Senhor, venho diante de Ti agradecer por minha família. Peço que o Senhor...',
      date: '2025-10-02',
      category: 'Família',
      favorite: true
    },
    {
      id: 2,
      title: 'Oração pela Igreja',
      content: 'Pai Celestial, levanto nossa igreja diante do Teu trono de graça...',
      date: '2025-09-30',
      category: 'Igreja',
      favorite: false
    },
    {
      id: 3,
      title: 'Oração de Libertação',
      content: 'Em nome de Jesus, declaro liberdade sobre aqueles que estão cativos...',
      date: '2025-09-28',
      category: 'Libertação',
      favorite: true
    },
  ];

  const categories = [
    { name: 'Saúde', color: 'bg-red-100 text-red-700', count: 8 },
    { name: 'Família', color: 'bg-blue-100 text-blue-700', count: 12 },
    { name: 'Trabalho', color: 'bg-green-100 text-green-700', count: 5 },
    { name: 'Missões', color: 'bg-purple-100 text-purple-700', count: 3 },
    { name: 'Libertação', color: 'bg-orange-100 text-orange-700', count: 6 },
    { name: 'Estudos', color: 'bg-yellow-100 text-yellow-700', count: 4 },
    { name: 'Igreja', color: 'bg-pink-100 text-pink-700', count: 10 },
  ];

  const handleGeneratePrayer = () => {
    // Simulação da geração por IA
    setGeneratedPrayer(`Pai Celestial, venho diante de Ti com um coração grato e humilde.

${aiPrompt}

Senhor, sei que Tua palavra diz em Filipenses 4:6-7: "Não andeis ansiosos de coisa alguma; em tudo, porém, sejam conhecidas, diante de Deus, as vossas petições, pela oração e pela súplica, com ações de graças."

Confio em Tua provisão e em Teu tempo perfeito. Tu és o Deus que ouve e responde orações. Que Tua vontade seja feita em todas as áreas da minha vida.

Em nome de Jesus Cristo, amém.`);
  };

  const getPriorityColor = (priority) => {
    const colors = {
      high: 'bg-red-100 text-red-700 border-red-300',
      medium: 'bg-yellow-100 text-yellow-700 border-yellow-300',
      low: 'bg-green-100 text-green-700 border-green-300',
    };
    return colors[priority] || colors.medium;
  };

  const getStatusIcon = (status) => {
    return status === 'answered' ? (
      <CheckCircle className="text-green-500" size={18} />
    ) : (
      <Clock className="text-orange-500" size={18} />
    );
  };

  return (
    <>
      {/* Main Sidebar */}
      

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 shadow-sm">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <Heart className="text-red-600" size={28} />
                <div>
                  <h1 className="text-2xl font-bold text-gray-800">Ministério de Oração</h1>
                  <p className="text-sm text-gray-500">Gerencie pedidos e crie orações inspiradas pela Palavra</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button 
                  onClick={() => setShowAIModal(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all shadow-md"
                >
                  <Sparkles size={18} />
                  <span className="font-medium">Criar Oração com IA</span>
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                  <Plus size={18} />
                  <span className="font-medium">Novo Pedido</span>
                </button>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-lg w-fit">
              <button
                onClick={() => setActiveTab('requests')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === 'requests'
                    ? 'bg-white text-gray-800 shadow-sm'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                Pedidos de Oração
              </button>
              <button
                onClick={() => setActiveTab('myPrayers')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === 'myPrayers'
                    ? 'bg-white text-gray-800 shadow-sm'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                Minhas Orações
              </button>
              <button
                onClick={() => setActiveTab('categories')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === 'categories'
                    ? 'bg-white text-gray-800 shadow-sm'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                Categorias
              </button>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Prayer Requests Tab */}
          {activeTab === 'requests' && (
            <div>
              {/* Filters */}
              <div className="mb-6 flex items-center gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="text"
                    placeholder="Buscar pedidos..."
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 w-full"
                  />
                </div>
                <select 
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 bg-white"
                >
                  <option value="all">Todos os Status</option>
                  <option value="active">Ativos</option>
                  <option value="answered">Respondidos</option>
                </select>
                <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  <Filter size={18} />
                  <span>Filtros</span>
                </button>
              </div>

              {/* Prayer Requests Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {prayerRequests.map((request) => (
                  <div
                    key={request.id}
                    className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 hover:shadow-md transition-all cursor-pointer"
                    onClick={() => setSelectedRequest(request)}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-start gap-3 flex-1">
                        {getStatusIcon(request.status)}
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-800 mb-1">{request.title}</h3>
                          <p className="text-sm text-gray-600 line-clamp-2">{request.description}</p>
                        </div>
                      </div>
                      <button className="p-1 hover:bg-gray-100 rounded transition-colors">
                        <MoreVertical size={18} className="text-gray-400" />
                      </button>
                    </div>

                    <div className="flex items-center gap-2 mb-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${request.category === 'Saúde' ? 'bg-red-100 text-red-700' : request.category === 'Família' ? 'bg-blue-100 text-blue-700' : request.category === 'Trabalho' ? 'bg-green-100 text-green-700' : request.category === 'Missões' ? 'bg-purple-100 text-purple-700' : 'bg-orange-100 text-orange-700'}`}>
                        {request.category}
                      </span>
                      <span className={`px-2 py-1 rounded border text-xs font-medium ${getPriorityColor(request.priority)}`}>
                        {request.priority === 'high' ? 'Alta' : request.priority === 'medium' ? 'Média' : 'Baixa'}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-sm text-gray-500 pt-3 border-t border-gray-200">
                      <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1">
                          <User size={14} />
                          {request.requester}
                        </span>
                        <span className="flex items-center gap-1">
                          <Heart size={14} />
                          {request.praying} orando
                        </span>
                      </div>
                      <span>{new Date(request.date).toLocaleDateString('pt-BR')}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* My Prayers Tab */}
          {activeTab === 'myPrayers' && (
            <div>
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-800">Minhas Orações Salvas</h2>
                <button 
                  onClick={() => setShowPrayerModal(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  <Edit3 size={18} />
                  <span>Escrever Nova Oração</span>
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                {myPrayers.map((prayer) => (
                  <div
                    key={prayer.id}
                    className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 hover:shadow-md transition-all"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="font-semibold text-gray-800 flex-1">{prayer.title}</h3>
                      <div className="flex items-center gap-2">
                        {prayer.favorite && <Star className="text-yellow-500 fill-yellow-500" size={18} />}
                        <button className="p-1 hover:bg-gray-100 rounded transition-colors">
                          <MoreVertical size={18} className="text-gray-400" />
                        </button>
                      </div>
                    </div>

                    <p className="text-sm text-gray-600 mb-4 line-clamp-3">{prayer.content}</p>

                    <div className="flex items-center justify-between text-sm">
                      <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium">
                        {prayer.category}
                      </span>
                      <span className="text-gray-500">{new Date(prayer.date).toLocaleDateString('pt-BR')}</span>
                    </div>

                    <div className="flex gap-2 mt-4 pt-4 border-t border-gray-200">
                      <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors text-sm">
                        <Copy size={14} />
                        Copiar
                      </button>
                      <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-lg transition-colors text-sm">
                        <Share2 size={14} />
                        Compartilhar
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Categories Tab */}
          {activeTab === 'categories' && (
            <div>
              <h2 className="text-xl font-bold text-gray-800 mb-6">Categorias de Oração</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {categories.map((category, idx) => (
                  <div
                    key={idx}
                    className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all cursor-pointer"
                  >
                    <div className={`w-12 h-12 ${category.color} rounded-lg flex items-center justify-center mb-4`}>
                      <Tag size={24} />
                    </div>
                    <h3 className="font-semibold text-gray-800 mb-1">{category.name}</h3>
                    <p className="text-sm text-gray-600">{category.count} pedidos ativos</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* AI Prayer Generator Modal */}
      {showAIModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden flex flex-col">
            <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-purple-50 to-pink-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                    <Sparkles className="text-white" size={24} />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800">Criar Oração com IA</h2>
                    <p className="text-sm text-gray-600">Baseada na Palavra de Deus</p>
                  </div>
                </div>
                <button 
                  onClick={() => setShowAIModal(false)}
                  className="p-2 hover:bg-white rounded-lg transition-colors"
                >
                  <X size={24} />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Sobre o que você deseja orar?
                </label>
                <textarea
                  value={aiPrompt}
                  onChange={(e) => setAiPrompt(e.target.value)}
                  placeholder="Descreva aqui sua necessidade de oração. Exemplo: 'Preciso de sabedoria para liderar minha igreja' ou 'Quero orar pela cura de um irmão enfermo'..."
                  className="w-full h-32 p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                />
              </div>

              <button
                onClick={handleGeneratePrayer}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all shadow-md mb-6"
              >
                <Sparkles size={20} />
                <span className="font-semibold">Gerar Oração</span>
              </button>

              {generatedPrayer && (
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-200">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-gray-800">Oração Gerada</h3>
                    <div className="flex gap-2">
                      <button className="p-2 hover:bg-white rounded-lg transition-colors" title="Copiar">
                        <Copy size={18} className="text-gray-600" />
                      </button>
                      <button className="p-2 hover:bg-white rounded-lg transition-colors" title="Editar">
                        <Edit3 size={18} className="text-gray-600" />
                      </button>
                      <button className="p-2 hover:bg-white rounded-lg transition-colors" title="Salvar">
                        <Heart size={18} className="text-red-500" />
                      </button>
                    </div>
                  </div>
                  <div className="prose max-w-none">
                    <p className="text-gray-700 whitespace-pre-line leading-relaxed">{generatedPrayer}</p>
                  </div>
                </div>
              )}
            </div>

            <div className="p-6 border-t border-gray-200 bg-gray-50">
              <div className="flex gap-3">
                <button
                  onClick={() => setShowAIModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  Fechar
                </button>
                <button className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                  Salvar Oração
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Write Prayer Modal */}
      {showPrayerModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden flex flex-col">
            <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-red-50 to-pink-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-pink-500 rounded-lg flex items-center justify-center">
                    <Edit3 className="text-white" size={24} />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800">Escrever Nova Oração</h2>
                    <p className="text-sm text-gray-600">Crie uma oração personalizada</p>
                  </div>
                </div>
                <button 
                  onClick={() => setShowPrayerModal(false)}
                  className="p-2 hover:bg-white rounded-lg transition-colors"
                >
                  <X size={24} />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Título da Oração
                </label>
                <input
                  type="text"
                  placeholder="Ex: Oração pela Família"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Categoria
                </label>
                <select className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 bg-white">
                  <option>Selecione uma categoria</option>
                  {categories.map((cat, idx) => (
                    <option key={idx} value={cat.name}>{cat.name}</option>
                  ))}
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Conteúdo da Oração
                </label>
                <textarea
                  placeholder="Escreva sua oração aqui..."
                  className="w-full h-64 p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 resize-none"
                />
              </div>

              <div className="flex items-center gap-2">
                <input type="checkbox" id="favorite" className="rounded" />
                <label htmlFor="favorite" className="text-sm text-gray-700">
                  Marcar como favorita
                </label>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 bg-gray-50">
              <div className="flex gap-3">
                <button
                  onClick={() => setShowPrayerModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  Cancelar
                </button>
                <button className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium">
                  Salvar Oração
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
</>
  );
};

export default Prayer;