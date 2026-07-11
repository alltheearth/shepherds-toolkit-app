import { useEffect, useRef, useState } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import TextAlign from '@tiptap/extension-text-align';
import ScriptureCitationNode from './citation/ScriptureCitationNode';
import {
  Save, Download, Printer, Bold, Italic, Underline as UnderlineIcon,
  AlignLeft, AlignCenter, AlignRight, AlignJustify, List, ListOrdered,
  Undo, Redo, Loader2, ChevronDown, FileText, Book, Calendar, Clock,
} from 'lucide-react';
import type { MockSermon } from '../../mocks/sermonsMockData';
import { exportSermonToDocx } from './export/toDocx';
import { exportSermonToPdf } from './export/toPdf';

interface SermonEditorProps {
  sermon: MockSermon;
  onUpdateSermon: (patch: Partial<MockSermon>) => void;
  onSave: () => void;
  submitting: boolean;
}

const FONT_FAMILIES = ['Arial', 'Times New Roman', 'Georgia', 'Verdana', 'Courier New'];
const FONT_SIZES = [12, 14, 16, 18, 20, 24];

const calculateWordCount = (content: string) => {
  if (!content) return 0;
  const text = content.replace(/<[^>]*>/g, '');
  return text.split(/\s+/).filter((word) => word.length > 0).length;
};

const estimateDuration = (wordCount: number) => `${Math.ceil(wordCount / 130)} min`;

const headingSelectValue = (editor: ReturnType<typeof useEditor>) => {
  if (!editor) return 'p';
  if (editor.isActive('heading', { level: 1 })) return 'h1';
  if (editor.isActive('heading', { level: 2 })) return 'h2';
  if (editor.isActive('heading', { level: 3 })) return 'h3';
  if (editor.isActive('heading', { level: 4 })) return 'subtitle';
  return 'p';
};

const Divider = () => <div className="w-px h-5 bg-border mx-1.5 flex-shrink-0" />;

