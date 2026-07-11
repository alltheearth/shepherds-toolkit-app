// Espelha apps/bible/reference_parser.py do backend, só pro modo mock.
// Mantenha as duas listas de aliases em sincronia se um dos lados mudar.
import { booksSeed, buildVerse, verseCountFor } from './bibleMockData';

const RAW_ALIASES: Record<string, string[]> = {
  Gn: ['gn', 'gen', 'genesis'],
  Ex: ['ex', 'exo', 'exodo'],
  Lv: ['lv', 'lev', 'levitico'],
  Nm: ['nm', 'num', 'numeros'],
  Dt: ['dt', 'deut', 'deuteronomio'],
  Js: ['js', 'jos', 'josue'],
  Jz: ['jz', 'juizes'],
  Rt: ['rt', 'rute'],
  '1Sm': ['1sm', '1 sm', '1samuel', '1 samuel'],
  '2Sm': ['2sm', '2 sm', '2samuel', '2 samuel'],
  '1Rs': ['1rs', '1 rs', '1reis', '1 reis'],
  '2Rs': ['2rs', '2 rs', '2reis', '2 reis'],
  '1Cr': ['1cr', '1 cr', '1cronicas', '1 cronicas'],
  '2Cr': ['2cr', '2 cr', '2cronicas', '2 cronicas'],
  Ed: ['ed', 'esdras'],
  Ne: ['ne', 'neemias'],
  Et: ['et', 'ester'],
  'Jó': ['job'],
  Sl: ['sl', 'salmo', 'salmos', 'sal'],
  Pv: ['pv', 'prov', 'proverbios'],
  Ec: ['ec', 'eclesiastes'],
  Ct: ['ct', 'cantares', 'canticos'],
  Is: ['is', 'isaias'],
  Jr: ['jr', 'jer', 'jeremias'],
  Lm: ['lm', 'lamentacoes'],
  Ez: ['ez', 'eze', 'ezequiel'],
  Dn: ['dn', 'dan', 'daniel'],
  Os: ['os', 'oseias'],
  Jl: ['jl', 'joel'],
  Am: ['am', 'amos'],
  Ob: ['ob', 'obadias'],
  Jn: ['jn', 'jonas'],
  Mq: ['mq', 'miqueias'],
  Na: ['na', 'naum'],
  Hc: ['hc', 'habacuque'],
  Sf: ['sf', 'sofonias'],
  Ag: ['ag', 'ageu'],
  Zc: ['zc', 'zac', 'zacarias'],
  Ml: ['ml', 'malaquias'],
  Mt: ['mt', 'mat', 'mateus'],
  Mc: ['mc', 'mar', 'marcos'],
  Lc: ['lc', 'luc', 'lucas'],
  Jo: ['jo', 'joao'],
  At: ['at', 'atos'],
  Rm: ['rm', 'rom', 'romanos'],
  '1Co': ['1co', '1 co', '1cor', '1 cor', '1corintios', '1 corintios'],
  '2Co': ['2co', '2 co', '2cor', '2 cor', '2corintios', '2 corintios'],
  Gl: ['gl', 'gal', 'galatas'],
  Ef: ['ef', 'efe', 'efesios'],
  Fp: ['fp', 'fil', 'filipenses'],
  Cl: ['cl', 'col', 'colossenses'],
  '1Ts': ['1ts', '1 ts', '1tessalonicenses', '1 tessalonicenses'],
  '2Ts': ['2ts', '2 ts', '2tessalonicenses', '2 tessalonicenses'],
  '1Tm': ['1tm', '1 tm', '1timoteo', '1 timoteo'],
  '2Tm': ['2tm', '2 tm', '2timoteo', '2 timoteo'],
  Tt: ['tt', 'tito'],
  Fm: ['fm', 'filemom'],
  Hb: ['hb', 'heb', 'hebreus'],
  Tg: ['tg', 'tia', 'tiago'],
  '1Pe': ['1pe', '1 pe', '1pedro', '1 pedro'],
  '2Pe': ['2pe', '2 pe', '2pedro', '2 pedro'],
  '1Jo': ['1jo', '1 jo', '1joao', '1 joao'],
  '2Jo': ['2jo', '2 jo', '2joao', '2 joao'],
  '3Jo': ['3jo', '3 jo', '3joao', '3 joao'],
  Jd: ['jd', 'judas'],
  Ap: ['ap', 'apo', 'apocalipse'],
};

const AMBIGUOUS_BARE_ALIASES: Record<string, string[]> = {
  cor: ['1Co', '2Co'],
  corintios: ['1Co', '2Co'],
  samuel: ['1Sm', '2Sm'],
  reis: ['1Rs', '2Rs'],
  cronicas: ['1Cr', '2Cr'],
  tessalonicenses: ['1Ts', '2Ts'],
  timoteo: ['1Tm', '2Tm'],
  pedro: ['1Pe', '2Pe'],
};

const stripAccents = (text: string) => text.normalize('NFKD').replace(/[̀-ͯ]/g, '');
const normalize = (text: string) => stripAccents(text).toLowerCase().trim();

