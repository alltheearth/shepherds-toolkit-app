import { Fragment } from 'react';
import { AlertCircle, Loader2 } from 'lucide-react';
import type { CalebMessage } from '../../feature/caleb';

interface CalebMessageBubbleProps {
  message: CalebMessage;
}

/** Renderizador leve de markdown (negrito, títulos ###, listas) — sem dependência
 * externa, cobre só o que o Caleb costuma devolver (respostas curtas da OpenAI). */
function renderInline(text: string, keyPrefix: string) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) =>
    part.startsWith('**') && part.endsWith('**') ? (
      <strong key={`${keyPrefix}-${i}`}>{part.slice(2, -2)}</strong>
    ) : (
      <Fragment key={`${keyPrefix}-${i}`}>{part}</Fragment>
    )
  );
}

function renderContent(content: string) {
  const lines = content.split('\n');
  const nodes: React.ReactNode[] = [];
  let listBuffer: string[] = [];

  const flushList = (key: string) => {
    if (listBuffer.length === 0) return;
    nodes.push(
      <ul key={key} className="list-disc pl-4 my-1 space-y-0.5">
        {listBuffer.map((item, i) => (
          <li key={i}>{renderInline(item, `${key}-li-${i}`)}</li>
        ))}
      </ul>
    );
    listBuffer = [];
  };

  lines.forEach((line, i) => {
    const trimmed = line.trim();
    if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
      listBuffer.push(trimmed.slice(2));
      return;
    }
    flushList(`list-${i}`);

    if (trimmed.startsWith('### ')) {
      nodes.push(
        <p key={i} className="font-semibold mt-2 first:mt-0">
          {renderInline(trimmed.slice(4), `h-${i}`)}
        </p>
      );
    } else if (trimmed.length === 0) {
      nodes.push(<div key={i} className="h-2" />);
    } else {
      nodes.push(<p key={i}>{renderInline(line, `p-${i}`)}</p>);
    }
  });
  flushList('list-end');

  return nodes;
}

export const CalebMessageBubble: React.FC<CalebMessageBubbleProps> = ({ message }) => {
  const isUser = message.role === 'user';

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[85%] rounded-lg px-3.5 py-2.5 text-sm leading-relaxed ${
          isUser
            ? 'bg-accent-soft text-accent-hover dark:text-ink'
            : 'bg-surface border border-border text-ink'
        }`}
      >
        {isUser ? message.content : renderContent(message.content)}
        {message.pending && (
          <span className="flex items-center gap-1.5 mt-1.5 text-xs text-ink-faint">
            <Loader2 size={12} className="animate-spin" />
            Caleb está pensando...
          </span>
        )}
        {message.error && (
          <span className="flex items-center gap-1.5 mt-1.5 text-xs text-danger">
            <AlertCircle size={12} />
            {message.error}
          </span>
        )}
      </div>
    </div>
  );
};

export default CalebMessageBubble;
