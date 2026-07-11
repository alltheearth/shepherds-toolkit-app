import { ReactRenderer } from '@tiptap/react';
import type { SuggestionOptions } from '@tiptap/suggestion';
import ReferenceSuggestionPopup, { type ReferenceSuggestionPopupHandle } from './ReferenceSuggestionPopup';
import { searchBibleReference, type BibleReferenceResult } from '../../../services/bibleReferenceService';

export type CitationSelectPayload = {
  item: BibleReferenceResult;
  mode: 'citation' | 'text';
};

const citationSuggestion: Omit<SuggestionOptions<BibleReferenceResult, CitationSelectPayload>, 'editor'> = {
  char: '@',
  allowSpaces: true,
  debounce: 220,
  minQueryLength: 0,

  items: async ({ query }) => {
    if (!query.trim()) return [];
    try {
      const data = await searchBibleReference(query);
      return data.results;
    } catch {
      return [];
    }
  },

  command: ({ editor, range, props }) => {
    const { item, mode } = props;
    const text = item.text ?? item.preview;

    if (mode === 'text') {
      editor.chain().focus().deleteRange(range).insertContent(`${text} `).run();
      return;
    }

    editor
      .chain()
      .focus()
      .deleteRange(range)
      .insertScriptureCitation({ reference: item.reference, text, version: item.version })
      .run();
  },

  render: () => {
    let component: ReactRenderer<ReferenceSuggestionPopupHandle>;
    let unmount: (() => void) | undefined;

    return {
      onStart: (props) => {
        component = new ReactRenderer(ReferenceSuggestionPopup, {
          props: {
            query: props.query,
            items: props.items,
            loading: props.loading,
            onSelect: (item: BibleReferenceResult, mode: 'citation' | 'text') => props.command({ item, mode }),
          },
          editor: props.editor,
        });

        unmount = props.mount(component.element);
      },

      onUpdate(props) {
        component.updateProps({
          query: props.query,
          items: props.items,
          loading: props.loading,
          onSelect: (item: BibleReferenceResult, mode: 'citation' | 'text') => props.command({ item, mode }),
        });
      },

      onKeyDown(props) {
        return component.ref?.onKeyDown({ event: props.event }) ?? false;
      },

      onExit() {
        unmount?.();
        component.destroy();
      },
    };
  },
};

export default citationSuggestion;
