import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { Search, Loader2, Book } from 'lucide-react';
import type { BibleReferenceResult } from '../../../services/bibleReferenceService';

export interface ReferenceSuggestionPopupProps {
  query: string;
  items: BibleReferenceResult[];
  loading: boolean;
  onSelect: (item: BibleReferenceResult, mode: 'citation' | 'text') => void;
}

export interface ReferenceSuggestionPopupHandle {
  onKeyDown: (props: { event: KeyboardEvent }) => boolean;
}

const ReferenceSuggestionPopup = forwardRef<ReferenceSuggestionPopupHandle, ReferenceSuggestionPopupProps>(
  ({ query, items, loading, onSelect }, ref) => {
    const [selectedIndex, setSelectedIndex] = useState(0);

    useEffect(() => {
      setSelectedIndex(0);
    }, [items]);

    const selectItem = (index: number, mode: 'citation' | 'text') => {
      const item = items[index];
      if (item) onSelect(item, mode);
    };

    useImperativeHandle(ref, () => ({
      onKeyDown: ({ event }) => {
        if (items.length === 0) return false;

        if (event.key === 'ArrowDown') {
          setSelectedIndex((i) => (i + 1) % items.length);
          return true;
        }
        if (event.key === 'ArrowUp') {
          setSelectedIndex((i) => (i - 1 + items.length) % items.length);
          return true;
        }
        if (event.key === 'Enter') {
          selectItem(selectedIndex, 'citation');
          return true;
        }
        if (event.key === 'Tab') {
          selectItem(selectedIndex, 'text');
          return true;
        }
        return false;
      },
    }));

    return (
      <div className="w-[340px] overflow-hidden rounded-xl border border-border-strong bg-surface shadow-lg">
        <div className="flex items-center gap-2 border-b border-border px-3.5 py-2.5">
          <Search size={14} className="flex-shrink-0 text-ink-faint" />
          <span className="text-[13.5px] text-ink">
            {query || <span className="text-ink-faint">Digite uma referência, ex: "jo 3:16"</span>}
          </span>
        </div>

        <div className="max-h-64 overflow-y-auto p-1.5">
          {loading && items.length === 0 && (
            <div className="flex items-center justify-center gap-2 py-6 text-xs text-ink-faint">
              <Loader2 size={14} className="animate-spin" /> Buscando…
            </div>
          )}

          {!loading && items.length === 0 && query.trim().length > 0 && (
            <div className="py-6 text-center text-xs text-ink-faint">Nenhuma referência encontrada</div>
          )}

          {!loading && items.length === 0 && query.trim().length === 0 && (
            <div className="py-6 text-center text-xs text-ink-faint">Digite um livro e capítulo</div>
          )}

          {items.map((item, index) => (
            <button
              key={`${item.book_abbrev}-${item.chapter}-${item.verse_start}-${item.verse_end}`}
              type="button"
              onMouseEnter={() => setSelectedIndex(index)}
              onClick={() => selectItem(index, 'citation')}
              className={`flex w-full items-baseline justify-between gap-2.5 rounded-md px-2.5 py-2 text-left transition-colors ${
                index === selectedIndex ? 'bg-accent-soft' : 'hover:bg-surface-hover'
              }`}
            >
              <span className="flex min-w-0 flex-col gap-0.5">
                <span
                  className={`text-[13.5px] font-semibold ${
                    index === selectedIndex ? 'text-accent-hover' : 'text-ink'
                  }`}
                >
                  {item.reference}
                </span>
                <span className="truncate text-[12px] text-ink-faint">{item.preview}</span>
              </span>
              {index === selectedIndex && (
                <kbd className="flex-shrink-0 rounded border border-border-strong px-1.5 py-0.5 text-[10.5px] text-ink-faint">
                  ↵
                </kbd>
              )}
            </button>
          ))}
        </div>

        {items.length > 0 && (
          <div className="flex border-t border-border bg-surface-hover">
            <div className="flex flex-1 items-center justify-center gap-1.5 border-r border-border py-2 text-xs font-medium text-accent-hover">
              <kbd className="rounded border border-border-strong bg-surface px-1.5 py-0.5 text-[10.5px]">↵</kbd>
              <span className="flex items-center gap-1">
                <Book size={11} /> Citação
              </span>
            </div>
            <div className="flex flex-1 items-center justify-center gap-1.5 py-2 text-xs font-medium text-ink-muted">
              <kbd className="rounded border border-border-strong bg-surface px-1.5 py-0.5 text-[10.5px]">Tab</kbd>
              Texto simples
            </div>
          </div>
        )}
      </div>
    );
  }
);

ReferenceSuggestionPopup.displayName = 'ReferenceSuggestionPopup';

export default ReferenceSuggestionPopup;
