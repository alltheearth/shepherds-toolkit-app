import { Book, BookMarked, BookOpen, Calendar, CreditCard, DollarSign, FileText, Heart, Menu, Moon, Settings, Sun, Target, User, Users, X } from "lucide-react";
import { useState } from "react";
import { setActiveModule } from "../../../feature/ModuleActiveSlice";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch } from "../../../store";
import { useNavigate } from "react-router-dom";
import { setShowProfile } from "../../../feature/ShowProfile";
import { useAuth } from "../../../context/AuthContext";
import { useTheme } from "../../../context/ThemeContext";

const Sidebar = () => {
    const navigate = useNavigate();
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const activeModule = useSelector((state: any) => state.moduleActive.activeModule);
    const dispatch = useDispatch<AppDispatch>()
    const { user } = useAuth();
    const { theme, toggleTheme } = useTheme();

    const modules = [
    { id: 'dashboard', name: 'Dashboard', icon: Menu },
    { id: 'bible', name: 'Bíblia', icon: Book },
    { id: 'reading-plan', name: 'Plano de Leitura', icon: BookMarked },
    { id: 'writings', name: 'Escritos', icon: FileText },
    { id: 'goals', name: 'Metas', icon: Target },
    { id: 'calendar', name: 'Agenda', icon: Calendar },
    { id: 'members', name: 'Membros', icon: Users },
    { id: 'finances', name: 'Finanças', icon: DollarSign },
    { id: 'prayer', name: 'Oração', icon: Heart },
    { id: 'library', name: 'Biblioteca', icon: BookOpen },
    ];

  const displayName = user ? `${user.first_name ?? ''} ${user.last_name ?? ''}`.trim() || user.username : 'Usuário';
  const churchName = user?.church_name || '';

    return (
        <aside className={`${sidebarOpen ? 'w-64' : 'w-16'} bg-bg border-r border-border transition-all duration-200 flex flex-col`}>
        {/* Logo */}
        <div className="h-14 px-4 flex items-center justify-between border-b border-border">
          {sidebarOpen && (
            <div className="flex items-center gap-2 min-w-0">
              <div className="w-6 h-6 rounded-md bg-accent text-accent-foreground flex items-center justify-center flex-shrink-0">
                <Book size={14} />
              </div>
              <span className="text-sm font-semibold text-ink truncate">Shepherd's Toolkit</span>
            </div>
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-1.5 rounded-md text-ink-faint hover:bg-surface-hover hover:text-ink transition-colors"
          >
            {sidebarOpen ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 overflow-y-auto py-2 px-2 space-y-0.5">
          {modules.map((module) => {
            const Icon = module.icon;
            const isActive = activeModule === module.id;
            return (
              <button
                key={module.id}
                onClick={() => {dispatch( setActiveModule(module.id)); navigate(`/${module.id}`)}}
                className={`w-full flex items-center gap-3 px-2.5 py-1.5 rounded-md text-sm transition-colors ${
                  isActive
                    ? 'bg-accent-soft text-accent-hover font-medium dark:text-ink'
                    : 'text-ink-muted hover:bg-surface-hover hover:text-ink'
                }`}
              >
                <Icon size={17} className="flex-shrink-0" />
                {sidebarOpen && <span className="truncate">{module.name}</span>}
              </button>
            );
          })}
        </nav>

        {/* Configurações + Theme toggle + User Section */}
        <div className="border-t border-border p-2 space-y-1">
          <button
            onClick={() => navigate('/settings')}
            className={`w-full flex items-center gap-3 px-2.5 py-1.5 rounded-md text-sm text-ink-muted hover:bg-surface-hover hover:text-ink transition-colors ${!sidebarOpen && 'justify-center'}`}
          >
            <Settings size={17} className="flex-shrink-0" />
            {sidebarOpen && <span>Configurações</span>}
          </button>

          <button
            onClick={() => navigate('/billing')}
            className={`w-full flex items-center gap-3 px-2.5 py-1.5 rounded-md text-sm text-ink-muted hover:bg-surface-hover hover:text-ink transition-colors ${!sidebarOpen && 'justify-center'}`}
          >
            <CreditCard size={17} className="flex-shrink-0" />
            {sidebarOpen && <span>Assinatura</span>}
          </button>

          <button
            onClick={toggleTheme}
            className={`w-full flex items-center gap-3 px-2.5 py-1.5 rounded-md text-sm text-ink-muted hover:bg-surface-hover hover:text-ink transition-colors ${!sidebarOpen && 'justify-center'}`}
          >
            {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
            {sidebarOpen && <span>{theme === 'dark' ? 'Modo claro' : 'Modo escuro'}</span>}
          </button>

          <button
            onClick={() => dispatch(setShowProfile(true))}
            className={`w-full flex items-center gap-3 p-1.5 rounded-md hover:bg-surface-hover transition-colors ${!sidebarOpen && 'justify-center'}`}
          >
            <div className="w-8 h-8 bg-accent text-accent-foreground rounded-full flex items-center justify-center flex-shrink-0">
              <User size={16} />
            </div>
            {sidebarOpen && (
              <div className="flex-1 text-left min-w-0">
                <p className="text-sm font-medium text-ink truncate">{displayName}</p>
                {churchName && <p className="text-xs text-ink-faint truncate">{churchName}</p>}
              </div>
            )}
          </button>
        </div>
      </aside>
    )
}

export default Sidebar;
