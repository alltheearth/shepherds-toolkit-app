import { useState } from "react";
import { Bell, Calendar, Check, Clock, DollarSign, Heart, Search, Settings, Target, Trash2, Users } from "lucide-react";
import { useAuth } from "../../../context/AuthContext";

interface Notification {
  id: number;
  type: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  icon: typeof Bell;
  tone: 'accent' | 'success' | 'warning' | 'danger';
}

const toneClasses: Record<Notification['tone'], string> = {
  accent: 'bg-accent-soft text-accent-hover dark:text-ink',
  success: 'bg-success-soft text-success',
  warning: 'bg-warning-soft text-warning',
  danger: 'bg-danger-soft text-danger',
};

const Header = () => {
    const { user } = useAuth();
    const firstName = user?.first_name || user?.username || '';
    const today = new Date().toLocaleDateString('pt-BR', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });

    const [showNotifications, setShowNotifications] = useState(false);
    const [notifications, setNotifications] = useState<Notification[]>([
      { id: 1, type: 'member', title: 'Novo membro cadastrado', message: 'Maria Silva se juntou à igreja', time: '5 min atrás', read: false, icon: Users, tone: 'accent' },
      { id: 2, type: 'event', title: 'Evento amanhã', message: 'Reunião de Líderes às 19:00', time: '1 hora atrás', read: false, icon: Calendar, tone: 'danger' },
      { id: 3, type: 'goal', title: 'Meta alcançada!', message: 'Treinamento de Líderes concluído', time: '3 horas atrás', read: true, icon: Target, tone: 'warning' },
      { id: 4, type: 'prayer', title: 'Pedido de oração urgente', message: 'José Ricardo pediu oração pela família', time: 'Ontem', read: true, icon: Heart, tone: 'danger' },
      { id: 5, type: 'finance', title: 'Relatório financeiro disponível', message: 'Resumo do mês está pronto', time: '2 dias atrás', read: true, icon: DollarSign, tone: 'success' },
    ]);

    const unreadCount = notifications.filter((n) => !n.read).length;
    const markAsRead = (id: number) => setNotifications(notifications.map((n) => (n.id === id ? { ...n, read: true } : n)));
    const markAllAsRead = () => setNotifications(notifications.map((n) => ({ ...n, read: true })));
    const deleteNotification = (id: number) => setNotifications(notifications.filter((n) => n.id !== id));

    return (
        <header className="bg-surface border-b border-border px-6 py-3">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-ink">Bem-vindo de volta{firstName ? `, ${firstName}` : ''}!</h2>
              <p className="text-sm text-ink-faint mt-0.5 capitalize">{today}</p>
            </div>

            <div className="flex items-center gap-3">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-ink-faint" size={16} />
                <input
                  type="text"
                  placeholder="Buscar..."
                  className="pl-9 pr-3 py-1.5 text-sm border border-border rounded-md bg-bg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent w-56 text-ink placeholder:text-ink-faint"
                />
              </div>

              {/* Notifications */}
              <div className="relative">
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="relative p-2 hover:bg-surface-hover rounded-md transition-colors"
                >
                  <Bell size={18} className="text-ink-muted" />
                  {unreadCount > 0 && (
                    <span className="absolute top-1 right-1 w-4 h-4 bg-danger text-white text-[10px] rounded-full flex items-center justify-center font-medium">
                      {unreadCount}
                    </span>
                  )}
                </button>

                {showNotifications && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setShowNotifications(false)} />
                    <div className="absolute right-0 mt-2 w-96 bg-surface rounded-lg border border-border shadow-xl z-50 overflow-hidden">
                      <div className="flex items-center justify-between px-4 py-3 border-b border-border">
                        <h3 className="font-semibold text-sm text-ink">Notificações</h3>
                        {unreadCount > 0 && (
                          <button onClick={markAllAsRead} className="text-xs text-accent hover:underline">
                            Marcar todas como lidas
                          </button>
                        )}
                      </div>

                      <div className="max-h-96 overflow-y-auto">
                        {notifications.length === 0 ? (
                          <div className="p-8 text-center">
                            <Bell size={32} className="mx-auto mb-2 text-ink-faint" />
                            <p className="text-ink-muted text-sm">Nenhuma notificação</p>
                          </div>
                        ) : (
                          notifications.map((notif) => {
                            const Icon = notif.icon;
                            return (
                              <div key={notif.id} className={`p-3 border-b border-border last:border-0 hover:bg-surface-hover transition-colors ${!notif.read ? 'bg-accent-soft/30' : ''}`}>
                                <div className="flex gap-3">
                                  <div className={`${toneClasses[notif.tone]} p-2 rounded-md h-fit flex-shrink-0`}>
                                    <Icon size={16} />
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <p className="font-medium text-ink text-sm">{notif.title}</p>
                                    <p className="text-sm text-ink-muted mt-0.5">{notif.message}</p>
                                    <div className="flex items-center justify-between mt-1.5">
                                      <span className="text-xs text-ink-faint flex items-center gap-1">
                                        <Clock size={11} />
                                        {notif.time}
                                      </span>
                                      <div className="flex gap-2">
                                        {!notif.read && (
                                          <button onClick={() => markAsRead(notif.id)} className="text-xs text-accent hover:underline flex items-center gap-1">
                                            <Check size={12} /> Lida
                                          </button>
                                        )}
                                        <button onClick={() => deleteNotification(notif.id)} className="text-xs text-danger hover:underline flex items-center gap-1">
                                          <Trash2 size={12} /> Excluir
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            );
                          })
                        )}
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* Settings */}
              <button className="p-2 hover:bg-surface-hover rounded-md transition-colors">
                <Settings size={18} className="text-ink-muted" />
              </button>
            </div>
          </div>
        </header>
    );
};

export default Header
