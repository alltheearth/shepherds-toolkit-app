import React, { useState, useEffect } from 'react';
import { 
  Calendar as CalendarIcon, Plus, Search, Filter, Download, Settings, Clock,
  MapPin, Users, ChevronLeft, ChevronRight, MoreVertical, Edit,
  Trash2, X, Bell, Repeat, Music, Briefcase, BookOpen, Heart,
  Mic, Baby, Home, Coffee, AlertCircle, Loader2, Check
} from 'lucide-react';
import api from '../../services/api';

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState('month');
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showNewEventModal, setShowNewEventModal] = useState(false);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    event_type: '',
    location: '',
    start_datetime: '',
    end_datetime: '',
    all_day: false,
    color: '',
    reminder_minutes: null,
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const eventTypes = [
    { id: 'service', name: 'Culto', icon: Music, color: 'bg-purple-500' },
    { id: 'meeting', name: 'Reunião', icon: Briefcase, color: 'bg-blue-500' },
    { id: 'study', name: 'Estudo Bíblico', icon: BookOpen, color: 'bg-green-500' },
    { id: 'prayer', name: 'Oração', icon: Heart, color: 'bg-red-500' },
    { id: 'visit', name: 'Visita', icon: Users, color: 'bg-orange-500' },
    { id: 'other', name: 'Outro', icon: Coffee, color: 'bg-gray-500' },
  ];

  // Carregar eventos
  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const response = await api.get('/events/');
      setEvents(response.data.results || response.data || []);
    } catch (error) {
      console.error('Erro ao carregar eventos:', error);
      alert('Erro ao carregar eventos');
    } finally {
      setLoading(false);
    }
  };

  // Criar evento
  const handleCreate = async (e) => {
    e.preventDefault();
    setErrors({});
    setSubmitting(true);

    try {
      // Validações
      if (!formData.title.trim()) {
        setErrors({ title: 'Título é obrigatório' });
        setSubmitting(false);
        return;
      }

      if (!formData.event_type) {
        setErrors({ event_type: 'Tipo de evento é obrigatório' });
        setSubmitting(false);
        return;
      }

      if (!formData.start_datetime) {
        setErrors({ start_datetime: 'Data de início é obrigatória' });
        setSubmitting(false);
        return;
      }

      if (!formData.end_datetime) {
        setErrors({ end_datetime: 'Data de término é obrigatória' });
        setSubmitting(false);
        return;
      }

      // Formatar dados para o backend
      const eventData = {
        ...formData,
        start_datetime: new Date(formData.start_datetime).toISOString(),
        end_datetime: new Date(formData.end_datetime).toISOString(),
        reminder_minutes: formData.reminder_minutes ? parseInt(formData.reminder_minutes) : null,
      };

      const response = await api.post('/events/', eventData);
      
      setEvents([...events, response.data]);
      setShowNewEventModal(false);
      resetForm();
      alert('Evento criado com sucesso!');
    } catch (error) {
      console.error('Erro ao criar evento:', error);
      if (error.response?.data) {
        setErrors(error.response.data);
      } else {
        alert('Erro ao criar evento');
      }
    } finally {
      setSubmitting(false);
    }
  };

  // Atualizar evento
  const handleUpdate = async (e) => {
    e.preventDefault();
    setErrors({});
    setSubmitting(true);

    try {
      const eventData = {
        ...formData,
        start_datetime: new Date(formData.start_datetime).toISOString(),
        end_datetime: new Date(formData.end_datetime).toISOString(),
        reminder_minutes: formData.reminder_minutes ? parseInt(formData.reminder_minutes) : null,
      };

      const response = await api.put(`/events/${selectedEvent.id}/`, eventData);
      
      setEvents(events.map(e => e.id === selectedEvent.id ? response.data : e));
      setShowNewEventModal(false);
      setIsEditing(false);
      resetForm();
      alert('Evento atualizado com sucesso!');
    } catch (error) {
      console.error('Erro ao atualizar evento:', error);
      if (error.response?.data) {
        setErrors(error.response.data);
      } else {
        alert('Erro ao atualizar evento');
      }
    } finally {
      setSubmitting(false);
    }
  };

  // Deletar evento
  const handleDelete = async (eventId) => {
    if (!confirm('Tem certeza que deseja excluir este evento?')) {
      return;
    }

    try {
      await api.delete(`/events/${eventId}/`);
      setEvents(events.filter(e => e.id !== eventId));
      setShowModal(false);
      alert('Evento excluído com sucesso!');
    } catch (error) {
      console.error('Erro ao excluir evento:', error);
      alert('Erro ao excluir evento');
    }
  };

  // Abrir modal de edição
  const openEditModal = (event) => {
    setSelectedEvent(event);
    setIsEditing(true);
    
    // Formatar datas para o input datetime-local
    const startDate = new Date(event.start_datetime);
    const endDate = new Date(event.end_datetime);
    
    setFormData({
      title: event.title,
      description: event.description || '',
      event_type: event.event_type,
      location: event.location || '',
      start_datetime: formatDateTimeLocal(startDate),
      end_datetime: formatDateTimeLocal(endDate),
      all_day: event.all_day,
      color: event.color || '',
      reminder_minutes: event.reminder_minutes || '',
    });
    
    setShowModal(false);
    setShowNewEventModal(true);
  };

  // Formatar data para input datetime-local
  const formatDateTimeLocal = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      event_type: '',
      location: '',
      start_datetime: '',
      end_datetime: '',
      all_day: false,
      color: '',
      reminder_minutes: null,
    });
    setErrors({});
    setSelectedEvent(null);
    setIsEditing(false);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    // Limpar erro do campo ao editar
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

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
    return events.filter(event => {
      const eventDate = new Date(event.start_datetime).toISOString().split('T')[0];
      return eventDate === dateStr;
    });
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
    .filter(e => new Date(e.start_datetime) >= today)
    .sort((a, b) => new Date(a.start_datetime) - new Date(b.start_datetime))
    .slice(0, 5);

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-pink-600 mx-auto mb-4" />
          <p className="text-gray-600">Carregando eventos...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <CalendarIcon className="text-pink-600" size={28} />
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Agenda e Calendário</h1>
                <p className="text-sm text-gray-500">Gerencie eventos, cultos e compromissos da igreja</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button 
                onClick={() => {
                  resetForm();
                  setShowNewEventModal(true);
                }}
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
            </div>
          </div>
        </div>
      </header>

      {/* Content Area */}
      <div className="flex-1 overflow-hidden flex">
        {/* Calendar/Main View */}
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

              {/* Calendar Grid */}
              <div className="grid grid-cols-7">
                {Array.from({ length: startingDayOfWeek }).map((_, idx) => (
                  <div key={`empty-${idx}`} className="min-h-[120px] border-b border-r border-gray-200 bg-gray-50"></div>
                ))}

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
                        {dayEvents.slice(0, 3).map((event) => {
                          const eventType = eventTypes.find(t => t.id === event.event_type);
                          return (
                            <div
                              key={event.id}
                              onClick={() => {
                                setSelectedEvent(event);
                                setShowModal(true);
                              }}
                              className={`${eventType?.color || 'bg-gray-500'} text-white text-xs p-1.5 rounded cursor-pointer hover:opacity-90 transition-opacity`}
                            >
                              <div className="font-medium truncate">{event.title}</div>
                              <div className="opacity-90">
                                {new Date(event.start_datetime).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                              </div>
                            </div>
                          );
                        })}
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
                .sort((a, b) => new Date(a.start_datetime) - new Date(b.start_datetime))
                .map((event) => {
                  const eventType = eventTypes.find(t => t.id === event.event_type);
                  const EventIcon = eventType?.icon || CalendarIcon;
                  
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
                            {new Date(event.start_datetime).toLocaleDateString('pt-BR', { weekday: 'short' }).toUpperCase()}
                          </div>
                          <div className="text-3xl font-bold text-gray-800">
                            {new Date(event.start_datetime).getDate()}
                          </div>
                          <div className="text-sm text-gray-600">
                            {new Date(event.start_datetime).toLocaleDateString('pt-BR', { month: 'short' })}
                          </div>
                        </div>

                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex items-center gap-3">
                              <div className={`p-2 ${eventType?.color || 'bg-gray-500'} rounded-lg`}>
                                <EventIcon className="text-white" size={20} />
                              </div>
                              <div>
                                <h3 className="font-semibold text-gray-800 text-lg">{event.title}</h3>
                                <span className="text-sm text-gray-600">{eventType?.name}</span>
                              </div>
                            </div>
                          </div>

                          {event.description && (
                            <p className="text-gray-600 mb-3">{event.description}</p>
                          )}

                          <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                            <div className="flex items-center gap-1">
                              <Clock size={14} />
                              <span>
                                {new Date(event.start_datetime).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                                {' - '}
                                {new Date(event.end_datetime).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                              </span>
                            </div>
                            {event.location && (
                              <div className="flex items-center gap-1">
                                <MapPin size={14} />
                                <span>{event.location}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              
              {events.length === 0 && (
                <div className="text-center py-12">
                  <CalendarIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 text-lg">Nenhum evento cadastrado</p>
                  <p className="text-gray-400 text-sm mt-2">Clique em "Novo Evento" para começar</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right Sidebar - Upcoming Events */}
        <aside className="w-80 bg-white border-l border-gray-200 p-6 overflow-y-auto">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Próximos Eventos</h3>
          
          <div className="space-y-3 mb-6">
            {upcomingEvents.map((event) => {
              const eventType = eventTypes.find(t => t.id === event.event_type);
              const EventIcon = eventType?.icon || CalendarIcon;
              
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
                    <div className={`p-2 ${eventType?.color || 'bg-gray-500'} rounded-lg`}>
                      <EventIcon className="text-white" size={16} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-gray-800 text-sm truncate">{event.title}</h4>
                      <div className="flex items-center gap-1 text-xs text-gray-600 mt-1">
                        <Clock size={12} />
                        <span>{new Date(event.start_datetime).toLocaleDateString('pt-BR')}</span>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-gray-600">
                        <span>
                          {new Date(event.start_datetime).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
            
            {upcomingEvents.length === 0 && (
              <p className="text-sm text-gray-500 text-center py-4">Nenhum evento próximo</p>
            )}
          </div>

          <h3 className="text-lg font-bold text-gray-800 mb-4">Tipos de Eventos</h3>
          <div className="space-y-2">
            {eventTypes.map((type) => {
              const TypeIcon = type.icon;
              const count = events.filter(e => e.event_type === type.id).length;
              
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
            <div className={`p-6 border-b border-gray-200 ${eventTypes.find(t => t.id === selectedEvent.event_type)?.color || 'bg-gray-500'} bg-opacity-10`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`w-16 h-16 ${eventTypes.find(t => t.id === selectedEvent.event_type)?.color || 'bg-gray-500'} rounded-lg flex items-center justify-center`}>
                    {(() => {
                      const eventType = eventTypes.find(t => t.id === selectedEvent.event_type);
                      const EventIcon = eventType?.icon || CalendarIcon;
                      return <EventIcon className="text-white" size={28} />;
                    })()}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800">{selectedEvent.title}</h2>
                    <p className="text-sm text-gray-600 mt-1">
                      {eventTypes.find(t => t.id === selectedEvent.event_type)?.name}
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
                {selectedEvent.description && (
                  <div>
                    <h3 className="text-sm font-semibold text-gray-700 mb-2">Descrição</h3>
                    <p className="text-gray-600">{selectedEvent.description}</p>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center gap-2 text-gray-600 text-sm mb-1">
                      <CalendarIcon size={16} />
                      <span className="font-medium">Data</span>
                    </div>
                    <p className="text-gray-800 font-medium">
                      {new Date(selectedEvent.start_datetime).toLocaleDateString('pt-BR', { 
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
                      {new Date(selectedEvent.start_datetime).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                      {' - '}
                      {new Date(selectedEvent.end_datetime).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>

                  {selectedEvent.location && (
                    <div className="bg-gray-50 rounded-lg p-4 col-span-2">
                      <div className="flex items-center gap-2 text-gray-600 text-sm mb-1">
                        <MapPin size={16} />
                        <span className="font-medium">Local</span>
                      </div>
                      <p className="text-gray-800 font-medium">{selectedEvent.location}</p>
                    </div>
                  )}
                </div>

                {selectedEvent.reminder_minutes && (
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <div className="flex items-center gap-2 text-yellow-700 text-sm mb-1">
                      <Bell size={16} />
                      <span className="font-medium">Lembrete</span>
                    </div>
                    <p className="text-yellow-800">
                      {selectedEvent.reminder_minutes} minutos antes
                    </p>
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
                <button 
                  onClick={() => openEditModal(selectedEvent)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center gap-2"
                >
                  <Edit size={18} />
                  Editar
                </button>
                <button 
                  onClick={() => handleDelete(selectedEvent.id)}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium flex items-center gap-2"
                >
                  <Trash2 size={18} />
                  Excluir
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* New/Edit Event Modal */}
      {showNewEventModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col">
            <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-pink-50 to-purple-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-purple-500 rounded-lg flex items-center justify-center">
                    {isEditing ? <Edit className="text-white" size={24} /> : <Plus className="text-white" size={24} />}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800">
                      {isEditing ? 'Editar Evento' : 'Novo Evento'}
                    </h2>
                    <p className="text-sm text-gray-600">
                      {isEditing ? 'Atualize as informações do evento' : 'Adicione um novo evento ao calendário'}
                    </p>
                  </div>
                </div>
                <button 
                  onClick={() => {
                    setShowNewEventModal(false);
                    resetForm();
                  }}
                  className="p-2 hover:bg-white rounded-lg transition-colors"
                >
                  <X size={24} />
                </button>
              </div>
            </div>

            <form onSubmit={isEditing ? handleUpdate : handleCreate} className="flex-1 overflow-y-auto p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Título do Evento *
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="Ex: Culto de Celebração"
                    className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 ${
                      errors.title ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.title && (
                    <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                      <AlertCircle size={14} />
                      {errors.title}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Tipo de Evento *
                  </label>
                  <select 
                    name="event_type"
                    value={formData.event_type}
                    onChange={handleInputChange}
                    className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 bg-white ${
                      errors.event_type ? 'border-red-500' : 'border-gray-300'
                    }`}
                  >
                    <option value="">Selecione o tipo</option>
                    {eventTypes.map(type => (
                      <option key={type.id} value={type.id}>{type.name}</option>
                    ))}
                  </select>
                  {errors.event_type && (
                    <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                      <AlertCircle size={14} />
                      {errors.event_type}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Data e Hora de Início *
                    </label>
                    <input
                      type="datetime-local"
                      name="start_datetime"
                      value={formData.start_datetime}
                      onChange={handleInputChange}
                      className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 ${
                        errors.start_datetime ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {errors.start_datetime && (
                      <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                        <AlertCircle size={14} />
                        {errors.start_datetime}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Data e Hora de Término *
                    </label>
                    <input
                      type="datetime-local"
                      name="end_datetime"
                      value={formData.end_datetime}
                      onChange={handleInputChange}
                      className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 ${
                        errors.end_datetime ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {errors.end_datetime && (
                      <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                        <AlertCircle size={14} />
                        {errors.end_datetime}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Local
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    placeholder="Ex: Templo Principal"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Descrição
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Descreva o evento..."
                    rows={3}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Lembrete (minutos antes)
                  </label>
                  <select 
                    name="reminder_minutes"
                    value={formData.reminder_minutes}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 bg-white"
                  >
                    <option value="">Sem lembrete</option>
                    <option value="5">5 minutos antes</option>
                    <option value="15">15 minutos antes</option>
                    <option value="30">30 minutos antes</option>
                    <option value="60">1 hora antes</option>
                    <option value="1440">1 dia antes</option>
                  </select>
                </div>

                <div className="flex items-center gap-2">
                  <input 
                    type="checkbox" 
                    id="all_day" 
                    name="all_day"
                    checked={formData.all_day}
                    onChange={handleInputChange}
                    className="rounded"
                  />
                  <label htmlFor="all_day" className="text-sm text-gray-700">
                    Evento de dia inteiro
                  </label>
                </div>
              </div>
            </form>

            <div className="p-6 border-t border-gray-200 bg-gray-50">
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowNewEventModal(false);
                    resetForm();
                  }}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors font-medium"
                  disabled={submitting}
                >
                  Cancelar
                </button>
                <button 
                  onClick={isEditing ? handleUpdate : handleCreate}
                  disabled={submitting}
                  className="flex-1 px-4 py-2 bg-gradient-to-r from-pink-600 to-purple-600 text-white rounded-lg hover:from-pink-700 hover:to-purple-700 transition-colors font-medium flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="animate-spin" size={18} />
                      {isEditing ? 'Atualizando...' : 'Criando...'}
                    </>
                  ) : (
                    <>
                      <Check size={18} />
                      {isEditing ? 'Atualizar Evento' : 'Criar Evento'}
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

export default Calendar;