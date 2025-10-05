import { Book, FileText, Target, Calendar, Users, DollarSign, Heart, BookOpen, Menu, X, Search, Bell, Settings, User } from 'lucide-react';

const Dashboard = () => {

  const stats = [
    { label: 'Sermões Criados', value: '24', change: '+3 este mês', color: 'bg-green-50 text-green-700' },
    { label: 'Metas Ativas', value: '12', change: '8 em andamento', color: 'bg-orange-50 text-orange-700' },
    { label: 'Membros Ativos', value: '456', change: '+15 este mês', color: 'bg-indigo-50 text-indigo-700' },
    { label: 'Eventos Próximos', value: '7', change: 'Próximos 30 dias', color: 'bg-pink-50 text-pink-700' },
  ];

  const recentActivity = [
    { type: 'sermon', title: 'Sermão: O Bom Pastor', time: 'Há 2 horas', icon: FileText, color: 'text-green-500' },
    { type: 'bible', title: 'Marcou João 3:16', time: 'Há 5 horas', icon: Book, color: 'text-purple-500' },
    { type: 'goal', title: 'Meta concluída: Treinamento de Líderes', time: 'Ontem', icon: Target, color: 'text-orange-500' },
    { type: 'prayer', title: 'Novo pedido de oração adicionado', time: 'Há 2 dias', icon: Heart, color: 'text-red-500' },
  ];

  const quickActions = [
    { name: 'Novo Sermão', icon: FileText, color: 'bg-green-500 hover:bg-green-600' },
    { name: 'Ler Bíblia', icon: Book, color: 'bg-purple-500 hover:bg-purple-600' },
    { name: 'Adicionar Meta', icon: Target, color: 'bg-orange-500 hover:bg-orange-600' },
    { name: 'Criar Evento', icon: Calendar, color: 'bg-pink-500 hover:bg-pink-600' },
  ];

  return (
    <>
        <header className="bg-white border-b border-gray-200 px-8 py-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Bem-vindo de volta, Pastor João!</h2>
              <p className="text-sm text-gray-500 mt-1">Quinta-feira, 02 de Outubro de 2025</p>
            </div>
            
            <div className="flex items-center gap-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  placeholder="Buscar..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
                />
              </div>

              {/* Notifications */}
              <button className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <Bell size={20} className="text-gray-600" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>

              {/* Settings */}
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <Settings size={20} className="text-gray-600" />
              </button>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="flex-1 overflow-y-auto p-8">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, idx) => (
              <div key={idx} className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow">
                <div className={`inline-block px-3 py-1 rounded-full text-xs font-medium mb-3 ${stat.color}`}>
                  {stat.change}
                </div>
                <h3 className="text-3xl font-bold text-gray-800 mb-1">{stat.value}</h3>
                <p className="text-sm text-gray-600">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Ações Rápidas</h3>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {quickActions.map((action, idx) => {
                const Icon = action.icon;
                return (
                  <button
                    key={idx}
                    className={`${action.color} text-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all flex flex-col items-center gap-3`}
                  >
                    <Icon size={28} />
                    <span className="font-medium">{action.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Recent Activity */}
            <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Atividade Recente</h3>
              <div className="space-y-4">
                {recentActivity.map((activity, idx) => {
                  const Icon = activity.icon;
                  return (
                    <div key={idx} className="flex items-start gap-4 p-4 hover:bg-gray-50 rounded-lg transition-colors">
                      <div className={`p-2 bg-gray-100 rounded-lg ${activity.color}`}>
                        <Icon size={20} />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-800">{activity.title}</p>
                        <p className="text-sm text-gray-500 mt-1">{activity.time}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Upcoming Events */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Próximos Eventos</h3>
              <div className="space-y-4">
                <div className="p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg border-l-4 border-blue-500">
                  <p className="font-medium text-gray-800">Culto de Domingo</p>
                  <p className="text-sm text-gray-600 mt-1">Domingo, 10:00 AM</p>
                </div>
                <div className="p-4 bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg border-l-4 border-purple-500">
                  <p className="font-medium text-gray-800">Reunião de Líderes</p>
                  <p className="text-sm text-gray-600 mt-1">Terça, 19:00 PM</p>
                </div>
                <div className="p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-lg border-l-4 border-green-500">
                  <p className="font-medium text-gray-800">Estudo Bíblico</p>
                  <p className="text-sm text-gray-600 mt-1">Quarta, 20:00 PM</p>
                </div>
              </div>
              <button className="w-full mt-4 py-2 text-sm text-blue-600 hover:text-blue-700 font-medium">
                Ver todos os eventos →
              </button>
            </div>
          </div>
        </div>
</>
  );
};

export default Dashboard;