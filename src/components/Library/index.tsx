import React, { useState } from 'react';
import { 
  BookOpen, Plus, Search, Filter, Download, Settings, Star,
  Eye, ChevronRight, Tag, Clock, Video, Headphones, X,
  Book, BookMarked, Library, Layers, TrendingUp, Share2, Edit, Mic
} from 'lucide-react';

const ShepherdsToolkitLibrary = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [selectedResource, setSelectedResource] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [viewMode, setViewMode] = useState('grid');

  const resources = [
    {
      id: 1,
      title: 'Comentário Bíblico Moody',
      author: 'Diversos Autores',
      type: 'book',
      category: 'Comentários',
      description: 'Comentário completo sobre todo o Novo Testamento.',
      pages: 1245,
      language: 'Português',
      publisher: 'Editora Central',
      year: 2018,
      rating: 4.8,
      reviews: 124,
      tags: ['Teologia', 'Estudo'],
      favorite: true,
      dateAdded: '2024-01-15',
      notes: 'Excelente recurso'
    },
    {
      id: 2,
      title: 'Teologia Sistemática',
      author: 'Wayne Grudem',
      type: 'book',
      category: 'Teologia',
      description: 'Abordagem completa dos principais temas doutrinários.',
      pages: 1056,
      language: 'Português',
      publisher: 'Vida Nova',
      year: 2020,
      rating: 4.9,
      reviews: 256,
      tags: ['Doutrina', 'Estudo'],
      favorite: true,
      dateAdded: '2024-03-10',
      notes: 'Referência principal'
    },
    {
      id: 3,
      title: 'Pregação Expositiva',
      author: 'Dr. Hernandes',
      type: 'video',
      category: 'Homilética',
      description: 'Série de vídeos sobre pregação expositiva.',
      duration: '8h 30min',
      episodes: 12,
      language: 'Português',
      year: 2023,
      rating: 4.7,
      reviews: 89,
      tags: ['Pregação', 'Sermões'],
      favorite: false,
      dateAdded: '2024-06-20',
      notes: 'Muito prático'
    },
    {
      id: 4,
      title: 'Podcast Teologia',
      author: 'Augustus Nicodemus',
      type: 'audio',
      category: 'Podcast',
      description: 'Podcast semanal sobre temas teológicos.',
      episodes: 156,
      language: 'Português',
      year: 2024,
      rating: 4.6,
      reviews: 432,
      tags: ['Teologia', 'Ensino'],
      favorite: true,
      dateAdded: '2024-02-01',
      notes: 'Ótimo conteúdo'
    },
  ];

  const categories = [
    { name: 'Comentários', count: 15, icon: BookMarked, color: 'text-blue-600 bg-blue-50' },
    { name: 'Teologia', count: 8, icon: Layers, color: 'text-purple-600 bg-purple-50' },
    { name: 'Homilética', count: 12, icon: Mic, color: 'text-green-600 bg-green-50' },
    { name: 'História', count: 10, icon: Clock, color: 'text-red-600 bg-red-50' },
    { name: 'Podcast', count: 5, icon: Headphones, color: 'text-pink-600 bg-pink-50' },
  ];

  const stats = [
    { title: 'Total', value: resources.length, icon: BookOpen, color: 'bg-blue-50 text-blue-600' },
    { title: 'Favoritos', value: 3, icon: Star, color: 'bg-yellow-50 text-yellow-600' },
    { title: 'Lidos', value: 2, icon: Eye, color: 'bg-green-50 text-green-600' },
    { title: 'Média', value: '4.7', icon: TrendingUp, color: 'bg-purple-50 text-purple-600' },
  ];

  const getTypeIcon = (type) => {
    if (type === 'book') return Book;
    if (type === 'video') return Video;
    if (type === 'audio') return Headphones;
    return Library;
  };

  const getTypeName = (type) => {
    if (type === 'book') return 'Livro';
    if (type === 'video') return 'Vídeo';
    if (type === 'audio') return 'Áudio';
    return 'Referência';
  };

  const filteredResources = activeTab === 'all' ? resources : resources.filter(r => {
    if (activeTab === 'favorites') return r.favorite;
    if (activeTab === 'books') return r.type === 'book';
    if (activeTab === 'videos') return r.type === 'video';
    return r.type === 'audio';
  });

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <BookOpen className="text-amber-600" size={28} />
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Biblioteca Teológica</h1>
                <p className="text-sm text-gray-500">Recursos para estudo e pregação</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button 
                onClick={() => setShowAddModal(true)}
                className="flex items-center gap-2 px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors"
              >
                <Plus size={18} />
                <span className="font-medium">Adicionar</span>
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <Download size={20} className="text-gray-600" />
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-4 gap-4 mb-4">
            {stats.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <div key={idx} className="bg-white rounded-lg p-4 border border-gray-200">
                  <div className="flex items-center justify-between mb-2">
                    <div className={`p-2 rounded-lg ${stat.color}`}>
                      <Icon size={20} />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800">{stat.value}</h3>
                  <p className="text-sm text-gray-600">{stat.title}</p>
                </div>
              );
            })}
          </div>

          {/* Tabs */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-lg">
              <button onClick={() => setActiveTab('all')} className={`px-4 py-2 rounded-md text-sm font-medium ${activeTab === 'all' ? 'bg-white shadow-sm' : ''}`}>
                Todos
              </button>
              <button onClick={() => setActiveTab('favorites')} className={`px-4 py-2 rounded-md text-sm font-medium ${activeTab === 'favorites' ? 'bg-white shadow-sm' : ''}`}>
                Favoritos
              </button>
              <button onClick={() => setActiveTab('books')} className={`px-4 py-2 rounded-md text-sm font-medium ${activeTab === 'books' ? 'bg-white shadow-sm' : ''}`}>
                Livros
              </button>
              <button onClick={() => setActiveTab('videos')} className={`px-4 py-2 rounded-md text-sm font-medium ${activeTab === 'videos' ? 'bg-white shadow-sm' : ''}`}>
                Vídeos
              </button>
            </div>
            <div className="flex items-center gap-3">
              <Search size={18} className="text-gray-400" />
              <input type="text" placeholder="Buscar..." className="px-4 py-2 border rounded-lg" />
              <button className="flex items-center gap-2 px-4 py-2 border rounded-lg">
                <Filter size={18} />
                Filtros
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="flex-1 overflow-hidden flex">
        <div className="flex-1 overflow-y-auto p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredResources.map((resource) => {
              const TypeIcon = getTypeIcon(resource.type);
              return (
                <div key={resource.id} onClick={() => { setSelectedResource(resource); setShowModal(true); }}
                  className="bg-white rounded-xl shadow-sm border p-5 hover:shadow-md transition-all cursor-pointer">
                  <div className="flex items-start justify-between mb-3">
                    <div className={`p-3 rounded-lg ${resource.type === 'book' ? 'bg-blue-100' : resource.type === 'video' ? 'bg-red-100' : 'bg-purple-100'}`}>
                      <TypeIcon className={`${resource.type === 'book' ? 'text-blue-600' : resource.type === 'video' ? 'text-red-600' : 'text-purple-600'}`} size={24} />
                    </div>
                    {resource.favorite && <Star className="text-yellow-500 fill-yellow-500" size={20} />}
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-1 line-clamp-2">{resource.title}</h3>
                  <p className="text-sm text-gray-600 mb-2">{resource.author}</p>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-2 py-1 bg-amber-100 text-amber-700 rounded text-xs">{resource.category}</span>
                    <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">{getTypeName(resource.type)}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, idx) => (
                      <Star key={idx} size={14} className={idx < Math.floor(resource.rating) ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'} />
                    ))}
                    <span className="text-xs text-gray-600 ml-1">{resource.rating}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Sidebar */}
        <aside className="w-80 bg-white border-l p-6 overflow-y-auto">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Categorias</h3>
          <div className="space-y-2 mb-6">
            {categories.map((cat) => {
              const Icon = cat.icon;
              return (
                <div key={cat.name} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 cursor-pointer">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${cat.color}`}>
                      <Icon size={18} />
                    </div>
                    <span className="text-sm font-medium">{cat.name}</span>
                  </div>
                  <span className="text-sm font-semibold">{cat.count}</span>
                </div>
              );
            })}
          </div>
        </aside>
      </div>

      {/* Modal Detalhes */}
      {showModal && selectedResource && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden flex flex-col">
            <div className="p-6 border-b bg-gradient-to-r from-amber-50 to-orange-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`w-16 h-16 rounded-lg flex items-center justify-center ${selectedResource.type === 'book' ? 'bg-blue-100' : selectedResource.type === 'video' ? 'bg-red-100' : 'bg-purple-100'}`}>
                    {(() => {
                      const Icon = getTypeIcon(selectedResource.type);
                      return <Icon className={`${selectedResource.type === 'book' ? 'text-blue-600' : selectedResource.type === 'video' ? 'text-red-600' : 'text-purple-600'}`} size={32} />;
                    })()}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800">{selectedResource.title}</h2>
                    <p className="text-sm text-gray-600">{selectedResource.author}</p>
                  </div>
                </div>
                <button onClick={() => setShowModal(false)} className="p-2 hover:bg-white rounded-lg">
                  <X size={24} />
                </button>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto p-6">
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, idx) => (
                      <Star key={idx} size={20} className={idx < Math.floor(selectedResource.rating) ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'} />
                    ))}
                    <span className="text-sm font-medium ml-2">{selectedResource.rating} ({selectedResource.reviews} avaliações)</span>
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-700 mb-2">Descrição</h3>
                  <p className="text-gray-600">{selectedResource.description}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <span className="text-xs text-gray-600">Idioma</span>
                    <p className="text-gray-800 font-medium mt-1">{selectedResource.language}</p>
                  </div>
                  {selectedResource.pages && (
                    <div className="bg-gray-50 rounded-lg p-4">
                      <span className="text-xs text-gray-600">Páginas</span>
                      <p className="text-gray-800 font-medium mt-1">{selectedResource.pages}</p>
                    </div>
                  )}
                  {selectedResource.year && (
                    <div className="bg-gray-50 rounded-lg p-4">
                      <span className="text-xs text-gray-600">Ano</span>
                      <p className="text-gray-800 font-medium mt-1">{selectedResource.year}</p>
                    </div>
                  )}
                </div>
                {selectedResource.notes && (
                  <div>
                    <h3 className="text-sm font-semibold text-gray-700 mb-2">Minhas Anotações</h3>
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                      <p className="text-sm">{selectedResource.notes}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="p-6 border-t bg-gray-50">
              <div className="flex gap-3">
                <button onClick={() => setShowModal(false)} className="flex-1 px-4 py-2 border rounded-lg hover:bg-gray-100">
                  Fechar
                </button>
                <button className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 flex items-center gap-2">
                  <Star size={18} />
                  Favoritar
                </button>
                <button className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 flex items-center gap-2">
                  <Edit size={18} />
                  Editar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal Adicionar */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col">
            <div className="p-6 border-b bg-gradient-to-r from-amber-50 to-orange-50">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">Adicionar Recurso</h2>
                  <p className="text-sm text-gray-600">Novo recurso à biblioteca</p>
                </div>
                <button onClick={() => setShowAddModal(false)} className="p-2 hover:bg-white rounded-lg">
                  <X size={24} />
                </button>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold mb-2">Tipo *</label>
                  <select className="w-full p-3 border rounded-lg">
                    <option>Livro</option>
                    <option>Vídeo</option>
                    <option>Áudio</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Título *</label>
                  <input type="text" placeholder="Título do recurso" className="w-full p-3 border rounded-lg" />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Autor *</label>
                  <input type="text" placeholder="Nome do autor" className="w-full p-3 border rounded-lg" />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Descrição</label>
                  <textarea rows={3} placeholder="Descreva o recurso..." className="w-full p-3 border rounded-lg resize-none" />
                </div>
              </div>
            </div>
            <div className="p-6 border-t bg-gray-50">
              <div className="flex gap-3">
                <button onClick={() => setShowAddModal(false)} className="flex-1 px-4 py-2 border rounded-lg hover:bg-gray-100">
                  Cancelar
                </button>
                <button className="flex-1 px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700">
                  Adicionar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShepherdsToolkitLibrary;