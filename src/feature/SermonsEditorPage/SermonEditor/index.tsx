import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
// import Mention from '@tiptap/extension-mention'

import Toolbar from './Toolbar'
import Page from './Page'
import { MentionLink } from './components/MentionLink'
// import { BibleMention } from './components/BibleMention'

// Tipos
type MentionItem = {
  id: string
  name: string
}

// Dados de exemplo
const mentionItems: MentionItem[] = [
  { id: '1', name: 'Alice' },
  { id: '2', name: 'Bob' },
  { id: '3', name: 'Charlie' },
  { id: '777', name: 'Daniel' },
]

const SermonEditor = () => {
  const editor = useEditor({
    editable: true,
    injectCSS: false,
    extensions: [
      StarterKit,
      Underline,
      MentionLink.configure({
        HTMLAttributes: {
          class: 'mention',
        },
        renderHTML({ node }) {
          return [
            'a',
            {
              href: `/profile/${node.attrs.id}`,
              class: 'mention',
            },
            node.attrs.label ?? `@${node.attrs.id}`,
          ]
        },
        renderLabel({ options, node }) {
          return node.attrs.label ?? `@${node.attrs.id}`
        },
        suggestion: {
          char: '@:',
          items: ({ query }: { query: string }) => {
            return mentionItems
              .filter((item) =>
                item.name.toLowerCase().startsWith(query.toLowerCase())
              )
              .slice(0, 5)
          },
          render: () => {
            let currentItem: MentionItem | null = null
            let runCommand: ((item: { id: string; label?: string }) => void) | null = null

            return {
              onStart: ({
                items,
                command,
              }: {
                items: MentionItem[]
                command: (item: { id: string; label?: string }) => void
              }) => {
                currentItem = items?.[0] ?? null
                runCommand = command
              },
              onUpdate: ({
                items,
                command,
              }: {
                items: MentionItem[]
                command: (item: { id: string; label?: string }) => void
              }) => {
                currentItem = items?.[0] ?? null
                runCommand = command
              },
              onKeyDown: ({ event }: { event: KeyboardEvent }) => {
                if (
                  (event.key === 'Enter' || event.key === 'Tab') &&
                  currentItem &&
                  runCommand
                ) {
                  runCommand({
                    id: currentItem.id,
                    label: currentItem.name, // Aparece como texto no editor
                  })
                  return true
                }
                return false
              },
              onExit: () => {
                currentItem = null
                runCommand = null
              },
            }
          },
        },
      }),
    ],
  })

  return (
    <div className="w-full min-h-screen flex flex-col items-center bg-gray-100 py-8">
      <Toolbar editor={editor} />
      <Page>
        <EditorContent editor={editor} />
      </Page>
    </div>
  )
}

export default SermonEditor
