import { useEffect, useState, type FormEvent, type ReactNode } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Loader2, ShieldCheck, XCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { authorizeKoinonia } from '../../services/koinoniaIntegrationService';

type Step = 'login' | 'consent' | 'redirecting' | 'error';

const CenteredMessage = ({ icon, text }: { icon: ReactNode; text: string }) => (
  <div className="min-h-screen flex items-center justify-center bg-slate-900 p-4">
    <div className="text-center space-y-3 text-white">
      {icon}
      <p className="text-sm">{text}</p>
    </div>
  </div>
);

/** Tela de consentimento do mini-OAuth interno: o koinonia-app redireciona
 * o navegador pra cá pedindo acesso à Agenda e aos Escritos do usuário.
 * O login acontece sempre aqui — nunca dentro do koinonia-app. */
const ConnectKoinonia = () => {
  const [searchParams] = useSearchParams();
  const { user, isAuthenticated, loading, login } = useAuth();
  const state = searchParams.get('state') || '';
  const redirectUri = searchParams.get('redirect_uri') || '';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [step, setStep] = useState<Step>('login');

  useEffect(() => {
    if (!loading) setStep(isAuthenticated ? 'consent' : 'login');
  }, [loading, isAuthenticated]);

  if (!state || !redirectUri) {
    return <CenteredMessage icon={<XCircle className="text-red-400 mx-auto" size={28} />} text="Link de conexão inválido." />;
  }

  if (loading) {
    return <CenteredMessage icon={<Loader2 className="animate-spin mx-auto" size={28} />} text="Carregando..." />;
  }

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setLoginError('');
    const result = await login(email, password);
    setSubmitting(false);
    if (!result.success) setLoginError('E-mail ou senha inválidos.');
  };

  const handleApprove = async () => {
    setStep('redirecting');
    try {
      const { code } = await authorizeKoinonia();
      window.location.href = `${redirectUri}?code=${encodeURIComponent(code)}&state=${encodeURIComponent(state)}`;
    } catch {
      setStep('error');
    }
  };

  if (step === 'login') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900 p-4">
        <form onSubmit={handleLogin} className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-sm space-y-4">
          <h1 className="text-xl font-bold text-gray-800">Entre no Shepherd's Toolkit</h1>
          <p className="text-sm text-gray-600">Faça login para vincular sua conta ao Koinonia App.</p>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="seu@email.com"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Senha"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
          />
          {loginError && <p className="text-sm text-red-600">{loginError}</p>}
          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold disabled:opacity-60"
          >
            {submitting ? 'Entrando...' : 'Entrar'}
          </button>
        </form>
      </div>
    );
  }

  if (step === 'consent') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900 p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-sm text-center space-y-4">
          <ShieldCheck className="text-blue-600 mx-auto" size={36} />
          <h1 className="text-xl font-bold text-gray-800">Conectar ao Koinonia App</h1>
          <p className="text-sm text-gray-600">
            O Koinonia App quer acessar sua <strong>Agenda</strong> e seus <strong>Escritos</strong> (somente
            leitura), como <strong>{user?.email}</strong>.
          </p>
          <div className="flex gap-3">
            <button
              onClick={() => window.history.back()}
              className="flex-1 border border-gray-300 rounded-lg py-2 font-medium text-gray-700"
            >
              Cancelar
            </button>
            <button onClick={handleApprove} className="flex-1 bg-blue-600 text-white rounded-lg py-2 font-semibold">
              Aprovar
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (step === 'redirecting') {
    return <CenteredMessage icon={<Loader2 className="animate-spin mx-auto" size={28} />} text="Conectando..." />;
  }

  return <CenteredMessage icon={<XCircle className="text-red-400 mx-auto" size={28} />} text="Não foi possível concluir a conexão." />;
};

export default ConnectKoinonia;
