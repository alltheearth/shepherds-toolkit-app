// import React, { useState } from 'react';
// import { Book, FileText, Target, Calendar, Users, DollarSign, Heart, BookOpen, Menu, X, Search, Bell, Settings, User, Mail, Phone, MapPin, Award, Clock, Check, Trash2, LogOut, Shield, Globe, Moon, Sun, Download, Camera, Lock, Smartphone, Zap, Database } from 'lucide-react';

// const Tools = () => {
//   const [sidebarOpen, setSidebarOpen] = useState(true);
//   const [activeModule, setActiveModule] = useState('dashboard');
//   const [showProfile, setShowProfile] = useState(false);
//   const [showNotifications, setShowNotifications] = useState(false);
//   const [showSettings, setShowSettings] = useState(false);
  
//   // Estados de configurações
//   const [darkMode, setDarkMode] = useState(false);
//   const [compactMode, setCompactMode] = useState(false);
//   const [language, setLanguage] = useState('pt-BR');
//   const [notifSettings, setNotifSettings] = useState({
//     events: true,
//     prayers: true,
//     members: true,
//     finances: false,
//     goals: true
//   });

//   // Perfil do usuário (editável)
//   const [userProfile, setUserProfile] = useState({
//     name: 'Pastor João Silva',
//     email: 'pastor.joao@igrejacentral.com',
//     phone: '(11) 98765-4321',
//     church: 'Igreja Central',
//     role: 'Pastor Principal',
//     address: 'São Paulo, SP',
//     since: '2018',
//     bio: 'Servo de Deus, apaixonado por ensinar e pastorear o rebanho do Senhor.'
//   });

//   // Notificações (gerenciáveis)
//   const [notifications, setNotifications] = useState([
//     { 
//       id: 1, 
//       type: 'member', 
//       title: 'Novo membro cadastrado', 
//       message: 'Maria Silva se juntou à igreja', 
//       time: '5 min atrás', 
//       read: false,
//       icon: Users,
//       color: 'bg-indigo-100 text-indigo-600'
//     },
//     { 
//       id: 2, 
//       type: 'event', 
//       title: 'Evento amanhã', 
//       message: 'Reunião de Líderes às 19:00', 
//       time: '1 hora atrás', 
//       read: false,
//       icon: Calendar,
//       color: 'bg-pink-100 text-pink-600'
//     },
//     { 
//       id: 3, 
//       type: 'goal', 
//       title: 'Meta alcançada! 🎉', 
//       message: 'Treinamento de Líderes concluído', 
//       time: '3 horas atrás', 
//       read: true,
//       icon: Target,
//       color: 'bg-orange-100 text-orange-600'
//     },
//     { 
//       id: 4, 
//       type: 'prayer', 
//       title: 'Pedido de oração urgente', 
//       message: 'José Ricardo pediu oração pela família', 
//       time: 'Ontem', 
//       read: true,
//       icon: Heart,
//       color: 'bg-red-100 text-red-600'
//     },
//     { 
//       id: 5, 
//       type: 'finance', 
//       title: 'Relatório financeiro disponível', 
//       message: 'Resumo de setembro está pronto', 
//       time: '2 dias atrás', 
//       read: true,
//       icon: DollarSign,
//       color: 'bg-emerald-100 text-emerald-600'
//     }
//   ]);

//   const modules = [
//     { id: 'dashboard', name: 'Dashboard', icon: Menu, color: 'bg-blue-500' },
//     { id: 'bible', name: 'Bíblia', icon: Book, color: 'bg-purple-500' },
//     { id: 'sermons', name: 'Sermões', icon: FileText, color: 'bg-green-500' },
//     { id: 'goals', name: 'Metas', icon: Target, color: 'bg-orange-500' },
//     { id: 'calendar', name: 'Agenda', icon: Calendar, color: 'bg-pink-500' },
//     { id: 'members', name: 'Membros', icon: Users, color: 'bg-indigo-500' },
//     { id: 'finances', name: 'Finanças', icon: DollarSign, color: 'bg-emerald-500' },
//     { id: 'prayer', name: 'Oração', icon: Heart, color: 'bg-red-500' },
//     { id: 'library', name: 'Biblioteca', icon: BookOpen, color: 'bg-amber-500' },
//   ];

//   const stats = [
//     { label: 'Sermões Criados', value: '24', change: '+3 este mês', color: 'bg-green-50 text-green-700' },
//     { label: 'Metas Ativas', value: '12', change: '8 em andamento', color: 'bg-orange-50 text-orange-700' },
//     { label: 'Membros Ativos', value: '456', change: '+15 este mês', color: 'bg-indigo-50 text-indigo-700' },
//     { label: 'Eventos Próximos', value: '7', change: 'Próximos 30 dias', color: 'bg-pink-50 text-pink-700' },
//   ];