const ALIAS_INDEX: Record<string, string[]> = {};
for (const [abbrev, aliases] of Object.entries(RAW_ALIASES)) {
  for (const alias of aliases) {
    const key = normalize(alias);
    ALIAS_INDEX[key] = ALIAS_INDEX[key] || [];
    if (!ALIAS_INDEX[key].includes(abbrev)) ALIAS_INDEX[key].push(abbrev);
  }
}
for (const [key, abbrevs] of Object.entries(AMBIGUOUS_BARE_ALIASES)) {
  ALIAS_INDEX[key] = ALIAS_INDEX[key] || [];
  for (const abbrev of abbrevs) {
    if (!ALIAS_INDEX[key].includes(abbrev)) ALIAS_INDEX[key].push(abbrev);
  }
}

const JO_ACCENT_KEY = 'jó';

const resolveBookAbbrevs = (rawBookText: string): string[] => {
  if (rawBookText.trim().toLowerCase() === JO_ACCENT_KEY) return ['Jó'];

  const key = normalize(rawBookText);
  if (ALIAS_INDEX[key]) return [...ALIAS_INDEX[key]];

  const prefixMatches: string[] = [];
  if (key.length >= 2) {
    for (const [aliasKey, abbrevs] of Object.entries(ALIAS_INDEX)) {
      if (aliasKey.startsWith(key)) {
        for (const abbrev of abbrevs) {
          if (!prefixMatches.includes(abbrev)) prefixMatches.push(abbrev);
        }
      }
    }
  }
  return prefixMatches;
};

const REFERENCE_RE = /^\s*(\d?\s*[^\d]+?)\s*(\d+)(?:\s*[:.]\s*(\d+)(?:\s*-\s*(\d+))?)?\s*$/;

export interface ParsedReference {
  bookAbbrevs: string[];
  chapter: number;
  verseStart: number | null;
  verseEnd: number | null;
}

export const parseReference = (query: string): ParsedReference | null => {
  if (!query || !query.trim()) return null;

  const match = REFERENCE_RE.exec(query);
  if (!match) return null;

  const bookAbbrevs = resolveBookAbbrevs(match[1]);
  if (bookAbbrevs.length === 0) return null;

  const chapter = Number(match[2]);
  const verseStart = match[3] ? Number(match[3]) : null;
  const verseEnd = match[4] ? Number(match[4]) : verseStart;

  return { bookAbbrevs, chapter, verseStart, verseEnd };
};

export const formatReference = (
  bookName: string,
  chapter: number,
  verseStart: number | null,
  verseEnd: number | null
): string => {
  if (verseStart == null) return `${bookName} ${chapter}`;
  if (verseEnd && verseEnd !== verseStart) return `${bookName} ${chapter}:${verseStart}-${verseEnd}`;
  return `${bookName} ${chapter}:${verseStart}`;
};

const truncate = (text: string, length: number) => {
  const trimmed = text.trim();
  if (trimmed.length <= length) return trimmed;
  const cut = trimmed.slice(0, length);
  const lastSpace = cut.lastIndexOf(' ');
  return (lastSpace > 0 ? cut.slice(0, lastSpace) : cut) + '…';
};

export interface BibleReferenceResult {
  book_abbrev: string;
  book_name: string;
  chapter: number;
  verse_start: number;
  verse_end: number;
  reference: string;
  version: string;
  preview: string;
  text: string | null;
  verse_ids: number[] | null;
  verse_count?: number;
}

export const searchBibleReferenceMock = (query: string, version: string) => {
  const parsed = parseReference(query);
  if (!parsed) return { query, results: [] as BibleReferenceResult[] };

  const results: BibleReferenceResult[] = [];

  for (const abbrev of parsed.bookAbbrevs) {
    const book = booksSeed.find((b) => b.abbrev === abbrev);
    if (!book || parsed.chapter > book.total_chapters) continue;

    if (parsed.verseStart) {
      const verses = [];
      for (let v = parsed.verseStart; v <= (parsed.verseEnd ?? parsed.verseStart); v++) {
        verses.push(buildVerse(book, parsed.chapter, v, version));
      }
      const text = verses.map((v) => v.text).join(' ');
      results.push({
        book_abbrev: book.abbrev,
        book_name: book.name,
        chapter: parsed.chapter,
        verse_start: parsed.verseStart,
        verse_end: parsed.verseEnd ?? parsed.verseStart,
        reference: formatReference(book.name, parsed.chapter, parsed.verseStart, parsed.verseEnd),
        version,
        preview: truncate(text, 90),
        text,
        verse_ids: verses.map((v) => v.id),
      });
    } else {
      const totalVerses = verseCountFor(book, parsed.chapter);
      const first = buildVerse(book, parsed.chapter, 1, version);
      results.push({
        book_abbrev: book.abbrev,
        book_name: book.name,
        chapter: parsed.chapter,
        verse_start: 1,
        verse_end: totalVerses,
        reference: formatReference(book.name, parsed.chapter, null, null),
        version,
        preview: truncate(first.text, 90),
        text: null,
        verse_ids: null,
        verse_count: totalVerses,
      });
    }
  }

  return { query, results: results.slice(0, 8) };
};
