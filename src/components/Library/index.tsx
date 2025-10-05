// import React, { useState } from 'react';
// import { 
//   BookOpen, Plus, Search, Filter, Download, Settings, Star,
//   Eye, Bookmark, Share2, Edit, Trash2, ChevronRight, Tag,
//   Clock, FileText, Video, Headphones, Link as LinkIcon, X,
//   Globe, Book, BookMarked, Library, Layers, TrendingUp, Heart,
//   Mic
// } from 'lucide-react';

// const ShepherdsToolkitLibrary = () => {
//   const [activeTab, setActiveTab] = useState('all');
//   const [selectedResource, setSelectedResource] = useState(null);
//   const [showModal, setShowModal] = useState(false);
//   const [showAddModal, setShowAddModal] = useState(false);
//   const [viewMode, setViewMode] = useState('grid');

//   const resources = [
//     {
//       id: 1,
//       title: 'Comentário Bíblico Moody - Novo Testamento',
//       author: 'Diversos Autores',
//       type: 'book',
//       category: 'Comentários',
//       description: 'Comentário completo e detalhado sobre todo o Novo Testamento com análise teológica profunda.',
//       pages: 1245,
//       language: 'Português',
//       publisher: 'Editora Central Gospel',
//       year: 2018,
//       rating: 4.8,
//       reviews: 124,
//       tags: ['Teologia', 'Estudo Bíblico', 'Comentário'],
//       favorite: true,
//       read: true,
//       dateAdded: '2024-01-15',
//       lastAccessed: '2025-10-01',
//       notes: 'Excelente para preparação de sermões'
//     },
//     {
//       id: 2,
//       title: 'Teologia Sistemática - Wayne Grudem',
//       author: 'Wayne Grudem',
//       type: 'book',
//       category: 'Teologia Sistemática',
//       description: 'Uma das mais completas e acessíveis teologias sistemáticas, abordando todos os principais temas doutrinários.',
//       pages: 1056,
//       language: 'Português',
//       publisher: 'Editora Vida Nova',
//       year: 2020,
//       rating: 4.9,
//       reviews: 256,
//       tags: ['Teologia', 'Doutrina', 'Estudo'],
//       favorite: true,
//       read: false,
//       dateAdded: '2024-03-10',
//       lastAccessed: '2025-09-28',
//       notes: 'Referência principal para estudos doutrinários'
//     },
//     {
//       id: 3,
//       title: 'Série: Pregação Expositiva',
//       author: 'Dr. Hernandes Dias Lopes',
//       type: 'video',
//       category: 'Homilética',
//       description: 'Série de vídeos ensinando os princípios da pregação expositiva com exemplos práticos.',
//       duration: '8h 30min',
//       language: 'Português',
//       episodes: 12,
//       year: 2023,
//       rating: 4.7,
//       reviews: 89,
//       tags: ['Pregação', 'Homilética', 'Sermões'],
//       favorite: false,
//       watched: false,
//       dateAdded: '2024-06-20',
//       lastAccessed: '2025-09-15',
//       notes: 'Assistir antes de preparar próximo sermão'
//     },
//     {
//       id: 4,
//       title: 'Dicionário Internacional de Teologia do NT',
//       author: 'Lothar Coenen e Colin Brown',
//       type: 'book',
//       category: 'Dicionários',
//       description: 'Dicionário abrangente com estudos sobre termos teológicos do Novo Testamento.',
//       pages: 2890,
//       language: 'Português',
//       publisher: 'Editora Vida Nova',
//       year: 2000,
//       rating: 4.9,
//       reviews: 178,
//       tags: ['Dicionário', 'Teologia', 'Grego'],
//       favorite: true,
//       read: true,
//       dateAdded: '2023-11-05',
//       lastAccessed: '2025-10-03',
//       notes: 'Consulta frequente para estudos de palavras'
//     },
//     {
//       id: 5,
//       title: 'Podcast: Teologia para Todos',
//       author: 'Augustus Nicodemus',
//       type: 'audio',
//       category: 'Podcast',
//       description: 'Podcast semanal abordando temas teológicos de forma acessível e prática.',
//       episodes: 156,
//       language: 'Português',
//       frequency: 'Semanal',
//       year: 2024,
//       rating: 4.6,
//       reviews: 432,
//       tags: ['Teologia', 'Podcast', 'Ensino'],
//       favorite: true,
//       listened: true,
//       dateAdded: '2024-02-01',
//       lastAccessed: '2025-10-04',
//       notes: 'Ótimo para ouvir durante viagens'
//     },
//     {
//       id: 6,
//       title: 'História da Igreja Cristã',
//       author: 'Jesse Lyman Hurlbut',
//       type: 'book',
//       category: 'História',
//       description: 'Panorama completo da história da igreja desde o primeiro século até os dias atuais.',
//       pages: 368,
//       language: 'Português',
//       publisher: 'Editora Vida',
//       year: 2017,
//       rating: 4.5,
//       reviews: 203,
//       tags: ['História', 'Igreja', 'Cristianismo'],
//       favorite: false,
//       read: true,
//       dateAdded: '2023-09-12',
//       lastAccessed: '2025-08-20',
//       notes: 'Bom para contextualização histórica'
//     },
//     {
//       id: 7,
//       title: 'Concordância Strong Português',
//       author: 'James Strong',
//       type: 'reference',
//       category: 'Referência',
//       description: 'Concordância completa das palavras bíblicas com números Strong para estudo aprofundado.',
//       entries: 8674,
//       language: 'Português',
//       publisher: 'Sociedade Bíblica',
//       year: 2019,
//       rating: 4.8,
//       reviews: 145,
//       tags: ['Concordância', 'Referência', 'Estudo'],
//       favorite: true,
//       consulted: true,
//       dateAdded: '2024-01-20',
//       lastAccessed: '2025-10-02',
//       notes: 'Ferramenta essencial para exegese'
//     },
//     {
//       id: 8,
//       title: 'Manual de Homilética',
//       author: 'José Luis Martínez',
//       type: 'book',
//       category: 'Homilética',
//       description: 'Guia prático para elaboração e pregação de sermões eficazes.',
//       pages: 285,
//       language: 'Português',
//       publisher: 'Editora Betânia',
//       year: 2021,
//       rating: 4.4,
//       reviews: 67,
//       tags: ['Pregação', 'Sermões', 'Prático'],
//       favorite: false,
//       read: true,
//       dateAdded: '2024-04-15',
//       lastAccessed: '2025-09-10',
//       notes: 'Revisar técnicas de estruturação'
//     },
//   ];