const SermonEditor: React.FC<SermonEditorProps> = ({ sermon, onUpdateSermon, onSave, submitting }) => {
  const [fontSize, setFontSize] = useState(16);
  const [fontFamily, setFontFamily] = useState('Arial');
  const [showDownloadMenu, setShowDownloadMenu] = useState(false);
  const [exporting, setExporting] = useState(false);

  const paperRef = useRef<HTMLDivElement>(null);
  const downloadMenuRef = useRef<HTMLDivElement>(null);
  const currentSermonId = useRef<number | null>(null);

  const editor = useEditor({
    extensions: [
      StarterKit,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      ScriptureCitationNode,
    ],
    content: sermon.content || '<p></p>',
    onUpdate: ({ editor }) => {
      onUpdateSermon({ content: editor.getHTML() });
    },
  });

  // Reload editor content only when switching to a different sermon (not on every keystroke)
  useEffect(() => {
    if (!editor) return;
    if (currentSermonId.current === sermon.id) return;
    currentSermonId.current = sermon.id;
    editor.commands.setContent(sermon.content || '<p></p>');
  }, [editor, sermon.id, sermon.content]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (downloadMenuRef.current && !downloadMenuRef.current.contains(e.target as Node)) {
        setShowDownloadMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!editor) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <Loader2 className="animate-spin text-accent" size={24} />
      </div>
    );
  }

  const wordCount = calculateWordCount(editor.getHTML());
  const duration = estimateDuration(wordCount);

  const toolbarButtonClass = (active: boolean) =>
    `w-8 h-8 flex-shrink-0 rounded-md flex items-center justify-center transition-colors ${
      active
        ? 'bg-accent-soft text-accent-hover dark:text-ink'
        : 'text-ink-muted hover:bg-surface-hover hover:text-ink'
    }`;

  const handleHeadingChange = (value: string) => {
    if (value === 'p') editor.chain().focus().setParagraph().run();
    else if (value === 'h1') editor.chain().focus().toggleHeading({ level: 1 }).run();
    else if (value === 'h2') editor.chain().focus().toggleHeading({ level: 2 }).run();
    else if (value === 'h3') editor.chain().focus().toggleHeading({ level: 3 }).run();
    else if (value === 'subtitle') editor.chain().focus().toggleHeading({ level: 4 }).run();
  };

  const handleExport = async (format: 'docx' | 'pdf') => {
    setShowDownloadMenu(false);
    setExporting(true);
    try {
      if (format === 'docx') {
        await exportSermonToDocx(sermon, editor.getHTML(), { fontFamily, fontSize });
      } else if (paperRef.current) {
        await exportSermonToPdf(paperRef.current, sermon.title);
      }
    } catch (error) {
      console.error('Erro ao exportar sermão:', error);
      alert('Erro ao exportar o sermão. Tente novamente.');
    } finally {
      setExporting(false);
    }
  };

  return (
    <>
      {/* Toolbar */}
      <div className="bg-surface border-b border-border px-3 py-2 flex items-center gap-0.5 overflow-x-auto">
        <select
          value={headingSelectValue(editor)}
          onChange={(e) => handleHeadingChange(e.target.value)}
          className="text-sm font-medium bg-transparent border-none outline-none text-ink px-1.5 py-1 rounded-md hover:bg-surface-hover cursor-pointer max-w-[110px]"
        >
          <option value="p">Parágrafo</option>
          <option value="h1">Título 1</option>
          <option value="h2">Título 2</option>
          <option value="h3">Título 3</option>
          <option value="subtitle">Subtítulo</option>
        </select>

        <Divider />

        <select
          value={fontFamily}
          onChange={(e) => setFontFamily(e.target.value)}
          className="text-sm bg-transparent border-none outline-none text-ink-muted px-1.5 py-1 rounded-md hover:bg-surface-hover cursor-pointer max-w-[92px]"
        >
          {FONT_FAMILIES.map((font) => (
            <option key={font} value={font}>{font}</option>
          ))}
        </select>
        <select
          value={fontSize}
          onChange={(e) => setFontSize(Number(e.target.value))}
          className="text-sm bg-transparent border-none outline-none text-ink-muted px-1.5 py-1 rounded-md hover:bg-surface-hover cursor-pointer w-14"
        >
          {FONT_SIZES.map((size) => (
            <option key={size} value={size}>{size}</option>
          ))}
        </select>

        <Divider />

        <button onClick={() => editor.chain().focus().toggleBold().run()} className={toolbarButtonClass(editor.isActive('bold'))} title="Negrito">
          <Bold size={16} />
        </button>
        <button onClick={() => editor.chain().focus().toggleItalic().run()} className={toolbarButtonClass(editor.isActive('italic'))} title="Itálico">
          <Italic size={16} />
        </button>
        <button onClick={() => editor.chain().focus().toggleUnderline().run()} className={toolbarButtonClass(editor.isActive('underline'))} title="Sublinhado">
          <UnderlineIcon size={16} />
        </button>

        <Divider />

        <button onClick={() => editor.chain().focus().setTextAlign('left').run()} className={toolbarButtonClass(editor.isActive({ textAlign: 'left' }))} title="Alinhar à Esquerda">
          <AlignLeft size={16} />
        </button>
        <button onClick={() => editor.chain().focus().setTextAlign('center').run()} className={toolbarButtonClass(editor.isActive({ textAlign: 'center' }))} title="Centralizar">
          <AlignCenter size={16} />
        </button>
        <button onClick={() => editor.chain().focus().setTextAlign('right').run()} className={toolbarButtonClass(editor.isActive({ textAlign: 'right' }))} title="Alinhar à Direita">
          <AlignRight size={16} />
        </button>
        <button onClick={() => editor.chain().focus().setTextAlign('justify').run()} className={toolbarButtonClass(editor.isActive({ textAlign: 'justify' }))} title="Justificar">
          <AlignJustify size={16} />
        </button>

        <Divider />

        <button onClick={() => editor.chain().focus().toggleBulletList().run()} className={toolbarButtonClass(editor.isActive('bulletList'))} title="Lista">
          <List size={16} />
        </button>
        <button onClick={() => editor.chain().focus().toggleOrderedList().run()} className={toolbarButtonClass(editor.isActive('orderedList'))} title="Lista Numerada">
          <ListOrdered size={16} />
        </button>

        <Divider />

        <button onClick={() => editor.chain().focus().undo().run()} disabled={!editor.can().undo()} className={toolbarButtonClass(false)} title="Desfazer">
          <Undo size={16} />
        </button>
        <button onClick={() => editor.chain().focus().redo().run()} disabled={!editor.can().redo()} className={toolbarButtonClass(false)} title="Refazer">
          <Redo size={16} />
        </button>

        <div className="flex-1" />

        <button onClick={onSave} disabled={submitting} className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-sm text-ink-muted hover:bg-surface-hover transition-colors disabled:opacity-50 flex-shrink-0" title="Salvar">
          {submitting ? <Loader2 size={15} className="animate-spin" /> : <Save size={15} />}
          <span>Salvar</span>
        </button>

        <div className="relative flex-shrink-0" ref={downloadMenuRef}>
          <button
            onClick={() => setShowDownloadMenu((v) => !v)}
            disabled={exporting}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md border border-border text-sm text-ink hover:bg-surface-hover transition-colors disabled:opacity-50"
            title="Baixar"
          >
            {exporting ? <Loader2 size={15} className="animate-spin" /> : <Download size={15} />}
            <span>Baixar</span>
            <ChevronDown size={13} />
          </button>
          {showDownloadMenu && (
            <div className="absolute right-0 mt-1 w-40 bg-surface border border-border rounded-md shadow-lg z-20 overflow-hidden">
              <button onClick={() => handleExport('docx')} className="w-full px-3 py-2 text-left text-sm text-ink hover:bg-surface-hover flex items-center gap-2">
                <FileText size={14} /> Word (.docx)
              </button>
              <button onClick={() => handleExport('pdf')} className="w-full px-3 py-2 text-left text-sm text-ink hover:bg-surface-hover flex items-center gap-2">
                <FileText size={14} /> PDF
              </button>
            </div>
          )}
        </div>

        <button onClick={() => window.print()} className={toolbarButtonClass(false)} title="Imprimir">
          <Printer size={16} />
        </button>
      </div>

      {/* Page Canvas */}
      <div className="flex-1 overflow-y-auto py-10 px-6 bg-bg">
        <div className="max-w-[720px] mx-auto">
          <div
            ref={paperRef}
            className="sermon-print-area bg-surface border border-border rounded-xl px-14 py-12"
            style={{ fontSize: `${fontSize}px`, fontFamily }}
          >
            {/* Document Header */}
            <input
              value={sermon.title}
              onChange={(e) => onUpdateSermon({ title: e.target.value })}
              placeholder="Título do sermão"
              className="w-full text-3xl font-medium text-ink mb-3 bg-transparent border-none outline-none focus:ring-0 p-0"
            />

            <div className="flex items-center gap-3 mb-8 flex-wrap">
              <span className="inline-flex items-center gap-1.5 bg-accent-soft text-accent-hover dark:text-ink text-xs font-medium px-2.5 py-1 rounded-md">
                <Book size={13} />
                <input
                  value={sermon.scripture_reference}
                  onChange={(e) => onUpdateSermon({ scripture_reference: e.target.value })}
                  placeholder="Referência bíblica"
                  className="bg-transparent border-none outline-none focus:ring-0 p-0 text-xs font-medium min-w-0"
                  style={{ width: `${Math.max(sermon.scripture_reference?.length || 16, 16)}ch` }}
                />
              </span>
              <span className="flex items-center gap-1 text-xs text-ink-faint">
                <Calendar size={13} />
                {sermon.sermon_date ? new Date(sermon.sermon_date).toLocaleDateString('pt-BR') : '-'}
              </span>
              <span className="flex items-center gap-1 text-xs text-ink-faint">
                <Clock size={13} />
                {duration}
              </span>
            </div>

            {/* Content */}
            <EditorContent editor={editor} className="prose max-w-none min-h-[300px] focus:outline-none" />
          </div>

          <p className="text-center text-xs text-ink-faint mt-3">{wordCount} palavras</p>
        </div>
      </div>
    </>
  );
};

export default SermonEditor;
