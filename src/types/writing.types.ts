export type WritingStatus = 'draft' | 'completed' | 'archived';

export type WritingType = 'sermao' | 'devocional' | 'esboco_estudo' | 'esboco_livro';

export const WRITING_TYPE_LABELS: Record<WritingType, string> = {
  sermao: 'Sermão',
  devocional: 'Devocional',
  esboco_estudo: 'Esboço de Estudo',
  esboco_livro: 'Esboço de Livro',
};

export interface Writing {
  id: string;
  title: string;
  content: string;
  base_text: string;
  theme?: string;
  category?: string;
  status: WritingStatus;
  type: WritingType;
  preached_date: string;
  estimated_duration?: number;
  tags: string[];
  tag_list?: string[];
  created_at: string;
  updated_at: string;
}
