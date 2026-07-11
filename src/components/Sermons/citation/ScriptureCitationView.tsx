import { NodeViewWrapper } from '@tiptap/react';
import type { NodeViewProps } from '@tiptap/react';
import { Book } from 'lucide-react';

const ScriptureCitationView: React.FC<NodeViewProps> = ({ node }) => {
  const { reference, text, version } = node.attrs as {
    reference: string;
    text: string;
    version: string;
  };

  return (
    <NodeViewWrapper
      className="scripture-citation not-prose my-3 rounded-r-lg border-l-[3px] border-accent bg-accent-soft px-4 py-3"
    >
      <p
        className="m-0 mb-2 text-[15px] italic leading-relaxed text-ink"
        style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
      >
        "{text}"
      </p>
      <div className="flex items-center gap-1.5 text-[11.5px] font-semibold text-accent-hover">
        <Book size={12} />
        <span>{reference}</span>
        <span className="font-normal text-ink-faint">· {version}</span>
      </div>
    </NodeViewWrapper>
  );
};

export default ScriptureCitationView;