//   const categories = [
//     { name: 'Comentários', count: 15, icon: BookMarked, color: 'text-blue-600 bg-blue-50' },
//     { name: 'Teologia Sistemática', count: 8, icon: Layers, color: 'text-purple-600 bg-purple-50' },
//     { name: 'Homilética', count: 12, icon: Mic, color: 'text-green-600 bg-green-50' },
//     { name: 'Dicionários', count: 6, icon: Book, color: 'text-orange-600 bg-orange-50' },
//     { name: 'História', count: 10, icon: Clock, color: 'text-red-600 bg-red-50' },
//     { name: 'Referência', count: 7, icon: Library, color: 'text-indigo-600 bg-indigo-50' },
//     { name: 'Podcast', count: 5, icon: Headphones, color: 'text-pink-600 bg-pink-50' },
//   ];

//   const stats = [
//     {
//       title: 'Total de Recursos',
//       value: resources.length,
//       icon: BookOpen,
//       color: 'bg-blue-50 text-blue-600',
//       change: '+3 este mês'
//     },
//     {
//       title: 'Favoritos',
//       value: resources.filter(r => r.favorite).length,
//       icon: Star,
//       color: 'bg-yellow-50 text-yellow-600',
//       change: 'Marcados'
//     },
//     {
//       title: 'Lidos/Assistidos',
//       value: resources.filter(r => r.read || r.watched).length,
//       icon: Eye,
//       color: 'bg-green-50 text-green-600',
//       change: 'Concluídos'
//     },
//     {
//       title: 'Avaliação Média',
//       value: '4.7',
//       icon: TrendingUp,
//       color: 'bg-purple-50 text-purple-600',
//       change: 'De 5 estrelas'
//     },
//   ];

