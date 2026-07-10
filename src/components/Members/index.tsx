import { useState } from 'react';
import {
  Users, Plus, Search, Filter, Download, Mail, Phone,
  MapPin, Award, TrendingUp, Eye, Edit, Trash2,
  UserPlus, Gift, BookOpen, AlertCircle, Cake, Home
} from 'lucide-react';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { Card } from '../ui/Card';
import { Modal } from '../ui/Modal';

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
      tone: 'accent',
      change: '+5 este mês'
    },
    {
      title: 'Visitantes',
      value: members.filter(m => m.status === 'visitor').length,
      icon: UserPlus,
      tone: 'success',
      change: '3 novos'
    },
    {
      title: 'Aniversariantes',
      value: 8,
      icon: Cake,
      tone: 'danger',
      change: 'Este mês'
    },
    {
      title: 'Frequência Média',
      value: '87%',
      icon: TrendingUp,
      tone: 'warning',
      change: '+3% vs mês anterior'
    },
  ];

  const statToneClasses = {
    accent: 'bg-accent-soft text-accent-hover dark:text-ink',
    success: 'bg-success-soft text-success',
    warning: 'bg-warning-soft text-warning',
    danger: 'bg-danger-soft text-danger',
  };

  const getStatusBadge = (status) => {
    const badges = {
      active: { text: 'Ativo', tone: 'success' },
      inactive: { text: 'Inativo', tone: 'danger' },
      visitor: { text: 'Visitante', tone: 'accent' },
      newConvert: { text: 'Novo Convertido', tone: 'warning' },
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
    <div className="flex-1 flex flex-col overflow-hidden bg-bg">
      {/* Header */}
      <header className="bg-surface border-b border-border">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Users className="text-accent" size={24} />
              <div>
                <h1 className="text-lg font-semibold text-ink">Gestão de Membros</h1>
                <p className="text-sm text-ink-faint">Gerencie membros, visitantes e acompanhamento pastoral</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button size="sm">
                <Plus size={16} />
                Novo Membro
              </Button>
              <button className="p-2 hover:bg-surface-hover rounded-md transition-colors">
                <Download size={18} className="text-ink-muted" />
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-4">
            {stats.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <Card key={idx} className="p-3">
                  <div className="flex items-center justify-between mb-2">
                    <div className={`p-1.5 rounded-md ${statToneClasses[stat.tone]}`}>
                      <Icon size={16} />
                    </div>
                    <span className="text-xs text-ink-faint">{stat.change}</span>
                  </div>
                  <h3 className="text-xl font-semibold text-ink">{stat.value}</h3>
                  <p className="text-sm text-ink-muted">{stat.title}</p>
                </Card>
              );
            })}
          </div>

          {/* Tabs and Filters */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1 bg-bg border border-border p-1 rounded-md">
              {[
                { id: 'all', label: `Todos (${members.length})` },
                { id: 'active', label: `Ativos (${members.filter(m => m.status === 'active').length})` },
                { id: 'visitors', label: `Visitantes (${members.filter(m => m.status === 'visitor').length})` },
                { id: 'inactive', label: `Inativos (${members.filter(m => m.status === 'inactive').length})` },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'bg-surface text-ink shadow-sm'
                      : 'text-ink-muted hover:text-ink'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-ink-faint" size={16} />
                <input
                  type="text"
                  placeholder="Buscar membros..."
                  className="pl-9 pr-3 py-1.5 text-sm border border-border rounded-md bg-bg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent w-56 text-ink placeholder:text-ink-faint"
                />
              </div>
              <Button variant="secondary" size="sm">
                <Filter size={16} />
                Filtros
              </Button>
              <div className="flex gap-1 bg-bg border border-border p-1 rounded-md">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-1.5 rounded ${viewMode === 'grid' ? 'bg-surface shadow-sm' : ''}`}
                >
                  <div className="w-4 h-4 grid grid-cols-2 gap-0.5">
                    <div className="bg-ink-muted rounded-sm"></div>
                    <div className="bg-ink-muted rounded-sm"></div>
                    <div className="bg-ink-muted rounded-sm"></div>
                    <div className="bg-ink-muted rounded-sm"></div>
                  </div>
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-1.5 rounded ${viewMode === 'list' ? 'bg-surface shadow-sm' : ''}`}
                >
                  <div className="w-4 h-4 flex flex-col gap-1">
                    <div className="h-0.5 bg-ink-muted rounded"></div>
                    <div className="h-0.5 bg-ink-muted rounded"></div>
                    <div className="h-0.5 bg-ink-muted rounded"></div>
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
                <Card
                  key={member.id}
                  className="p-4"
                  hoverable
                  onClick={() => {
                    setSelectedMember(member);
                    setShowModal(true);
                  }}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="w-12 h-12 bg-accent text-accent-foreground rounded-full flex items-center justify-center text-sm font-semibold">
                      {member.name.split(' ').map(n => n[0]).slice(0, 2).join('')}
                    </div>
                  </div>

                  <h3 className="font-medium text-ink mb-1 text-sm">{member.name}</h3>
                  <Badge tone={statusBadge.tone} className="mb-3">{statusBadge.text}</Badge>

                  <div className="space-y-1.5 text-sm text-ink-muted mb-3">
                    <div className="flex items-center gap-2">
                      <Mail size={13} />
                      <span className="truncate">{member.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone size={13} />
                      <span>{member.phone}</span>
                    </div>
                    {member.ministry.length > 0 && (
                      <div className="flex items-center gap-2">
                        <Award size={13} />
                        <span className="truncate">{member.ministry.join(', ')}</span>
                      </div>
                    )}
                  </div>

                  {member.status === 'active' && (
                    <div className="pt-2.5 border-t border-border">
                      <div className="flex items-center justify-between text-xs text-ink-faint mb-1">
                        <span>Frequência</span>
                        <span className="font-medium">{member.attendance}%</span>
                      </div>
                      <div className="w-full bg-bg rounded-full h-1.5">
                        <div
                          className="bg-accent h-1.5 rounded-full transition-all"
                          style={{ width: `${member.attendance}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                </Card>
              );
            })}
          </div>
        )}

        {/* List View */}
        {viewMode === 'list' && (
          <Card className="overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-bg border-b border-border">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-ink-faint uppercase">Nome</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-ink-faint uppercase">Contato</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-ink-faint uppercase">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-ink-faint uppercase">Ministérios</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-ink-faint uppercase">Frequência</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-ink-faint uppercase">Última Visita</th>
                    <th className="px-6 py-3 text-center text-xs font-semibold text-ink-faint uppercase">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {filteredMembers.map((member) => {
                    const statusBadge = getStatusBadge(member.status);
                    return (
                      <tr key={member.id} className="hover:bg-surface-hover transition-colors">
                        <td className="px-6 py-3.5">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 bg-accent text-accent-foreground rounded-full flex items-center justify-center text-xs font-semibold">
                              {member.name.split(' ').map(n => n[0]).slice(0, 2).join('')}
                            </div>
                            <div>
                              <p className="font-medium text-ink text-sm">{member.name}</p>
                              <p className="text-xs text-ink-faint">{calculateAge(member.birthdate)} anos</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-3.5">
                          <div className="text-sm text-ink-muted">
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
                        <td className="px-6 py-3.5">
                          <Badge tone={statusBadge.tone}>{statusBadge.text}</Badge>
                        </td>
                        <td className="px-6 py-3.5">
                          <div className="flex flex-wrap gap-1">
                            {member.ministry.slice(0, 2).map((min, idx) => (
                              <Badge key={idx} tone="accent">{min}</Badge>
                            ))}
                            {member.ministry.length > 2 && (
                              <Badge tone="neutral">+{member.ministry.length - 2}</Badge>
                            )}
                            {member.ministry.length === 0 && (
                              <span className="text-sm text-ink-faint">Nenhum</span>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-3.5">
                          {member.status === 'active' ? (
                            <div className="flex items-center gap-2">
                              <div className="flex-1 bg-bg rounded-full h-1.5 w-16">
                                <div
                                  className="bg-accent h-1.5 rounded-full"
                                  style={{ width: `${member.attendance}%` }}
                                ></div>
                              </div>
                              <span className="text-sm font-medium text-ink-muted">{member.attendance}%</span>
                            </div>
                          ) : (
                            <span className="text-sm text-ink-faint">-</span>
                          )}
                        </td>
                        <td className="px-6 py-3.5 text-sm text-ink-muted">
                          {new Date(member.lastVisit).toLocaleDateString('pt-BR')}
                        </td>
                        <td className="px-6 py-3.5">
                          <div className="flex items-center justify-center gap-1">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedMember(member);
                                setShowModal(true);
                              }}
                              className="p-1.5 hover:bg-surface-hover rounded-md transition-colors"
                              title="Visualizar"
                            >
                              <Eye size={15} className="text-ink-muted" />
                            </button>
                            <button className="p-1.5 hover:bg-surface-hover rounded-md transition-colors" title="Editar">
                              <Edit size={15} className="text-ink-muted" />
                            </button>
                            <button className="p-1.5 hover:bg-danger-soft rounded-md transition-colors" title="Excluir">
                              <Trash2 size={15} className="text-danger" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </Card>
        )}
      </div>

      {/* Member Detail Modal */}
      <Modal open={showModal && !!selectedMember} onClose={() => setShowModal(false)} maxWidth="max-w-4xl">
        {selectedMember && (
          <>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-accent text-accent-foreground rounded-full flex items-center justify-center text-xl font-semibold">
                {selectedMember.name.split(' ').map(n => n[0]).slice(0, 2).join('')}
              </div>
              <div>
                <h2 className="text-lg font-semibold text-ink">{selectedMember.name}</h2>
                <div className="flex items-center gap-2 mt-1">
                  <Badge tone={getStatusBadge(selectedMember.status).tone}>{getStatusBadge(selectedMember.status).text}</Badge>
                  <span className="text-sm text-ink-muted">
                    Membro desde {new Date(selectedMember.memberSince).toLocaleDateString('pt-BR')}
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {/* Contact Information */}
              <div className="bg-bg border border-border rounded-md p-4">
                <h3 className="text-sm font-semibold text-ink mb-3 flex items-center gap-2">
                  <Phone size={15} />
                  Informações de Contato
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-ink-muted">
                    <Mail size={13} />
                    <span>{selectedMember.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-ink-muted">
                    <Phone size={13} />
                    <span>{selectedMember.phone}</span>
                  </div>
                  <div className="flex items-start gap-2 text-ink-muted">
                    <MapPin size={13} className="mt-0.5" />
                    <span>{selectedMember.address}</span>
                  </div>
                </div>
              </div>

              {/* Personal Information */}
              <div className="bg-bg border border-border rounded-md p-4">
                <h3 className="text-sm font-semibold text-ink mb-3 flex items-center gap-2">
                  <Users size={15} />
                  Informações Pessoais
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-ink-muted">Idade:</span>
                    <span className="font-medium text-ink">{calculateAge(selectedMember.birthdate)} anos</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-ink-muted">Data de Nascimento:</span>
                    <span className="font-medium text-ink">{new Date(selectedMember.birthdate).toLocaleDateString('pt-BR')}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-ink-muted">Estado Civil:</span>
                    <span className="font-medium text-ink">{selectedMember.maritalStatus}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-ink-muted">Ocupação:</span>
                    <span className="font-medium text-ink">{selectedMember.occupation}</span>
                  </div>
                </div>
              </div>

              {/* Spiritual Information */}
              <div className="bg-bg border border-border rounded-md p-4">
                <h3 className="text-sm font-semibold text-ink mb-3 flex items-center gap-2">
                  <BookOpen size={15} />
                  Vida Espiritual
                </h3>
                <div className="space-y-2 text-sm">
                  {selectedMember.baptismDate ? (
                    <div className="flex items-center justify-between">
                      <span className="text-ink-muted">Batismo:</span>
                      <span className="font-medium text-ink">{new Date(selectedMember.baptismDate).toLocaleDateString('pt-BR')}</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between">
                      <span className="text-ink-muted">Batismo:</span>
                      <span className="font-medium text-warning">Não batizado</span>
                    </div>
                  )}
                  <div className="flex items-center justify-between">
                    <span className="text-ink-muted">Célula:</span>
                    <span className="font-medium text-ink">{selectedMember.cellGroup || 'Sem célula'}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-ink-muted">Última Visita:</span>
                    <span className="font-medium text-ink">{new Date(selectedMember.lastVisit).toLocaleDateString('pt-BR')}</span>
                  </div>
                  {selectedMember.status === 'active' && (
                    <div className="flex items-center justify-between">
                      <span className="text-ink-muted">Frequência:</span>
                      <span className="font-medium text-ink">{selectedMember.attendance}%</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Ministry Information */}
              <div className="bg-bg border border-border rounded-md p-4">
                <h3 className="text-sm font-semibold text-ink mb-3 flex items-center gap-2">
                  <Award size={15} />
                  Ministérios
                </h3>
                {selectedMember.ministry.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {selectedMember.ministry.map((min, idx) => (
                      <Badge key={idx} tone="accent">{min}</Badge>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-ink-faint">Não participa de nenhum ministério</p>
                )}
              </div>
            </div>

            {/* Family Members */}
            {selectedMember.familyMembers.length > 0 && (
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-ink mb-3 flex items-center gap-2">
                  <Home size={15} />
                  Família
                </h3>
                <div className="bg-bg border border-border rounded-md p-4">
                  <div className="space-y-2">
                    {selectedMember.familyMembers.map((family, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-sm text-ink">
                        <Users size={13} className="text-accent" />
                        <span>{family}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Notes */}
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-ink mb-3 flex items-center gap-2">
                <AlertCircle size={15} />
                Observações Pastorais
              </h3>
              <div className="bg-warning-soft border border-border rounded-md p-4">
                <p className="text-sm text-ink">{selectedMember.notes}</p>
              </div>
            </div>

            {/* Frequency Chart */}
            {selectedMember.status === 'active' && (
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-ink mb-3 flex items-center gap-2">
                  <TrendingUp size={15} />
                  Frequência nos Últimos Meses
                </h3>
                <div className="bg-bg border border-border rounded-md p-4">
                  <div className="flex items-end justify-between gap-2 h-32">
                    {[85, 90, 88, 92, 87, 95].map((freq, idx) => (
                      <div key={idx} className="flex-1 flex flex-col items-center gap-2">
                        <div className="w-full bg-surface-hover rounded-t relative" style={{ height: '100px' }}>
                          <div
                            className="absolute bottom-0 w-full bg-accent rounded-t"
                            style={{ height: `${freq}%` }}
                          ></div>
                        </div>
                        <span className="text-xs text-ink-faint">
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
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-ink mb-3 flex items-center gap-2">
                  <AlertCircle size={15} />
                  Ações Sugeridas
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  <button className="flex items-center gap-2 p-2.5 bg-accent-soft text-accent-hover dark:text-ink rounded-md text-sm hover:opacity-80 transition-opacity">
                    <Phone size={15} />
                    <span>Fazer Contato Telefônico</span>
                  </button>
                  <button className="flex items-center gap-2 p-2.5 bg-success-soft text-success rounded-md text-sm hover:opacity-80 transition-opacity">
                    <Home size={15} />
                    <span>Agendar Visita Pastoral</span>
                  </button>
                  <button className="flex items-center gap-2 p-2.5 bg-danger-soft text-danger rounded-md text-sm hover:opacity-80 transition-opacity">
                    <Award size={15} />
                    <span>Adicionar à Lista de Oração</span>
                  </button>
                  <button className="flex items-center gap-2 p-2.5 bg-warning-soft text-warning rounded-md text-sm hover:opacity-80 transition-opacity">
                    <Gift size={15} />
                    <span>Enviar Mensagem de Incentivo</span>
                  </button>
                </div>
              </div>
            )}

            <div className="flex gap-2 pt-4 border-t border-border">
              <Button variant="secondary" className="flex-1" onClick={() => setShowModal(false)}>
                Fechar
              </Button>
              <Button variant="secondary">
                <Mail size={16} />
                Email
              </Button>
              <Button variant="secondary">
                <Phone size={16} />
                Ligar
              </Button>
              <Button>
                <Edit size={16} />
                Editar
              </Button>
            </div>
          </>
        )}
      </Modal>
    </div>
  );
};

export default Members;
