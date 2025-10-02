import { AlertTriangle, Book, Briefcase, Calendar, CheckCircle, Heart, Home, MessageSquare, Search, Star, User, Phone, Bell } from "lucide-react";
import { useState } from "react";
import { messages, categories } from "../../database/mocks/db";
const SearchAndStats = () => {

    const [selectedCategory, setSelectedCategory] = useState('todos');
    const [searchTerm, setSearchTerm] = useState('');
    const totalUnread = messages.reduce((sum, msg) => sum + msg.unread, 0);
    
    return (
        <div className="mb-6">
                        <div className="flex items-center justify-between mb-4">
                          <h2 className="text-xl font-semibold text-gray-900">
                            {selectedCategory === 'todos' ? 'Todas as Mensagens' : 
                             categories.find(c => c.id === selectedCategory)?.name}
                          </h2>
                          <div className="flex items-center space-x-4">
                            <div className="relative">
                              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                              <input
                                type="text"
                                placeholder="Buscar mensagens..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              />
                            </div>
                          </div>
                        </div>
        
                        {/* Quick Stats */}
                        <div className="grid grid-cols-4 gap-4 mb-6">
                          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="text-sm text-gray-600">Total de Mensagens</p>
                                <p className="text-2xl font-bold text-gray-900">{messages.length}</p>
                              </div>
                              <MessageSquare className="w-8 h-8 text-blue-500" />
                            </div>
                          </div>
                          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="text-sm text-gray-600">Não Lidas</p>
                                <p className="text-2xl font-bold text-orange-600">{totalUnread}</p>
                              </div>
                              <Bell className="w-8 h-8 text-orange-500" />
                            </div>
                          </div>
                          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="text-sm text-gray-600">Urgentes</p>
                                <p className="text-2xl font-bold text-red-600">
                                  {messages.filter(m => m.urgency === 'critica' || m.urgency === 'alta').length}
                                </p>
                              </div>
                              <AlertTriangle className="w-8 h-8 text-red-500" />
                            </div>
                          </div>
                          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="text-sm text-gray-600">Respondidas Hoje</p>
                                <p className="text-2xl font-bold text-green-600">12</p>
                              </div>
                              <CheckCircle className="w-8 h-8 text-green-500" />
                            </div>
                          </div>
                        </div>
                      </div>
    );
}  

export default SearchAndStats;
