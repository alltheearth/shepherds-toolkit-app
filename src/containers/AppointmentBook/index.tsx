import { Plus, User, MapPin, Calendar, Clock } from "lucide-react";
import { appointments } from "../../database/mocks/db";

const AppointmentBook = () => {
    return (
        <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Agenda Pastoral</h2>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  <Plus className="w-4 h-4 inline mr-2" />
                  Novo Agendamento
                </button>
              </div>

              <div className="grid gap-6">
                {appointments.map((appointment) => (
                  <div key={appointment.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className="text-lg font-semibold text-gray-900">{appointment.title}</h3>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            appointment.priority === 'alta' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {appointment.priority.toUpperCase()}
                          </span>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <div className="space-y-2">
                            <div className="flex items-center space-x-2 text-gray-600">
                              <User className="w-4 h-4" />
                              <span className="text-sm">{appointment.person}</span>
                            </div>
                            <div className="flex items-center space-x-2 text-gray-600">
                              <MapPin className="w-4 h-4" />
                              <span className="text-sm">{appointment.address}</span>
                            </div>
                          </div>
                          
                          <div className="space-y-2">
                            <div className="flex items-center space-x-2 text-gray-600">
                              <Calendar className="w-4 h-4" />
                              <span className="text-sm">{new Date(appointment.date).toLocaleDateString('pt-BR')}</span>
                            </div>
                            <div className="flex items-center space-x-2 text-gray-600">
                              <Clock className="w-4 h-4" />
                              <span className="text-sm">{appointment.time}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <p className="text-sm text-gray-700">
                            <strong>Observações:</strong> {appointment.notes}
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-end space-x-2 pt-4 border-t border-gray-100">
                      <button className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                        Reagendar
                      </button>
                      <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                        Confirmar
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
    );
}

export default AppointmentBook;