//   const recentActivity = [
//     { type: 'sermon', title: 'Sermão: O Bom Pastor', time: 'Há 2 horas', icon: FileText, color: 'text-green-500' },
//     { type: 'bible', title: 'Marcou João 3:16', time: 'Há 5 horas', icon: Book, color: 'text-purple-500' },
//     { type: 'goal', title: 'Meta concluída: Treinamento de Líderes', time: 'Ontem', icon: Target, color: 'text-orange-500' },
//     { type: 'prayer', title: 'Novo pedido de oração adicionado', time: 'Há 2 dias', icon: Heart, color: 'text-red-500' },
//   ];

//   const quickActions = [
//     { name: 'Novo Sermão', icon: FileText, color: 'bg-green-500 hover:bg-green-600' },
//     { name: 'Ler Bíblia', icon: Book, color: 'bg-purple-500 hover:bg-purple-600' },
//     { name: 'Adicionar Meta', icon: Target, color: 'bg-orange-500 hover:bg-orange-600' },
//     { name: 'Criar Evento', icon: Calendar, color: 'bg-pink-500 hover:bg-pink-600' },
//   ];

//   // Funções de gerenciamento de notificações
//   const unreadCount = notifications.filter(n => !n.read).length;
  
//   const markAsRead = (id) => {
//     setNotifications(notifications.map(n => 
//       n.id === id ? { ...n, read: true } : n
//     ));
//   };

//   const markAllAsRead = () => {
//     setNotifications(notifications.map(n => ({ ...n, read: true })));
//   };

//   const deleteNotification = (id) => {
//     setNotifications(notifications.filter(n => n.id !== id));
//   };

//   const clearAllNotifications = () => {
//     setNotifications([]);
//     setShowNotifications(false);
//   };

//   // Função para atualizar perfil
//   const handleProfileUpdate = (field, value) => {
//     setUserProfile({ ...userProfile, [field]: value });
//   };

//   // Função para salvar perfil
//   const saveProfile = () => {
//     alert('Perfil atualizado com sucesso! ✅');
//     setShowProfile(false);
//   };

//   return (
//     <div className="flex h-screen bg-gray-50">
//       {/* Sidebar */}
//       <aside className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-gradient-to-b from-slate-800 to-slate-900 text-white transition-all duration-300 flex flex-col shadow-xl`}>
//         {/* Logo */}
//         <div className="p-6 flex items-center justify-between border-b border-slate-700">
//           {sidebarOpen && (
//             <div>
//               <h1 className="text-xl font-bold">Shepherd's</h1>
//               <p className="text-xs text-slate-400">Toolkit</p>
//             </div>
//           )}
//           <button 
//             onClick={() => setSidebarOpen(!sidebarOpen)}
//             className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
//           >
//             {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
//           </button>
//         </div>

//         {/* Menu Items */}
//         <nav className="flex-1 overflow-y-auto py-4">
//           {modules.map((module) => {
//             const Icon = module.icon;
//             return (
//               <button
//                 key={module.id}
//                 onClick={() => setActiveModule(module.id)}
//                 className={`w-full flex items-center gap-3 px-6 py-3 hover:bg-slate-700 transition-colors ${
//                   activeModule === module.id ? 'bg-slate-700 border-l-4 border-blue-500' : ''
//                 }`}
//               >
//                 <Icon size={20} />
//                 {sidebarOpen && <span className="text-sm font-medium">{module.name}</span>}
//               </button>
//             );
//           })}
//         </nav>

//         {/* User Section - CLICÁVEL */}
//         <div className="p-4 border-t border-slate-700">
//           <button
//             onClick={() => setShowProfile(true)}
//             className={`w-full flex items-center gap-3 p-2 hover:bg-slate-700 rounded-lg transition-colors ${!sidebarOpen && 'justify-center'}`}
//           >
//             <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
//               <User size={20} />
//             </div>
//             {sidebarOpen && (
//               <div className="flex-1 text-left">
//                 <p className="text-sm font-medium">{userProfile.name.split(' ')[0]} {userProfile.name.split(' ')[1]}</p>
//                 <p className="text-xs text-slate-400">{userProfile.church}</p>
//               </div>
//             )}
//           </button>
//         </div>
//       </aside>

