import type { EnglishLevel } from '../context/EnglishLearningContext';

export interface EnglishVocabularyItem {
  word: string;
  translation: string;
  note: string;
}

export interface EnglishGrammarPoint {
  title: string;
  explanation: string;
}

export interface EnglishLesson {
  level: EnglishLevel;
  vocabulary: EnglishVocabularyItem[];
  grammarPoint: EnglishGrammarPoint | null;
  paraphrase: string | null;
  isCurated: boolean;
}

export interface EnglishLessonParams {
  verseId: number;
  verseText: string;
  level: EnglishLevel;
}
