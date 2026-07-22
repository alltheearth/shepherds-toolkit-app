// src/components/bible/index.tsx - VERSÃO COMPLETA COM NAVEGAÇÃO

import React, { useState } from 'react';
import {
  Book, ChevronDown, Star, Palette, MessageSquare, Copy,
  Sparkles, Search, BookOpen, ChevronLeft, ChevronRight,
  X, Share2, Settings, Bookmark, Languages, Volume2
} from 'lucide-react';
import bibleApi, {
  useGetBooksQuery,
  useGetVersesQuery,
  useHighlightVerseMutation,
  useToggleFavoriteMutation
} from '../../feature/bible/bibleApi';
import type { BibleVerse, HighlightColor } from '../../types/bible.types';
import { useDispatch } from 'react-redux';
import { type AppDispatch } from '../../store';
import { Button } from '../ui/Button';
import { useEnglishLearning } from '../../context/EnglishLearningContext';
import { generateEnglishLesson } from '../../services/englishLessonService';
import { speak } from '../../services/speechService';
import { openCaleb } from '../../feature/caleb';
import { useCalebChat } from '../../feature/caleb/useCalebChat';

const SELECT_CLASSES =
  'px-3 py-2 bg-surface border border-border rounded-md text-sm text-ink focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-shadow';

