import React, { useState } from 'react';
import { Book, FileText, Target, Users, DollarSign, Heart, BookOpen, Menu, X, Search, Bell, Settings, User } from 'lucide-react';
import Sidebar from './components/layout/Sidebar';
import Dashboard from './components/Dashboard';
import Bible from './components/bible';
import Sermons from './components/Sermons';
import Finances from './components/Finances';
import { useSelector } from 'react-redux';
import Prayer from './components/Prayer';
import Goals from './components/Goals';
import Members from './components/Members';
import Calendar from './components/Calendar';

const ShepherdsToolkit = () => {
 
  const activeModule = useSelector((state: any) => state.moduleActive.activeModule);


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
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar />


      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
          {
            (() => {
              switch(activeModule) {
                case 'dashboard':
                  return <Dashboard />;
                case 'bible':
                  return <Bible />;
                case 'sermons':
                  return <Sermons />;
                case 'goals':
                  return <Goals />;
                case 'calendar':
                  return <Calendar />;
                case 'members':
                  return <Members />;
                case 'finances':
                  return <Finances />;
                case 'prayer':
                  return <Prayer />;
                // case 'library':
                //   return <Library />;
                default:
                  return <Dashboard />;
              }
            })()
          }
      </main>
    </div>
  );
};

export default ShepherdsToolkit;