//       {/* Main Content */}
//       <main className="flex-1 flex flex-col overflow-hidden">
//         {/* Header */}
//         <header className="bg-white border-b border-gray-200 px-8 py-4 shadow-sm">
//           <div className="flex items-center justify-between">
//             <div>
//               <h2 className="text-2xl font-bold text-gray-800">Bem-vindo de volta, {userProfile.name.split(' ')[0]}!</h2>
//               <p className="text-sm text-gray-500 mt-1">Sexta-feira, 11 de Outubro de 2025</p>
//             </div>
            
//             <div className="flex items-center gap-4">
//               {/* Search */}
//               <div className="relative">
//                 <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
//                 <input
//                   type="text"
//                   placeholder="Buscar..."
//                   className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
//                 />
//               </div>

//               {/* Notifications - CLICÁVEL */}
//               <div className="relative">
//                 <button 
//                   onClick={() => setShowNotifications(!showNotifications)}
//                   className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors"
//                 >
//                   <Bell size={20} className="text-gray-600" />
//                   {unreadCount > 0 && (
//                     <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold animate-pulse">
//                       {unreadCount}
//                     </span>
//                   )}
//                 </button>

//                 {/* Dropdown de Notificações */}
//                 {showNotifications && (
//                   <>
//                     <div 
//                       className="fixed inset-0 z-40"
//                       onClick={() => setShowNotifications(false)}
//                     />
//                     <div className="absolute right-0 mt-2 w-96 bg-white rounded-xl shadow-2xl border border-gray-200 z-50 overflow-hidden">
//                       {/* Header */}
//                       <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-4 text-white">
//                         <div className="flex items-center justify-between mb-2">
//                           <h3 className="font-bold text-lg flex items-center gap-2">
//                             <Bell size={20} />
//                             Notificações
//                           </h3>
//                           {unreadCount > 0 && (
//                             <span className="bg-white bg-opacity-30 px-3 py-1 rounded-full text-xs font-bold">
//                               {unreadCount} novas
//                             </span>
//                           )}
//                         </div>
//                         {notifications.length > 0 && (
//                           <div className="flex gap-2">
//                             {unreadCount > 0 && (
//                               <button 
//                                 onClick={markAllAsRead}
//                                 className="text-xs bg-white bg-opacity-20 hover:bg-opacity-30 px-3 py-1 rounded-lg transition-all"
//                               >
//                                 Marcar todas como lidas
//                               </button>
//                             )}
//                             <button 
//                               onClick={clearAllNotifications}
//                               className="text-xs bg-white bg-opacity-20 hover:bg-opacity-30 px-3 py-1 rounded-lg transition-all"
//                             >
//                               Limpar tudo
//                             </button>
//                           </div>
//                         )}
//                       </div>

//                       {/* Lista de Notificações */}
//                       <div className="max-h-96 overflow-y-auto">
//                         {notifications.length === 0 ? (
//                           <div className="p-8 text-center">
//                             <Bell size={48} className="mx-auto mb-3 text-gray-300" />
//                             <p className="text-gray-500 font-medium">Nenhuma notificação</p>
//                             <p className="text-gray-400 text-sm mt-1">Você está em dia! 🎉</p>
//                           </div>
//                         ) : (
//                           notifications.map((notif) => {
//                             const Icon = notif.icon;
//                             return (
//                               <div
//                                 key={notif.id}
//                                 className={`p-4 border-b border-gray-100 hover:bg-gray-50 transition-all ${
//                                   !notif.read ? 'bg-blue-50' : ''
//                                 }`}
//                               >
//                                 <div className="flex gap-3">
//                                   <div className={`${notif.color} p-2 rounded-lg h-fit`}>
//                                     <Icon size={18} />
//                                   </div>
//                                   <div className="flex-1 min-w-0">
//                                     <div className="flex items-start justify-between gap-2">
//                                       <h4 className="font-semibold text-gray-800 text-sm">
//                                         {notif.title}
//                                       </h4>
//                                       {!notif.read && (
//                                         <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 mt-1" />
//                                       )}
//                                     </div>
//                                     <p className="text-sm text-gray-600 mt-1">{notif.message}</p>
//                                     <div className="flex items-center justify-between mt-2">
//                                       <span className="text-xs text-gray-400 flex items-center gap-1">
//                                         <Clock size={12} />
//                                         {notif.time}
//                                       </span>
//                                       <div className="flex gap-2">
//                                         {!notif.read && (
//                                           <button
//                                             onClick={() => markAsRead(notif.id)}
//                                             className="text-xs text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
//                                           >
//                                             <Check size={12} />
//                                             Lida
//                                           </button>
//                                         )}
//                                         <button
//                                           onClick={() => deleteNotification(notif.id)}
//                                           className="text-xs text-red-600 hover:text-red-700 font-medium flex items-center gap-1"
//                                         >
//                                           <Trash2 size={12} />
//                                           Excluir
//                                         </button>
//                                       </div>
//                                     </div>
//                                   </div>
//                                 </div>
//                               </div>
//                             );
//                           })
//                         )}
//                       </div>
//                     </div>
//                   </>
//                 )}
//               </div>