//   const getTypeIcon = (type) => {
//     const icons = {
//       book: Book,
//       video: Video,
//       audio: Headphones,
//       reference: Library,
//       link: LinkIcon,
//     };
//     return icons[type] || FileText;
//   };

//   const getTypeName = (type) => {
//     const names = {
//       book: 'Livro',
//       video: 'Vídeo',
//       audio: 'Áudio',
//       reference: 'Referência',
//       link: 'Link',
//     };
//     return names[type] || 'Documento';
//   };

//   const filteredResources = activeTab === 'all' 
//     ? resources 
//     : activeTab === 'favorites'
//     ? resources.filter(r => r.favorite)
//     : activeTab === 'books'
//     ? resources.filter(r => r.type === 'book')
//     : activeTab === 'videos'
//     ? resources.filter(r => r.type === 'video')
//     : resources.filter(r => r.type === 'audio');

//   return (
//     <div className="flex-1 flex flex-col overflow-hidden bg-gray-50">
//       {/* Header */}
//       <header className="bg-white border-b border-gray-200 shadow-sm">
//         <div className="px-6 py-4">
//           <div className="flex items-center justify-between mb-4">
//             <div className="flex items-center gap-4">
//               <BookOpen className="text-amber-600" size={28} />
//               <div>
//                 <h1 className="text-2xl font-bold text-gray-800">Biblioteca Teológica</h1>
//                 <p className="text-sm text-gray-500">Recursos para estudo, pregação e crescimento ministerial</p>
//               </div>
//             </div>

//             <div className="flex items-center gap-3">
//               <button 
//                 onClick={() => setShowAddModal(true)}
//                 className="flex items-center gap-2 px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors shadow-sm"
//               >
//                 <Plus size={18} />
//                 <span className="font-medium">Adicionar Recurso</span>
//               </button>
//               <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
//                 <Download size={20} className="text-gray-600" />
//               </button>
//               <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
//                 <Settings size={20} className="text-gray-600" />
//               </button>
//             </div>
//           </div>

//           {/* Stats */}
//           <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
//             {stats.map((stat, idx) => {
//               const Icon = stat.icon;
//               return (
//                 <div key={idx} className="bg-gradient-to-br from-white to-gray-50 rounded-lg p-4 border border-gray-200 shadow-sm">
//                   <div className="flex items-center justify-between mb-2">
//                     <div className={`p-2 rounded-lg ${stat.color}`}>
//                       <Icon size={20} />
//                     </div>
//                     <span className="text-xs text-gray-500">{stat.change}</span>
//                   </div>
//                   <h3 className="text-2xl font-bold text-gray-800">{stat.value}</h3>
//                   <p className="text-sm text-gray-600">{stat.title}</p>
//                 </div>
//               );
//             })}
//           </div>

//           {/* Tabs and Filters */}
//           <div className="flex items-center justify-between">
//             <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-lg">
//               <button
//                 onClick={() => setActiveTab('all')}
//                 className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
//                   activeTab === 'all'
//                     ? 'bg-white text-gray-800 shadow-sm'
//                     : 'text-gray-600 hover:text-gray-800'
//                 }`}
//               >
//                 Todos ({resources.length})
//               </button>
//               <button
//                 onClick={() => setActiveTab('favorites')}
//                 className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
//                   activeTab === 'favorites'
//                     ? 'bg-white text-gray-800 shadow-sm'
//                     : 'text-gray-600 hover:text-gray-800'
//                 }`}
//               >
//                 Favoritos ({resources.filter(r => r.favorite).length})
//               </button>
//               <button
//                 onClick={() => setActiveTab('books')}
//                 className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
//                   activeTab === 'books'
//                     ? 'bg-white text-gray-800 shadow-sm'
//                     : 'text-gray-600 hover:text-gray-800'
//                 }`}
//               >
//                 Livros ({resources.filter(r => r.type === 'book').length})
//               </button>
//               <button
//                 onClick={() => setActiveTab('videos')}
//                 className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
//                   activeTab === 'videos'
//                     ? 'bg-white text-gray-800 shadow-sm'
//                     : 'text-gray-600 hover:text-gray-800'
//                 }`}
//               >
//                 Vídeos ({resources.filter(r => r.type === 'video').length})
//               </button>
//               <button
//                 onClick={() => setActiveTab('audio')}
//                 className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
//                   activeTab === 'audio'
//                     ? 'bg-white text-gray-800 shadow-sm'
//                     : 'text-gray-600 hover:text-gray-800'
//                 }`}
//               >
//                 Áudio ({resources.filter(r => r.type === 'audio').length})
//               </button>
//             </div>

