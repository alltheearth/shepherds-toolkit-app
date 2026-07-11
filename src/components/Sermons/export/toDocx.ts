import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  HeadingLevel,
  AlignmentType,
  ExternalHyperlink,
  BorderStyle,
} from 'docx';
import { downloadBlob, sanitizeFilename } from './downloadBlob';

interface MarkState {
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  strike?: boolean;
  code?: boolean;
}

interface ListContext {
  type: 'bullet' | 'number';
  level: number;
}

const headingLevelByTag: Record<string, (typeof HeadingLevel)[keyof typeof HeadingLevel]> = {
  H1: HeadingLevel.HEADING_1,
  H2: HeadingLevel.HEADING_2,
  H3: HeadingLevel.HEADING_3,
  H4: HeadingLevel.HEADING_4,
};

const alignmentByCss: Record<string, (typeof AlignmentType)[keyof typeof AlignmentType]> = {
  left: AlignmentType.LEFT,
  center: AlignmentType.CENTER,
  right: AlignmentType.RIGHT,
  justify: AlignmentType.JUSTIFIED,
};

function getAlignment(el: Element): (typeof AlignmentType)[keyof typeof AlignmentType] | undefined {
  const inline = (el as HTMLElement).style?.textAlign;
  return inline ? alignmentByCss[inline] : undefined;
}

type InlineChild = TextRun | ExternalHyperlink;

function walkInline(node: ChildNode, marks: MarkState, runs: InlineChild[]): void {
  if (node.nodeType === Node.TEXT_NODE) {
    const text = node.textContent || '';
    if (text) {
      runs.push(
        new TextRun({
          text,
          bold: marks.bold,
          italics: marks.italic,
          underline: marks.underline ? {} : undefined,
          strike: marks.strike,
          font: marks.code ? 'Courier New' : undefined,
        })
      );
    }
    return;
  }

  if (node.nodeType !== Node.ELEMENT_NODE) return;
  const el = node as HTMLElement;
  const tag = el.tagName;

  if (tag === 'BR') {
    runs.push(new TextRun({ text: '', break: 1 }));
    return;
  }

  if (tag === 'A') {
    const hyperlinkRuns: TextRun[] = [];
    el.childNodes.forEach((child) => {
      const temp: InlineChild[] = [];
      walkInline(child, { ...marks, underline: true }, temp);
      temp.forEach((r) => {
        if (r instanceof TextRun) hyperlinkRuns.push(r);
      });
    });
    runs.push(
      new ExternalHyperlink({
        link: el.getAttribute('href') || '#',
        children: hyperlinkRuns.length ? hyperlinkRuns : [new TextRun({ text: el.textContent || '', underline: {} })],
      })
    );
    return;
  }

  const nextMarks: MarkState = { ...marks };
  if (tag === 'STRONG' || tag === 'B') nextMarks.bold = true;
  if (tag === 'EM' || tag === 'I') nextMarks.italic = true;
  if (tag === 'U') nextMarks.underline = true;
  if (tag === 'S' || tag === 'STRIKE' || tag === 'DEL') nextMarks.strike = true;
  if (tag === 'CODE') nextMarks.code = true;

  el.childNodes.forEach((child) => walkInline(child, nextMarks, runs));
}

