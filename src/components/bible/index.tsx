import React, { useState } from 'react';
import { 
  Book, ChevronDown, Star, Palette, MessageSquare, Copy, 
  Sparkles, Search, BookOpen, ChevronLeft, ChevronRight,
  Menu, X, Heart, Bookmark, Share2, Settings
} from 'lucide-react';
import { useGetVersesQuery } from '../../feature/bible/bibleApi';
import type { BibleVerse } from '../../types/bible.types';
 import authService from '../../services/authService';

const Bible = () => {
  const [selectedVerse, setSelectedVerse] = useState<BibleVerse | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [currentBook, setCurrentBook] = useState('João');
  const [currentChapter, setCurrentChapter] = useState(3);
  const [showAI, setShowAI] = useState(false);
  
  const [book, setBook] = useState('1');
  const [chapter, setChapter] = useState('1');
  const [version, setVersion] = useState('NVI');

  // const { data, error, isLoading} = useGetVersesQuery({ book, chapter, version });
  const {data : verses} = useGetVersesQuery({ book, chapter, version });
  console.log(verses);


  // const verses = [
  //   { id: 1, number: 1, text: "No princípio era o Verbo, e o Verbo estava com Deus, e o Verbo era Deus.", favorite: false, color: null },
  //   { id: 2, number: 2, text: "Ele estava no princípio com Deus.", favorite: false, color: null },
  //   { id: 3, number: 3, text: "Todas as coisas foram feitas por ele, e sem ele nada do que foi feito se fez.", favorite: true, color: 'yellow' },
  //   { id: 16, number: 16, text: "Porque Deus amou o mundo de tal maneira que deu o seu Filho unigênito, para que todo aquele que nele crê não pereça, mas tenha a vida eterna.", favorite: true, color: 'green' },
  //   { id: 17, number: 17, text: "Porque Deus enviou o seu Filho ao mundo, não para que condenasse o mundo, mas para que o mundo fosse salvo por ele.", favorite: false, color: null },
  //   { id: 18, number: 18, text: "Quem crê nele não é condenado; mas quem não crê já está condenado, porquanto não crê no nome do unigênito Filho de Deus.", favorite: false, color: 'blue' },
  // ];

  const versions = [
    { id: 'acf', name: 'ACF', text: 'Porque Deus amou o mundo de tal maneira que deu o seu Filho unigênito...' },
    { id: 'nvi', name: 'NVI', text: 'Porque Deus tanto amou o mundo que deu o seu Filho Unigênito...' },
    { id: 'ara', name: 'ARA', text: 'Porque Deus amou ao mundo de tal maneira que deu o seu Filho unigênito...' },
    { id: 'ntlh', name: 'NTLH', text: 'Porque Deus amou o mundo tanto, que deu o seu único Filho...' },
  ];

  const colorOptions = [
    { name: 'Amarelo', color: 'bg-yellow-200', value: 'yellow' },
    { name: 'Verde', color: 'bg-green-200', value: 'green' },
    { name: 'Azul', color: 'bg-blue-200', value: 'blue' },
    { name: 'Rosa', color: 'bg-pink-200', value: 'pink' },
    { name: 'Roxo', color: 'bg-purple-200', value: 'purple' },
  ];

  const books = [
    'Gênesis', 'Êxodo', 'Levítico', 'Números', 'Deuteronômio',
    'Josué', 'Juízes', 'Rute', '1 Samuel', '2 Samuel',
    'Mateus', 'Marcos', 'Lucas', 'João', 'Atos',
    'Romanos', '1 Coríntios', '2 Coríntios', 'Gálatas'
  ];

  const handleVerseClick = (verse) => {
    setSelectedVerse(verse);
    setSidebarOpen(true);
    setShowAI(false);
  };

  const handleColorSelect = async (color: string) => {
         
          const token = authService.getToken();

    try {
      const request = fetch('http://127.0.0.1:8000/api/bible/highlights/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token ? `Token ${token}` : '',
      },
      body: JSON.stringify({
        "verse": selectedVerse?.id, "color": color, "is_favorite": selectedVerse?.user_highlight ? !selectedVerse?.user_highlight.is_favorite : false
      })
      
      });
      const response = await request;
      const data = await response.json();
      console.log('Verse highlighted:', data);

    } catch (error) {
      console.error('Error highlighting verse:', error);
    }
  };

   const handleFavoriteVerse = async () => {
         
          const token = authService.getToken();

    try {
      const request = fetch('http://127.0.0.1:8000/api/bible/highlights/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token ? `Token ${token}` : '',
      },
      body: JSON.stringify({
        "verse": selectedVerse?.id, "color": selectedVerse?.user_highlight?.color , "is_favorite": selectedVerse?.user_highlight?.is_favorite? false :  true
      })
      
      });
      const response = await request;
      const data = await response.json();

    } catch (error) {
      console.error('Error highlighting verse:', error);
    }
  };


  const getVerseColor = (color) => {
    const colors = {
      yellow: 'bg-yellow-100 border-yellow-300',
      green: 'bg-green-100 border-green-300',
      blue: 'bg-blue-100 border-blue-300',
      pink: 'bg-pink-100 border-pink-300',
      purple: 'bg-purple-100 border-purple-300',
    };
    return colors[color] || '';
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
                  <p className="text-sm text-gray-500">Almeida Corrigida Fiel</p>
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
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <ChevronLeft size={20} />
              </button>

              <div className="flex items-center gap-3 flex-1">
                <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white">
                  {books.map(book => (
                    <option key={book} value={book}>{book}</option>
                  ))}
                </select>

                <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white">
                  {[...Array(21)].map((_, i) => (
                    <option key={i + 1} value={i + 1}>Capítulo {i + 1}</option>
                  ))}
                </select>

                <span className="text-gray-600 font-medium">{currentBook} {currentChapter}</span>
              </div>

              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </header>

        {/* Bible Text Area */}
        <div className="flex-1 overflow-y-auto p-8">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg p-8 md:p-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
                {currentBook} {currentChapter}
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

              {/* Chapter Navigation */}
              <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-200">
                <button className="flex items-center gap-2 px-4 py-2 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors">
                  <ChevronLeft size={20} />
                  <span>Capítulo Anterior</span>
                </button>
                <button className="flex items-center gap-2 px-4 py-2 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors">
                  <span>Próximo Capítulo</span>
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <aside className={`${sidebarOpen ? 'w-96' : 'w-0'} bg-white border-l border-gray-200 transition-all duration-300 overflow-hidden flex flex-col shadow-xl`}>
        {selectedVerse && (
          <>
            {/* Sidebar Header */}
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
                {currentBook} {currentChapter}:{selectedVerse.number}
              </p>
            </div>

            {/* Sidebar Content */}
            <div className="flex-1 overflow-y-auto p-6">
              {/* Quick Actions */}
              <div className="mb-6">
                <h4 className="text-sm font-semibold text-gray-700 mb-3">Ações Rápidas</h4>
                <div className="grid grid-cols-2 gap-2">
                  <button className="flex items-center gap-2 px-3 py-2 bg-yellow-50 hover:bg-yellow-100 text-yellow-700 rounded-lg transition-colors text-sm" onClick={handleFavoriteVerse}>
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
                      onClick={() => 
                        handleColorSelect(option.value)
                      }   
                    />
                  ))}
                  <button className="w-10 h-10 bg-gray-200 rounded-lg hover:ring-2 ring-gray-400 transition-all flex items-center justify-center">
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