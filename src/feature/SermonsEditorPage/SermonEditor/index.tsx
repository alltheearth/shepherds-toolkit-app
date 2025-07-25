import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import Placeholder from '@tiptap/extension-placeholder'
import TextAlign from '@tiptap/extension-text-align'
import Toolbar from './Toolbar'
import Page from './Page'

const SermonEditor = () => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      Placeholder.configure({
        placeholder: 'Escreva seu sermão aqui...',
      }),
    ],
    content: '<h1>O Amor de Deus</h1><p>Base: João 3:16</p>',
  })

  return (
    <div className="w-full min-h-screen flex flex-col items-center bg-gray-100 py-8">
      
      <Toolbar editor={editor}/>

      {/* Área do Editor */}
      <Page>
        <EditorContent editor={editor} />
      </Page>
    </div>
  )
}

export default SermonEditor
