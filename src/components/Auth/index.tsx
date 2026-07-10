import { useState } from 'react';
import { Book, Mail, Lock, User, Church, Eye, EyeOff, ArrowRight, Shield, Sparkles } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { isMockMode } from '../../mocks/mockMode';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';

const Auth = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    churchName: '',
    ministry: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const doLogin = async (email: string, password: string) => {
    setLoading(true);
    const result = await login(email, password);
    setLoading(false);
    if (result.success) {
      navigate('/dashboard');
    } else {
      console.log('Erro ao fazer login');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await doLogin(formData.email, formData.password);
  };

  const handleDemoLogin = async () => {
    await doLogin('demo@shepherdstoolkit.app', 'demo');
  };

  return (
    <div className="min-h-screen bg-bg flex items-center justify-center p-4">
      <div className="w-full max-w-6xl flex bg-surface rounded-xl border border-border shadow-sm overflow-hidden">
        {/* Left Side - Branding */}
        <div className="hidden lg:flex lg:w-1/2 bg-ink p-12 flex-col justify-between text-white">
          <div>
            {/* Logo */}
            <div className="flex items-center gap-3 mb-10">
              <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
                <Book className="text-accent-foreground" size={20} />
              </div>
              <div>
                <h1 className="text-lg font-semibold">Shepherd's Toolkit</h1>
              </div>
            </div>

            {/* Headline */}
            <div className="mb-10">
              <h2 className="text-3xl font-semibold mb-3 leading-tight">
                Equipando pastores para o ministério do século 21
              </h2>
              <p className="text-white/60">
                Uma plataforma completa para pregação, gestão ministerial e liderança eclesiástica.
              </p>
            </div>

            {/* Features */}
            <div className="space-y-5">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-white/10 rounded-md flex items-center justify-center flex-shrink-0">
                  <Book size={16} />
                </div>
                <div>
                  <h3 className="text-sm font-medium mb-0.5">Bíblia Interativa com IA</h3>
                  <p className="text-sm text-white/60">Estudo profundo com análise contextual e linguística</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-white/10 rounded-md flex items-center justify-center flex-shrink-0">
                  <Shield size={16} />
                </div>
                <div>
                  <h3 className="text-sm font-medium mb-0.5">Criação de Sermões</h3>
                  <p className="text-sm text-white/60">Editor profissional com templates e assistentes</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-white/10 rounded-md flex items-center justify-center flex-shrink-0">
                  <Church size={16} />
                </div>
                <div>
                  <h3 className="text-sm font-medium mb-0.5">Gestão Ministerial</h3>
                  <p className="text-sm text-white/60">Metas, agenda, membros e muito mais</p>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Quote */}
          <div className="border-l-2 border-accent pl-4">
            <p className="text-white/80 italic mb-1">"Apascenta as minhas ovelhas"</p>
            <p className="text-sm text-white/40">João 21:17</p>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="w-full lg:w-1/2 p-8 lg:p-12">
          <div className="max-w-md mx-auto">
            {/* Mobile Logo */}
            <div className="lg:hidden flex items-center justify-center gap-3 mb-8">
              <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
                <Book className="text-accent-foreground" size={20} />
              </div>
              <h1 className="text-lg font-semibold text-ink">Shepherd's Toolkit</h1>
            </div>

            {/* Form Header */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-ink mb-1.5">
                {isLogin ? 'Bem-vindo de volta!' : 'Comece sua jornada'}
              </h2>
              <p className="text-ink-muted text-sm">
                {isLogin
                  ? 'Entre para acessar suas ferramentas ministeriais'
                  : 'Crie sua conta e transforme seu ministério'}
              </p>
            </div>

            {isMockMode && (
              <button
                type="button"
                onClick={handleDemoLogin}
                disabled={loading}
                className="w-full mb-6 flex items-center justify-center gap-2 px-4 py-2.5 bg-accent-soft text-accent-hover dark:text-ink rounded-md text-sm font-medium hover:opacity-80 transition-opacity disabled:opacity-50"
              >
                <Sparkles size={16} />
                Continuar em modo demo
              </button>
            )}

            {/* Form Fields */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && (
                <div>
                  <label className="block text-sm font-medium text-ink-muted mb-1.5">Nome Completo</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-ink-faint" size={18} />
                    <Input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Pastor João Silva"
                      className="pl-10"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-ink-muted mb-1.5">E-mail</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-ink-faint" size={18} />
                  <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="seu@email.com"
                    className="pl-10"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-ink-muted mb-1.5">Senha</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-ink-faint" size={18} />
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="pl-10 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-ink-faint hover:text-ink-muted transition-colors"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {!isLogin && (
                <div>
                  <label className="block text-sm font-medium text-ink-muted mb-1.5">Nome da Igreja</label>
                  <div className="relative">
                    <Church className="absolute left-3 top-1/2 transform -translate-y-1/2 text-ink-faint" size={18} />
                    <Input
                      type="text"
                      name="churchName"
                      value={formData.churchName}
                      onChange={handleChange}
                      placeholder="Igreja Central"
                      className="pl-10"
                    />
                  </div>
                </div>
              )}

              {isLogin && (
                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 text-sm text-ink-muted">
                    <input type="checkbox" className="rounded border-border text-accent focus:ring-accent" />
                    Lembrar-me
                  </label>
                  <button type="button" className="text-sm text-accent hover:underline">
                    Esqueceu a senha?
                  </button>
                </div>
              )}

              <Button type="submit" disabled={loading} className="w-full">
                {loading ? 'Entrando...' : isLogin ? 'Entrar' : 'Criar Conta'}
                <ArrowRight size={18} />
              </Button>

              {!isLogin && (
                <p className="text-xs text-ink-faint text-center">
                  Ao criar uma conta, você concorda com nossos{' '}
                  <a href="#" className="text-accent hover:underline">Termos de Uso</a>
                  {' '}e{' '}
                  <a href="#" className="text-accent hover:underline">Política de Privacidade</a>
                </p>
              )}
            </form>

            {/* Toggle Login/Signup */}
            <div className="mt-6 text-center">
              <p className="text-ink-muted text-sm">
                {isLogin ? 'Ainda não tem uma conta?' : 'Já possui uma conta?'}{' '}
                <button
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-accent hover:underline font-medium"
                >
                  {isLogin ? 'Cadastre-se gratuitamente' : 'Fazer login'}
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