//               {/* Settings - CLICÁVEL */}
//               <button 
//                 onClick={() => setShowSettings(true)}
//                 className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
//               >
//                 <Settings size={20} className="text-gray-600" />
//               </button>
//             </div>
//           </div>
//         </header>

//         {/* Dashboard Content */}
//         <div className="flex-1 overflow-y-auto p-8">
//           {/* Stats Grid */}
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//             {stats.map((stat, idx) => (
//               <div key={idx} className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow cursor-pointer">
//                 <div className={`inline-block px-3 py-1 rounded-full text-xs font-medium mb-3 ${stat.color}`}>
//                   {stat.change}
//                 </div>
//                 <h3 className="text-3xl font-bold text-gray-800 mb-1">{stat.value}</h3>
//                 <p className="text-sm text-gray-600">{stat.label}</p>
//               </div>
//             ))}
//           </div>

//           {/* Quick Actions */}
//           <div className="mb-8">
//             <h3 className="text-lg font-semibold text-gray-800 mb-4">Ações Rápidas</h3>
//             <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
//               {quickActions.map((action, idx) => {
//                 const Icon = action.icon;
//                 return (
//                   <button
//                     key={idx}
//                     className={`${action.color} text-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all flex flex-col items-center gap-3 transform hover:scale-105`}
//                   >
//                     <Icon size={28} />
//                     <span className="font-medium">{action.name}</span>
//                   </button>
//                 );
//               })}
//             </div>
//           </div>

//           {/* Two Column Layout */}
//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//             {/* Recent Activity */}
//             <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6 border border-gray-100">
//               <h3 className="text-lg font-semibold text-gray-800 mb-4">Atividade Recente</h3>
//               <div className="space-y-4">
//                 {recentActivity.map((activity, idx) => {
//                   const Icon = activity.icon;
//                   return (
//                     <div key={idx} className="flex items-start gap-4 p-4 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer">
//                       <div className={`p-2 bg-gray-100 rounded-lg ${activity.color}`}>
//                         <Icon size={20} />
//                       </div>
//                       <div className="flex-1">
//                         <p className="font-medium text-gray-800">{activity.title}</p>
//                         <p className="text-sm text-gray-500 mt-1">{activity.time}</p>
//                       </div>
//                     </div>
//                   );
//                 })}
//               </div>
//             </div>

//             {/* Upcoming Events */}
//             <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
//               <h3 className="text-lg font-semibold text-gray-800 mb-4">Próximos Eventos</h3>
//               <div className="space-y-4">
//                 <div className="p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg border-l-4 border-blue-500 cursor-pointer hover:shadow-md transition-all">
//                   <p className="font-medium text-gray-800">Culto de Domingo</p>
//                   <p className="text-sm text-gray-600 mt-1">Domingo, 10:00 AM</p>
//                 </div>
//                 <div className="p-4 bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg border-l-4 border-purple-500 cursor-pointer hover:shadow-md transition-all">
//                   <p className="font-medium text-gray-800">Reunião de Líderes</p>
//                   <p className="text-sm text-gray-600 mt-1">Terça, 19:00 PM</p>
//                 </div>
//                 <div className="p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-lg border-l-4 border-green-500 cursor-pointer hover:shadow-md transition-all">
//                   <p className="font-medium text-gray-800">Estudo Bíblico</p>
//                   <p className="text-sm text-gray-600 mt-1">Quarta, 20:00 PM</p>
//                 </div>
//               </div>
//               <button className="w-full mt-4 py-2 text-sm text-blue-600 hover:text-blue-700 font-medium hover:bg-blue-50 rounded-lg transition-all">
//                 Ver todos os eventos →
//               </button>
//             </div>
//           </div>
//         </div>
//       </main>

//       {/* MODAL DE PERFIL */}
//       {showProfile && (
//         <>
//           <div 
//             className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
//             onClick={() => setShowProfile(false)}
//           >
//             <div 
//               className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
//               onClick={(e) => e.stopPropagation()}
//             >
//               {/* Header com Gradiente */}
//               <div className="bg-gradient-to-r from-blue-600 via-blue-500 to-purple-600 p-8 text-white relative overflow-hidden">
//                 <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full -mr-32 -mt-32" />
//                 <div className="absolute bottom-0 left-0 w-48 h-48 bg-white opacity-10 rounded-full -ml-24 -mb-24" />
                
