import React, { useState } from 'react';
import { 
  Users, Plus, Search, Filter, Download, Settings, Mail, Phone,
  MapPin, Calendar, Heart, Award, TrendingUp, Eye, Edit, Trash2,
  UserPlus, Gift, BookOpen, AlertCircle, CheckCircle, Clock,
  MoreVertical, X, User, Cake, Home, Briefcase, GraduationCap
} from 'lucide-react';

const Members = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [selectedMember, setSelectedMember] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [viewMode, setViewMode] = useState('grid');

  const members = [
    {
      id: 1,
      name: 'Maria Santos Silva',
      photo: null,
      email: 'maria.santos@email.com',
      phone: '(11) 98765-4321',
      address: 'Rua das Flores, 123 - São Paulo, SP',
      birthdate: '1985-03-15',
      baptismDate: '2010-06-20',
      memberSince: '2010-06-20',
      status: 'active',
      ministry: ['Louvor', 'Intercessão'],
      attendance: 92,
      lastVisit: '2025-10-01',
      cellGroup: 'Grupo da Paz',
      maritalStatus: 'Casada',
      occupation: 'Professora',
      notes: 'Líder do ministério de louvor. Sempre presente nos cultos.',
      familyMembers: ['João Silva (Esposo)', 'Pedro Silva (Filho)']
    },
    {
      id: 2,
      name: 'João Pedro Costa',
      photo: null,
      email: 'joao.costa@email.com',
      phone: '(11) 91234-5678',
      address: 'Av. Paulista, 456 - São Paulo, SP',
      birthdate: '1990-07-22',
      baptismDate: '2015-08-10',
      memberSince: '2015-08-10',
      status: 'active',
      ministry: ['Jovens', 'Evangelismo'],
      attendance: 88,
      lastVisit: '2025-10-03',
      cellGroup: 'Grupo Jovem',
      maritalStatus: 'Solteiro',
      occupation: 'Engenheiro',
      notes: 'Líder do ministério de jovens. Muito ativo nas atividades.',
      familyMembers: []
    },
    {
      id: 3,
      name: 'Ana Paula Oliveira',
      photo: null,
      email: 'ana.oliveira@email.com',
      phone: '(11) 99876-5432',
      address: 'Rua da Esperança, 789 - São Paulo, SP',
      birthdate: '1978-11-05',
      baptismDate: '2005-03-12',
      memberSince: '2005-03-12',
      status: 'active',
      ministry: ['Crianças', 'Escola Bíblica'],
      attendance: 95,
      lastVisit: '2025-10-04',
      cellGroup: 'Grupo Família',
      maritalStatus: 'Casada',
      occupation: 'Pedagoga',
      notes: 'Coordenadora do ministério infantil. Dedicada e amorosa.',
      familyMembers: ['Carlos Oliveira (Esposo)', 'Lucas Oliveira (Filho)', 'Julia Oliveira (Filha)']
    },
    {
      id: 4,
      name: 'Carlos Mendes',
      photo: null,
      email: 'carlos.mendes@email.com',
      phone: '(11) 98888-7777',
      address: 'Rua do Comércio, 321 - São Paulo, SP',
      birthdate: '1982-04-18',
      baptismDate: '2012-09-15',
      memberSince: '2012-09-15',
      status: 'active',
      ministry: ['Diácono', 'Finanças'],
      attendance: 85,
      lastVisit: '2025-09-29',
      cellGroup: 'Grupo dos Homens',
      maritalStatus: 'Casado',
      occupation: 'Contador',
      notes: 'Diácono responsável pelas finanças da igreja.',
      familyMembers: ['Patricia Mendes (Esposa)']
    },
    {
      id: 5,
      name: 'Fernanda Lima',
      photo: null,
      email: 'fernanda.lima@email.com',
      phone: '(11) 97777-6666',
      address: 'Av. Brasil, 654 - São Paulo, SP',
      birthdate: '1995-09-30',
      baptismDate: '2018-04-22',
      memberSince: '2018-04-22',
      status: 'active',
      ministry: ['Mídia', 'Comunicação'],
      attendance: 78,
      lastVisit: '2025-10-02',
      cellGroup: 'Grupo Jovem',
      maritalStatus: 'Solteira',
      occupation: 'Designer',
      notes: 'Responsável pelas redes sociais e design da igreja.',
      familyMembers: []
    },
    {
      id: 6,
      name: 'Roberto Alves',
      photo: null,
      email: 'roberto.alves@email.com',
      phone: '(11) 96666-5555',
      address: 'Rua Santos, 987 - São Paulo, SP',
      birthdate: '1970-12-10',
      baptismDate: '2000-05-08',
      memberSince: '2000-05-08',
      status: 'inactive',
      ministry: ['Portaria'],
      attendance: 45,
      lastVisit: '2025-08-15',
      cellGroup: 'Grupo da Maturidade',
      maritalStatus: 'Viúvo',
      occupation: 'Aposentado',
      notes: 'Precisa de acompanhamento pastoral. Ausente há 2 meses.',
      familyMembers: []
    },
    {
      id: 7,
      name: 'Juliana Rodrigues',
      photo: null,
      email: 'juliana.rodrigues@email.com',
      phone: '(11) 95555-4444',
      address: 'Rua Nova, 147 - São Paulo, SP',
      birthdate: '2000-06-25',
      baptismDate: null,
      memberSince: '2025-09-01',
      status: 'visitor',
      ministry: [],
      attendance: 0,
      lastVisit: '2025-10-01',
      cellGroup: null,
      maritalStatus: 'Solteira',
      occupation: 'Estudante',
      notes: 'Visitante nova. Mostrou interesse em conhecer mais sobre a igreja.',
      familyMembers: []
    },
    {
      id: 8,
      name: 'Paulo Henrique',
      photo: null,
      email: 'paulo.henrique@email.com',
      phone: '(11) 94444-3333',
      address: 'Av. Independência, 258 - São Paulo, SP',
      birthdate: '1988-02-14',
      baptismDate: '2020-11-22',
      memberSince: '2019-10-10',
      status: 'active',
      ministry: ['Segurança', 'Estacionamento'],
      attendance: 90,
      lastVisit: '2025-10-03',
      cellGroup: 'Grupo dos Homens',
      maritalStatus: 'Casado',
      occupation: 'Policial',
      notes: 'Coordenador da equipe de segurança e estacionamento.',
      familyMembers: ['Mariana Henrique (Esposa)', 'Gabriel Henrique (Filho)']
    },
  ];

  const stats = [
    {
      title: 'Total de Membros',
      value: members.filter(m => m.status === 'active').length,
      icon: Users,
      color: 'bg-blue-50 text-blue-600',
      change: '+5 este mês'
    },
    {
      title: 'Visitantes',
      value: members.filter(m => m.status === 'visitor').length,
      icon: UserPlus,
      color: 'bg-green-50 text-green-600',
      change: '3 novos'
    },
    {
      title: 'Aniversariantes',
      value: 8,
      icon: Cake,
      color: 'bg-pink-50 text-pink-600',
      change: 'Este mês'
    },
    {
      title: 'Frequência Média',
      value: '87%',
      icon: TrendingUp,
      color: 'bg-purple-50 text-purple-600',
      change: '+3% vs mês anterior'
    },
  ];

  const getStatusBadge = (status) => {
    const badges = {
      active: { text: 'Ativo', color: 'bg-green-100 text-green-700' },
      inactive: { text: 'Inativo', color: 'bg-red-100 text-red-700' },
      visitor: { text: 'Visitante', color: 'bg-blue-100 text-blue-700' },
      newConvert: { text: 'Novo Convertido', color: 'bg-yellow-100 text-yellow-700' },
    };
    return badges[status] || badges.active;
  };

  const calculateAge = (birthdate) => {
    const today = new Date();
    const birth = new Date(birthdate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  };

  const filteredMembers = activeTab === 'all' 
    ? members 
    : activeTab === 'visitors'
    ? members.filter(m => m.status === 'visitor')
    : activeTab === 'inactive'
    ? members.filter(m => m.status === 'inactive')
    : members.filter(m => m.status === 'active');

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <Users className="text-indigo-600" size={28} />
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Gestão de Membros</h1>
                <p className="text-sm text-gray-500">Gerencie membros, visitantes e acompanhamento pastoral</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors shadow-sm">
                <Plus size={18} />
                <span className="font-medium">Novo Membro</span>
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <Download size={20} className="text-gray-600" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <Settings size={20} className="text-gray-600" />
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
            {stats.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <div key={idx} className="bg-gradient-to-br from-white to-gray-50 rounded-lg p-4 border border-gray-200 shadow-sm">
                  <div className="flex items-center justify-between mb-2">
                    <div className={`p-2 rounded-lg ${stat.color}`}>
                      <Icon size={20} />
                    </div>
                    <span className="text-xs text-gray-500">{stat.change}</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800">{stat.value}</h3>
                  <p className="text-sm text-gray-600">{stat.title}</p>
                </div>
              );
            })}
          </div>

          {/* Tabs and Filters */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-lg">
              <button
                onClick={() => setActiveTab('all')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === 'all'
                    ? 'bg-white text-gray-800 shadow-sm'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                Todos ({members.length})
              </button>
              <button
                onClick={() => setActiveTab('active')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === 'active'
                    ? 'bg-white text-gray-800 shadow-sm'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                Ativos ({members.filter(m => m.status === 'active').length})
              </button>
              <button
                onClick={() => setActiveTab('visitors')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === 'visitors'
                    ? 'bg-white text-gray-800 shadow-sm'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                Visitantes ({members.filter(m => m.status === 'visitor').length})
              </button>
              <button
                onClick={() => setActiveTab('inactive')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === 'inactive'
                    ? 'bg-white text-gray-800 shadow-sm'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                Inativos ({members.filter(m => m.status === 'inactive').length})
              </button>
            </div>

            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  placeholder="Buscar membros..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 w-64"
                />
              </div>
              <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <Filter size={18} />
                <span>Filtros</span>
              </button>
              <div className="flex gap-1 bg-gray-100 p-1 rounded-lg">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded ${viewMode === 'grid' ? 'bg-white shadow-sm' : ''}`}
                >
                  <div className="w-4 h-4 grid grid-cols-2 gap-0.5">
                    <div className="bg-gray-600 rounded-sm"></div>
                    <div className="bg-gray-600 rounded-sm"></div>
                    <div className="bg-gray-600 rounded-sm"></div>
                    <div className="bg-gray-600 rounded-sm"></div>
                  </div>
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded ${viewMode === 'list' ? 'bg-white shadow-sm' : ''}`}
                >
                  <div className="w-4 h-4 flex flex-col gap-1">
                    <div className="h-1 bg-gray-600 rounded"></div>
                    <div className="h-1 bg-gray-600 rounded"></div>
                    <div className="h-1 bg-gray-600 rounded"></div>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto p-6">
        {/* Grid View */}
        {viewMode === 'grid' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredMembers.map((member) => {
              const statusBadge = getStatusBadge(member.status);
              return (
                <div
                  key={member.id}
                  className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 hover:shadow-md transition-all cursor-pointer"
                  onClick={() => {
                    setSelectedMember(member);
                    setShowModal(true);
                  }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-indigo-400 to-indigo-600 rounded-full flex items-center justify-center text-white text-xl font-bold">
                      {member.name.split(' ').map(n => n[0]).slice(0, 2).join('')}
                    </div>
                    <button className="p-1 hover:bg-gray-100 rounded transition-colors">
                      <MoreVertical size={18} className="text-gray-400" />
                    </button>
                  </div>

                  <h3 className="font-semibold text-gray-800 mb-1">{member.name}</h3>
                  <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium mb-3 ${statusBadge.color}`}>
                    {statusBadge.text}
                  </span>

                  <div className="space-y-2 text-sm text-gray-600 mb-4">
                    <div className="flex items-center gap-2">
                      <Mail size={14} />
                      <span className="truncate">{member.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone size={14} />
                      <span>{member.phone}</span>
                    </div>
                    {member.ministry.length > 0 && (
                      <div className="flex items-center gap-2">
                        <Award size={14} />
                        <span className="truncate">{member.ministry.join(', ')}</span>
                      </div>
                    )}
                  </div>

                  {member.status === 'active' && (
                    <div className="pt-3 border-t border-gray-200">
                      <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                        <span>Frequência</span>
                        <span className="font-medium">{member.attendance}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1.5">
                        <div
                          className="bg-indigo-500 h-1.5 rounded-full transition-all"
                          style={{ width: `${member.attendance}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* List View */}
        {viewMode === 'list' && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Nome</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Contato</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Status</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Ministérios</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Frequência</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Última Visita</th>
                    <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredMembers.map((member) => {
                    const statusBadge = getStatusBadge(member.status);
                    return (
                      <tr key={member.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-indigo-400 to-indigo-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                              {member.name.split(' ').map(n => n[0]).slice(0, 2).join('')}
                            </div>
                            <div>
                              <p className="font-medium text-gray-800">{member.name}</p>
                              <p className="text-sm text-gray-500">{calculateAge(member.birthdate)} anos</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-600">
                            <p className="flex items-center gap-1">
                              <Mail size={12} />
                              {member.email}
                            </p>
                            <p className="flex items-center gap-1 mt-1">
                              <Phone size={12} />
                              {member.phone}
                            </p>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${statusBadge.color}`}>
                            {statusBadge.text}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex flex-wrap gap-1">
                            {member.ministry.slice(0, 2).map((min, idx) => (
                              <span key={idx} className="px-2 py-1 bg-purple-100 text-purple-700 rounded text-xs">
                                {min}
                              </span>
                            ))}
                            {member.ministry.length > 2 && (
                              <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                                +{member.ministry.length - 2}
                              </span>
                            )}
                            {member.ministry.length === 0 && (
                              <span className="text-sm text-gray-400">Nenhum</span>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          {member.status === 'active' ? (
                            <div className="flex items-center gap-2">
                              <div className="flex-1 bg-gray-200 rounded-full h-2 w-16">
                                <div
                                  className="bg-indigo-500 h-2 rounded-full"
                                  style={{ width: `${member.attendance}%` }}
                                ></div>
                              </div>
                              <span className="text-sm font-medium text-gray-700">{member.attendance}%</span>
                            </div>
                          ) : (
                            <span className="text-sm text-gray-400">-</span>
                          )}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                          {new Date(member.lastVisit).toLocaleDateString('pt-BR')}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-center gap-2">
                            <button 
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedMember(member);
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
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Member Detail Modal */}
      {showModal && selectedMember && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
            <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-indigo-50 to-blue-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 bg-gradient-to-br from-indigo-400 to-indigo-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                    {selectedMember.name.split(' ').map(n => n[0]).slice(0, 2).join('')}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800">{selectedMember.name}</h2>
                    <div className="flex items-center gap-2 mt-1">
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getStatusBadge(selectedMember.status).color}`}>
                        {getStatusBadge(selectedMember.status).text}
                      </span>
                      <span className="text-sm text-gray-600">
                        Membro desde {new Date(selectedMember.memberSince).toLocaleDateString('pt-BR')}
                      </span>
                    </div>
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
                {/* Contact Information */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                    <Phone size={16} />
                    Informações de Contato
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Mail size={14} />
                      <span>{selectedMember.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Phone size={14} />
                      <span>{selectedMember.phone}</span>
                    </div>
                    <div className="flex items-start gap-2 text-gray-600">
                      <MapPin size={14} className="mt-0.5" />
                      <span>{selectedMember.address}</span>
                    </div>
                  </div>
                </div>

                {/* Personal Information */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                    <User size={16} />
                    Informações Pessoais
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Idade:</span>
                      <span className="font-medium text-gray-800">{calculateAge(selectedMember.birthdate)} anos</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Data de Nascimento:</span>
                      <span className="font-medium text-gray-800">{new Date(selectedMember.birthdate).toLocaleDateString('pt-BR')}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Estado Civil:</span>
                      <span className="font-medium text-gray-800">{selectedMember.maritalStatus}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Ocupação:</span>
                      <span className="font-medium text-gray-800">{selectedMember.occupation}</span>
                    </div>
                  </div>
                </div>

                {/* Spiritual Information */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                    <BookOpen size={16} />
                    Vida Espiritual
                  </h3>
                  <div className="space-y-2 text-sm">
                    {selectedMember.baptismDate ? (
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Batismo:</span>
                        <span className="font-medium text-gray-800">{new Date(selectedMember.baptismDate).toLocaleDateString('pt-BR')}</span>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Batismo:</span>
                        <span className="font-medium text-orange-600">Não batizado</span>
                      </div>
                    )}
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Célula:</span>
                      <span className="font-medium text-gray-800">{selectedMember.cellGroup || 'Sem célula'}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Última Visita:</span>
                      <span className="font-medium text-gray-800">{new Date(selectedMember.lastVisit).toLocaleDateString('pt-BR')}</span>
                    </div>
                    {selectedMember.status === 'active' && (
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Frequência:</span>
                        <span className="font-medium text-gray-800">{selectedMember.attendance}%</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Ministry Information */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                    <Award size={16} />
                    Ministérios
                  </h3>
                  {selectedMember.ministry.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {selectedMember.ministry.map((min, idx) => (
                        <span key={idx} className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
                          {min}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500">Não participa de nenhum ministério</p>
                  )}
                </div>
              </div>

              {/* Family Members */}
              {selectedMember.familyMembers.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                    <Home size={16} />
                    Família
                  </h3>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="space-y-2">
                      {selectedMember.familyMembers.map((family, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-sm text-gray-700">
                          <Users size={14} className="text-indigo-500" />
                          <span>{family}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Notes */}
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                  <AlertCircle size={16} />
                  Observações Pastorais
                </h3>
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <p className="text-sm text-gray-700">{selectedMember.notes}</p>
                </div>
              </div>

              {/* Frequency Chart */}
              {selectedMember.status === 'active' && (
                <div>
                  <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                    <TrendingUp size={16} />
                    Frequência nos Últimos Meses
                  </h3>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-end justify-between gap-2 h-32">
                      {[85, 90, 88, 92, 87, 95].map((freq, idx) => (
                        <div key={idx} className="flex-1 flex flex-col items-center gap-2">
                          <div className="w-full bg-gray-200 rounded-t relative" style={{ height: '100px' }}>
                            <div
                              className="absolute bottom-0 w-full bg-indigo-500 rounded-t hover:bg-indigo-600 transition-colors"
                              style={{ height: `${freq}%` }}
                            ></div>
                          </div>
                          <span className="text-xs text-gray-600">
                            {['Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov'][idx]}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Action Suggestions for Inactive/Visitors */}
              {(selectedMember.status === 'inactive' || selectedMember.status === 'visitor') && (
                <div className="mt-6">
                  <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                    <Heart size={16} />
                    Ações Sugeridas
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <button className="flex items-center gap-2 p-3 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg transition-colors text-sm">
                      <Phone size={16} />
                      <span>Fazer Contato Telefônico</span>
                    </button>
                    <button className="flex items-center gap-2 p-3 bg-green-50 hover:bg-green-100 text-green-700 rounded-lg transition-colors text-sm">
                      <Home size={16} />
                      <span>Agendar Visita Pastoral</span>
                    </button>
                    <button className="flex items-center gap-2 p-3 bg-purple-50 hover:bg-purple-100 text-purple-700 rounded-lg transition-colors text-sm">
                      <Heart size={16} />
                      <span>Adicionar à Lista de Oração</span>
                    </button>
                    <button className="flex items-center gap-2 p-3 bg-pink-50 hover:bg-pink-100 text-pink-700 rounded-lg transition-colors text-sm">
                      <Gift size={16} />
                      <span>Enviar Mensagem de Incentivo</span>
                    </button>
                  </div>
                </div>
              )}
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
                  <Mail size={18} />
                  Enviar Email
                </button>
                <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium flex items-center gap-2">
                  <Phone size={18} />
                  Ligar
                </button>
                <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium flex items-center gap-2">
                  <Edit size={18} />
                  Editar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Members;