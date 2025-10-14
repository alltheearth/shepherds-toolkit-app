import { Book, BookOpen, Calendar, DollarSign, FileText, Heart, Menu, Target, User, Users, X } from "lucide-react";
import { useState } from "react";
import { setActiveModule } from "../../../Feature/ModuleActiveSlice";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch } from "../../../store";

const Sidebar = () => {
    const [sidebarOpen, setSidebarOpen] = useState(true);

    const activeModule = useSelector((state: any) => state.moduleActive.activeModule);
    const dispatch = useDispatch<AppDispatch>()

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


    return (
        <aside className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-gradient-to-b from-slate-800 to-slate-900 text-white transition-all duration-300 flex flex-col shadow-xl`}>
        {/* Logo */}
        <div className="p-6 flex items-center justify-between border-b border-slate-700">
          {sidebarOpen && (
            <div>
              <h1 className="text-xl font-bold">Shepherd's</h1>
              <p className="text-xs text-slate-400">Toolkit</p>
            </div>
          )}
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 overflow-y-auto py-4">
          {modules.map((module) => {
            const Icon = module.icon;
            return (
              <button
                key={module.id}
                onClick={() => dispatch(setActiveModule(module.id))}
                className={`w-full flex items-center gap-3 px-6 py-3 hover:bg-slate-700 transition-colors ${
                  activeModule === module.id ? 'bg-slate-700 border-l-4 border-blue-500' : ''
                }`}
              >
                <Icon size={20} />
                {sidebarOpen && <span className="text-sm font-medium">{module.name}</span>}
              </button>
            );
          })}
        </nav>

        {/* User Section */}
        <div className="p-4 border-t border-slate-700">
          <div className={`flex items-center gap-3 ${!sidebarOpen && 'justify-center'}`}>
            <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center">
              <User size={20} />
            </div>
            {sidebarOpen && (
              <div className="flex-1">
                <p className="text-sm font-medium">Pastor João</p>
                <p className="text-xs text-slate-400">Igreja Central</p>
              </div>
            )}
          </div>
        </div>
      </aside>
    )
}

export default Sidebar;
