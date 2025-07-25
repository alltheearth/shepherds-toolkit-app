import { Editor } from "@tiptap/core"

interface ToolbarProps {
    editor: Editor | null
}

const Toolbar = ({editor}: ToolbarProps) => {
    return(
        <div>
            <button onClick={() => editor?.chain().focus().toggleBold().run()}>Negrito</button>
            <button onClick={() => editor?.chain().focus().toggleItalic().run()}>Itálico</button>
            <button onClick={() => editor?.chain().focus().toggleUnderline().run()}>Sublinhado</button>
            <button onClick={() => editor?.chain().focus().setParagraph().run()}>Parágrafo</button>
            <button onClick={() => editor?.chain().focus().toggleBulletList().run()}>Lista</button>
            <button onClick={() => editor?.chain().focus().setTextAlign('center').run()}>Centralizar</button>
        </div>
    )
}

export default Toolbar