import { useState } from "react";
import { categories, messages } from "../../database/mocks/db";
import { User, Phone, Calendar } from "lucide-react";

const MessagesList = () => {

      const [selectedCategory, setSelectedCategory] = useState('todos');
      const [searchTerm, setSearchTerm] = useState('');
    

    const getUrgencyColor = (urgency:string) => {
        switch(urgency) {
          case 'critica': return 'bg-red-100 text-red-800 border-red-200';
          case 'alta': return 'bg-orange-100 text-orange-800 border-orange-200';
          case 'media': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
          case 'baixa': return 'bg-green-100 text-green-800 border-green-200';
          default: return 'bg-gray-100 text-gray-800 border-gray-200';
        }
      };
    
      const getSentimentColor = (sentiment:string) => {
        switch(sentiment) {
          case 'positivo': return 'text-green-600';
          case 'neutro': return 'text-yellow-600';
          case 'negativo': return 'text-red-600';
          default: return 'text-gray-600';
        }
      };
    
      const filteredMessages = messages.filter(msg => {
        const matchesCategory = selectedCategory === 'todos' || msg.category === selectedCategory;
        const matchesSearch = msg.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                             msg.lastMessage.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCategory && matchesSearch;
      });

    return (
        <div className="space-y-4">
                {filteredMessages.map((message) => (
                  <div key={message.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                          <User className="w-6 h-6 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <h3 className="font-semibold text-gray-900">{message.name}</h3>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getUrgencyColor(message.urgency)}`}>
                              {message.urgency.toUpperCase()}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{message.phone}</p>
                          <p className="text-gray-800 mb-2">{message.lastMessage}</p>
                          <div className="bg-blue-50 p-3 rounded-lg mb-2">
                            <p className="text-sm text-blue-800">
                              <strong>IA:</strong> {message.aiSummary}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-500 mb-2">{message.timestamp}</p>
                        {message.unread > 0 && (
                          <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                            {message.unread} não lida{message.unread > 1 ? 's' : ''}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <div className="flex items-center space-x-4">
                        <span className={`text-sm ${getSentimentColor(message.sentiment)}`}>
                          Sentimento: {message.sentiment}
                        </span>
                        <span className="text-sm text-gray-500">
                          Categoria: {categories.find(c => c.id === message.category)?.name}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button className="px-4 py-2 text-blue-600 border border-blue-300 rounded-lg hover:bg-blue-50 transition-colors">
                          <Phone className="w-4 h-4 inline mr-2" />
                          Responder
                        </button>
                        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                          <Calendar className="w-4 h-4 inline mr-2" />
                          Agendar
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
    );
}   

export default MessagesList;