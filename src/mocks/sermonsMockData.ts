export interface MockSermon {
  id: number;
  title: string;
  scripture_reference: string;
  sermon_date: string;
  content: string;
  notes: string;
  tags: string[];
  status: 'draft' | 'published';
  created_at: string;
  updated_at: string;
}

export const sermonsSeed: MockSermon[] = [
  {
    id: 1,
    title: 'O Bom Pastor',
    scripture_reference: 'João 10:11-18',
    sermon_date: '2026-06-28',
    content:
      '<p>Jesus se apresenta como o bom pastor, aquele que dá a vida pelas ovelhas. Diferente do mercenário, o bom pastor conhece cada ovelha pelo nome e não foge diante do perigo...</p>',
    notes: 'Enfatizar a diferença entre o pastor contratado e o dono do rebanho.',
    tags: ['pastoral', 'cuidado', 'joão'],
    status: 'published',
    created_at: '2026-06-25T10:00:00.000Z',
    updated_at: '2026-06-28T09:00:00.000Z',
  },
  {
    id: 2,
    title: 'Fé em Tempos de Incerteza',
    scripture_reference: 'Hebreus 11:1-6',
    sermon_date: '2026-07-05',
    content: '<p>A fé é a certeza das coisas que se esperam, a convicção de fatos que se não veem...</p>',
    notes: 'Trazer exemplos de Abraão e Noé.',
    tags: ['fé', 'confiança'],
    status: 'published',
    created_at: '2026-07-01T10:00:00.000Z',
    updated_at: '2026-07-05T09:00:00.000Z',
  },
  {
    id: 3,
    title: 'O Fruto do Espírito',
    scripture_reference: 'Gálatas 5:22-23',
    sermon_date: '2026-07-12',
    content: '<p>O fruto do Espírito é amor, alegria, paz, longanimidade, benignidade, bondade, fé, mansidão, domínio próprio...</p>',
    notes: 'Rascunho ainda em preparação.',
    tags: ['espírito santo', 'caráter'],
    status: 'draft',
    created_at: '2026-07-10T10:00:00.000Z',
    updated_at: '2026-07-10T10:00:00.000Z',
  },
];