//                 <button 
//                   onClick={() => setShowProfile(false)}
//                   className="absolute top-4 right-4 p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors z-10"
//                 >
//                   <X size={24} />
//                 </button>

//                 <div className="relative flex items-start gap-6">
//                   <div className="relative group">
//                     <div className="w-24 h-24 bg-white bg-opacity-20 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-xl">
//                       <User size={48} />
//                     </div>
//                     <button className="absolute bottom-0 right-0 bg-white text-blue-600 p-2 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
//                       <Camera size={16} />
//                     </button>
//                   </div>
//                   <div className="flex-1">
//                     <h2 className="text-3xl font-bold mb-2">{userProfile.name}</h2>
//                     <p className="text-blue-100 text-lg mb-4">{userProfile.role}</p>
//                     <div className="flex flex-wrap gap-3">
//                       <div className="flex items-center gap-2 bg-white bg-opacity-20 px-3 py-1 rounded-lg backdrop-blur-sm">
//                         <MapPin size={16} />
//                         <span className="text-sm">{userProfile.address}</span>
//                       </div>
//                       <div className="flex items-center gap-2 bg-white bg-opacity-20 px-3 py-1 rounded-lg backdrop-blur-sm">
//                         <Calendar size={16} />
//                         <span className="text-sm">Desde {userProfile.since}</span>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Body */}
//               <div className="p-8">
//                 {/* Estatísticas Rápidas */}
//                 <div className="grid grid-cols-4 gap-4 mb-8">
//                   <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-xl text-center">
//                     <FileText className="mx-auto mb-2 text-blue-600" size={24} />
//                     <p className="text-2xl font-bold text-blue-600">156</p>
//                     <p className="text-xs text-gray-600">Sermões</p>
//                   </div>
//                   <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-xl text-center">
//                     <Calendar className="mx-auto mb-2 text-green-600" size={24} />
//                     <p className="text-2xl font-bold text-green-600">89</p>
//                     <p className="text-xs text-gray-600">Eventos</p>
//                   </div>
//                   <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-xl text-center">
//                     <Users className="mx-auto mb-2 text-purple-600" size={24} />
//                     <p className="text-2xl font-bold text-purple-600">456</p>
//                     <p className="text-xs text-gray-600">Membros</p>
//                   </div>
//                   <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-4 rounded-xl text-center">
//                     <Award className="mx-auto mb-2 text-orange-600" size={24} />
//                     <p className="text-2xl font-bold text-orange-600">7</p>
//                     <p className="text-xs text-gray-600">Anos</p>
//                   </div>
//                 </div>

//                 {/* Formulário de Edição */}
//                 <div className="space-y-6">
//                   <div>
//                     <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
//                       <User size={20} className="text-blue-600" />
//                       Informações Pessoais
//                     </h3>
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-2">Nome Completo</label>
//                         <input
//                           type="text"
//                           value={userProfile.name}
//                           onChange={(e) => handleProfileUpdate('name', e.target.value)}
//                           className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                         />
//                       </div>
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-2">Cargo</label>
//                         <input
//                           type="text"
//                           value={userProfile.role}
//                           onChange={(e) => handleProfileUpdate('role', e.target.value)}
//                           className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                         />
//                       </div>
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
//                         <div className="relative">
//                           <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
//                           <input
//                             type="email"
//                             value={userProfile.email}
//                             onChange={(e) => handleProfileUpdate('email', e.target.value)}
//                             className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                           />
//                         </div>
//                       </div>
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-2">Telefone</label>
//                         <div className="relative">
//                           <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
//                           <input
//                             type="tel"
//                             value={userProfile.phone}
//                             onChange={(e) => handleProfileUpdate('phone', e.target.value)}
//                             className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                           />
//                         </div>
//                       </div>
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-2">Igreja</label>
//                         <input
//                           type="text"
//                           value={userProfile.church}
//                           onChange={(e) => handleProfileUpdate('church', e.target.value)}
//                           className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                         />
//                       </div>
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-2">Endereço</label>
//                         <div className="relative">
//                           <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
//                           <input
//                             type="text"
//                             value={userProfile.address}
//                             onChange={(e) => handleProfileUpdate('address', e.target.value)}
//                             className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                           />
//                         </div>
//                       </div>
//                     </div>
                    
