import React, { useEffect, useState } from 'react';
import { CreditCard, Loader2, Sparkles, AlertCircle, CheckCircle2 } from 'lucide-react';
import { getAIUsage } from '../../services/aiService';
import { startCheckout, openBillingPortal } from '../../services/billingService';
import type { AIUsage } from '../../types/ai.types';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';

const PLAN_LABELS: Record<AIUsage['plan'], string> = {
  free: 'Free',
  pro: 'Pro',
  unlimited: 'Unlimited',
};

function checkoutStatusFromQuery(): 'success' | 'cancelled' | null {
  const params = new URLSearchParams(window.location.search);
  const value = params.get('checkout');
  return value === 'success' || value === 'cancelled' ? value : null;
}

const Billing: React.FC = () => {
  const [usage, setUsage] = useState<AIUsage | null>(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const checkoutStatus = checkoutStatusFromQuery();

  useEffect(() => {
    getAIUsage()
      .then(setUsage)
      .catch(() => setError('Não foi possível carregar seu plano e uso de IA.'))
      .finally(() => setLoading(false));
  }, []);

  const handleUpgrade = async () => {
    setActionLoading(true);
    setError(null);
    try {
      await startCheckout();
    } catch {
      setError('Não foi possível iniciar o checkout. Tente novamente em instantes.');
      setActionLoading(false);
    }
  };

  const handleManage = async () => {
    setActionLoading(true);
    setError(null);
    try {
      await openBillingPortal();
    } catch {
      setError('Não foi possível abrir o portal de assinatura.');
      setActionLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-4">
      <div>
        <h1 className="text-lg font-semibold text-ink">Assinatura e uso de IA</h1>
        <p className="text-sm text-ink-muted">Gerencie seu plano e acompanhe o consumo mensal de IA.</p>
      </div>

      {checkoutStatus === 'success' && (
        <div className="flex items-center gap-2 px-3 py-2 rounded-md bg-success-soft text-success text-sm">
          <CheckCircle2 size={16} /> Assinatura confirmada! Pode levar alguns segundos para atualizar aqui.
        </div>
      )}
      {checkoutStatus === 'cancelled' && (
        <div className="flex items-center gap-2 px-3 py-2 rounded-md bg-surface-hover text-ink-muted text-sm">
          Checkout cancelado — nenhuma cobrança foi feita.
        </div>
      )}
      {error && (
        <div className="flex items-center gap-2 px-3 py-2 rounded-md bg-danger-soft text-danger text-sm">
          <AlertCircle size={16} /> {error}
        </div>
      )}

      {loading ? (
        <div className="flex items-center gap-2 text-ink-muted text-sm">
          <Loader2 size={16} className="animate-spin" /> Carregando...
        </div>
      ) : usage ? (
        <Card className="p-5 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CreditCard size={18} className="text-ink-muted" />
              <span className="text-sm font-medium text-ink">Plano atual</span>
            </div>
            <Badge tone={usage.plan === 'free' ? 'neutral' : 'accent'}>{PLAN_LABELS[usage.plan]}</Badge>
          </div>

          <div>
            <div className="flex items-center justify-between text-sm text-ink-muted mb-1">
              <span>Uso de tokens este mês</span>
              <span>
                {usage.tokens_used.toLocaleString('pt-BR')}
                {usage.monthly_token_limit !== null && ` / ${usage.monthly_token_limit.toLocaleString('pt-BR')}`}
              </span>
            </div>
            {usage.monthly_token_limit !== null && (
              <div className="h-2 rounded-full bg-surface-hover overflow-hidden">
                <div
                  className="h-full bg-accent"
                  style={{
                    width: `${Math.min(100, (usage.tokens_used / usage.monthly_token_limit) * 100)}%`,
                  }}
                />
              </div>
            )}
          </div>

          <div className="flex gap-2 pt-2">
            {usage.plan === 'free' && (
              <Button onClick={handleUpgrade} disabled={actionLoading}>
                <Sparkles size={16} />
                Fazer upgrade para Pro
              </Button>
            )}
            {usage.plan !== 'free' && usage.plan !== 'unlimited' && (
              <Button variant="secondary" onClick={handleManage} disabled={actionLoading}>
                Gerenciar assinatura
              </Button>
            )}
          </div>
        </Card>
      ) : null}
    </div>
  );
};

export default Billing;
