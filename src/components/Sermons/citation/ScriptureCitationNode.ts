import { Node, mergeAttributes } from '@tiptap/core';
import { ReactNodeViewRenderer } from '@tiptap/react';
import { Suggestion } from '@tiptap/suggestion';
import ScriptureCitationView from './ScriptureCitationView';
import citationSuggestion from './citationSuggestion';

export interface ScriptureCitationAttrs {
  reference: string;
  text: string;
  version: string;
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    scriptureCitation: {
      insertScriptureCitation: (attrs: ScriptureCitationAttrs) => ReturnType;
    };
  }
}

const ScriptureCitationNode = Node.create({
  name: 'scriptureCitation',
  group: 'block',
  atom: true,
  selectable: true,
  draggable: false,

  addAttributes() {
    return {
      reference: { default: '' },
      text: { default: '' },
      version: { default: 'ACF' },
    };
  },

  parseHTML() {
    return [{ tag: 'blockquote[data-scripture-citation]' }];
  },

  renderHTML({ HTMLAttributes, node }) {
    return [
      'blockquote',
      mergeAttributes(HTMLAttributes, {
        'data-scripture-citation': '',
        'data-reference': node.attrs.reference,
        'data-version': node.attrs.version,
      }),
      ['p', {}, node.attrs.text],
      ['cite', {}, `${node.attrs.reference} · ${node.attrs.version}`],
    ];
  },

  addNodeView() {
    return ReactNodeViewRenderer(ScriptureCitationView);
  },

  addCommands() {
    return {
      insertScriptureCitation:
        (attrs: ScriptureCitationAttrs) =>
        ({ chain }) =>
          chain().insertContent({ type: this.name, attrs }).run(),
    };
  },

  addProseMirrorPlugins() {
    return [
      Suggestion({
        editor: this.editor,
        ...citationSuggestion,
      }),
    ];
  },
});

export default ScriptureCitationNode;
