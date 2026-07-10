import { Book, FileText, Target, Calendar, Heart } from 'lucide-react';
import { Card } from '../ui/Card';

const Dashboard = () => {
  const stats = [
    { label: 'Sermões Criados', value: '24', change: '+3 este mês', tone: 'success' as const },
    { label: 'Metas Ativas', value: '12', change: '8 em andamento', tone: 'warning' as const },
    { label: 'Membros Ativos', value: '456', change: '+15 este mês', tone: 'accent' as const },
    { label: 'Eventos Próximos', value: '7', change: 'Próximos 30 dias', tone: 'danger' as const },
  ];

  const toneClasses = {
    success: 'bg-success-soft text-success',
    warning: 'bg-warning-soft text-warning',
    accent: 'bg-accent-soft text-accent-hover dark:text-ink',
    danger: 'bg-danger-soft text-danger',
  };

  const recentActivity = [
    { title: 'Sermão: O Bom Pastor', time: 'Há 2 horas', icon: FileText },
    { title: 'Marcou João 3:16', time: 'Há 5 horas', icon: Book },
    { title: 'Meta concluída: Treinamento de Líderes', time: 'Ontem', icon: Target },
    { title: 'Novo pedido de oração adicionado', time: 'Há 2 dias', icon: Heart },
  ];

  const quickActions = [
    { name: 'Novo Sermão', icon: FileText },
    { name: 'Ler Bíblia', icon: Book },
    { name: 'Adicionar Meta', icon: Target },
    { name: 'Criar Evento', icon: Calendar },
  ];

  const upcomingEvents = [
    { title: 'Culto de Domingo', time: 'Domingo, 10:00 AM' },
    { title: 'Reunião de Líderes', time: 'Terça, 19:00 PM' },
    { title: 'Estudo Bíblico', time: 'Quarta, 20:00 PM' },
  ];

  return (
    <div className="flex-1 overflow-y-auto p-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map((stat, idx) => (
          <Card key={idx} className="p-5" hoverable>
            <div className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium mb-3 ${toneClasses[stat.tone]}`}>
              {stat.change}
            </div>
            <h3 className="text-2xl font-semibold text-ink mb-1">{stat.value}</h3>
            <p className="text-sm text-ink-muted">{stat.label}</p>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-ink-muted mb-3 uppercase tracking-wide">Ações Rápidas</h3>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {quickActions.map((action, idx) => {
            const Icon = action.icon;
            return (
              <button
                key={idx}
                className="bg-surface border border-border rounded-lg p-4 hover:bg-surface-hover transition-colors flex flex-col items-center gap-2"
              >
                <Icon size={22} className="text-accent" />
                <span className="text-sm font-medium text-ink">{action.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Recent Activity */}
        <Card className="lg:col-span-2 p-5">
          <h3 className="text-sm font-semibold text-ink mb-4">Atividade Recente</h3>
          <div className="space-y-1">
            {recentActivity.map((activity, idx) => {
              const Icon = activity.icon;
              return (
                <div key={idx} className="flex items-start gap-3 p-2.5 hover:bg-surface-hover rounded-md transition-colors cursor-pointer">
                  <div className="p-2 bg-bg border border-border rounded-md text-ink-muted">
                    <Icon size={16} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-ink">{activity.title}</p>
                    <p className="text-xs text-ink-faint mt-0.5">{activity.time}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Upcoming Events */}
        <Card className="p-5">
          <h3 className="text-sm font-semibold text-ink mb-4">Próximos Eventos</h3>
          <div className="space-y-2">
            {upcomingEvents.map((event, idx) => (
              <div key={idx} className="p-3 bg-bg border border-border rounded-md cursor-pointer hover:bg-surface-hover transition-colors">
                <p className="text-sm font-medium text-ink">{event.title}</p>
                <p className="text-xs text-ink-faint mt-0.5">{event.time}</p>
              </div>
            ))}
          </div>
          <button className="w-full mt-3 py-2 text-sm text-accent hover:underline font-medium">
            Ver todos os eventos →
          </button>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
