import { useState } from 'react';
import { 
  Book, FileText, Target, Calendar, Users, DollarSign, Heart, BookOpen,
  Menu, X, User, Settings, Search, Plus, Save, Download, Printer,
  Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight, AlignJustify,
  List, ListOrdered, Quote, Link, Image, Undo, Redo, Type, Palette,
  ChevronDown, MoreVertical, Trash2, Copy, Edit, Clock, Tag
} from 'lucide-react';

const Sermons = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeModule, setActiveModule] = useState('sermons');
  const [selectedSermon, setSelectedSermon] = useState(1);
  const [fontSize, setFontSize] = useState(16);

  const modules = [
    { id: 'dashboard', name: 'Dashboard', icon: Menu, color: 'bg-blue-500' },
    { id: 'bible', name: 'Bíblia', icon: Book, color: 'bg-purple-500' },
    { id: 'sermons', name: 'Sermões', icon: FileText, color: 'bg-green-500' },
    { id: 'goals', name: 'Metas', icon: Target, color: 'bg-orange-500' },
    { id: 'calendar', name: 'Agenda', icon: Calendar, color: 'bg-pink-500' },
    { id: 'members', name: 'Membros', icon: Users, color: 'bg-indigo-500' },
    { id: 'finances', name: 'Finanças', icon: DollarSign, color: 'bg-emerald-500' },
    { id: 'prayer', name: 'Oração', icon: Heart, color: 'bg-red-500' },
    { id: 'library', name: 'Biblioteca', icon: BookOpen, color: 'bg-amber-500' },
  ];

  const sermons = [
    {
      id: 1,
      title: 'O Bom Pastor',
      date: '2025-10-05',
      reference: 'João 10:11-18',
      tags: ['Pastoral', 'Cuidado'],
      lastEdited: 'Há 2 horas',
      wordCount: 1250,
      duration: '25 min'
    },
    {
      id: 2,
      title: 'A Fé que Move Montanhas',
      date: '2025-09-28',
      reference: 'Mateus 17:20',
      tags: ['Fé', 'Milagres'],
      lastEdited: 'Há 1 dia',
      wordCount: 980,
      duration: '20 min'
    },
    {
      id: 3,
      title: 'O Amor de Deus',
      date: '2025-09-21',
      reference: 'João 3:16',
      tags: ['Amor', 'Salvação'],
      lastEdited: 'Há 5 dias',
      wordCount: 1500,
      duration: '30 min'
    },
    {
      id: 4,
      title: 'Vivendo em Santidade',
      date: '2025-09-14',
      reference: '1 Pedro 1:15-16',
      tags: ['Santidade', 'Vida Cristã'],
      lastEdited: 'Há 2 semanas',
      wordCount: 1100,
      duration: '22 min'
    },
  ];

  return (
    <>
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 shadow-sm z-10">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <FileText className="text-green-600" size={28} />
                <div>
                  <h1 className="text-2xl font-bold text-gray-800">Editor de Sermões</h1>
                  <p className="text-sm text-gray-500">Crie e organize seus sermões</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors shadow-sm">
                  <Plus size={18} />
                  <span className="font-medium">Novo Sermão</span>
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <Search size={20} className="text-gray-600" />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <Settings size={20} className="text-gray-600" />
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Editor Content with Right Sidebar */}
        <div className="flex-1 flex overflow-hidden">
          {/* Main Editor Area */}
          <div className="flex-1 flex flex-col overflow-hidden bg-gray-100">
            {/* Toolbar */}
            <div className="bg-white border-b border-gray-200 p-3 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <button className="p-2 hover:bg-gray-100 rounded transition-colors" title="Salvar">
                    <Save size={18} className="text-gray-700" />
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded transition-colors" title="Desfazer">
                    <Undo size={18} className="text-gray-700" />
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded transition-colors" title="Refazer">
                    <Redo size={18} className="text-gray-700" />
                  </button>
                  
                  <div className="w-px h-6 bg-gray-300 mx-2"></div>
                  
                  <button className="p-2 hover:bg-blue-50 rounded transition-colors" title="Negrito">
                    <Bold size={18} className="text-gray-700" />
                  </button>
                  <button className="p-2 hover:bg-blue-50 rounded transition-colors" title="Itálico">
                    <Italic size={18} className="text-gray-700" />
                  </button>
                  <button className="p-2 hover:bg-blue-50 rounded transition-colors" title="Sublinhado">
                    <Underline size={18} className="text-gray-700" />
                  </button>
                  
                  <div className="w-px h-6 bg-gray-300 mx-2"></div>
                  
                  <button className="p-2 hover:bg-blue-50 rounded transition-colors" title="Alinhar à Esquerda">
                    <AlignLeft size={18} className="text-gray-700" />
                  </button>
                  <button className="p-2 hover:bg-blue-50 rounded transition-colors" title="Centralizar">
                    <AlignCenter size={18} className="text-gray-700" />
                  </button>
                  <button className="p-2 hover:bg-blue-50 rounded transition-colors" title="Alinhar à Direita">
                    <AlignRight size={18} className="text-gray-700" />
                  </button>
                  <button className="p-2 hover:bg-blue-50 rounded transition-colors" title="Justificar">
                    <AlignJustify size={18} className="text-gray-700" />
                  </button>
                  
                  <div className="w-px h-6 bg-gray-300 mx-2"></div>
                  
                  <button className="p-2 hover:bg-blue-50 rounded transition-colors" title="Lista">
                    <List size={18} className="text-gray-700" />
                  </button>
                  <button className="p-2 hover:bg-blue-50 rounded transition-colors" title="Lista Numerada">
                    <ListOrdered size={18} className="text-gray-700" />
                  </button>
                  <button className="p-2 hover:bg-blue-50 rounded transition-colors" title="Citação">
                    <Quote size={18} className="text-gray-700" />
                  </button>
                  
                  <div className="w-px h-6 bg-gray-300 mx-2"></div>
                  
                  <button className="p-2 hover:bg-blue-50 rounded transition-colors" title="Inserir Link">
                    <Link size={18} className="text-gray-700" />
                  </button>
                  <button className="p-2 hover:bg-blue-50 rounded transition-colors" title="Inserir Imagem">
                    <Image size={18} className="text-gray-700" />
                  </button>
                  <button className="p-2 hover:bg-blue-50 rounded transition-colors" title="Cor do Texto">
                    <Palette size={18} className="text-gray-700" />
                  </button>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <Type size={18} className="text-gray-600" />
                    <select 
                      value={fontSize}
                      onChange={(e) => setFontSize(Number(e.target.value))}
                      className="px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                      <option value="12">12pt</option>
                      <option value="14">14pt</option>
                      <option value="16">16pt</option>
                      <option value="18">18pt</option>
                      <option value="20">20pt</option>
                      <option value="24">24pt</option>
                    </select>
                  </div>
                  
                  <button className="p-2 hover:bg-gray-100 rounded transition-colors" title="Baixar">
                    <Download size={18} className="text-gray-700" />
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded transition-colors" title="Imprimir">
                    <Printer size={18} className="text-gray-700" />
                  </button>
                </div>
              </div>

              {/* Second Toolbar Row */}
              <div className="flex items-center gap-2">
                <select className="px-3 py-1.5 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-green-500 bg-white">
                  <option>Parágrafo Normal</option>
                  <option>Título 1</option>
                  <option>Título 2</option>
                  <option>Título 3</option>
                  <option>Subtítulo</option>
                </select>

                <select className="px-3 py-1.5 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-green-500 bg-white">
                  <option>Arial</option>
                  <option>Times New Roman</option>
                  <option>Georgia</option>
                  <option>Verdana</option>
                  <option>Courier New</option>
                </select>
              </div>
            </div>

            {/* A4 Paper Area */}
            <div className="flex-1 overflow-y-auto p-8">
              <div className="max-w-[21cm] mx-auto">
                {/* A4 Sheet */}
                <div 
                  className="bg-white shadow-2xl min-h-[29.7cm] p-[2cm] relative"
                  style={{ 
                    width: '21cm',
                    fontSize: `${fontSize}px`,
                  }}
                >
                  {/* Document Header */}
                  <div className="mb-8 pb-4 border-b-2 border-gray-200">
                    <h1 className="text-4xl font-bold text-gray-800 mb-2">
                      O Bom Pastor
                    </h1>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <Book size={14} />
                        João 10:11-18
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar size={14} />
                        05 de Outubro, 2025
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock size={14} />
                        25 min
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="prose max-w-none" contentEditable>
                    <h2 className="text-2xl font-bold text-gray-800 mt-6 mb-4">Introdução</h2>
                    <p className="mb-4 text-gray-700 leading-relaxed">
                      Hoje, vamos meditar sobre uma das imagens mais belas e consoladoras que Jesus usou para descrever seu relacionamento conosco: a do Bom Pastor. Em João 10:11, Jesus declara: "Eu sou o bom pastor. O bom pastor dá a vida pelas ovelhas."
                    </p>

                    <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">I. O Pastor que Conhece suas Ovelhas</h2>
                    <p className="mb-4 text-gray-700 leading-relaxed">
                      Jesus não é um estranho para nós. Ele nos conhece pelo nome, conhece nossas lutas, nossas alegrias, nossos medos. Assim como um pastor conhece cada uma de suas ovelhas, Jesus conhece intimamente cada um de nós.
                    </p>
                    <ul className="mb-4 ml-6 text-gray-700">
                      <li className="mb-2">Ele conhece nossa natureza e necessidades</li>
                      <li className="mb-2">Ele reconhece nossa voz quando clamamos</li>
                      <li className="mb-2">Ele sabe exatamente onde estamos</li>
                    </ul>

                    <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">II. O Pastor que Protege</h2>
                    <p className="mb-4 text-gray-700 leading-relaxed">
                      O bom pastor coloca-se entre suas ovelhas e o perigo. Jesus fez exatamente isso na cruz. Ele se interpôs entre nós e a morte eterna, entre nós e o pecado que nos separava de Deus.
                    </p>

                    <blockquote className="border-l-4 border-green-500 pl-4 italic my-6 text-gray-600">
                      "O bom pastor dá a vida pelas ovelhas" - João 10:11
                    </blockquote>

                    <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">III. O Pastor que Guia</h2>
                    <p className="mb-4 text-gray-700 leading-relaxed">
                      Jesus não apenas nos protege, mas também nos guia. Ele vai à frente, preparando o caminho, mostrando a direção certa. Quando seguimos o Bom Pastor, nunca andamos sozinhos.
                    </p>

                    <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">Conclusão</h2>
                    <p className="mb-4 text-gray-700 leading-relaxed">
                      Que privilégio imenso é ter Jesus como nosso Pastor! Ele nos conhece, nos ama, nos protege e nos guia. A pergunta que fica é: estamos ouvindo sua voz? Estamos seguindo seus passos?
                    </p>
                    <p className="text-gray-700 leading-relaxed">
                      Que possamos, nesta semana, renovar nosso compromisso de seguir o Bom Pastor, confiando em seu cuidado e direção para nossas vidas.
                    </p>
                  </div>

                  {/* Page Number */}
                  <div className="absolute bottom-8 right-8 text-sm text-gray-400">
                    Página 1
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Sidebar - Sermons List */}
          <aside className="w-80 bg-white border-l border-gray-200 flex flex-col shadow-xl">
            {/* Sidebar Header */}
            <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-green-50 to-emerald-50">
              <h3 className="text-lg font-bold text-gray-800 mb-1">Meus Sermões</h3>
              <p className="text-sm text-gray-600">{sermons.length} sermões salvos</p>
            </div>

            {/* Sermons List */}
            <div className="flex-1 overflow-y-auto p-4">
              <div className="space-y-3">
                {sermons.map((sermon) => (
                  <div
                    key={sermon.id}
                    onClick={() => setSelectedSermon(sermon.id)}
                    className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                      selectedSermon === sermon.id
                        ? 'border-green-500 bg-green-50 shadow-md'
                        : 'border-gray-200 hover:border-green-300 hover:shadow-sm bg-white'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-semibold text-gray-800 text-sm leading-tight flex-1">
                        {sermon.title}
                      </h4>
                      <button className="p-1 hover:bg-gray-200 rounded transition-colors">
                        <MoreVertical size={14} className="text-gray-500" />
                      </button>
                    </div>

                    <div className="flex items-center gap-1 text-xs text-purple-600 mb-2">
                      <Book size={12} />
                      <span>{sermon.reference}</span>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                      <span className="flex items-center gap-1">
                        <Calendar size={12} />
                        {new Date(sermon.date).toLocaleDateString('pt-BR')}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock size={12} />
                        {sermon.duration}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-1 mb-2">
                      {sermon.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 bg-green-100 text-green-700 rounded-full text-xs"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between text-xs text-gray-500 pt-2 border-t border-gray-200">
                      <span>{sermon.wordCount} palavras</span>
                      <span>{sermon.lastEdited}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Sidebar Footer */}
            <div className="p-4 border-t border-gray-200">
              <div className="grid grid-cols-2 gap-2">
                <button className="flex items-center justify-center gap-2 px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors text-sm">
                  <Copy size={14} />
                  <span>Duplicar</span>
                </button>
                <button className="flex items-center justify-center gap-2 px-3 py-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg transition-colors text-sm">
                  <Trash2 size={14} />
                  <span>Excluir</span>
                </button>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
};

export default Sermons;