//             <div className="flex items-center gap-3">
//               <div className="relative">
//                 <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
//                 <input
//                   type="text"
//                   placeholder="Buscar recursos..."
//                   className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 w-64"
//                 />
//               </div>
//               <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
//                 <Filter size={18} />
//                 <span>Filtros</span>
//               </button>
//               <div className="flex gap-1 bg-gray-100 p-1 rounded-lg">
//                 <button
//                   onClick={() => setViewMode('grid')}
//                   className={`p-2 rounded ${viewMode === 'grid' ? 'bg-white shadow-sm' : ''}`}
//                 >
//                   <div className="w-4 h-4 grid grid-cols-2 gap-0.5">
//                     <div className="bg-gray-600 rounded-sm"></div>
//                     <div className="bg-gray-600 rounded-sm"></div>
//                     <div className="bg-gray-600 rounded-sm"></div>
//                     <div className="bg-gray-600 rounded-sm"></div>
//                   </div>
//                 </button>
//                 <button
//                   onClick={() => setViewMode('list')}
//                   className={`p-2 rounded ${viewMode === 'list' ? 'bg-white shadow-sm' : ''}`}
//                 >
//                   <div className="w-4 h-4 flex flex-col gap-1">
//                     <div className="h-1 bg-gray-600 rounded"></div>
//                     <div className="h-1 bg-gray-600 rounded"></div>
//                     <div className="h-1 bg-gray-600 rounded"></div>
//                   </div>
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </header>

//       {/* Content Area */}
//       <div className="flex-1 overflow-hidden flex">
//         {/* Main Content */}
//         <div className="flex-1 overflow-y-auto p-6">
//           {viewMode === 'grid' && (
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
//               {filteredResources.map((resource) => {
//                 const TypeIcon = getTypeIcon(resource.type);
//                 return (
//                   <div
//                     key={resource.id}
//                     onClick={() => {
//                       setSelectedResource(resource);
//                       setShowModal(true);
//                     }}
//                     className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 hover:shadow-md transition-all cursor-pointer group"
//                   >
//                     <div className="flex items-start justify-between mb-3">
//                       <div className={`p-3 rounded-lg ${
//                         resource.type === 'book' ? 'bg-blue-100' :
//                         resource.type === 'video' ? 'bg-red-100' :
//                         resource.type === 'audio' ? 'bg-purple-100' :
//                         'bg-green-100'
//                       }`}>
//                         <TypeIcon className={`${
//                           resource.type === 'book' ? 'text-blue-600' :
//                           resource.type === 'video' ? 'text-red-600' :
//                           resource.type === 'audio' ? 'text-purple-600' :
//                           'text-green-600'
//                         }`} size={24} />
//                       </div>
//                       {resource.favorite && (
//                           <div className="bg-white rounded-xl shadow-sm border border-gray-200">
//                             <div className="divide-y divide-gray-200">
//                               {filteredResources.map((resource) => {
//                                 const TypeIcon = getTypeIcon(resource.type);
//                                 return (
//                                   <div
//                                     key={resource.id}
//                                     onClick={() => {
//                                       setSelectedResource(resource);
//                                       setShowModal(true);
//                                     }}
//                                     className="p-5 hover:bg-gray-50 transition-colors cursor-pointer"
//                                   >
//                                     <div className="flex items-start gap-4">
//                                       <div className={`p-3 rounded-lg ${
//                                         resource.type === 'book' ? 'bg-blue-100' :
//                                         resource.type === 'video' ? 'bg-red-100' :
//                                         resource.type === 'audio' ? 'bg-purple-100' :
//                                         'bg-green-100'
//                                       }`}>
//                                         <TypeIcon className={`${
//                                           resource.type === 'book' ? 'text-blue-600' :
//                                           resource.type === 'video' ? 'text-red-600' :
//                                           resource.type === 'audio' ? 'text-purple-600' :
//                                           'text-green-600'
//                                         }`} size={24} />
//                                       </div>
//                                       {resource.favorite && (
//                                         <Star className="text-yellow-500 fill-yellow-500" size={20} />
//                                       )}
//                                       <div className="flex-1 min-w-0">
//                                         <h3 className="font-semibold text-gray-800 mb-1 line-clamp-2 group-hover:text-amber-600 transition-colors">
//                                           {resource.title}
//                                         </h3>
//                                         <p className="text-sm text-gray-600 mb-2">{resource.author}</p>
//                                         <div className="flex items-center gap-2 mb-3">
//                                           <span className="px-2 py-1 bg-amber-100 text-amber-700 rounded text-xs font-medium">
//                                             {resource.category}
//                                           </span>
//                                           <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
//                                             {getTypeName(resource.type)}
//                                           </span>
//                                         </div>
//                                         <div className="flex items-center gap-1 mb-3">
//                                           {[...Array(5)].map((_, idx) => (
//                                             <Star
//                                               key={idx}
//                                               size={14}
//                                               className={idx < Math.floor(resource.rating) ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}
//                                             />
//                                           ))}
//                                           <span className="text-xs text-gray-600 ml-1">
//                                             {resource.rating} ({resource.reviews})
//                                           </span>
//                                         </div>
//                                         <p className="text-sm text-gray-600 line-clamp-2 mb-3">
//                                           {resource.description}
//                                         </p>
//                                         <div className="flex items-center justify-between text-xs text-gray-500 pt-3 border-t border-gray-200">
//                                           <span>Adicionado em {new Date(resource.dateAdded).toLocaleDateString('pt-BR')}</span>
//                                         </div>
//                                       </div>
//                                     </div>
//                                   </div>
//                                 );
//                               })}
//                             </div>
//                           </div>
//                             resource.type === 'video' ? 'text-red-600' :
//                             resource.type === 'audio' ? 'text-purple-600' :
//                             'text-green-600'
//                           }`} size={24} />
//                         </div>

