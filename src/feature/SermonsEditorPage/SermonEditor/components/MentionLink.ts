// MentionLink.ts
import { Mention as BaseMention } from '@tiptap/extension-mention'
import { Node as ProseMirrorNode } from '@tiptap/pm/model'

export const MentionLink = BaseMention.extend({
  name: 'mention',

  renderHTML({ node }:  { node: ProseMirrorNode }){
    return [
      'a',
      {
        href: `/profile/${node.attrs.id}`,
        class: 'mention',
      },
      node.attrs.label ?? `@${node.attrs.id}`,
    ]
  },
})