function walkBlock(node: ChildNode, paragraphs: Paragraph[], listContext: ListContext | null = null): void {
  if (node.nodeType !== Node.ELEMENT_NODE) {
    const text = node.textContent?.trim();
    if (text) paragraphs.push(new Paragraph({ children: [new TextRun(text)] }));
    return;
  }

  const el = node as HTMLElement;
  const tag = el.tagName;
  const alignment = getAlignment(el);

  switch (tag) {
    case 'H1':
    case 'H2':
    case 'H3':
    case 'H4': {
      const runs: InlineChild[] = [];
      el.childNodes.forEach((c) => walkInline(c, {}, runs));
      paragraphs.push(new Paragraph({ heading: headingLevelByTag[tag], alignment, children: runs }));
      break;
    }
    case 'P': {
      const runs: InlineChild[] = [];
      el.childNodes.forEach((c) => walkInline(c, {}, runs));
      paragraphs.push(new Paragraph({ alignment, children: runs.length ? runs : [new TextRun('')] }));
      break;
    }
    case 'BLOCKQUOTE': {
      el.childNodes.forEach((child) => {
        if (child.nodeType !== Node.ELEMENT_NODE) return;
        const runs: InlineChild[] = [];
        child.childNodes.forEach((c) => walkInline(c, { italic: true }, runs));
        paragraphs.push(
          new Paragraph({
            children: runs,
            indent: { left: 720 },
            alignment: getAlignment(child as Element),
          })
        );
      });
      break;
    }
    case 'UL':
    case 'OL': {
      const level = listContext ? listContext.level + 1 : 0;
      const type: ListContext['type'] = tag === 'UL' ? 'bullet' : 'number';
      el.childNodes.forEach((c) => walkBlock(c, paragraphs, { type, level }));
      break;
    }
    case 'LI': {
      const runs: InlineChild[] = [];
      const nestedLists: Element[] = [];
      el.childNodes.forEach((c) => {
        if (c.nodeType === Node.ELEMENT_NODE && ['UL', 'OL'].includes((c as Element).tagName)) {
          nestedLists.push(c as Element);
        } else {
          walkInline(c, {}, runs);
        }
      });

      if (listContext?.type === 'bullet') {
        paragraphs.push(new Paragraph({ children: runs, bullet: { level: listContext.level } }));
      } else if (listContext?.type === 'number') {
        paragraphs.push(
          new Paragraph({ children: runs, numbering: { reference: 'sermon-numbering', level: listContext.level } })
        );
      } else {
        paragraphs.push(new Paragraph({ children: runs }));
      }

      nestedLists.forEach((nl) => walkBlock(nl, paragraphs, listContext));
      break;
    }
    case 'HR':
      paragraphs.push(
        new Paragraph({
          border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: 'CCCCCC' } },
        })
      );
      break;
    case 'PRE': {
      const text = el.textContent || '';
      paragraphs.push(new Paragraph({ children: [new TextRun({ text, font: 'Courier New' })] }));
      break;
    }
    default: {
      const before = paragraphs.length;
      el.childNodes.forEach((c) => {
        if (c.nodeType === Node.ELEMENT_NODE) walkBlock(c, paragraphs, listContext);
      });
      if (paragraphs.length === before) {
        const text = el.textContent?.trim();
        if (text) paragraphs.push(new Paragraph({ children: [new TextRun(text)] }));
      }
    }
  }
}

export interface SermonExportMeta {
  title: string;
  scripture_reference?: string;
  sermon_date?: string;
}

export interface SermonExportStyle {
  fontFamily?: string;
  fontSize?: number;
}

export async function exportSermonToDocx(
  sermon: SermonExportMeta,
  html: string,
  style: SermonExportStyle = {}
): Promise<void> {
  const parsed = new DOMParser().parseFromString(html, 'text/html');

  const bodyParagraphs: Paragraph[] = [];
  parsed.body.childNodes.forEach((node) => walkBlock(node, bodyParagraphs));

  const headerParagraphs: Paragraph[] = [
    new Paragraph({
      heading: HeadingLevel.HEADING_1,
      children: [new TextRun({ text: sermon.title || 'Sermão sem título' })],
    }),
    ...(sermon.scripture_reference
      ? [new Paragraph({ children: [new TextRun({ text: sermon.scripture_reference, italics: true })] })]
      : []),
    ...(sermon.sermon_date
      ? [
          new Paragraph({
            children: [new TextRun({ text: new Date(sermon.sermon_date).toLocaleDateString('pt-BR'), color: '888888' })],
          }),
        ]
      : []),
    new Paragraph({ text: '' }),
  ];

  const document = new Document({
    numbering: {
      config: [
        {
          reference: 'sermon-numbering',
          levels: [
            { level: 0, format: 'decimal', text: '%1.', alignment: AlignmentType.START },
            { level: 1, format: 'decimal', text: '%1.%2.', alignment: AlignmentType.START },
          ],
        },
      ],
    },
    styles: {
      default: {
        document: {
          run: {
            font: style.fontFamily || 'Arial',
            size: (style.fontSize || 16) * 2, // docx uses half-points
          },
        },
      },
    },
    sections: [{ children: [...headerParagraphs, ...bodyParagraphs] }],
  });

  const blob = await Packer.toBlob(document);
  downloadBlob(blob, `${sanitizeFilename(sermon.title)}.docx`);
}