//                         <div className="flex-1">
//                           <h3 className="font-semibold text-gray-800 mb-1 line-clamp-2 group-hover:text-amber-600 transition-colors">
//                             {resource.title}
//                           </h3>
//                           <p className="text-sm text-gray-600 mb-2">{resource.author}</p>
//                           <div className="flex items-center gap-2 mb-3">
//                             <span className="px-2 py-1 bg-amber-100 text-amber-700 rounded text-xs font-medium">
//                               {resource.category}
//                             </span>
//                             <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
//                               {getTypeName(resource.type)}
//                             </span>
//                             <div className="flex items-center gap-1">
//                               {[...Array(5)].map((_, idx) => (
//                                 <Star
//                                   key={idx}
//                                   size={12}
//                                   className={idx < Math.floor(resource.rating) ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}
//                                 />
//                               ))}
//                               <span className="text-xs text-gray-600 ml-1">
//                                 {resource.rating}
//                               </span>
//                             </div>
//                             {resource.tags.slice(0, 3).map((tag, idx) => (
//                               <span key={idx} className="px-2 py-1 bg-blue-50 text-blue-600 rounded text-xs">
//                                 {tag}
//                               </span>
//                             ))}
//                           </div>
//                         </div>
//       )}

//       {/* Add Resource Modal */}
//       {showAddModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//           <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col">
//             <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-amber-50 to-orange-50">
//               <div className="flex items-center justify-between">
//                 <div className="flex items-center gap-3">
//                   <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-500 rounded-lg flex items-center justify-center">
//                     <Plus className="text-white" size={24} />
//                   </div>
//                   <div>
//                     <h2 className="text-2xl font-bold text-gray-800">Adicionar Recurso</h2>
//                     <p className="text-sm text-gray-600">Adicione um novo recurso à sua biblioteca</p>
//                   </div>
//                 </div>
//                 <button 
//                   onClick={() => setShowAddModal(false)}
//                   className="p-2 hover:bg-white rounded-lg transition-colors"
//                 >
//                   <X size={24} />
//                 </button>
//               </div>
//             </div>

