// src/components/bible/index.tsx - VERSÃO COMPLETA COM NAVEGAÇÃO

import React, { useState } from 'react';
import { 
  Book, ChevronDown, Star, Palette, MessageSquare, Copy, 
  Sparkles, Search, BookOpen, ChevronLeft, ChevronRight,
  X, Share2, Settings, Bookmark
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

const Bible = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [selectedVerse, setSelectedVerse] = useState<BibleVerse | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showAI, setShowAI] = useState(false);
  
  const [book, setBook] = useState('1');
  const [chapter, setChapter] = useState('1');
  const [version, setVersion] = useState('NVI');

  const { data: verses } = useGetVersesQuery({ book, chapter, version });
  const { data: books } = useGetBooksQuery();
  
  // ✅ NOVO: Extrair dados de navegação
  const navigation = verses?.chapter_navigation;

  const versions = [
    { id: 'ACF', name: 'ACF', text: 'Porque Deus amou o mundo de tal maneira que deu o seu Filho unigênito...' },
    { id: 'NVI', name: 'NVI', text: 'Porque Deus tanto amou o mundo que deu o seu Filho Unigênito...' },
    { id: 'ARA', name: 'ARA', text: 'Porque Deus amou ao mundo de tal maneira que deu o seu Filho unigênito...' },
    { id: 'NTLH', name: 'NTLH', text: 'Porque Deus amou o mundo tanto, que deu o seu único Filho...' },
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
      yellow: 'bg-yellow-100 border-yellow-300',
      green: 'bg-green-100 border-green-300',
      blue: 'bg-blue-100 border-blue-300',
      pink: 'bg-pink-100 border-pink-300',
      purple: 'bg-purple-100 border-purple-300',
    };
    if (!color) return '';
    return colors[color];
  };

  const [toggleFavorite] = useToggleFavoriteMutation();
  const [highlightVerse] = useHighlightVerseMutation();

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
    <div className="flex h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 shadow-sm">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <Book className="text-purple-600" size={28} />
                <div>
                  <h1 className="text-2xl font-bold text-gray-800">Bíblia Sagrada</h1>
                  <p className="text-sm text-gray-500">{version}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <Search size={20} className="text-gray-600" />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <Bookmark size={20} className="text-gray-600" />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <Settings size={20} className="text-gray-600" />
                </button>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center gap-4">
              {/* ✅ ATUALIZADO: Botão anterior com estado */}
              <button 
                onClick={handlePreviousChapter}
                disabled={!navigation?.previous}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                title={navigation?.previous 
                  ? `${navigation.previous.book_name} ${navigation.previous.chapter}`
                  : 'Início da Bíblia'
                }
              >
                <ChevronLeft size={20} />
              </button>

              <div className="flex items-center gap-3 flex-1">
                <select 
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white" 
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
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white" 
                  value={chapter} 
                  onChange={(e) => setChapter(e.target.value)}
                >
                  {[...Array(books?.results.find(item => item.id === parseInt(book))?.total_chapters)].map((_, i) => (
                    <option key={i + 1} value={i + 1}>Capítulo {i + 1}</option>
                  ))}
                </select>

                <select
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white"
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
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                title={navigation?.next 
                  ? `${navigation.next.book_name} ${navigation.next.chapter}`
                  : 'Fim da Bíblia'
                }
              >
                <ChevronRight size={20} />
              </button>
            </div>

            {/* ✅ NOVO: Barra de progresso do livro */}
            {navigation && (
              <div className="mt-3">
                <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
                  <span>Cap. {navigation.current.chapter} de {navigation.current.total_chapters}</span>
                  <span>{Math.round((navigation.current.chapter / navigation.current.total_chapters) * 100)}%</span>
                </div>
                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-purple-500 to-blue-500 transition-all duration-300"
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
            <div className="bg-white rounded-xl shadow-lg p-8 md:p-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
                {verses?.results[0]?.book_name} {verses?.results[0]?.chapter}
              </h2>

              <div className="space-y-4 text-lg leading-relaxed">
                {verses?.results.map((verse) => (
                  <div
                    key={verse.id}
                    onClick={() => handleVerseClick(verse)}
                    className={`p-4 rounded-lg cursor-pointer transition-all hover:shadow-md border-2 ${
                      selectedVerse?.id === verse.id 
                        ? 'border-purple-500 bg-purple-50' 
                        : verse.user_highlight?.color
                        ? `${getVerseColor(verse.user_highlight?.color)} border-l-4`
                        : 'border-transparent hover:bg-gray-50'
                    }`}
                  >
                    <span className="inline-flex items-start gap-3">
                      <span className="font-bold text-purple-600 text-sm mt-1">
                        {verse.verse}
                      </span>
                      <span className="text-gray-700 flex-1">
                        {verse.text}
                        {verse.user_highlight?.is_favorite && (
                          <Star className="inline ml-2 text-yellow-500 fill-yellow-500" size={16} />
                        )}
                      </span>
                    </span>
                  </div>
                ))}
              </div>

              {/* ✅ ATUALIZADO: Navegação de capítulos com dados reais */}
              <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-200">
                <button 
                  onClick={handlePreviousChapter}
                  disabled={!navigation?.previous}
                  className="flex items-center gap-2 px-4 py-2 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent"
                >
                  <ChevronLeft size={20} />
                  <div className="text-left">
                    <div className="text-xs text-gray-500">Anterior</div>
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
                  className="flex items-center gap-2 px-4 py-2 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent"
                >
                  <div className="text-right">
                    <div className="text-xs text-gray-500">Próximo</div>
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

      {/* Sidebar - Mantém igual ao original */}
      <aside className={`${sidebarOpen ? 'w-96' : 'w-0'} bg-white border-l border-gray-200 transition-all duration-300 overflow-hidden flex flex-col shadow-xl`}>
        {selectedVerse && (
          <>
            <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-purple-50 to-blue-50">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-800">Ferramentas do Versículo</h3>
                <button 
                  onClick={() => setSidebarOpen(false)}
                  className="p-2 hover:bg-white rounded-lg transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
              <p className="text-sm text-gray-600">
                {selectedVerse.book_name} {selectedVerse.chapter}:{selectedVerse.verse} - {selectedVerse.text}
              </p>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              {/* Quick Actions */}
              <div className="mb-6">
                <h4 className="text-sm font-semibold text-gray-700 mb-3">Ações Rápidas</h4>
                <div className="grid grid-cols-2 gap-2">
                  <button 
                    className="flex items-center gap-2 px-3 py-2 bg-yellow-50 hover:bg-yellow-100 text-yellow-700 rounded-lg transition-colors text-sm" 
                    onClick={handleFavoriteClick}
                  >
                    <Star size={16} />
                    <span>Favoritar</span>
                  </button>
                  <button className="flex items-center gap-2 px-3 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg transition-colors text-sm">
                    <Copy size={16} />
                    <span>Copiar</span>
                  </button>
                  <button className="flex items-center gap-2 px-3 py-2 bg-green-50 hover:bg-green-100 text-green-700 rounded-lg transition-colors text-sm">
                    <MessageSquare size={16} />
                    <span>Comentar</span>
                  </button>
                  <button className="flex items-center gap-2 px-3 py-2 bg-purple-50 hover:bg-purple-100 text-purple-700 rounded-lg transition-colors text-sm">
                    <Share2 size={16} />
                    <span>Compartilhar</span>
                  </button>
                </div>
              </div>

              {/* Color Palette */}
              <div className="mb-6">
                <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                  <Palette size={16} />
                  Colorir Versículo
                </h4>
                <div className="flex gap-2">
                  {colorOptions.map((option) => (
                    <button
                      key={option.value}
                      className={`w-10 h-10 ${option.color} rounded-lg hover:ring-2 ring-gray-400 transition-all`}
                      title={option.name}
                      onClick={() => handleHighlight(option.value as HighlightColor)}   
                    />
                  ))}
                  <button 
                    className="w-10 h-10 bg-gray-200 rounded-lg hover:ring-2 ring-gray-400 transition-all flex items-center justify-center" 
                    onClick={() => handleHighlight("")}
                  >
                    <X size={16} className="text-gray-600" />
                  </button>
                </div>
              </div>

              {/* Other Versions */}
              <div className="mb-6">
                <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                  <BookOpen size={16} />
                  Outras Versões
                </h4>
                <div className="space-y-3">
                  {versions.map((version) => (
                    <div key={version.id} className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                      <div className="font-semibold text-sm text-purple-600 mb-1">{version.name}</div>
                      <p className="text-sm text-gray-700 leading-relaxed">{version.text}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* AI Assistant */}
              <div className="mb-6">
                <button 
                  onClick={() => setShowAI(!showAI)}
                  className="w-full flex items-center justify-between p-4 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg hover:from-purple-600 hover:to-blue-600 transition-all shadow-md"
                >
                  <div className="flex items-center gap-2">
                    <Sparkles size={20} />
                    <span className="font-semibold">Assistente IA</span>
                  </div>
                  <ChevronDown className={`transition-transform ${showAI ? 'rotate-180' : ''}`} size={20} />
                </button>

                {showAI && (
                  <div className="mt-4 space-y-3">
                    <button className="w-full text-left p-3 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors text-sm">
                      <div className="font-semibold text-purple-700 mb-1">Explicar Contexto</div>
                      <p className="text-xs text-gray-600">Entenda o contexto histórico e cultural</p>
                    </button>
                    <button className="w-full text-left p-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors text-sm">
                      <div className="font-semibold text-blue-700 mb-1">Analisar Termos</div>
                      <p className="text-xs text-gray-600">Etimologia e significado original</p>
                    </button>
                    <button className="w-full text-left p-3 bg-green-50 hover:bg-green-100 rounded-lg transition-colors text-sm">
                      <div className="font-semibold text-green-700 mb-1">Textos Relacionados</div>
                      <p className="text-xs text-gray-600">Encontre passagens similares</p>
                    </button>
                  </div>
                )}
              </div>

              {/* Comments Section */}
              <div>
                <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                  <MessageSquare size={16} />
                  Minhas Anotações
                </h4>
                <textarea
                  placeholder="Adicione suas reflexões e comentários sobre este versículo..."
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm resize-none"
                  rows={4}
                />
                <button className="mt-2 w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium">
                  Salvar Anotação
                </button>
              </div>
            </div>
          </>
        )}

        {!selectedVerse && (
          <div className="flex-1 flex items-center justify-center p-6 text-center">
            <div>
              <Book className="mx-auto mb-4 text-gray-300" size={48} />
              <p className="text-gray-500 text-sm">
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