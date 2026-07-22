import type { EnglishLesson, EnglishVocabularyItem, EnglishGrammarPoint } from '../types/englishLesson.types';
import type { EnglishLevel } from '../context/EnglishLearningContext';

// NOTA IMPORTANTE:
// Ainda não existe um endpoint no backend que gera essa explicação via IA por versículo.
// Este serviço roda 100% no client, sem chamada de rede e sem LLM: glossário curado +
// detecção de padrões gramaticais por regex. É intencionalmente conservador — preferimos
// omitir uma seção a "inventar" gramática ou tradução erradas para quem está aprendendo.
// Quando o backend tiver um endpoint de IA por versículo, troque a implementação de
// `generateEnglishLesson` por uma chamada a ele, mantendo a mesma assinatura/retorno.

const GLOSSARY: Record<string, { translation: string; note: string }> = {
  // Pronomes e verbos arcaicos (inglês "bíblico"/shakespeariano)
  begotten: { translation: 'gerado, único', note: 'Termo arcaico, raro fora da Bíblia — descreve um filho único/natural.' },
  beget: { translation: 'gerar (um filho)', note: 'Verbo bíblico/arcaico para "ter um filho".' },
  whosoever: { translation: 'todo aquele que / quem quer que', note: 'Forma arcaica de "whoever" — comum em traduções bíblicas mais antigas.' },
  shalt: { translation: 'forma arcaica de "shall"', note: 'Usado com "thou" (tu), como em "thou shalt not..." (tu não deverás...).' },
  thou: { translation: 'tu', note: 'Pronome arcaico para "you" no singular informal.' },
  thee: { translation: 'te, ti', note: 'Forma de objeto de "thou" — equivalente arcaico a "you".' },
  thy: { translation: 'teu, tua', note: 'Forma possessiva arcaica de "your".' },
  thine: { translation: 'teu, tua (antes de vogal ou sozinho)', note: 'Variante de "thy", usada como pronome possessivo isolado.' },
  hath: { translation: 'forma arcaica de "has"', note: 'Terceira pessoa do singular do verbo "have" no inglês antigo.' },
  doth: { translation: 'forma arcaica de "does"', note: 'Terceira pessoa do singular do verbo "do" no inglês antigo.' },
  believeth: { translation: 'crê (forma arcaica de "believes")', note: 'O sufixo "-eth" era usado no inglês antigo para a 3ª pessoa do singular.' },
  cometh: { translation: 'vem (forma arcaica de "comes")', note: 'Mesmo padrão de "-eth" do inglês antigo, como em "believeth", "doth".' },
  verily: { translation: 'em verdade, verdadeiramente', note: 'Advérbio arcaico — em traduções modernas normalmente vira "truly" ou "I tell you the truth".' },
  behold: { translation: 'eis, veja, olhe', note: 'Interjeição usada para chamar atenção para algo importante — "look!" em inglês moderno.' },
  lo: { translation: 'eis (aqui)', note: 'Forma ainda mais curta e arcaica de "behold".' },
  nay: { translation: 'não', note: 'Forma arcaica/formal de "no", às vezes usada para negar algo dito antes.' },
  yea: { translation: 'sim, de fato', note: 'Forma arcaica de "yes", também usada para reforçar uma afirmação ("yea, verily").' },
  whence: { translation: 'de onde', note: 'Forma arcaica de "from where".' },
  whither: { translation: 'para onde', note: 'Forma arcaica de "to where".' },
  hither: { translation: 'para cá', note: 'Forma arcaica de "here" com ideia de movimento — "come hither" = "venha para cá".' },
  thither: { translation: 'para lá', note: 'Forma arcaica de "there" com ideia de movimento.' },
  wherefore: { translation: 'por isso, por que motivo', note: 'Em "Romeo and Juliet", "wherefore art thou Romeo?" significa "por que você é um Romeu?", não "onde".' },
  betwixt: { translation: 'entre', note: 'Forma arcaica de "between".' },
  amongst: { translation: 'entre, no meio de', note: 'Variante britânica/mais formal de "among".' },
  unto: { translation: 'a, para, até', note: 'Preposição arcaica, equivalente a "to".' },

  // Vocabulário teológico/registro formal, muito frequente na Bíblia
  perish: { translation: 'perecer, morrer', note: 'Mais formal que "die"; comum em contextos religiosos e literários.' },
  everlasting: { translation: 'eterno, sem fim', note: 'Sinônimo mais literário de "eternal".' },
  eternal: { translation: 'eterno', note: 'Descreve algo sem começo nem fim.' },
  righteous: { translation: 'justo, correto (moralmente)', note: 'Adjetivo bíblico central — alguém que age de acordo com a vontade de Deus.' },
  righteousness: { translation: 'justiça (moral)', note: 'Substantivo de "righteous" — não é "justiça" no sentido jurídico.' },
  iniquity: { translation: 'iniquidade, pecado grave', note: 'Palavra formal/literária para maldade ou injustiça.' },
  wicked: { translation: 'perverso, mau', note: 'Adjetivo forte para descrever alguém moralmente corrupto.' },
  sin: { translation: 'pecado', note: 'Substantivo central da teologia cristã; também usado como verbo ("to sin").' },
  redemption: { translation: 'redenção, resgate', note: 'Ato de ser "resgatado" ou salvo de algo ruim.' },
  redeem: { translation: 'redimir, resgatar', note: 'Verbo relacionado a "redemption".' },
  salvation: { translation: 'salvação', note: 'Substantivo central no vocabulário cristão.' },
  covenant: { translation: 'aliança, pacto', note: 'Acordo solene, muito usado no contexto bíblico.' },
  forsaken: { translation: 'abandonado', note: 'Particípio passado de "forsake" (abandonar) — tom bastante formal.' },
  tribulation: { translation: 'tribulação, sofrimento', note: 'Palavra formal para grande dificuldade ou sofrimento.' },
  blessed: { translation: 'abençoado, bem-aventurado', note: 'Pode ser adjetivo ("bendito") ou verbo no passado.' },
  mercy: { translation: 'misericórdia', note: 'Compaixão demonstrada a alguém que "merecia" um tratamento pior.' },
  compassion: { translation: 'compaixão', note: 'Sentir e querer aliviar o sofrimento de outra pessoa.' },
  grace: { translation: 'graça', note: 'Favor imerecido; um dos termos mais centrais da teologia cristã.' },
  faith: { translation: 'fé', note: 'Confiança ou crença, geralmente sem prova concreta.' },
  believe: { translation: 'crer, acreditar', note: 'Verbo regular — "believeth" é a forma arcaica de "believes".' },
  humble: { translation: 'humilde', note: 'Também existe como verbo: "to humble oneself" = "humilhar-se".' },
  humility: { translation: 'humildade', note: 'Substantivo de "humble".' },
  proud: { translation: 'orgulhoso', note: 'No contexto bíblico costuma ter sentido negativo (soberba).' },
  holy: { translation: 'santo, sagrado', note: 'Separado para um propósito divino — muito frequente em "Holy Spirit" (Espírito Santo).' },
  sacred: { translation: 'sagrado', note: 'Sinônimo mais formal/literário de "holy" fora de contextos cristãos.' },
  worship: { translation: 'adorar, adoração', note: 'Pode ser verbo ou substantivo — devoção prestada a Deus.' },
  praise: { translation: 'louvar, louvor', note: 'Expressar admiração ou gratidão — muito comum nos Salmos.' },
  glory: { translation: 'glória', note: 'Grandeza, esplendor ou honra atribuída a Deus.' },
  obedience: { translation: 'obediência', note: 'Substantivo de "obey" (obedecer).' },
  commandment: { translation: 'mandamento', note: 'Regra ou ordem, como em "the Ten Commandments" (os Dez Mandamentos).' },
  temple: { translation: 'templo', note: 'Lugar de culto — no Novo Testamento, também usado metaforicamente para o corpo.' },
  altar: { translation: 'altar', note: 'Estrutura usada para oferecer sacrifícios ou orações.' },
  sacrifice: { translation: 'sacrifício', note: 'Ato de oferecer algo valioso, muitas vezes em nome de Deus.' },
  offering: { translation: 'oferta', note: 'Algo dado como presente ou sacrifício, geralmente em contexto religioso.' },
  priest: { translation: 'sacerdote, padre', note: 'Pessoa que realiza rituais religiosos e intermedia entre o povo e Deus.' },
  apostle: { translation: 'apóstolo', note: 'Um dos primeiros discípulos enviados para espalhar o evangelho.' },
  disciple: { translation: 'discípulo', note: 'Alguém que segue e aprende com um mestre.' },
  miracle: { translation: 'milagre', note: 'Evento extraordinário atribuído a uma ação divina.' },
  parable: { translation: 'parábola', note: 'Uma história curta usada para ensinar uma lição moral.' },
  resurrection: { translation: 'ressurreição', note: 'Voltar à vida depois da morte — evento central da fé cristã.' },
  crucify: { translation: 'crucificar', note: 'Executar alguém pregando-o em uma cruz.' },
  tomb: { translation: 'túmulo', note: 'Local onde um corpo é sepultado.' },
  angel: { translation: 'anjo', note: 'Mensageiro espiritual de Deus.' },
  heaven: { translation: 'céu, paraíso', note: 'Pode significar tanto o céu físico quanto o lugar espiritual.' },
  wilderness: { translation: 'deserto, ermo', note: 'Área selvagem e desabitada — não necessariamente arenosa.' },
  exile: { translation: 'exílio', note: 'Período vivendo fora da própria terra, geralmente à força.' },
  remnant: { translation: 'remanescente, resto', note: 'A parte pequena que restou de um grupo maior.' },
  inheritance: { translation: 'herança', note: 'Aquilo que se recebe de um antepassado ou de Deus.' },
  vow: { translation: 'voto, promessa solene', note: 'Compromisso sério, muitas vezes feito diante de Deus.' },
  testimony: { translation: 'testemunho', note: 'Relato de uma experiência, frequentemente de fé.' },
  gospel: { translation: 'evangelho, boa nova', note: 'Do inglês antigo "good news".' },
  kingdom: { translation: 'reino', note: 'No Novo Testamento, frequentemente "Kingdom of God/Heaven" (Reino de Deus/dos Céus).' },
  prophet: { translation: 'profeta', note: 'Pessoa que fala em nome de Deus, muitas vezes anunciando o futuro.' },
  shepherd: { translation: 'pastor (de ovelhas)', note: 'Também usado como metáfora para líder espiritual.' },
  flock: { translation: 'rebanho', note: 'Grupo de ovelhas — metáfora comum para a congregação/igreja.' },
  lamb: { translation: 'cordeiro', note: 'Filhote de ovelha; usado como símbolo de inocência e sacrifício.' },
  vineyard: { translation: 'vinhedo', note: 'Plantação de uvas, comum nas parábolas de Jesus.' },
  harvest: { translation: 'colheita', note: 'Também usada metaforicamente para "resultado" de um esforço.' },
  yoke: { translation: 'jugo (peça de madeira para bois)', note: 'Metáfora para um fardo ou responsabilidade a carregar.' },
  burden: { translation: 'fardo, carga', note: 'Peso físico ou emocional/espiritual a ser carregado.' },
  strength: { translation: 'força', note: 'Substantivo de "strong" — muito comum em promessas bíblicas.' },
  wisdom: { translation: 'sabedoria', note: 'Capacidade de julgar e agir bem, mais profunda que "knowledge" (conhecimento).' },
  understanding: { translation: 'entendimento, compreensão', note: 'Frequentemente usado como sinônimo elevado de "comprehension".' },

  // Conectores mais avançados (bons para B2/C1)
  therefore: { translation: 'portanto, por isso', note: 'Conector formal de conclusão — comum em textos argumentativos e bíblicos.' },
  moreover: { translation: 'além disso', note: 'Conector formal para adicionar uma informação.' },
  nevertheless: { translation: 'no entanto, apesar disso', note: 'Conector formal de contraste, mais forte que "but".' },
  furthermore: { translation: 'além do mais', note: 'Sinônimo formal de "moreover", comum em textos escritos.' },
  thereby: { translation: 'com isso, dessa forma', note: 'Advérbio formal que se refere a uma ação mencionada antes.' },
  hereby: { translation: 'por meio deste, assim', note: 'Muito usado em textos formais/jurídicos para declarar algo.' },
  wherein: { translation: 'em que, no qual', note: 'Forma formal/arcaica de "in which".' },
  whereby: { translation: 'pelo qual, através do qual', note: 'Forma formal de "by which".' },
  indeed: { translation: 'de fato, realmente', note: 'Usado para reforçar uma afirmação anterior.' },
  henceforth: { translation: 'de agora em diante', note: 'Advérbio formal/arcaico para "from now on".' },
};

