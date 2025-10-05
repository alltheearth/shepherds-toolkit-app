import React, { useState } from 'react';
import { 
  Calendar as CalendaR, Plus, Search, Filter, Download, Settings, Clock,
  MapPin, Users, ChevronLeft, ChevronRight, MoreVertical, Edit,
  Trash2, X, Bell, Repeat, Video, Coffee, BookOpen, Heart,
  Mic, Baby, GraduationCap, Music, Briefcase, Home, AlertCircle
} from 'lucide-react';

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 9, 4)); // October 4, 2025
  const [viewMode, setViewMode] = useState('month');
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showNewEventModal, setShowNewEventModal] = useState(false);

  const events = [
    {
      id: 1,
      title: 'Culto de Celebração',
      date: '2025-10-05',
      startTime: '10:00',
      endTime: '12:00',
      location: 'Templo Principal',
      type: 'worship',
      description: 'Culto dominical de celebração com Santa Ceia',
      attendees: 450,
      responsible: 'Pr. João',
      reminder: '30 minutos antes',
      recurring: 'weekly',
      color: 'bg-purple-500'
    },
    {
      id: 2,
      title: 'Reunião de Liderança',
      date: '2025-10-07',
      startTime: '19:00',
      endTime: '21:00',
      location: 'Sala de Reuniões',
      type: 'meeting',
      description: 'Planejamento estratégico do trimestre',
      attendees: 15,
      responsible: 'Pr. João',
      reminder: '1 hora antes',
      recurring: 'monthly',
      color: 'bg-blue-500'
    },
    {
      id: 3,
      title: 'Estudo Bíblico',
      date: '2025-10-08',
      startTime: '20:00',
      endTime: '21:30',
      location: 'Templo Principal',
      type: 'study',
      description: 'Estudo no livro de Romanos - Capítulo 8',
      attendees: 120,
      responsible: 'Pr. Marcos',
      reminder: '30 minutos antes',
      recurring: 'weekly',
      color: 'bg-green-500'
    },
    {
      id: 4,
      title: 'Ensaio do Coral',
      date: '2025-10-09',
      startTime: '19:30',
      endTime: '21:00',
      location: 'Sala de Música',
      type: 'music',
      description: 'Preparação para o culto especial',
      attendees: 35,
      responsible: 'Irmã Maria',
      reminder: '1 hora antes',
      recurring: 'weekly',
      color: 'bg-pink-500'
    },
    {
      id: 5,
      title: 'Célula - Grupo Jovem',
      date: '2025-10-10',
      startTime: '19:00',
      endTime: '21:00',
      location: 'Casa do João',
      type: 'cell',
      description: 'Encontro semanal do grupo de jovens',
      attendees: 18,
      responsible: 'João Pedro',
      reminder: '30 minutos antes',
      recurring: 'weekly',
      color: 'bg-orange-500'
    },
    {
      id: 6,
      title: 'Ministério Infantil',
      date: '2025-10-12',
      startTime: '09:00',
      endTime: '11:00',
      location: 'Sala das Crianças',
      type: 'children',
      description: 'Culto infantil dominical',
      attendees: 80,
      responsible: 'Ana Paula',
      reminder: '1 hora antes',
      recurring: 'weekly',
      color: 'bg-yellow-500'
    },
    {
      id: 7,
      title: 'Culto de Oração',
      date: '2025-10-14',
      startTime: '19:00',
      endTime: '20:30',
      location: 'Templo Principal',
      type: 'prayer',
      description: 'Vigília de oração e intercessão',
      attendees: 90,
      responsible: 'Ministério de Oração',
      reminder: '30 minutos antes',
      recurring: 'weekly',
      color: 'bg-red-500'
    },
    {
      id: 8,
      title: 'Café Pastoral',
      date: '2025-10-16',
      startTime: '08:00',
      endTime: '09:30',
      location: 'Casa Pastoral',
      type: 'fellowship',
      description: 'Café da manhã com novos membros',
      attendees: 12,
      responsible: 'Pr. João',
      reminder: '1 hora antes',
      recurring: 'none',
      color: 'bg-amber-500'
    },
    {
      id: 9,
      title: 'Culto de Domingo',
      date: '2025-10-12',
      startTime: '10:00',
      endTime: '12:00',
      location: 'Templo Principal',
      type: 'worship',
      description: 'Culto dominical com pregação',
      attendees: 480,
      responsible: 'Pr. João',
      reminder: '30 minutos antes',
      recurring: 'weekly',
      color: 'bg-purple-500'
    },
    {
      id: 10,
      title: 'Reunião de Diáconos',
      date: '2025-10-15',
      startTime: '19:30',
      endTime: '21:00',
      location: 'Sala de Reuniões',
      type: 'meeting',
      description: 'Reunião administrativa mensal',
      attendees: 8,
      responsible: 'Diácono Pedro',
      reminder: '1 hora antes',
      recurring: 'monthly',
      color: 'bg-blue-500'
    },
  ];

  const eventTypes = [
    { id: 'worship', name: 'Culto', icon: Music, color: 'bg-purple-500' },
    { id: 'meeting', name: 'Reunião', icon: Briefcase, color: 'bg-blue-500' },
    { id: 'study', name: 'Estudo Bíblico', icon: BookOpen, color: 'bg-green-500' },
    { id: 'prayer', name: 'Oração', icon: Heart, color: 'bg-red-500' },
    { id: 'music', name: 'Música', icon: Mic, color: 'bg-pink-500' },
    { id: 'children', name: 'Infantil', icon: Baby, color: 'bg-yellow-500' },
    { id: 'cell', name: 'Célula', icon: Home, color: 'bg-orange-500' },
    { id: 'fellowship', name: 'Confraternização', icon: Coffee, color: 'bg-amber-500' },
  ];

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    
    return { daysInMonth, startingDayOfWeek };
  };

  const getEventsForDate = (date) => {
    const dateStr = date.toISOString().split('T')[0];
    return events.filter(event => event.date === dateStr);
  };

  const { daysInMonth, startingDayOfWeek } = getDaysInMonth(currentDate);
  const monthName = currentDate.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' });

  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const today = new Date();
  const isToday = (day) => {
    return today.getDate() === day &&
           today.getMonth() === currentDate.getMonth() &&
           today.getFullYear() === currentDate.getFullYear();
  };

  const upcomingEvents = events
    .filter(e => new Date(e.date) >= today)
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .slice(0, 5);

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <CalendaR className="text-pink-600" size={28} />
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Agenda e Calendário</h1>
                <p className="text-sm text-gray-500">Gerencie eventos, cultos e compromissos da igreja</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button 
                onClick={() => setShowNewEventModal(true)}
                className="flex items-center gap-2 px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors shadow-sm"
              >
                <Plus size={18} />
                <span className="font-medium">Novo Evento</span>
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <Download size={20} className="text-gray-600" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <Settings size={20} className="text-gray-600" />
              </button>
            </div>
          </div>

          {/* View Tabs and Navigation */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-lg">
                <button
                  onClick={() => setViewMode('month')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    viewMode === 'month'
                      ? 'bg-white text-gray-800 shadow-sm'
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  Mês
                </button>
                <button
                  onClick={() => setViewMode('week')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    viewMode === 'week'
                      ? 'bg-white text-gray-800 shadow-sm'
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  Semana
                </button>
                <button
                  onClick={() => setViewMode('agenda')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    viewMode === 'agenda'
                      ? 'bg-white text-gray-800 shadow-sm'
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  Agenda
                </button>
              </div>

              <div className="flex items-center gap-2">
                <button 
                  onClick={previousMonth}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <ChevronLeft size={20} />
                </button>
                <h2 className="text-lg font-semibold text-gray-800 capitalize min-w-[180px] text-center">
                  {monthName}
                </h2>
                <button 
                  onClick={nextMonth}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <ChevronRight size={20} />
                </button>
                <button 
                  onClick={() => setCurrentDate(new Date())}
                  className="ml-2 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium transition-colors"
                >
                  Hoje
                </button>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  placeholder="Buscar eventos..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
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
      <div className="flex-1 overflow-hidden flex">
        {/* CalendaR/Main View */}
        <div className="flex-1 overflow-y-auto p-6">
          {viewMode === 'month' && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              {/* Weekday Headers */}
              <div className="grid grid-cols-7 border-b border-gray-200">
                {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map((day, idx) => (
                  <div key={idx} className="p-3 text-center font-semibold text-gray-700 bg-gray-50">
                    {day}
                  </div>
                ))}
              </div>

              {/* CalendaR Grid */}
              <div className="grid grid-cols-7">
                {/* Empty cells before first day */}
                {Array.from({ length: startingDayOfWeek }).map((_, idx) => (
                  <div key={`empty-${idx}`} className="min-h-[120px] border-b border-r border-gray-200 bg-gray-50"></div>
                ))}

                {/* Days of month */}
                {Array.from({ length: daysInMonth }).map((_, idx) => {
                  const day = idx + 1;
                  const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
                  const dayEvents = getEventsForDate(date);
                  const isTodayDate = isToday(day);

                  return (
                    <div
                      key={day}
                      className={`min-h-[120px] border-b border-r border-gray-200 p-2 hover:bg-gray-50 transition-colors ${
                        isTodayDate ? 'bg-pink-50' : 'bg-white'
                      }`}
                    >
                      <div className={`inline-flex items-center justify-center w-7 h-7 rounded-full text-sm font-medium mb-1 ${
                        isTodayDate ? 'bg-pink-600 text-white' : 'text-gray-700'
                      }`}>
                        {day}
                      </div>
                      <div className="space-y-1">
                        {dayEvents.slice(0, 3).map((event) => (
                          <div
                            key={event.id}
                            onClick={() => {
                              setSelectedEvent(event);
                              setShowModal(true);
                            }}
                            className={`${event.color} text-white text-xs p-1.5 rounded cursor-pointer hover:opacity-90 transition-opacity`}
                          >
                            <div className="font-medium truncate">{event.title}</div>
                            <div className="opacity-90">{event.startTime}</div>
                          </div>
                        ))}
                        {dayEvents.length > 3 && (
                          <div className="text-xs text-gray-600 pl-1.5">
                            +{dayEvents.length - 3} mais
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {viewMode === 'agenda' && (
            <div className="space-y-4">
              {events
                .sort((a, b) => new Date(a.date + ' ' + a.startTime) - new Date(b.date + ' ' + b.startTime))
                .map((event) => {
                  const eventType = eventTypes.find(t => t.id === event.type);
                  const EventIcon = eventType?.icon || CalendaR;
                  
                  return (
                    <div
                      key={event.id}
                      onClick={() => {
                        setSelectedEvent(event);
                        setShowModal(true);
                      }}
                      className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 hover:shadow-md transition-all cursor-pointer"
                    >
                      <div className="flex items-start gap-4">
                        <div className="flex flex-col items-center min-w-[60px]">
                          <div className="text-sm font-medium text-gray-600">
                            {new Date(event.date).toLocaleDateString('pt-BR', { weekday: 'short' }).toUpperCase()}
                          </div>
                          <div className="text-3xl font-bold text-gray-800">
                            {new Date(event.date).getDate()}
                          </div>
                          <div className="text-sm text-gray-600">
                            {new Date(event.date).toLocaleDateString('pt-BR', { month: 'short' })}
                          </div>
                        </div>

                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex items-center gap-3">
                              <div className={`p-2 ${event.color} rounded-lg`}>
                                <EventIcon className="text-white" size={20} />
                              </div>
                              <div>
                                <h3 className="font-semibold text-gray-800 text-lg">{event.title}</h3>
                                <span className="text-sm text-gray-600">{eventType?.name}</span>
                              </div>
                            </div>
                            <button className="p-1 hover:bg-gray-100 rounded transition-colors">
                              <MoreVertical size={18} className="text-gray-400" />
                            </button>
                          </div>

                          <p className="text-gray-600 mb-3">{event.description}</p>

                          <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                            <div className="flex items-center gap-1">
                              <Clock size={14} />
                              <span>{event.startTime} - {event.endTime}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <MapPin size={14} />
                              <span>{event.location}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Users size={14} />
                              <span>{event.attendees} participantes</span>
                            </div>
                            {event.recurring !== 'none' && (
                              <div className="flex items-center gap-1">
                                <Repeat size={14} />
                                <span>
                                  {event.recurring === 'weekly' ? 'Semanal' : 
                                   event.recurring === 'monthly' ? 'Mensal' : 'Anual'}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          )}
        </div>

        {/* Right Sidebar - Upcoming Events */}
        <aside className="w-80 bg-white border-l border-gray-200 p-6 overflow-y-auto">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Próximos Eventos</h3>
          
          <div className="space-y-3 mb-6">
            {upcomingEvents.map((event) => {
              const eventType = eventTypes.find(t => t.id === event.type);
              const EventIcon = eventType?.icon || CalendaR;
              
              return (
                <div
                  key={event.id}
                  onClick={() => {
                    setSelectedEvent(event);
                    setShowModal(true);
                  }}
                  className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer border border-gray-200"
                >
                  <div className="flex items-start gap-3">
                    <div className={`p-2 ${event.color} rounded-lg`}>
                      <EventIcon className="text-white" size={16} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-gray-800 text-sm truncate">{event.title}</h4>
                      <div className="flex items-center gap-1 text-xs text-gray-600 mt-1">
                        <Clock size={12} />
                        <span>{new Date(event.date).toLocaleDateString('pt-BR')}</span>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-gray-600">
                        <span>{event.startTime}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <h3 className="text-lg font-bold text-gray-800 mb-4">Tipos de Eventos</h3>
          <div className="space-y-2">
            {eventTypes.map((type) => {
              const TypeIcon = type.icon;
              const count = events.filter(e => e.type === type.id).length;
              
              return (
                <div
                  key={type.id}
                  className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <div className={`p-1.5 ${type.color} rounded`}>
                      <TypeIcon className="text-white" size={14} />
                    </div>
                    <span className="text-sm text-gray-700">{type.name}</span>
                  </div>
                  <span className="text-sm font-medium text-gray-600">{count}</span>
                </div>
              );
            })}
          </div>
        </aside>
      </div>

      {/* Event Detail Modal */}
      {showModal && selectedEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col">
            <div className={`p-6 border-b border-gray-200 ${selectedEvent.color} bg-opacity-10`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`w-16 h-16 ${selectedEvent.color} rounded-lg flex items-center justify-center`}>
                    {(() => {
                      const eventType = eventTypes.find(t => t.id === selectedEvent.type);
                      const EventIcon = eventType?.icon || CalendaR;
                      return <EventIcon className="text-white" size={28} />;
                    })()}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800">{selectedEvent.title}</h2>
                    <p className="text-sm text-gray-600 mt-1">
                      {eventTypes.find(t => t.id === selectedEvent.type)?.name}
                    </p>
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
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-semibold text-gray-700 mb-2">Descrição</h3>
                  <p className="text-gray-600">{selectedEvent.description}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center gap-2 text-gray-600 text-sm mb-1">
                      <CalendaR size={16} />
                      <span className="font-medium">Data</span>
                    </div>
                    <p className="text-gray-800 font-medium">
                      {new Date(selectedEvent.date).toLocaleDateString('pt-BR', { 
                        weekday: 'long', 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </p>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center gap-2 text-gray-600 text-sm mb-1">
                      <Clock size={16} />
                      <span className="font-medium">Horário</span>
                    </div>
                    <p className="text-gray-800 font-medium">
                      {selectedEvent.startTime} - {selectedEvent.endTime}
                    </p>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center gap-2 text-gray-600 text-sm mb-1">
                      <MapPin size={16} />
                      <span className="font-medium">Local</span>
                    </div>
                    <p className="text-gray-800 font-medium">{selectedEvent.location}</p>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center gap-2 text-gray-600 text-sm mb-1">
                      <Users size={16} />
                      <span className="font-medium">Participantes</span>
                    </div>
                    <p className="text-gray-800 font-medium">{selectedEvent.attendees} pessoas</p>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center gap-2 text-gray-600 text-sm mb-2">
                    <Users size={16} />
                    <span className="font-medium">Responsável</span>
                  </div>
                  <p className="text-gray-800 font-medium">{selectedEvent.responsible}</p>
                </div>

                {selectedEvent.recurring !== 'none' && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-center gap-2 text-blue-700 text-sm mb-1">
                      <Repeat size={16} />
                      <span className="font-medium">Evento Recorrente</span>
                    </div>
                    <p className="text-blue-800">
                      Este evento se repete {
                        selectedEvent.recurring === 'weekly' ? 'semanalmente' : 
                        selectedEvent.recurring === 'monthly' ? 'mensalmente' : 'anualmente'
                      }
                    </p>
                  </div>
                )}

                {selectedEvent.reminder && (
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <div className="flex items-center gap-2 text-yellow-700 text-sm mb-1">
                      <Bell size={16} />
                      <span className="font-medium">Lembrete</span>
                    </div>
                    <p className="text-yellow-800">Notificação: {selectedEvent.reminder}</p>
                  </div>
                )}
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
                  Editar
                </button>
                <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium flex items-center gap-2">
                  <Trash2 size={18} />
                  Excluir
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* New Event Modal */}
      {showNewEventModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col">
            <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-pink-50 to-purple-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-purple-500 rounded-lg flex items-center justify-center">
                    <Plus className="text-white" size={24} />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800">Novo Evento</h2>
                    <p className="text-sm text-gray-600">Adicione um novo evento ao calendário</p>
                  </div>
                </div>
                <button 
                  onClick={() => setShowNewEventModal(false)}
                  className="p-2 hover:bg-white rounded-lg transition-colors"
                >
                  <X size={24} />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Título do Evento *
                  </label>
                  <input
                    type="text"
                    placeholder="Ex: Culto de Celebração"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Tipo de Evento *
                  </label>
                  <select className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 bg-white">
                    <option value="">Selecione o tipo</option>
                    {eventTypes.map(type => (
                      <option key={type.id} value={type.id}>{type.name}</option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Data *
                    </label>
                    <input
                      type="date"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Recorrência
                    </label>
                    <select className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 bg-white">
                      <option value="none">Não repete</option>
                      <option value="daily">Diariamente</option>
                      <option value="weekly">Semanalmente</option>
                      <option value="monthly">Mensalmente</option>
                      <option value="yearly">Anualmente</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Horário de Início *
                    </label>
                    <input
                      type="time"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Horário de Término *
                    </label>
                    <input
                      type="time"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Local *
                  </label>
                  <input
                    type="text"
                    placeholder="Ex: Templo Principal"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Descrição
                  </label>
                  <textarea
                    placeholder="Descreva o evento..."
                    rows={3}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 resize-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Responsável
                    </label>
                    <input
                      type="text"
                      placeholder="Nome do responsável"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Nº de Participantes
                    </label>
                    <input
                      type="number"
                      placeholder="0"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Lembrete
                  </label>
                  <select className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 bg-white">
                    <option value="">Sem lembrete</option>
                    <option value="5">5 minutos antes</option>
                    <option value="15">15 minutos antes</option>
                    <option value="30">30 minutos antes</option>
                    <option value="60">1 hora antes</option>
                    <option value="1440">1 dia antes</option>
                  </select>
                </div>

                <div className="flex items-center gap-2">
                  <input type="checkbox" id="notification" className="rounded" />
                  <label htmlFor="notification" className="text-sm text-gray-700">
                    Enviar notificação para os participantes
                  </label>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 bg-gray-50">
              <div className="flex gap-3">
                <button
                  onClick={() => setShowNewEventModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors font-medium"
                >
                  Cancelar
                </button>
                <button className="flex-1 px-4 py-2 bg-gradient-to-r from-pink-600 to-purple-600 text-white rounded-lg hover:from-pink-700 hover:to-purple-700 transition-colors font-medium">
                  Criar Evento
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Calendar;