const Bible = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [selectedVerse, setSelectedVerse] = useState<BibleVerse | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showAI, setShowAI] = useState(false);

  const [book, setBook] = useState('1');
  const [chapter, setChapter] = useState('1');
  const [version, setVersion] = useState('ALM1911');

  const { data: verses } = useGetVersesQuery({ book, chapter, version });
  const { data: books } = useGetBooksQuery();

  // ✅ NOVO: Extrair dados de navegação
  const navigation = verses?.chapter_navigation;

  // ALM1911 e KJV: domínio público, texto guardado localmente.
  // NIV: copyright da Biblica, servida ao vivo via api.bible (nunca guardada aqui).
  // ACF/NVI/ARA/NTLH antigas continuam no banco só para uso/teste interno,
  // pois exigem licença das respectivas sociedades bíblicas para distribuição.
  const versions = [
    { id: 'ALM1911', name: 'Almeida 1911', text: 'Porque Deus amou o mundo de tal maneira que deu o seu Filho unigenito...' },
    { id: 'KJV', name: 'King James Version', text: 'For God so loved the world, that he gave his only begotten Son...' },
    { id: 'NIV', name: 'NIV', text: 'For God so loved the world that he gave his one and only Son...' },
  ];

  const colorOptions = [
    { name: 'Amarelo', color: 'bg-yellow-200', value: 'yellow' },
    { name: 'Verde', color: 'bg-green-200', value: 'green' },
    { name: 'Azul', color: 'bg-blue-200', value: 'blue' },
    { name: 'Rosa', color: 'bg-pink-200', value: 'pink' },
    { name: 'Roxo', color: 'bg-purple-200', value: 'purple' },
  ];

  // ✅ NOVO: Funções de navegação
  const handlePreviousChapter = () => {
    if (navigation?.previous) {
      const prevBook = books?.results.find(b => b.abbrev === navigation.previous!.book);
      if (prevBook) {
        setBook(prevBook.id.toString());
        setChapter(navigation.previous.chapter.toString());
      }
    }
  };

  const handleNextChapter = () => {
    if (navigation?.next) {
      const nextBook = books?.results.find(b => b.abbrev === navigation.next!.book);
      if (nextBook) {
        setBook(nextBook.id.toString());
        setChapter(navigation.next.chapter.toString());
      }
    }
  };

  const handleVerseClick = (verse: BibleVerse) => {
    setSelectedVerse(verse);
    setSidebarOpen(true);
    setShowAI(false);
  };

  const getVerseColor = (color: HighlightColor) => {
    const colors = {
      yellow: 'bg-yellow-100 dark:bg-yellow-900/30 border-yellow-300 dark:border-yellow-700',
      green: 'bg-green-100 dark:bg-green-900/30 border-green-300 dark:border-green-700',
      blue: 'bg-blue-100 dark:bg-blue-900/30 border-blue-300 dark:border-blue-700',
      pink: 'bg-pink-100 dark:bg-pink-900/30 border-pink-300 dark:border-pink-700',
      purple: 'bg-purple-100 dark:bg-purple-900/30 border-purple-300 dark:border-purple-700',
    };
    if (!color) return '';
    return colors[color];
  };

  const [toggleFavorite] = useToggleFavoriteMutation();
  const [highlightVerse] = useHighlightVerseMutation();
  const { send: sendToCaleb } = useCalebChat();
  const { settings } = useEnglishLearning();
  const [expandedLessonVerseId, setExpandedLessonVerseId] = useState<number | null>(null);

  const handleToggleLesson = (e: React.MouseEvent, verseId: number) => {
    e.stopPropagation();
    setExpandedLessonVerseId((prev) => (prev === verseId ? null : verseId));
  };

  const handleSpeak = (e: React.MouseEvent, text: string) => {
    e.stopPropagation();
    speak(text, settings.audioSpeed, settings.audioAccent);
  };

  const verseCalebContext = (interactionType: 'context' | 'etymology' | 'related_texts' | 'application') => {
    if (!selectedVerse) return null;
    return {
      kind: 'verse' as const,
      id: selectedVerse.id,
      label: `${selectedVerse.book_name} ${selectedVerse.chapter}:${selectedVerse.verse}`,
      interactionType,
      promptPrefix: `"${selectedVerse.text}"`,
    };
  };

  const handleAskCaleb = (
    interactionType: 'context' | 'etymology' | 'related_texts',
    starterText: string
  ) => {
    const context = verseCalebContext(interactionType);
    if (!context) return;
    dispatch(openCaleb(context));
    sendToCaleb(starterText, context);
  };

  const handleOpenCalebNudge = () => {
    const context = verseCalebContext('application');
    if (!context) return;
    dispatch(openCaleb(context));
  };

  const handleFavoriteClick = async () => {
    if (!selectedVerse) return;

    const payload = {
      verse: selectedVerse.id,
      color: selectedVerse.user_highlight?.color as HighlightColor,
      is_favorite: !selectedVerse.user_highlight?.is_favorite,
    };

    try {
      dispatch(
        bibleApi.util.updateQueryData(
          'getVerses',
          { book, chapter, version },
          (draft) => {
            const verse = draft.results.find((v) => v.id === selectedVerse.id);
            if (verse?.user_highlight) {
              verse.user_highlight.is_favorite = !verse.user_highlight.is_favorite;
            }
          }
        )
      );

      await toggleFavorite(payload).unwrap();
      console.log('⭐ Favorito atualizado com sucesso!');
    } catch (error) {
      console.error('Erro ao favoritar versículo:', error);
    }
  };

  const handleHighlight = async (color: HighlightColor) => {
    if (!selectedVerse) return;

    const payload = {
      verse: selectedVerse.id,
      color,
      is_favorite: selectedVerse.user_highlight?.is_favorite ?? false,
    };

    try {
      dispatch(
        bibleApi.util.updateQueryData(
          'getVerses',
          { book, chapter, version },
          (draft) => {
            const verse = draft.results.find(v => v.id === selectedVerse.id);
            if (verse) {
              verse.user_highlight = {
                id: verse.user_highlight?.id ?? crypto.randomUUID(),
                color,
                is_favorite: payload.is_favorite,
                created_at: verse.user_highlight?.created_at ?? new Date().toISOString(),
              };
            }
          }
        )
      );

      await highlightVerse(payload).unwrap();
    } catch (err) {
      console.error('Erro ao aplicar destaque:', err);
    }
  };

  return (
    <div className="flex-1 flex overflow-hidden bg-bg">
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-surface border-b border-border">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <Book className="text-accent" size={24} />
                <div>
                  <h1 className="text-lg font-semibold text-ink">Bíblia Sagrada</h1>
                  <p className="text-sm text-ink-faint">{version}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button className="p-2 hover:bg-surface-hover rounded-md transition-colors">
                  <Search size={18} className="text-ink-muted" />
                </button>
                <button className="p-2 hover:bg-surface-hover rounded-md transition-colors">
                  <Bookmark size={18} className="text-ink-muted" />
                </button>
                <button className="p-2 hover:bg-surface-hover rounded-md transition-colors">
                  <Settings size={18} className="text-ink-muted" />
                </button>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center gap-4">
              {/* ✅ ATUALIZADO: Botão anterior com estado */}
              <button
                onClick={handlePreviousChapter}
                disabled={!navigation?.previous}
                className="p-2 hover:bg-surface-hover rounded-md transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                title={navigation?.previous
                  ? `${navigation.previous.book_name} ${navigation.previous.chapter}`
                  : 'Início da Bíblia'
                }
              >
                <ChevronLeft size={18} className="text-ink-muted" />
              </button>

              <div className="flex items-center gap-3 flex-1">
                <select
                  className={`${SELECT_CLASSES} w-auto`}
                  value={book}
                  onChange={(e) => {
                    setBook(e.target.value);
                    setChapter('1');
                  }}
                >
                  {books?.results.map(book => (
                    <option key={book.id} value={book.id}>{book.name}</option>
                  ))}
                </select>

                <select
                  className={`${SELECT_CLASSES} w-auto`}
                  value={chapter}
                  onChange={(e) => setChapter(e.target.value)}
                >
                  {[...Array(books?.results.find(item => item.id === parseInt(book))?.total_chapters)].map((_, i) => (
                    <option key={i + 1} value={i + 1}>Capítulo {i + 1}</option>
                  ))}
                </select>

                <select
                  className={`${SELECT_CLASSES} w-auto`}
                  value={version}
                  onChange={(e) => setVersion(e.target.value)}
                >
                  {versions.map(v => (
                    <option key={v.id} value={v.id}>{v.name}</option>
                  ))}
                </select>
              </div>

              {/* ✅ ATUALIZADO: Botão próximo com estado */}
              <button
                onClick={handleNextChapter}
                disabled={!navigation?.next}
                className="p-2 hover:bg-surface-hover rounded-md transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                title={navigation?.next
                  ? `${navigation.next.book_name} ${navigation.next.chapter}`
                  : 'Fim da Bíblia'
                }
              >
                <ChevronRight size={18} className="text-ink-muted" />
              </button>
            </div>

            {/* ✅ NOVO: Barra de progresso do livro */}
            {navigation && (
              <div className="mt-3">
                <div className="flex items-center justify-between text-xs text-ink-faint mb-1">
                  <span>Cap. {navigation.current.chapter} de {navigation.current.total_chapters}</span>
                  <span>{Math.round((navigation.current.chapter / navigation.current.total_chapters) * 100)}%</span>
                </div>
                <div className="w-full h-1.5 bg-bg rounded-full overflow-hidden">
                  <div
                    className="h-full bg-accent transition-all duration-300"
                    style={{ width: `${(navigation.current.chapter / navigation.current.total_chapters) * 100}%` }}
                  />
                </div>
              </div>
            )}
          </div>
        </header>

        {/* Bible Text Area */}
        <div className="flex-1 overflow-y-auto p-8">
          <div className="max-w-4xl mx-auto">
            <div className="bg-surface border border-border rounded-lg p-8 md:p-12">
              <h2 className="text-2xl font-semibold text-ink mb-8 text-center">
                {verses?.results[0]?.book_name} {verses?.results[0]?.chapter}
              </h2>

              <div className="space-y-4 text-lg leading-relaxed">
                {verses?.results.map((verse) => {
                  const lessonOpen = expandedLessonVerseId === verse.id;
                  const lesson = lessonOpen ? generateEnglishLesson(verse.text, settings.level) : null;

                  return (
                    <div
                      key={verse.id}
                      onClick={() => handleVerseClick(verse)}
                      className={`p-4 rounded-lg cursor-pointer transition-all border-2 ${
                        selectedVerse?.id === verse.id
                          ? 'border-accent bg-accent-soft'
                          : verse.user_highlight?.color
                          ? `${getVerseColor(verse.user_highlight?.color)} border-l-4`
                          : 'border-transparent hover:bg-surface-hover'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <span className="inline-flex items-start gap-3 flex-1 min-w-0">
                          <span className="font-bold text-accent text-sm mt-1">
                            {verse.verse}
                          </span>
                          <span className="text-ink flex-1">
                            {verse.text}
                            {verse.user_highlight?.is_favorite && (
                              <Star className="inline ml-2 text-warning fill-warning" size={16} />
                            )}
                          </span>
                        </span>

                        {version === 'NIV' && (
                          <button
                            onClick={(e) => handleToggleLesson(e, verse.id)}
                            title="Aprender inglês com este versículo"
                            className={`p-1.5 rounded-md flex-shrink-0 transition-colors ${
                              lessonOpen
                                ? 'bg-accent text-accent-foreground'
                                : 'text-ink-faint hover:bg-surface-hover hover:text-ink'
                            }`}
                          >
                            <Languages size={16} />
                          </button>
                        )}
                      </div>

                      {lessonOpen && lesson && (
                        <div
                          onClick={(e) => e.stopPropagation()}
                          className="mt-3 pt-3 border-t border-border text-base cursor-default space-y-3"
                        >
                          <div className="flex items-center justify-between">
                            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-accent bg-accent-soft px-2 py-0.5 rounded-full">
                              <Languages size={12} />
                              Inglês · nível {lesson.level}
                            </span>
                            <button
                              onClick={(e) => handleSpeak(e, verse.text)}
                              className="inline-flex items-center gap-1.5 text-xs text-ink-muted hover:text-ink hover:bg-surface-hover px-2 py-1 rounded-md transition-colors"
                            >
                              <Volume2 size={14} />
                              Ouvir versículo
                            </button>
                          </div>

                          {lesson.vocabulary.length > 0 && (
                            <div className="space-y-2">
                              <p className="text-xs font-semibold text-ink-muted">Vocabulário</p>
                              {lesson.vocabulary.map((item) => (
                                <div key={item.word} className="text-sm bg-bg border border-border rounded-md p-2.5">
                                  <span className="font-semibold text-ink">{item.word}</span>
                                  <span className="text-ink-faint"> — {item.translation}</span>
                                  <p className="text-xs text-ink-muted mt-0.5">{item.note}</p>
                                </div>
                              ))}
                            </div>
                          )}

                          {lesson.grammarPoint && (
                            <div className="text-sm bg-bg border border-border rounded-md p-2.5">
                              <p className="text-xs font-semibold text-ink-muted mb-1">Gramática: {lesson.grammarPoint.title}</p>
                              <p className="text-xs text-ink-muted">{lesson.grammarPoint.explanation}</p>
                            </div>
                          )}

                          {lesson.paraphrase && (
                            <div className="flex items-start justify-between gap-2 text-sm bg-bg border border-border rounded-md p-2.5">
                              <div>
                                <p className="text-xs font-semibold text-ink-muted mb-1">Em inglês mais simples</p>
                                <p className="text-ink-muted italic">"{lesson.paraphrase}"</p>
                              </div>
                              <button
                                onClick={(e) => handleSpeak(e, lesson.paraphrase!)}
                                className="p-1.5 rounded-md text-ink-faint hover:text-ink hover:bg-surface-hover transition-colors flex-shrink-0"
                                title="Ouvir versão simplificada"
                              >
                                <Volume2 size={14} />
                              </button>
                            </div>
                          )}

                          {!lesson.isCurated && lesson.vocabulary.length === 0 && !lesson.grammarPoint && (
                            <p className="text-xs text-ink-faint">
                              Ainda não temos uma explicação gerada para este versículo — em breve isso virá de uma análise por IA.
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* ✅ ATUALIZADO: Navegação de capítulos com dados reais */}
              <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
                <button
                  onClick={handlePreviousChapter}
                  disabled={!navigation?.previous}
                  className="flex items-center gap-2 px-4 py-2 text-accent hover:bg-accent-soft rounded-md transition-colors disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent"
                >
                  <ChevronLeft size={20} />
                  <div className="text-left">
                    <div className="text-xs text-ink-faint">Anterior</div>
                    <div className="font-medium">
                      {navigation?.previous
                        ? navigation.previous.is_same_book
                          ? `Cap. ${navigation.previous.chapter}`
                          : `${navigation.previous.book_name} ${navigation.previous.chapter}`
                        : 'Início'
                      }
                    </div>
                  </div>
                </button>

                <button
                  onClick={handleNextChapter}
                  disabled={!navigation?.next}
                  className="flex items-center gap-2 px-4 py-2 text-accent hover:bg-accent-soft rounded-md transition-colors disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent"
                >
                  <div className="text-right">
                    <div className="text-xs text-ink-faint">Próximo</div>
                    <div className="font-medium">
                      {navigation?.next
                        ? navigation.next.is_same_book
                          ? `Cap. ${navigation.next.chapter}`
                          : `${navigation.next.book_name} ${navigation.next.chapter}`
                        : 'Fim'
                      }
                    </div>
                  </div>
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sidebar - Ferramentas do versículo */}
      <aside className={`${sidebarOpen ? 'w-96' : 'w-0'} bg-surface border-l border-border transition-all duration-300 overflow-hidden flex flex-col`}>
        {selectedVerse && (
          <>
            <div className="p-6 border-b border-border bg-bg">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-semibold text-ink">Ferramentas do Versículo</h3>
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="p-2 hover:bg-surface-hover rounded-md transition-colors"
                >
                  <X size={18} className="text-ink-muted" />
                </button>
              </div>
              <p className="text-sm text-ink-muted">
                {selectedVerse.book_name} {selectedVerse.chapter}:{selectedVerse.verse} - {selectedVerse.text}
              </p>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              {/* Caleb — sugestão proativa */}
              <button
                onClick={handleOpenCalebNudge}
                className="w-full text-left mb-6 p-3.5 rounded-lg border border-accent/30 bg-accent-soft/40 hover:bg-accent-soft transition-colors group"
              >
                <div className="flex items-start gap-2.5">
                  <div className="w-7 h-7 rounded-md bg-accent text-accent-foreground flex items-center justify-center flex-shrink-0">
                    <Sparkles size={14} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-ink">
                      Notei que você está em {selectedVerse.book_name} {selectedVerse.chapter}:{selectedVerse.verse}
                    </p>
                    <p className="text-xs text-ink-muted mt-0.5">
                      Quer que eu explique esse texto, sugira aplicações ou responda alguma dúvida sobre ele?
                    </p>
                    <span className="inline-block text-xs font-medium text-accent-hover dark:text-ink mt-1.5 group-hover:underline">
                      Perguntar ao Caleb →
                    </span>
                  </div>
                </div>
              </button>

              {/* Quick Actions */}
              <div className="mb-6">
                <h4 className="text-sm font-semibold text-ink-muted mb-3">Ações Rápidas</h4>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    className="flex items-center gap-2 px-3 py-2 bg-warning-soft hover:opacity-80 text-warning rounded-md transition-opacity text-sm"
                    onClick={handleFavoriteClick}
                  >
                    <Star size={16} />
                    <span>Favoritar</span>
                  </button>
                  <button className="flex items-center gap-2 px-3 py-2 bg-accent-soft hover:opacity-80 text-accent-hover dark:text-ink rounded-md transition-opacity text-sm">
                    <Copy size={16} />
                    <span>Copiar</span>
                  </button>
                  <button className="flex items-center gap-2 px-3 py-2 bg-success-soft hover:opacity-80 text-success rounded-md transition-opacity text-sm">
                    <MessageSquare size={16} />
                    <span>Comentar</span>
                  </button>
                  <button className="flex items-center gap-2 px-3 py-2 bg-surface-hover hover:opacity-80 text-ink-muted rounded-md transition-opacity text-sm">
                    <Share2 size={16} />
                    <span>Compartilhar</span>
                  </button>
                </div>
              </div>

              {/* Color Palette */}
              <div className="mb-6">
                <h4 className="text-sm font-semibold text-ink-muted mb-3 flex items-center gap-2">
                  <Palette size={16} />
                  Colorir Versículo
                </h4>
                <div className="flex gap-2">
                  {colorOptions.map((option) => (
                    <button
                      key={option.value}
                      className={`w-10 h-10 ${option.color} rounded-lg hover:ring-2 ring-border-strong transition-all`}
                      title={option.name}
                      onClick={() => handleHighlight(option.value as HighlightColor)}
                    />
                  ))}
                  <button
                    className="w-10 h-10 bg-surface-hover border border-border rounded-lg hover:ring-2 ring-border-strong transition-all flex items-center justify-center"
                    onClick={() => handleHighlight("")}
                  >
                    <X size={16} className="text-ink-muted" />
                  </button>
                </div>
              </div>

              {/* Other Versions */}
              <div className="mb-6">
                <h4 className="text-sm font-semibold text-ink-muted mb-3 flex items-center gap-2">
                  <BookOpen size={16} />
                  Outras Versões
                </h4>
                <div className="space-y-3">
                  {versions.map((version) => (
                    <div key={version.id} className="p-3 bg-bg rounded-md hover:bg-surface-hover transition-colors">
                      <div className="font-semibold text-sm text-accent mb-1">{version.name}</div>
                      <p className="text-sm text-ink-muted leading-relaxed">{version.text}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* AI Assistant */}
              <div className="mb-6">
                <Button
                  type="button"
                  onClick={() => setShowAI(!showAI)}
                  className="w-full justify-between"
                >
                  <span className="flex items-center gap-2">
                    <Sparkles size={18} />
                    <span className="font-semibold">Assistente IA</span>
                  </span>
                  <ChevronDown className={`transition-transform ${showAI ? 'rotate-180' : ''}`} size={18} />
                </Button>

                {showAI && (
                  <div className="mt-4 space-y-3">
                    <button
                      onClick={() => handleAskCaleb('context', 'Explique o contexto histórico e cultural deste texto.')}
                      className="w-full text-left p-3 bg-accent-soft hover:opacity-80 rounded-md transition-opacity text-sm"
                    >
                      <div className="font-semibold text-accent-hover dark:text-ink mb-1">Explicar Contexto</div>
                      <p className="text-xs text-ink-muted">Entenda o contexto histórico e cultural</p>
                    </button>
                    <button
                      onClick={() => handleAskCaleb('etymology', 'Explique a etimologia dos termos originais (hebraico/grego) relevantes deste texto.')}
                      className="w-full text-left p-3 bg-success-soft hover:opacity-80 rounded-md transition-opacity text-sm"
                    >
                      <div className="font-semibold text-success mb-1">Analisar Termos</div>
                      <p className="text-xs text-ink-muted">Etimologia e significado original</p>
                    </button>
                    <button
                      onClick={() => handleAskCaleb('related_texts', 'Sugira textos bíblicos relacionados a este e explique brevemente a conexão.')}
                      className="w-full text-left p-3 bg-warning-soft hover:opacity-80 rounded-md transition-opacity text-sm"
                    >
                      <div className="font-semibold text-warning mb-1">Textos Relacionados</div>
                      <p className="text-xs text-ink-muted">Encontre passagens similares</p>
                    </button>
                  </div>
                )}
              </div>

              {/* Comments Section */}
              <div>
                <h4 className="text-sm font-semibold text-ink-muted mb-3 flex items-center gap-2">
                  <MessageSquare size={16} />
                  Minhas Anotações
                </h4>
                <textarea
                  placeholder="Adicione suas reflexões e comentários sobre este versículo..."
                  className="w-full p-3 bg-surface border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent text-sm text-ink placeholder:text-ink-faint resize-none transition-shadow"
                  rows={4}
                />
                <Button type="button" className="mt-2 w-full">
                  Salvar Anotação
                </Button>
              </div>
            </div>
          </>
        )}

        {!selectedVerse && (
          <div className="flex-1 flex items-center justify-center p-6 text-center">
            <div>
              <Book className="mx-auto mb-4 text-ink-faint" size={48} />
              <p className="text-ink-faint text-sm">
                Selecione um versículo para ver as ferramentas e opções disponíveis
              </p>
            </div>
          </div>
        )}
      </aside>
    </div>
  );
};

export default Bible;
