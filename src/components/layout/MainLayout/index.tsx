import { useState } from "react"
import { Outlet } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { Award, Calendar, Camera, FileText, User, Users } from "lucide-react"
import Sidebar from "../Sidebar"
import Header from "../Header"
import { setShowProfile } from "../../../feature/ShowProfile"
import type { AppDispatch, RootState } from "../../../store"
import { useAuth } from "../../../context/AuthContext"
import { Modal } from "../../ui/Modal"
import { Button } from "../../ui/Button"
import { Input } from "../../ui/Input"

const MainLayout = () => {
    const dispatch = useDispatch<AppDispatch>();
    const showProfile = useSelector((state: RootState) => state.showProfile.showProfile);
    const { user, logout } = useAuth();

    const [profile, setProfile] = useState({
        name: '',
        email: user?.email || '',
        phone: '',
        church: user?.church_name || '',
        address: '',
        bio: '',
    });

    const handleClose = () => dispatch(setShowProfile(false));

    return (
        <div className="flex h-screen bg-bg">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <div className="flex-1 overflow-hidden flex flex-col">
          <Outlet />
        </div>
      </main>

      {/* Profile Modal */}
      <Modal open={showProfile} onClose={handleClose} title="Meu Perfil" maxWidth="max-w-2xl">
        <div className="flex items-start gap-4 mb-6">
          <div className="relative group">
            <div className="w-16 h-16 bg-accent-soft rounded-full flex items-center justify-center">
              <User size={28} className="text-accent-hover dark:text-ink" />
            </div>
            <button className="absolute -bottom-1 -right-1 bg-accent text-accent-foreground p-1.5 rounded-full">
              <Camera size={12} />
            </button>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-ink">{user?.username || 'Usuário'}</h3>
            <p className="text-sm text-ink-faint capitalize">{user?.role || ''}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="bg-bg border border-border rounded-md p-3 text-center">
            <FileText className="mx-auto mb-1 text-ink-muted" size={18} />
            <p className="text-lg font-semibold text-ink">156</p>
            <p className="text-xs text-ink-faint">Sermões</p>
          </div>
          <div className="bg-bg border border-border rounded-md p-3 text-center">
            <Calendar className="mx-auto mb-1 text-ink-muted" size={18} />
            <p className="text-lg font-semibold text-ink">89</p>
            <p className="text-xs text-ink-faint">Eventos</p>
          </div>
          <div className="bg-bg border border-border rounded-md p-3 text-center">
            <Users className="mx-auto mb-1 text-ink-muted" size={18} />
            <p className="text-lg font-semibold text-ink">456</p>
            <p className="text-xs text-ink-faint">Membros</p>
          </div>
          <div className="bg-bg border border-border rounded-md p-3 text-center">
            <Award className="mx-auto mb-1 text-ink-muted" size={18} />
            <p className="text-lg font-semibold text-ink">7</p>
            <p className="text-xs text-ink-faint">Anos</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-ink-muted mb-1.5">Nome completo</label>
              <Input value={profile.name} onChange={(e) => setProfile({ ...profile, name: e.target.value })} placeholder="Seu nome" />
            </div>
            <div>
              <label className="block text-xs font-medium text-ink-muted mb-1.5">Igreja</label>
              <Input value={profile.church} onChange={(e) => setProfile({ ...profile, church: e.target.value })} />
            </div>
            <div>
              <label className="block text-xs font-medium text-ink-muted mb-1.5">Email</label>
              <Input type="email" value={profile.email} onChange={(e) => setProfile({ ...profile, email: e.target.value })} />
            </div>
            <div>
              <label className="block text-xs font-medium text-ink-muted mb-1.5">Telefone</label>
              <Input type="tel" value={profile.phone} onChange={(e) => setProfile({ ...profile, phone: e.target.value })} placeholder="(11) 98765-4321" />
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium text-ink-muted mb-1.5">Biografia</label>
            <textarea
              value={profile.bio}
              onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
              rows={3}
              placeholder="Conte um pouco sobre você..."
              className="w-full px-3 py-2 bg-surface border border-border rounded-md text-sm text-ink placeholder:text-ink-faint focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent resize-none"
            />
          </div>
        </div>

        <div className="flex gap-3 mt-6 pt-4 border-t border-border">
          <Button className="flex-1" onClick={handleClose}>Salvar alterações</Button>
          <Button variant="secondary" onClick={handleClose}>Cancelar</Button>
          <Button variant="danger" onClick={() => { logout(); handleClose(); }}>Sair</Button>
        </div>
      </Modal>
    </div>
    )
}

export default MainLayout
