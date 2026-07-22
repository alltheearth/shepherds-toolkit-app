import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Sparkles, X, Send, Loader2, RotateCcw } from 'lucide-react';
import type { AppDispatch, RootState } from '../../store';
import { closeCaleb, clearConversation } from '../../feature/caleb';
import { useCalebChat } from '../../feature/caleb/useCalebChat';
import { getAIUsage } from '../../services/aiService';
import type { AIUsage } from '../../types/ai.types';
import { CalebMessageBubble } from './CalebMessageBubble';

export const CalebPanel: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const isOpen = useSelector((state: RootState) => state.caleb.isOpen);
  const context = useSelector((state: RootState) => state.caleb.context);
  const messages = useSelector((state: RootState) => state.caleb.messages);
  const sending = useSelector((state: RootState) => state.caleb.sending);
  const quotaError = useSelector((state: RootState) => state.caleb.quotaError);

  const { send } = useCalebChat();
  const [text, setText] = useState('');
  const [usage, setUsage] = useState<AIUsage | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    getAIUsage().then(setUsage).catch(() => {});
  }, [isOpen]);

  useEffect(() => {
    if (!sending) {
      getAIUsage().then(setUsage).catch(() => {});
    }
  }, [sending]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages.length]);

  const handleSend = () => {
    if (!text.trim() || sending) return;
    send(text);
    setText('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <aside
      className={`${isOpen ? 'w-96' : 'w-0'} bg-surface border-l border-border transition-all duration-300 overflow-hidden flex flex-col flex-shrink-0`}
    >
      {/* Header */}
      <div className="p-4 border-b border-border flex items-start justify-between gap-2">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-8 h-8 rounded-md bg-accent-soft text-accent-hover dark:text-ink flex items-center justify-center flex-shrink-0">
            <Sparkles size={16} />
          </div>
          <div className="min-w-0">
            <h3 className="text-sm font-semibold text-ink">Caleb</h3>
            <p className="text-xs text-ink-faint truncate">
              {context ? context.label : 'Conversa geral'}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1 flex-shrink-0">
          <button
            onClick={() => dispatch(clearConversation())}
            title="Nova conversa"
            className="p-1.5 hover:bg-surface-hover rounded-md transition-colors"
          >
            <RotateCcw size={15} className="text-ink-faint" />
          </button>
          <button
            onClick={() => dispatch(closeCaleb())}
            title="Fechar"
            className="p-1.5 hover:bg-surface-hover rounded-md transition-colors"
          >
            <X size={15} className="text-ink-faint" />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.length === 0 && (
          <div className="h-full flex items-center justify-center text-center px-4">
            <div>
              <Sparkles className="mx-auto mb-3 text-ink-faint" size={28} />
              <p className="text-sm text-ink-muted">
                {context
                  ? `Pergunte alguma coisa sobre ${context.label}.`
                  : 'Pergunte alguma coisa ao Caleb.'}
              </p>
            </div>
          </div>
        )}
        {messages.map((message) => (
          <CalebMessageBubble key={message.id} message={message} />
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Quota banner */}
      {quotaError && (
        <div className="mx-4 mb-3 p-3 bg-warning-soft text-warning text-xs rounded-md">
          Limite do plano {quotaError.plan} atingido este mês. Renova em{' '}
          {new Date(quotaError.period_reset_at).toLocaleDateString('pt-BR')}.
        </div>
      )}

      {/* Composer */}
      <div className="p-3 border-t border-border">
        <div className="flex items-end gap-2">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Pergunte ao Caleb..."
            rows={2}
            className="flex-1 px-3 py-2 bg-bg border border-border rounded-md text-sm text-ink placeholder:text-ink-faint focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent resize-none"
          />
          <button
            onClick={handleSend}
            disabled={!text.trim() || sending}
            className="p-2.5 bg-accent text-accent-foreground rounded-md hover:bg-accent-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
          >
            {sending ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
          </button>
        </div>
        {usage && (
          <p className="text-[11px] text-ink-faint mt-1.5">
            Plano {usage.plan}
            {usage.monthly_token_limit != null &&
              ` · ${usage.tokens_used.toLocaleString('pt-BR')}/${usage.monthly_token_limit.toLocaleString('pt-BR')} tokens`}
          </p>
        )}
      </div>
    </aside>
  );
};

export default CalebPanel;
