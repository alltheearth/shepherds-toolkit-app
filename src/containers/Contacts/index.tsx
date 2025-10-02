import { Plus, User } from "lucide-react";
import { categories, messages } from "../../database/mocks/db";

const Contacts = () => {
    return (
        <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Gestão de Contatos</h2>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  <Plus className="w-4 h-4 inline mr-2" />
                  Novo Contato
                </button>
              </div>

              <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {messages.map((contact) => (
                      <div key={contact.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center space-x-3 mb-4">
                          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                            <User className="w-6 h-6 text-blue-600" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900">{contact.name}</h3>
                            <p className="text-sm text-gray-600">{contact.phone}</p>
                          </div>
                        </div>
                        
                        <div className="space-y-2 mb-4">
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600">Mensagens:</span>
                            <span className="text-sm font-medium text-gray-900">{contact.unread + 15}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600">Última conversa:</span>
                            <span className="text-sm font-medium text-gray-900">{contact.timestamp}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600">Categoria principal:</span>
                            <span className="text-sm font-medium text-gray-900">
                              {categories.find(c => c.id === contact.category)?.name}
                            </span>
                          </div>
                        </div>
                        
                        <div className="pt-4 border-t border-gray-100">
                          <p className="text-sm text-gray-600 mb-2">Resumo IA:</p>
                          <p className="text-xs text-gray-800 bg-gray-50 p-2 rounded">
                            {contact.aiSummary}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
    );
}

export default Contacts;