//                     <div className="mt-4">
//                       <label className="block text-sm font-medium text-gray-700 mb-2">Biografia</label>
//                       <textarea
//                         value={userProfile.bio}
//                         onChange={(e) => handleProfileUpdate('bio', e.target.value)}
//                         rows="3"
//                         className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
//                         placeholder="Conte um pouco sobre você..."
//                       />
//                     </div>
//                   </div>

//                   {/* Ações Rápidas do Perfil */}
//                   <div>
//                     <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
//                       <Zap size={20} className="text-blue-600" />
//                       Ações Rápidas
//                     </h3>
//                     <div className="grid grid-cols-2 gap-3">
//                       <button className="flex items-center gap-3 p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg hover:from-blue-100 hover:to-blue-200 transition-all">
//                         <Lock className="text-blue-600" size={20} />
//                         <span className="text-sm font-medium text-gray-700">Alterar Senha</span>
//                       </button>
//                       <button className="flex items-center gap-3 p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-lg hover:from-green-100 hover:to-green-200 transition-all">
//                         <Download className="text-green-600" size={20} />
//                         <span className="text-sm font-medium text-gray-700">Exportar Dados</span>
//                       </button>
//                       <button className="flex items-center gap-3 p-4 bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg hover:from-purple-100 hover:to-purple-200 transition-all">
//                         <Shield className="text-purple-600" size={20} />
//                         <span className="text-sm font-medium text-gray-700">Privacidade</span>
//                       </button>
//                       <button className="flex items-center gap-3 p-4 bg-gradient-to-r from-red-50 to-red-100 rounded-lg hover:from-red-100 hover:to-red-200 transition-all">
//                         <LogOut className="text-red-600" size={20} />
//                         <span className="text-sm font-medium text-gray-700">Sair da Conta</span>
//                       </button>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Botões de Ação */}
//                 <div className="flex gap-3 mt-8 pt-6 border-t border-gray-200">
//                   <button
//                     onClick={saveProfile}
//                     className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-600 hover:to-blue-700 transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
//                   >
//                     💾 Salvar Alterações
//                   </button>
//                   <button
//                     onClick={() => setShowProfile(false)}
//                     className="px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-all"
//                   >
//                     Cancelar
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </>
//       )}

//       {/* PAINEL DE CONFIGURAÇÕES */}
//       {showSettings && (
//         <>
//           <div 
//             className="fixed inset-0 bg-black bg-opacity-50 z-50"
//             onClick={() => setShowSettings(false)}
//           />
//           <div className="fixed right-0 top-0 bottom-0 w-full max-w-lg bg-white shadow-2xl z-50 overflow-y-auto">
//             {/* Header */}
//             <div className="bg-gradient-to-r from-slate-800 to-slate-900 text-white p-6 sticky top-0 z-10">
//               <div className="flex items-center justify-between">
//                 <div className="flex items-center gap-3">
//                   <div className="bg-white bg-opacity-20 p-2 rounded-lg">
//                     <Settings size={24} />
//                   </div>
//                   <div>
//                     <h2 className="text-2xl font-bold">Configurações</h2>
//                     <p className="text-sm text-slate-300">Personalize sua experiência</p>
//                   </div>
//                 </div>
//                 <button 
//                   onClick={() => setShowSettings(false)}
//                   className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors"
//                 >
//                   <X size={24} />
//                 </button>
//               </div>
//             </div>

//             {/* Conteúdo das Configurações */}
//             <div className="p-6 space-y-6">
              
//               {/* Aparência */}
//               <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 border border-purple-200">
//                 <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
//                   <div className="bg-purple-500 p-2 rounded-lg">
//                     {darkMode ? <Moon size={20} className="text-white" /> : <Sun size={20} className="text-white" />}
//                   </div>
//                   Aparência
//                 </h3>
//                 <div className="space-y-3">
//                   <label className="flex items-center justify-between p-4 bg-white rounded-lg cursor-pointer hover:shadow-md transition-all">
//                     <div className="flex items-center gap-3">
//                       <Moon size={20} className="text-gray-600" />
//                       <div>
//                         <p className="font-medium text-gray-800">Modo Escuro</p>
//                         <p className="text-xs text-gray-500">Ative o tema escuro</p>
//                       </div>
//                     </div>
//                     <input 
//                       type="checkbox" 
//                       checked={darkMode}
//                       onChange={(e) => setDarkMode(e.target.checked)}
//                       className="w-12 h-6 rounded-full appearance-none bg-gray-300 checked:bg-blue-500 relative cursor-pointer transition-colors"
//                     />
//                   </label>
                  
