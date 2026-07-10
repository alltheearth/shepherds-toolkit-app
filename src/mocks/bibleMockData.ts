import type { BibleBook, BibleVerse, HighlightColor, ChapterNavigation } from '../types/bible.types';

const BOOK_DEFS: Array<[string, string, 'old' | 'new', number]> = [
  ['Gênesis', 'Gn', 'old', 50], ['Êxodo', 'Ex', 'old', 40], ['Levítico', 'Lv', 'old', 27],
  ['Números', 'Nm', 'old', 36], ['Deuteronômio', 'Dt', 'old', 34], ['Josué', 'Js', 'old', 24],
  ['Juízes', 'Jz', 'old', 21], ['Rute', 'Rt', 'old', 4], ['1 Samuel', '1Sm', 'old', 31],
  ['2 Samuel', '2Sm', 'old', 24], ['1 Reis', '1Rs', 'old', 22], ['2 Reis', '2Rs', 'old', 25],
  ['1 Crônicas', '1Cr', 'old', 29], ['2 Crônicas', '2Cr', 'old', 36], ['Esdras', 'Ed', 'old', 10],
  ['Neemias', 'Ne', 'old', 13], ['Ester', 'Et', 'old', 10], ['Jó', 'Jó', 'old', 42],
  ['Salmos', 'Sl', 'old', 150], ['Provérbios', 'Pv', 'old', 31], ['Eclesiastes', 'Ec', 'old', 12],
  ['Cânticos', 'Ct', 'old', 8], ['Isaías', 'Is', 'old', 66], ['Jeremias', 'Jr', 'old', 52],
  ['Lamentações', 'Lm', 'old', 5], ['Ezequiel', 'Ez', 'old', 48], ['Daniel', 'Dn', 'old', 12],
  ['Oséias', 'Os', 'old', 14], ['Joel', 'Jl', 'old', 3], ['Amós', 'Am', 'old', 9],
  ['Obadias', 'Ob', 'old', 1], ['Jonas', 'Jn', 'old', 4], ['Miquéias', 'Mq', 'old', 7],
  ['Naum', 'Na', 'old', 3], ['Habacuque', 'Hc', 'old', 3], ['Sofonias', 'Sf', 'old', 3],
  ['Ageu', 'Ag', 'old', 2], ['Zacarias', 'Zc', 'old', 14], ['Malaquias', 'Ml', 'old', 4],
  ['Mateus', 'Mt', 'new', 28], ['Marcos', 'Mc', 'new', 16], ['Lucas', 'Lc', 'new', 24],
  ['João', 'Jo', 'new', 21], ['Atos', 'At', 'new', 28], ['Romanos', 'Rm', 'new', 16],
  ['1 Coríntios', '1Co', 'new', 16], ['2 Coríntios', '2Co', 'new', 13], ['Gálatas', 'Gl', 'new', 6],
  ['Efésios', 'Ef', 'new', 6], ['Filipenses', 'Fp', 'new', 4], ['Colossenses', 'Cl', 'new', 4],
  ['1 Tessalonicenses', '1Ts', 'new', 5], ['2 Tessalonicenses', '2Ts', 'new', 3], ['1 Timóteo', '1Tm', 'new', 6],
  ['2 Timóteo', '2Tm', 'new', 4], ['Tito', 'Tt', 'new', 3], ['Filemom', 'Fm', 'new', 1],
  ['Hebreus', 'Hb', 'new', 13], ['Tiago', 'Tg', 'new', 5], ['1 Pedro', '1Pe', 'new', 5],
  ['2 Pedro', '2Pe', 'new', 3], ['1 João', '1Jo', 'new', 5], ['2 João', '2Jo', 'new', 1],
  ['3 João', '3Jo', 'new', 1], ['Judas', 'Jd', 'new', 1], ['Apocalipse', 'Ap', 'new', 22],
];

export const booksSeed: BibleBook[] = BOOK_DEFS.map(([name, abbrev, testament, total_chapters], idx) => ({
  id: idx + 1,
  name,
  abbrev,
  testament,
  book_order: idx + 1,
  total_chapters,
}));

const GENESIS_1: string[] = [
  'No princípio, Deus criou os céus e a terra.',
  'Era a terra sem forma e vazia; trevas cobriam a face do abismo, e o Espírito de Deus se movia sobre a face das águas.',
  'Disse Deus: Haja luz; e houve luz.',
  'Viu Deus que a luz era boa; e fez separação entre a luz e as trevas.',
  'Deus chamou à luz Dia, e às trevas chamou Noite. Houve tarde e manhã, o primeiro dia.',
  'Depois disse Deus: Haja um firmamento no meio das águas, e separe as águas das águas.',
  'Fez, pois, Deus o firmamento, e separou as águas que estavam debaixo do firmamento das que estavam por cima do firmamento. E assim foi.',
  'Chamou Deus ao firmamento Céus. Houve tarde e manhã, o segundo dia.',
  'Disse também Deus: Ajuntem-se as águas debaixo dos céus num só lugar, e apareça a porção seca. E assim foi.',
  'Chamou Deus à porção seca Terra, e ao ajuntamento das águas chamou Mares. E viu Deus que isso era bom.',
];