const STOPWORDS = new Set([
  'the', 'a', 'an', 'and', 'or', 'but', 'for', 'so', 'of', 'to', 'in', 'on', 'at', 'is', 'are', 'was', 'were',
  'be', 'been', 'being', 'he', 'she', 'it', 'his', 'her', 'hers', 'its', 'that', 'this', 'these', 'those',
  'who', 'which', 'whom', 'not', 'will', 'shall', 'has', 'have', 'had', 'do', 'did', 'does', 'from', 'with',
  'as', 'by', 'all', 'they', 'we', 'you', 'i', 'my', 'your', 'our', 'their', 'them', 'him', 'me', 'us', 'no',
  'yes', 'if', 'then', 'than', 'there', 'here', 'when', 'where', 'what', 'why', 'how', 'into', 'unto', 'upon',
  'also', 'only', 'own', 'said', 'saith',
]);

interface GrammarRule {
  test: RegExp;
  title: string;
  explanation: string;
}

const GRAMMAR_RULES: GrammarRule[] = [
  {
    test: /\bso\b[\s\S]*\bthat\b/i,
    title: '"so ... that" (causa e consequência)',
    explanation: 'A estrutura "so [adjetivo/advérbio] that [resultado]" liga uma causa a uma consequência. Ex.: "so loved the world that he gave..." = "amou tanto o mundo que deu...".',
  },
  {
    test: /\bnot only\b[\s\S]*\bbut also\b/i,
    title: '"not only ... but also"',
    explanation: 'Estrutura correlativa para apresentar duas ideias em conjunto: "não somente X, mas também Y".',
  },
  {
    test: /\bnot\b[\s\S]{0,40}\bbut\b/i,
    title: '"not ... but" (contraste)',
    explanation: 'Contrasta duas ideias opostas: "not X, but Y" = "não X, mas Y". Repare que a segunda ideia geralmente corrige ou substitui a primeira.',
  },
  {
    test: /\bif\b[\s\S]{0,60}\b(will|shall|would|can|may|must)\b/i,
    title: 'Condicional (if ... will/would)',
    explanation: '"If [condição], [consequência com will/would/can]" descreve o que acontece caso algo seja verdade — equivalente ao "se ... então" em português.',
  },
  {
    test: /\b(have|has|had)\s+\w+(ed|en|ne|wn)\b/i,
    title: 'Presente perfeito (have/has + particípio)',
    explanation: '"Have/has + particípio passado" liga uma ação passada a uma relevância no presente. Ex.: "has given" = "deu/tem dado", com foco no resultado atual, não em quando aconteceu.',
  },
  {
    test: /\b(was|were)\s+\w+(ed|en)\b/i,
    title: 'Voz passiva',
    explanation: 'Quando o sujeito recebe a ação em vez de praticá-la: "was/were + particípio passado" (ex.: "was given", "were written"). Em português, equivale a "foi dado", "foram escritos".',
  },
  {
    test: /\b(who|which|whom)\s+\w+/i,
    title: 'Oração relativa (who / which / whom)',
    explanation: '"Who", "which" e "whom" introduzem uma oração que descreve ou dá mais informação sobre um substantivo anterior, como o "que" em português.',
  },
  {
    test: /\b\w+er\s+than\b/i,
    title: 'Comparativo (-er ... than)',
    explanation: 'Estrutura de comparação: "[adjetivo]+er than" equivale a "mais [adjetivo] do que" em português.',
  },
  {
    test: /\b\w+est\b|\bmost\s+\w+/i,
    title: 'Superlativo (-est / most)',
    explanation: 'Usado para dizer que algo é o "mais X" de um grupo. Adjetivos curtos ganham "-est" (highest); adjetivos longos usam "most" antes (most important).',
  },
  {
    test: /\b(must|should|could|would)\b/i,
    title: 'Verbo modal (must / should / could / would)',
    explanation: 'Modais expressam obrigação ("must"), recomendação ("should") ou possibilidade/hipótese ("could", "would") — não mudam de forma conforme o sujeito.',
  },
  {
    test: /\bshall\b|\bwill\b/i,
    title: 'Futuro com "shall" / "will"',
    explanation: '"Shall" e "will" marcam o futuro. "Shall" soa mais formal/arcaico e aparece bastante em traduções bíblicas mais antigas.',
  },
  {
    test: /^(let|come|go|fear not|do not|believe|trust|remember|rejoice|pray|seek|ask|knock|follow|love)\b/i,
    title: 'Modo imperativo (ordem/convite)',
    explanation: 'Frases que começam direto com o verbo, sem sujeito, dão uma ordem, um convite ou uma instrução — como "Venha!" ou "Não temas!" em português.',
  },
];

