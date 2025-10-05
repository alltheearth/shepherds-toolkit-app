import React, { useState } from 'react';
import { 
  Book, FileText, Target, Calendar, Users, DollarSign, Heart, BookOpen,
  Menu, X, User, Settings, Search, Plus, TrendingUp, TrendingDown,
  Download, Printer, Filter, ArrowUpRight, ArrowDownRight, PieChart,
  CreditCard, Wallet, Building, ChevronDown, MoreVertical, Edit, Trash2
} from 'lucide-react';

const Finances = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeModule, setActiveModule] = useState('finances');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedPeriod, setSelectedPeriod] = useState('month');

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

  const summaryCards = [
    {
      title: 'Total de Entradas',
      value: 'R$ 45.850,00',
      change: '+12.5%',
      trend: 'up',
      icon: TrendingUp,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      period: 'vs mês anterior'
    },
    {
      title: 'Total de Saídas',
      value: 'R$ 32.420,00',
      change: '-8.3%',
      trend: 'down',
      icon: TrendingDown,
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      period: 'vs mês anterior'
    },
    {
      title: 'Saldo Atual',
      value: 'R$ 13.430,00',
      change: '+45.2%',
      trend: 'up',
      icon: Wallet,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      period: 'disponível'
    },
    {
      title: 'Dízimos',
      value: 'R$ 28.350,00',
      change: '+5.8%',
      trend: 'up',
      icon: Building,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      period: 'este mês'
    },
  ];

  const recentTransactions = [
    {
      id: 1,
      description: 'Dízimos - Domingo',
      category: 'Entrada',
      type: 'income',
      amount: 8500.00,
      date: '2025-10-03',
      method: 'Transferência',
      status: 'confirmed'
    },
    {
      id: 2,
      description: 'Conta de Energia',
      category: 'Utilidades',
      type: 'expense',
      amount: 1200.50,
      date: '2025-10-02',
      method: 'Débito',
      status: 'confirmed'
    },
    {
      id: 3,
      description: 'Ofertas Missionárias',
      category: 'Entrada',
      type: 'income',
      amount: 2300.00,
      date: '2025-10-01',
      method: 'PIX',
      status: 'confirmed'
    },
    {
      id: 4,
      description: 'Material de Limpeza',
      category: 'Manutenção',
      type: 'expense',
      amount: 450.00,
      date: '2025-09-30',
      method: 'Dinheiro',
      status: 'confirmed'
    },
    {
      id: 5,
      description: 'Salário Pastor',
      category: 'Pessoal',
      type: 'expense',
      amount: 5500.00,
      date: '2025-09-30',
      method: 'Transferência',
      status: 'confirmed'
    },
    {
      id: 6,
      description: 'Dízimos - Domingo',
      category: 'Entrada',
      type: 'income',
      amount: 7800.00,
      date: '2025-09-26',
      method: 'Misto',
      status: 'confirmed'
    },
  ];

  const categoryExpenses = [
    { name: 'Pessoal', amount: 12500, percentage: 38.5, color: 'bg-blue-500' },
    { name: 'Utilidades', amount: 4200, percentage: 13.0, color: 'bg-green-500' },
    { name: 'Manutenção', amount: 3800, percentage: 11.7, color: 'bg-yellow-500' },
    { name: 'Ministérios', amount: 5200, percentage: 16.0, color: 'bg-purple-500' },
    { name: 'Missões', amount: 4500, percentage: 13.9, color: 'bg-pink-500' },
    { name: 'Outros', amount: 2220, percentage: 6.9, color: 'bg-gray-500' },
  ];

  const upcomingExpenses = [
    {
      id: 1,
      description: 'Conta de Água',
      amount: 850.00,
      dueDate: '2025-10-10',
      category: 'Utilidades',
      status: 'pending'
    },
    {
      id: 2,
      description: 'Aluguel do Templo',
      amount: 3500.00,
      dueDate: '2025-10-15',
      category: 'Infraestrutura',
      status: 'pending'
    },
    {
      id: 3,
      description: 'Material de Ensino',
      amount: 680.00,
      dueDate: '2025-10-20',
      category: 'Ministérios',
      status: 'pending'
    },
  ];

  const monthlyData = [
    { month: 'Abr', income: 42000, expense: 35000 },
    { month: 'Mai', income: 38000, expense: 32000 },
    { month: 'Jun', income: 45000, expense: 36000 },
    { month: 'Jul', income: 41000, expense: 33000 },
    { month: 'Ago', income: 48000, expense: 38000 },
    { month: 'Set', income: 43000, expense: 31000 },
    { month: 'Out', income: 46000, expense: 32000 },
  ];

  return (
    <>
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 shadow-sm">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <DollarSign className="text-emerald-600" size={28} />
                <div>
                  <h1 className="text-2xl font-bold text-gray-800">Gestão Financeira</h1>
                  <p className="text-sm text-gray-500">Controle completo das finanças da igreja</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <select 
                  value={selectedPeriod}
                  onChange={(e) => setSelectedPeriod(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
                >
                  <option value="week">Esta Semana</option>
                  <option value="month">Este Mês</option>
                  <option value="quarter">Este Trimestre</option>
                  <option value="year">Este Ano</option>
                </select>
                <button className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors">
                  <Plus size={18} />
                  <span className="font-medium">Nova Transação</span>
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <Download size={20} className="text-gray-600" />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <Printer size={20} className="text-gray-600" />
                </button>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-lg w-fit">
              <button
                onClick={() => setActiveTab('dashboard')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === 'dashboard'
                    ? 'bg-white text-gray-800 shadow-sm'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                Dashboard
              </button>
              <button
                onClick={() => setActiveTab('transactions')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === 'transactions'
                    ? 'bg-white text-gray-800 shadow-sm'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                Transações
              </button>
              <button
                onClick={() => setActiveTab('reports')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === 'reports'
                    ? 'bg-white text-gray-800 shadow-sm'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                Relatórios
              </button>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Dashboard Tab */}
          {activeTab === 'dashboard' && (
            <div>
              {/* Summary Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                {summaryCards.map((card, idx) => {
                  const Icon = card.icon;
                  return (
                    <div key={idx} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all">
                      <div className="flex items-start justify-between mb-4">
                        <div className={`p-3 ${card.bgColor} rounded-lg`}>
                          <Icon className={card.color} size={24} />
                        </div>
                        <span className={`flex items-center gap-1 text-sm font-medium ${card.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                          {card.trend === 'up' ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
                          {card.change}
                        </span>
                      </div>
                      <h3 className="text-2xl font-bold text-gray-800 mb-1">{card.value}</h3>
                      <p className="text-sm text-gray-600">{card.title}</p>
                      <p className="text-xs text-gray-500 mt-2">{card.period}</p>
                    </div>
                  );
                })}
              </div>

              {/* Charts and Tables Row */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                {/* Monthly Comparison Chart */}
                <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-bold text-gray-800">Entradas vs Saídas</h3>
                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                        <span className="text-gray-600">Entradas</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                        <span className="text-gray-600">Saídas</span>
                      </div>
                    </div>
                  </div>
                  <div className="h-64 flex items-end justify-between gap-2">
                    {monthlyData.map((data, idx) => {
                      const maxValue = 50000;
                      const incomeHeight = (data.income / maxValue) * 100;
                      const expenseHeight = (data.expense / maxValue) * 100;
                      return (
                        <div key={idx} className="flex-1 flex flex-col items-center gap-2">
                          <div className="w-full flex justify-center gap-1 items-end" style={{ height: '200px' }}>
                            <div
                              className="flex-1 bg-emerald-500 rounded-t hover:bg-emerald-600 transition-colors cursor-pointer relative group"
                              style={{ height: `${incomeHeight}%` }}
                            >
                              <span className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs font-medium text-gray-700 opacity-0 group-hover:opacity-100 transition-opacity">
                                R$ {(data.income / 1000).toFixed(0)}k
                              </span>
                            </div>
                            <div
                              className="flex-1 bg-red-500 rounded-t hover:bg-red-600 transition-colors cursor-pointer relative group"
                              style={{ height: `${expenseHeight}%` }}
                            >
                              <span className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs font-medium text-gray-700 opacity-0 group-hover:opacity-100 transition-opacity">
                                R$ {(data.expense / 1000).toFixed(0)}k
                              </span>
                            </div>
                          </div>
                          <span className="text-xs text-gray-600 font-medium">{data.month}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Category Expenses */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-bold text-gray-800">Despesas por Categoria</h3>
                    <PieChart size={20} className="text-gray-400" />
                  </div>
                  <div className="space-y-4">
                    {categoryExpenses.map((category, idx) => (
                      <div key={idx}>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-gray-700">{category.name}</span>
                          <span className="text-sm font-bold text-gray-800">R$ {category.amount.toLocaleString('pt-BR')}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className={`${category.color} h-2 rounded-full transition-all`}
                            style={{ width: `${category.percentage}%` }}
                          ></div>
                        </div>
                        <span className="text-xs text-gray-500 mt-1">{category.percentage}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Recent Transactions and Upcoming */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Recent Transactions */}
                <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-bold text-gray-800">Transações Recentes</h3>
                    <button className="text-sm text-emerald-600 hover:text-emerald-700 font-medium">
                      Ver todas →
                    </button>
                  </div>
                  <div className="space-y-3">
                    {recentTransactions.slice(0, 5).map((transaction) => (
                      <div
                        key={transaction.id}
                        className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg transition-colors"
                      >
                        <div className="flex items-center gap-4">
                          <div className={`p-2 rounded-lg ${transaction.type === 'income' ? 'bg-green-100' : 'bg-red-100'}`}>
                            {transaction.type === 'income' ? (
                              <ArrowUpRight className="text-green-600" size={20} />
                            ) : (
                              <ArrowDownRight className="text-red-600" size={20} />
                            )}
                          </div>
                          <div>
                            <p className="font-medium text-gray-800">{transaction.description}</p>
                            <div className="flex items-center gap-2 text-sm text-gray-500">
                              <span>{transaction.category}</span>
                              <span>•</span>
                              <span>{new Date(transaction.date).toLocaleDateString('pt-BR')}</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className={`font-bold ${transaction.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                            {transaction.type === 'income' ? '+' : '-'} R$ {transaction.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                          </p>
                          <span className="text-xs text-gray-500">{transaction.method}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Upcoming Expenses */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-bold text-gray-800">Despesas Próximas</h3>
                    <Calendar size={20} className="text-gray-400" />
                  </div>
                  <div className="space-y-3">
                    {upcomingExpenses.map((expense) => (
                      <div
                        key={expense.id}
                        className="p-4 bg-gradient-to-r from-orange-50 to-red-50 rounded-lg border-l-4 border-orange-500"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <p className="font-medium text-gray-800 text-sm">{expense.description}</p>
                          <button className="p-1 hover:bg-white rounded transition-colors">
                            <MoreVertical size={16} className="text-gray-400" />
                          </button>
                        </div>
                        <p className="font-bold text-gray-800 mb-2">
                          R$ {expense.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                        </p>
                        <div className="flex items-center justify-between text-xs text-gray-600">
                          <span>{expense.category}</span>
                          <span className="font-medium">{new Date(expense.dueDate).toLocaleDateString('pt-BR')}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Transactions Tab */}
          {activeTab === 'transactions' && (
            <div>
              <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                {/* Filters */}
                <div className="p-6 border-b border-gray-200">
                  <div className="flex items-center gap-4">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                      <input
                        type="text"
                        placeholder="Buscar transações..."
                        className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 w-full"
                      />
                    </div>
                    <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white">
                      <option>Todas as Categorias</option>
                      <option>Entradas</option>
                      <option>Utilidades</option>
                      <option>Pessoal</option>
                      <option>Manutenção</option>
                    </select>
                    <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                      <Filter size={18} />
                      <span>Mais Filtros</span>
                    </button>
                  </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Data</th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Descrição</th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Categoria</th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Método</th>
                        <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase">Valor</th>
                        <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase">Ações</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {recentTransactions.map((transaction) => (
                        <tr key={transaction.id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4 text-sm text-gray-600">
                            {new Date(transaction.date).toLocaleDateString('pt-BR')}
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className={`p-2 rounded-lg ${transaction.type === 'income' ? 'bg-green-100' : 'bg-red-100'}`}>
                                {transaction.type === 'income' ? (
                                  <ArrowUpRight className="text-green-600" size={16} />
                                ) : (
                                  <ArrowDownRight className="text-red-600" size={16} />
                                )}
                              </div>
                              <span className="font-medium text-gray-800">{transaction.description}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">
                              {transaction.category}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-600">{transaction.method}</td>
                          <td className="px-6 py-4 text-right">
                            <span className={`font-bold ${transaction.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                              {transaction.type === 'income' ? '+' : '-'} R$ {transaction.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center justify-center gap-2">
                              <button className="p-2 hover:bg-gray-200 rounded transition-colors" title="Editar">
                                <Edit size={16} className="text-gray-600" />
                              </button>
                              <button className="p-2 hover:bg-red-100 rounded transition-colors" title="Excluir">
                                <Trash2 size={16} className="text-red-600" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Pagination */}
                <div className="p-6 border-t border-gray-200 flex items-center justify-between">
                  <span className="text-sm text-gray-600">Mostrando 1-6 de 48 transações</span>
                  <div className="flex gap-2">
                    <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                      Anterior
                    </button>
                    <button className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors text-sm">
                      Próximo
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Reports Tab */}
          {activeTab === 'reports' && (
            <div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                {/* Report Cards */}
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl shadow-lg p-6 cursor-pointer hover:shadow-xl transition-all">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold">Relatório Mensal</h3>
                    <Download size={20} />
                  </div>
                  <p className="text-sm text-blue-100 mb-4">
                    Resumo completo de entradas e saídas do mês
                  </p>
                  <button className="w-full bg-white text-blue-600 py-2 rounded-lg font-medium hover:bg-blue-50 transition-colors">
                    Gerar Relatório
                  </button>
                </div>

                <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-xl shadow-lg p-6 cursor-pointer hover:shadow-xl transition-all">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold">Relatório de Dízimos</h3>
                    <Download size={20} />
                  </div>
                  <p className="text-sm text-purple-100 mb-4">
                    Análise detalhada de dízimos e ofertas
                  </p>
                  <button className="w-full bg-white text-purple-600 py-2 rounded-lg font-medium hover:bg-purple-50 transition-colors">
                    Gerar Relatório
                  </button>
                </div>

                <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-xl shadow-lg p-6 cursor-pointer hover:shadow-xl transition-all">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold">Relatório Anual</h3>
                    <Download size={20} />
                  </div>
                  <p className="text-sm text-green-100 mb-4">
                    Balanço geral do ano fiscal completo
                  </p>
                  <button className="w-full bg-white text-green-600 py-2 rounded-lg font-medium hover:bg-green-50 transition-colors">
                    Gerar Relatório
                  </button>
                </div>

                <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-xl shadow-lg p-6 cursor-pointer hover:shadow-xl transition-all">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold">Relatório por Categoria</h3>
                    <Download size={20} />
                  </div>
                  <p className="text-sm text-orange-100 mb-4">
                    Despesas organizadas por categorias
                  </p>
                  <button className="w-full bg-white text-orange-600 py-2 rounded-lg font-medium hover:bg-orange-50 transition-colors">
                    Gerar Relatório
                  </button>
                </div>

                <div className="bg-gradient-to-br from-pink-500 to-pink-600 text-white rounded-xl shadow-lg p-6 cursor-pointer hover:shadow-xl transition-all">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold">Relatório de Missões</h3>
                    <Download size={20} />
                  </div>
                  <p className="text-sm text-pink-100 mb-4">
                    Investimentos em trabalhos missionários
                  </p>
                  <button className="w-full bg-white text-pink-600 py-2 rounded-lg font-medium hover:bg-pink-50 transition-colors">
                    Gerar Relatório
                  </button>
                </div>

                <div className="bg-gradient-to-br from-indigo-500 to-indigo-600 text-white rounded-xl shadow-lg p-6 cursor-pointer hover:shadow-xl transition-all">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold">Relatório Personalizado</h3>
                    <Download size={20} />
                  </div>
                  <p className="text-sm text-indigo-100 mb-4">
                    Crie um relatório com filtros customizados
                  </p>
                  <button className="w-full bg-white text-indigo-600 py-2 rounded-lg font-medium hover:bg-indigo-50 transition-colors">
                    Criar Relatório
                  </button>
                </div>
              </div>

              {/* Recent Reports */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-4">Relatórios Recentes</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <FileText className="text-blue-600" size={20} />
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">Relatório Mensal - Setembro 2025</p>
                        <p className="text-sm text-gray-500">Gerado em 01/10/2025</p>
                      </div>
                    </div>
                    <button className="p-2 hover:bg-gray-200 rounded transition-colors">
                      <Download size={18} className="text-gray-600" />
                    </button>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-purple-100 rounded-lg">
                        <FileText className="text-purple-600" size={20} />
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">Relatório de Dízimos - Q3 2025</p>
                        <p className="text-sm text-gray-500">Gerado em 28/09/2025</p>
                      </div>
                    </div>
                    <button className="p-2 hover:bg-gray-200 rounded transition-colors">
                      <Download size={18} className="text-gray-600" />
                    </button>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-green-100 rounded-lg">
                        <FileText className="text-green-600" size={20} />
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">Balanço Semestral 2025</p>
                        <p className="text-sm text-gray-500">Gerado em 15/09/2025</p>
                      </div>
                    </div>
                    <button className="p-2 hover:bg-gray-200 rounded transition-colors">
                      <Download size={18} className="text-gray-600" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Finances;