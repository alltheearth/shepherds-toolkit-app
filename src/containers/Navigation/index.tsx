import { Calendar, MessageSquare, Users } from "lucide-react";
import { useState } from "react";

const Navigation = () => {
      const [activeTab, setActiveTab] = useState('dashboard');
      
    return (
              <nav className="bg-white border-b border-gray-200">
                <div className="px-6">
                  <div className="flex space-x-8">
                    <button
                      onClick={() => setActiveTab('dashboard')}
                      className={`py-4 px-1 border-b-2 font-medium text-sm ${
                        activeTab === 'dashboard' 
                          ? 'border-blue-500 text-blue-600' 
                          : 'border-transparent text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      <div className="flex items-center space-x-2">
                        <MessageSquare className="w-4 h-4" />
                        <span>Mensagens</span>
                      </div>
                    </button>
                    <button
                      onClick={() => setActiveTab('contatos')}
                      className={`py-4 px-1 border-b-2 font-medium text-sm ${
                        activeTab === 'contatos' 
                          ? 'border-blue-500 text-blue-600' 
                          : 'border-transparent text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      <div className="flex items-center space-x-2">
                        <Users className="w-4 h-4" />
                        <span>Contatos</span>
                      </div>
                    </button>
                    <button
                      onClick={() => setActiveTab('agenda')}
                      className={`py-4 px-1 border-b-2 font-medium text-sm ${
                        activeTab === 'agenda' 
                          ? 'border-blue-500 text-blue-600' 
                          : 'border-transparent text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4" />
                        <span>Agenda</span>
                      </div>
                    </button>
                  </div>
                </div>
              </nav>
    );
}

export default Navigation;