//             <div className="flex-1 overflow-y-auto p-6">
//               <div className="space-y-4">
//                 <div>
//                   <label className="block text-sm font-semibold text-gray-700 mb-2">
//                     Tipo de Recurso *
//                   </label>
//                   <select className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white">
//                     <option value="">Selecione o tipo</option>
//                     <option value="book">Livro</option>
//                     <option value="video">Vídeo</option>
//                     <option value="audio">Áudio/Podcast</option>
//                     <option value="reference">Referência</option>
//                     <option value="link">Link Externo</option>
//                   </select>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-semibold text-gray-700 mb-2">
//                     Título *
//                   </label>
//                   <input
//                     type="text"
//                     placeholder="Ex: Teologia Sistemática"
//                     className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-semibold text-gray-700 mb-2">
//                     Autor *
//                   </label>
//                   <input
//                     type="text"
//                     placeholder="Nome do autor"
//                     className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
//                   />
//                 </div>

//                 <div className="grid grid-cols-2 gap-4">
//                   <div>
//                     <label className="block text-sm font-semibold text-gray-700 mb-2">
//                       Categoria *
//                     </label>
//                     <select className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white">
//                       <option value="">Selecione</option>
//                       {categories.map(cat => (
//                         <option key={cat.name} value={cat.name}>{cat.name}</option>
//                       ))}
//                     </select>
//                   </div>
//                   <div>
//                     <label className="block text-sm font-semibold text-gray-700 mb-2">
//                       Idioma
//                     </label>
//                     <select className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white">
//                       <option value="Português">Português</option>
//                       <option value="Inglês">Inglês</option>
//                       <option value="Espanhol">Espanhol</option>
//                       <option value="Outro">Outro</option>
//                     </select>
//                   </div>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-semibold text-gray-700 mb-2">
//                     Descrição
//                   </label>
//                   <textarea
//                     placeholder="Descreva o recurso..."
//                     rows={3}
//                     className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 resize-none"
//                   />
//                 </div>

//                 <div className="grid grid-cols-3 gap-4">
//                   <div>
//                     <label className="block text-sm font-semibold text-gray-700 mb-2">
//                       Editora
//                     </label>
//                     <input
//                       type="text"
//                       placeholder="Nome da editora"
//                       className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-semibold text-gray-700 mb-2">
//                       Ano
//                     </label>
//                     <input
//                       type="number"
//                       placeholder="2024"
//                       className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-semibold text-gray-700 mb-2">
//                       Páginas
//                     </label>
//                     <input
//                       type="number"
//                       placeholder="0"
//                       className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
//                     />
//                   </div>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-semibold text-gray-700 mb-2">
//                     Tags 
//                   </label>
//                   <input
//                     type="text"
//                     placeholder="Teologia, Estudo, Doutrina"
//                     className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-semibold text-gray-700 mb-2">
//                     Anotações Pessoais
//                   </label>
//                   <textarea
//                     placeholder="Suas observações sobre este recurso..."
//                     rows={2}
//                     className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 resize-none"
//                   />
//                 </div>

//                 <div className="flex items-center gap-2">
//                   <input type="checkbox" id="favoriteNew" className="rounded" />
//                   <label htmlFor="favoriteNew" className="text-sm text-gray-700">
//                     Marcar como favorito
//                   </label>
//                 </div>
//               </div>
//             </div>

//             <div className="p-6 border-t border-gray-200 bg-gray-50">
//               <div className="flex gap-3">
//                 <button
//                   onClick={() => setShowAddModal(false)}
//                   className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors font-medium"
//                 >
//                   Cancelar
//                 </button>
//                 <button className="flex-1 px-4 py-2 bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-lg hover:from-amber-700 hover:to-orange-700 transition-colors font-medium">
//                   Adicionar à Biblioteca
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

//                               {resource.category}
//                             </span>
//                             <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
//                               {getTypeName(resource.type)}
//                             </span>
//                             <div className="flex items-center gap-1">
//                               {[...Array(5)].map((_, idx) => (
//                                 <Star
//                                   key={idx}
//                                   size={12}
//                                   className={idx < Math.floor(resource.rating) ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}
//                                 />
//                               ))}
//                               <span className="text-xs text-gray-600 ml-1">
//                                 {resource.rating}
//                               </span>
//                             </div>
//                             {resource.tags.slice(0, 3).map((tag, idx) => (
//                               <span key={idx} className="px-2 py-1 bg-blue-50 text-blue-600 rounded text-xs">
//                                 {tag}
//                               </span>
//                             ))}
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   );
//                 })}
//               </div>
//             </div>
//           )}
//         </div>