//                   <label className="flex items-center justify-between p-4 bg-white rounded-lg cursor-pointer hover:shadow-md transition-all">
//                     <div className="flex items-center gap-3">
//                       <Zap size={20} className="text-gray-600" />
//                       <div>
//                         <p className="font-medium text-gray-800">Modo Compacto</p>
//                         <p className="text-xs text-gray-500">Interface mais compacta</p>
//                       </div>
//                     </div>
//                     <input 
//                       type="checkbox"
//                       checked={compactMode}
//                       onChange={(e) => setCompactMode(e.target.checked)}
//                       className="w-12 h-6 rounded-full appearance-none bg-gray-300 checked:bg-blue-500 relative cursor-pointer transition-colors"
//                     />
//                   </label>
//                 </div>
//               </div>

//               {/* Notificações */}
//               <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200">
//                 <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
//                   <div className="bg-blue-500 p-2 rounded-lg">
//                     <Bell size={20} className="text-white" />
//                   </div>
//                   Notificações
//                 </h3>
//                 <div className="space-y-3">
//                   <label className="flex items-center justify-between p-4 bg-white rounded-lg cursor-pointer hover:shadow-md transition-all">
//                     <div className="flex items-center gap-3">
//                       <Calendar size={18} className="text-gray-600" />
//                       <span className="font-medium text-gray-800">Eventos</span>
//                     </div>
//                     <input 
//                       type="checkbox"
//                       checked={notifSettings.events}
//                       onChange={(e) => setNotifSettings({...notifSettings, events: e.target.checked})}
//                       className="w-5 h-5 text-blue-600 rounded"
//                     />
//                   </label>
                  
//                   <label className="flex items-center justify-between p-4 bg-white rounded-lg cursor-pointer hover:shadow-md transition-all">
//                     <div className="flex items-center gap-3">
//                       <Heart size={18} className="text-gray-600" />
//                       <span className="font-medium text-gray-800">Pedidos de Oração</span>
//                     </div>
//                     <input 
//                       type="checkbox"
//                       checked={notifSettings.prayers}
//                       onChange={(e) => setNotifSettings({...notifSettings, prayers: e.target.checked})}
//                       className="w-5 h-5 text-blue-600 rounded"
//                     />
//                   </label>
                  
//                   <label className="flex items-center justify-between p-4 bg-white rounded-lg cursor-pointer hover:shadow-md transition-all">
//                     <div className="flex items-center gap-3">
//                       <Users size={18} className="text-gray-600" />
//                       <span className="font-medium text-gray-800">Novos Membros</span>
//                     </div>
//                     <input 
//                       type="checkbox"
//                       checked={notifSettings.members}
//                       onChange={(e) => setNotifSettings({...notifSettings, members: e.target.checked})}
//                       className="w-5 h-5 text-blue-600 rounded"
//                     />
//                   </label>
                  
//                   <label className="flex items-center justify-between p-4 bg-white rounded-lg cursor-pointer hover:shadow-md transition-all">
//                     <div className="flex items-center gap-3">
//                       <DollarSign size={18} className="text-gray-600" />
//                       <span className="font-medium text-gray-800">Finanças</span>
//                     </div>
//                     <input 
//                       type="checkbox"
//                       checked={notifSettings.finances}
//                       onChange={(e) => setNotifSettings({...notifSettings, finances: e.target.checked})}
//                       className="w-5 h-5 text-blue-600 rounded"
//                     />
//                   </label>
                  
//                   <label className="flex items-center justify-between p-4 bg-white rounded-lg cursor-pointer hover:shadow-md transition-all">
//                     <div className="flex items-center gap-3">
//                       <Target size={18} className="text-gray-600" />
//                       <span className="font-medium text-gray-800">Metas</span>
//                     </div>
//                     <input 
//                       type="checkbox"
//                       checked={notifSettings.goals}
//                       onChange={(e) => setNotifSettings({...notifSettings, goals: e.target.checked})}
//                       className="w-5 h-5 text-blue-600 rounded"
//                     />
//                   </label>
//                 </div>
//               </div>

//               {/* Idioma e Região */}
//               <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 border border-green-200">
//                 <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
//                   <div className="bg-green-500 p-2 rounded-lg">
//                     <Globe size={20} className="text-white" />
//                   </div>
//                   Idioma e Região
//                 </h3>
//                 <div className="space-y-3">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">Idioma</label>
//                     <select 
//                       value={language}
//                       onChange={(e) => setLanguage(e.target.value)}
//                       className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 cursor-pointer"
//                     >
//                       <option value="pt-BR">🇧🇷 Português (Brasil)</option>
//                       <option value="en-US">🇺🇸 English (US)</option>
//                       <option value="es-ES">🇪🇸 Español</option>
//                       <option value="fr-FR">🇫🇷 Français</option>
//                     </select>
//                   </div>
//                 </div>
//               </div>