const JOHN_3_HIGHLIGHTS: Record<number, string> = {
  16: 'Porque Deus amou o mundo de tal maneira que deu o seu Filho unigênito, para que todo aquele que nele crê não pereça, mas tenha a vida eterna.',
  17: 'Porque Deus enviou o seu Filho ao mundo não para que condenasse o mundo, mas para que o mundo fosse salvo por ele.',
};

let highlightId = 1;
const highlights = new Map<string, { id: string; color: HighlightColor; is_favorite: boolean; created_at: string }>();
const highlightKey = (verseId: number) => String(verseId);

const buildVerse = (book: BibleBook, chapter: number, verseNumber: number, version: string): BibleVerse => {
  const id = book.id * 100000 + chapter * 1000 + verseNumber;

  let text = `Texto de exemplo de ${book.name} ${chapter}:${verseNumber} (versão ${version}), usado apenas para fins de demonstração da interface.`;
  if (book.abbrev === 'Gn' && chapter === 1 && GENESIS_1[verseNumber - 1]) {
    text = GENESIS_1[verseNumber - 1];
  }
  if (book.abbrev === 'Jo' && chapter === 3 && JOHN_3_HIGHLIGHTS[verseNumber]) {
    text = JOHN_3_HIGHLIGHTS[verseNumber];
  }

  const highlight = highlights.get(highlightKey(id)) || null;

  return {
    id,
    book: book.id,
    book_name: book.name,
    chapter,
    verse: verseNumber,
    text,
    version,
    reference: `${book.name} ${chapter}:${verseNumber}`,
    user_highlight: highlight,
  };
};

const verseCountFor = (book: BibleBook, chapter: number): number => {
  if (book.abbrev === 'Gn' && chapter === 1) return 10;
  if (book.abbrev === 'Jo' && chapter === 3) return 21;
  return 12;
};

export const getBook = (id: string | number) => booksSeed.find((b) => String(b.id) === String(id));

export const getVersesForChapter = (bookId: string | number, chapter: string | number, version: string) => {
  const book = getBook(bookId);
  if (!book) throw new Error('Livro não encontrado');
  const chapterNum = Number(chapter);
  const count = verseCountFor(book, chapterNum);
  const results = Array.from({ length: count }, (_, i) => buildVerse(book, chapterNum, i + 1, version));

  const bookIndex = booksSeed.findIndex((b) => b.id === book.id);
  const hasPrevInBook = chapterNum > 1;
  const hasNextInBook = chapterNum < book.total_chapters;
  const prevBook = !hasPrevInBook ? booksSeed[bookIndex - 1] : null;
  const nextBook = !hasNextInBook ? booksSeed[bookIndex + 1] : null;

  const navigation: ChapterNavigation = {
    current: {
      book: book.abbrev,
      book_name: book.name,
      chapter: chapterNum,
      total_chapters: book.total_chapters,
      testament: book.testament,
    },
    previous: hasPrevInBook
      ? { book: book.abbrev, book_name: book.name, chapter: chapterNum - 1, is_same_book: true, url: '' }
      : prevBook
        ? { book: prevBook.abbrev, book_name: prevBook.name, chapter: prevBook.total_chapters, is_same_book: false, url: '' }
        : null,
    next: hasNextInBook
      ? { book: book.abbrev, book_name: book.name, chapter: chapterNum + 1, is_same_book: true, url: '' }
      : nextBook
        ? { book: nextBook.abbrev, book_name: nextBook.name, chapter: 1, is_same_book: false, url: '' }
        : null,
    book_chapters: { first: 1, last: book.total_chapters, current: chapterNum },
  };

  return { results, navigation };
};

export const setHighlight = (verseId: number, color?: HighlightColor, isFavorite?: boolean) => {
  const existing = highlights.get(highlightKey(verseId));
  const entry = {
    id: existing?.id || String(++highlightId),
    color: color ?? existing?.color ?? '',
    is_favorite: isFavorite ?? existing?.is_favorite ?? false,
    created_at: existing?.created_at || new Date().toISOString(),
  };
  highlights.set(highlightKey(verseId), entry);
  return entry;
};