const extractVocabulary = (text: string): EnglishVocabularyItem[] => {
  const words = text
    .toLowerCase()
    .replace(/[.,;:!?()"'']/g, ' ')
    .split(/\s+/)
    .filter(Boolean);

  const seen = new Set<string>();
  const items: EnglishVocabularyItem[] = [];

  for (const word of words) {
    if (STOPWORDS.has(word) || seen.has(word)) continue;
    const entry = GLOSSARY[word];
    if (!entry) continue;
    seen.add(word);
    items.push({ word, translation: entry.translation, note: entry.note });
    if (items.length >= 5) break;
  }

  return items;
};

const detectGrammarPoint = (text: string): EnglishGrammarPoint | null => {
  const rule = GRAMMAR_RULES.find((r) => r.test.test(text));
  return rule ? { title: rule.title, explanation: rule.explanation } : null;
};

// Lições revisadas manualmente para versículos NIV muito conhecidos — qualidade
// acima do que o glossário + regex genéricos conseguem sozinhos. As chaves usam o
// texto NIV completo e exato do versículo (não a versão resumida usada como preview
// em outras telas do app), para casar com o texto vindo ao vivo da api.bible.
const CURATED: Record<string, EnglishLesson> = {
  'for god so loved the world that he gave his one and only son, that whoever believes in him shall not perish but have eternal life.': {
    level: 'B1',
    vocabulary: [
      { word: 'one and only', translation: 'único, exclusivo', note: 'Reforça que não há outro igual — mais natural em inglês moderno que "only begotten".' },
      { word: 'whoever', translation: 'quem quer que, todo aquele que', note: 'Versão moderna de "whosoever" — refere-se a qualquer pessoa, sem exceção.' },
      { word: 'perish', translation: 'perecer, morrer', note: 'Mais formal/literário que "die".' },
      { word: 'eternal', translation: 'eterno', note: 'Sem começo nem fim.' },
    ],
    grammarPoint: {
      title: '"so ... that" (causa e consequência)',
      explanation: 'A estrutura "so loved ... that he gave" conecta a intensidade do amor de Deus à ação que resultou dele: amou tanto que deu.',
    },
    paraphrase: 'God loved the world so much that he gave his only Son, so that anyone who believes in him will not die but will live forever.',
    isCurated: true,
  },
  'for god did not send his son into the world to condemn the world, but to save the world through him.': {
    level: 'B1',
    vocabulary: [
      { word: 'condemn', translation: 'condenar', note: 'Verbo formal, comum em contextos jurídicos e religiosos.' },
      { word: 'save', translation: 'salvar', note: 'Aqui, sentido religioso de "livrar de algo ruim", não "economizar".' },
    ],
    grammarPoint: {
      title: '"did not ... but" (contraste no passado)',
      explanation: '"did not send ... to condemn ... but to save" contrasta duas finalidades opostas usando o passado negativo "did not" + "but" para introduzir a ideia correta.',
    },
    paraphrase: 'God did not send his Son to judge the world, but to rescue it.',
    isCurated: true,
  },
  'in the beginning god created the heavens and the earth.': {
    level: 'A2',
    vocabulary: [
      { word: 'beginning', translation: 'começo, princípio', note: 'Substantivo de "begin" (começar) — "in the beginning" é uma expressão fixa, "no princípio".' },
      { word: 'created', translation: 'criou (passado de "create")', note: 'Verbo regular: create → created.' },
    ],
    grammarPoint: {
      title: 'Ordem sujeito-verbo-objeto (SVO)',
      explanation: 'Frase simples no padrão básico do inglês: sujeito ("God") + verbo ("created") + objeto ("the heavens and the earth").',
    },
    paraphrase: 'At the start of everything, God made the sky and the earth.',
    isCurated: true,
  },
  'the lord is my shepherd, i lack nothing.': {
    level: 'A2',
    vocabulary: [
      { word: 'shepherd', translation: 'pastor (de ovelhas)', note: 'Aqui usado como metáfora: Deus cuida como um pastor cuida das ovelhas.' },
      { word: 'lack', translation: 'faltar, carecer de', note: '"I lack nothing" = "não me falta nada" — note que "lack" já é negativo, sem precisar de "don\'t".' },
    ],
    grammarPoint: {
      title: '"Lack" como verbo (sem "don\'t")',
      explanation: '"Lack" já tem sentido negativo, então "I lack nothing" não usa "don\'t": seria errado dizer "I don\'t lack nothing" (dupla negativa).',
    },
    paraphrase: 'The Lord takes care of me like a shepherd, so I have everything I need.',
    isCurated: true,
  },
  'i can do all this through him who gives me strength.': {
    level: 'B1',
    vocabulary: [
      { word: 'strength', translation: 'força', note: 'Substantivo de "strong" — muito comum em promessas bíblicas.' },
    ],
    grammarPoint: {
      title: 'Oração relativa reduzida (who gives me strength)',
      explanation: '"him who gives me strength" = "aquele que me dá força" — "who" introduz uma oração relativa descrevendo "him".',
    },
    paraphrase: 'I am able to do everything because Christ makes me strong.',
    isCurated: true,
  },
  '"for i know the plans i have for you," declares the lord, "plans to prosper you and not to harm you, plans to give you hope and a future."': {
    level: 'B2',
    vocabulary: [
      { word: 'prosper', translation: 'prosperar', note: 'Verbo formal para "ter sucesso e bem-estar".' },
      { word: 'harm', translation: 'prejudicar, causar dano', note: 'Pode ser verbo ("to harm") ou substantivo ("no harm done").' },
      { word: 'declares', translation: 'declara, afirma', note: 'Verbo formal usado para introduzir uma fala solene — comum em profecias bíblicas.' },
    ],
    grammarPoint: {
      title: 'Presente perfeito (the plans I have for you)',
      explanation: '"I have for you" no presente enfatiza que os planos já existem e continuam válidos agora — não é sobre o passado.',
    },
    paraphrase: 'God says: "I have good plans for you — plans to help you, not hurt you, and to give you hope for the future."',
    isCurated: true,
  },
};

const normalize = (text: string) => text.toLowerCase().trim().replace(/\s+/g, ' ');

export const generateEnglishLesson = (verseText: string, level: EnglishLevel): EnglishLesson => {
  const curated = CURATED[normalize(verseText)];
  if (curated) return { ...curated, level };

  return {
    level,
    vocabulary: extractVocabulary(verseText),
    grammarPoint: detectGrammarPoint(verseText),
    paraphrase: null,
    isCurated: false,
  };
};