//               {/* Privacidade e Segurança */}
//               <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-6 border border-orange-200">
//                 <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
//                   <div className="bg-orange-500 p-2 rounded-lg">
//                     <Shield size={20} className="text-white" />
//                   </div>
//                   Privacidade e Segurança
//                 </h3>
//                 <div className="space-y-3">
//                   <button className="w-full flex items-center gap-3 p-4 bg-white rounded-lg hover:shadow-md transition-all text-left">
//                     <Lock size={20} className="text-gray-600" />
//                     <div>
//                       <p className="font-medium text-gray-800">Alterar Senha</p>
//                       <p className="text-xs text-gray-500">Última alteração há 3 meses</p>
//                     </div>
//                   </button>
                  
//                   <button className="w-full flex items-center gap-3 p-4 bg-white rounded-lg hover:shadow-md transition-all text-left">
//                     <Smartphone size={20} className="text-gray-600" />
//                     <div>
//                       <p className="font-medium text-gray-800">Autenticação em Dois Fatores</p>
//                       <p className="text-xs text-gray-500">Adicionar camada extra de segurança</p>
//                     </div>
//                   </button>
                  
//                   <button className="w-full flex items-center gap-3 p-4 bg-white rounded-lg hover:shadow-md transition-all text-left">
//                     <Database size={20} className="text-gray-600" />
//                     <div>
//                       <p className="font-medium text-gray-800">Sessões Ativas</p>
//                       <p className="text-xs text-gray-500">Gerenciar dispositivos conectados</p>
//                     </div>
//                   </button>
//                 </div>
//               </div>

//               {/* Dados e Backup */}
//               <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-xl p-6 border border-red-200">
//                 <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
//                   <div className="bg-red-500 p-2 rounded-lg">
//                     <Database size={20} className="text-white" />
//                   </div>
//                   Dados e Backup
//                 </h3>
//                 <div className="space-y-3">
//                   <button className="w-full flex items-center gap-3 p-4 bg-white rounded-lg hover:shadow-md transition-all text-left">
//                     <Download size={20} className="text-blue-600" />
//                     <div>
//                       <p className="font-medium text-gray-800">Exportar Todos os Dados</p>
//                       <p className="text-xs text-gray-500">Baixar uma cópia dos seus dados</p>
//                     </div>
//                   </button>
                  
//                   <button className="w-full flex items-center gap-3 p-4 bg-white rounded-lg hover:shadow-md transition-all text-left">
//                     <Database size={20} className="text-green-600" />
//                     <div>
//                       <p className="font-medium text-gray-800">Backup Automático</p>
//                       <p className="text-xs text-gray-500">Último backup: Hoje às 03:00</p>
//                     </div>
//                   </button>
                  
//                   <button className="w-full flex items-center gap-3 p-4 bg-red-100 rounded-lg hover:bg-red-200 transition-all text-left border-2 border-red-300">
//                     <Trash2 size={20} className="text-red-600" />
//                     <div>
//                       <p className="font-medium text-red-800">Excluir Conta</p>
//                       <p className="text-xs text-red-600">Esta ação é permanente</p>
//                     </div>
//                   </button>
//                 </div>
//               </div>

//               {/* Sobre */}
//               <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 border border-gray-200 text-center">
//                 <div className="mb-4">
//                   <div className="inline-block bg-gradient-to-br from-blue-500 to-purple-600 text-white px-4 py-2 rounded-lg font-bold text-xl mb-2">
//                     Shepherd's Toolkit
//                   </div>
//                 </div>
//                 <p className="text-gray-600 font-semibold">Versão 2.0.1</p>
//                 <p className="text-sm text-gray-500 mt-2">Última atualização: 10 de Outubro de 2025</p>
//                 <p className="text-xs text-gray-400 mt-4">© 2025 Shepherd's Tech. Todos os direitos reservados.</p>
//                 <div className="flex gap-2 justify-center mt-4">
//                   <button className="text-xs text-blue-600 hover:text-blue-700 font-medium">Termos de Uso</button>
//                   <span className="text-gray-300">•</span>
//                   <button className="text-xs text-blue-600 hover:text-blue-700 font-medium">Política de Privacidade</button>
//                   <span className="text-gray-300">•</span>
//                   <button className="text-xs text-blue-600 hover:text-blue-700 font-medium">Suporte</button>
//                 </div>
//               </div>

//             </div>
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default Tools;