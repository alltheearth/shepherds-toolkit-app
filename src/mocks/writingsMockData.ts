import type { Writing } from '../types/writing.types';

export const writingsSeed: Writing[] = [
  {
    id: '1',
    title: 'O Bom Pastor',
    base_text: 'João 10:11-18',
    preached_date: '2026-06-28',
    content:
      '<p>Jesus se apresenta como o bom pastor, aquele que dá a vida pelas ovelhas. Diferente do mercenário, o bom pastor conhece cada ovelha pelo nome e não foge diante do perigo...</p>',
    tags: ['pastoral', 'cuidado', 'joão'],
    status: 'completed',
    type: 'sermao',
    created_at: '2026-06-25T10:00:00.000Z',
    updated_at: '2026-06-28T09:00:00.000Z',
  },
  {
    id: '2',
    title: 'Fé em Tempos de Incerteza',
    base_text: 'Hebreus 11:1-6',
    preached_date: '2026-07-05',
    content: '<p>A fé é a certeza das coisas que se esperam, a convicção de fatos que se não veem...</p>',
    tags: ['fé', 'confiança'],
    status: 'completed',
    type: 'devocional',
    created_at: '2026-07-01T10:00:00.000Z',
    updated_at: '2026-07-05T09:00:00.000Z',
  },
  {
    id: '3',
    title: 'O Fruto do Espírito',
    base_text: 'Gálatas 5:22-23',
    preached_date: '2026-07-12',
    content: '<p>O fruto do Espírito é amor, alegria, paz, longanimidade, benignidade, bondade, fé, mansidão, domínio próprio...</p>',
    tags: ['espírito santo', 'caráter'],
    status: 'draft',
    type: 'esboco_estudo',
    created_at: '2026-07-10T10:00:00.000Z',
    updated_at: '2026-07-10T10:00:00.000Z',
  },
];