//         {/* Right Sidebar - Categories */}
//         <aside className="w-80 bg-white border-l border-gray-200 p-6 overflow-y-auto">
//           <h3 className="text-lg font-bold text-gray-800 mb-4">Categorias</h3>
          
//           <div className="space-y-2 mb-6">
//             {categories.map((category) => {
//               const CategoryIcon = category.icon;
//               return (
//                 <div
//                   key={category.name}
//                   className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
//                 >
//                   <div className="flex items-center gap-3">
//                     <div className={`p-2 rounded-lg ${category.color}`}>
//                       <CategoryIcon size={18} />
//                     </div>
//                     <span className="text-sm font-medium text-gray-700">{category.name}</span>
//                   </div>
//                   <span className="text-sm font-semibold text-gray-600">{category.count}</span>
//                 </div>
//               );
//             })}
//           </div>

//           <h3 className="text-lg font-bold text-gray-800 mb-4">Recém Adicionados</h3>
//           <div className="space-y-3">
//             {resources.slice(0, 4).map((resource) => {
//               const TypeIcon = getTypeIcon(resource.type);
//               return (
//                 <div
//                   key={resource.id}
//                   onClick={() => {
//                     setSelectedResource(resource);
//                     setShowModal(true);
//                   }}
//                   className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
//                 >
//                   <div className="flex items-start gap-2">
//                     <TypeIcon size={16} className="text-amber-600 mt-0.5" />
//                     <div className="flex-1 min-w-0">
//                       <h4 className="font-medium text-gray-800 text-sm truncate">{resource.title}</h4>
//                       <p className="text-xs text-gray-600 mt-1">{resource.author}</p>
//                     </div>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         </aside>
//       </div>

//       {/* Resource Detail Modal */}
//       {showModal && selectedResource && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//           <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden flex flex-col">
//             <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-amber-50 to-orange-50">
//               <div className="flex items-center justify-between">
//                 <div className="flex items-center gap-4">
//                   <div className={`w-16 h-16 rounded-lg flex items-center justify-center ${
//                     selectedResource.type === 'book' ? 'bg-blue-100' :
//                     selectedResource.type === 'video' ? 'bg-red-100' :
//                     selectedResource.type === 'audio' ? 'bg-purple-100' :
//                     'bg-green-100'
//                   }`}>
//                     {(() => {
//                       const TypeIcon = getTypeIcon(selectedResource.type);
//                       return <TypeIcon className={`${
//                         selectedResource.type === 'book' ? 'text-blue-600' :
//                         selectedResource.type === 'video' ? 'text-red-600' :
//                         selectedResource.type === 'audio' ? 'text-purple-600' :
//                         'text-green-600'
//                       }`} size={32} />;
//                     })()}
//                   </div>
//                   <div>
//                     <h2 className="text-2xl font-bold text-gray-800">{selectedResource.title}</h2>
//                     <p className="text-sm text-gray-600 mt-1">{selectedResource.author}</p>
//                   </div>
//                 </div>
//                 <button 
//                   onClick={() => setShowModal(false)}
//                   className="p-2 hover:bg-white rounded-lg transition-colors"
//                 >
//                   <X size={24} />
//                 </button>
//               </div>
//             </div>

//             <div className="flex-1 overflow-y-auto p-6">
//               <div className="space-y-6">
//                 <div className="flex items-center gap-4">
//                   <div className="flex items-center gap-1">
//                     {[...Array(5)].map((_, idx) => (
//                       <Star
//                         key={idx}
//                         size={20}
//                         className={idx < Math.floor(selectedResource.rating) ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}
//                       />
//                     ))}
//                     <span className="text-sm font-medium text-gray-700 ml-2">
//                       {selectedResource.rating} ({selectedResource.reviews} avaliações)
//                     </span>
//                   </div>
//                   <span className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-xs font-medium"></span>

// export default ShepherdsToolkitLibrary;