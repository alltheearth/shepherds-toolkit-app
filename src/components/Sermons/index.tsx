import React, { useState, useEffect } from 'react';
import { 
  FileText, Save, Download, Printer, Plus, Search, Settings,
  Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight, AlignJustify,
  List, ListOrdered, Quote, Link, Image, Undo, Redo, Type, Palette,
  MoreVertical, Trash2, Copy, Edit, Clock, Tag, Book, Calendar,
  X, Loader2, AlertCircle, Check
} from 'lucide-react';
import api from '../../services/api';

const Sermons = () => {
  const [sermons, setSermons] = useState([]);
  const [selectedSermon, setSelectedSermon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showNewSermonModal, setShowNewSermonModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [sermonToDelete, setSermonToDelete] = useState(null);
  const [fontSize, setFontSize] = useState(16);
  const [formData, setFormData] = useState({
    title: '',
    scripture_reference: '',
    sermon_date: '',
    content: '',
    notes: '',
    tags: [],
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Carregar sermões
  useEffect(() => {
    fetchSermons();
  }, []);

  const fetchSermons = async () => {
    try {
      setLoading(true);
      const response = await api.get('/sermons/');
      const sermonsData = response.data.results || response.data || [];
      setSermons(sermonsData);
      
      // Selecionar o primeiro sermão automaticamente
      if (sermonsData.length > 0 && !selectedSermon) {
        setSelectedSermon(sermonsData[0]);
      }
    } catch (error) {
      console.error('Erro ao carregar sermões:', error);
      alert('Erro ao carregar sermões');
    } finally {
      setLoading(false);
    }
  };

  // Criar sermão
  const handleCreate = async (e) => {
    e.preventDefault();
    setErrors({});
    setSubmitting(true);

    try {
      if (!formData.title.trim()) {
        setErrors({ title: 'Título é obrigatório' });
        setSubmitting(false);
        return;
      }

      const sermonData = {
        title: formData.title,
        scripture_reference: formData.scripture_reference || '',
        sermon_date: formData.sermon_date || new Date().toISOString().split('T')[0],
        content: formData.content || '',
        notes: formData.notes || '',
        tags: formData.tags,
      };

      const response = await api.post('/sermons/', sermonData);
      
      setSermons([response.data, ...sermons]);
      setSelectedSermon(response.data);
      setShowNewSermonModal(false);
      resetForm();
      alert('Sermão criado com sucesso!');
    } catch (error) {
      console.error('Erro ao criar sermão:', error);
      if (error.response?.data) {
        setErrors(error.response.data);
      } else {
        alert('Erro ao criar sermão');
      }
    } finally {
      setSubmitting(false);
    }
  };

  // Atualizar sermão
  const handleUpdate = async () => {
    if (!selectedSermon) return;
    
    setSubmitting(true);
    try {
      const response = await api.put(`/sermons/${selectedSermon.id}/`, selectedSermon);
      
      setSermons(sermons.map(s => s.id === selectedSermon.id ? response.data : s));
      setSelectedSermon(response.data);
      alert('Sermão atualizado com sucesso!');
    } catch (error) {
      console.error('Erro ao atualizar sermão:', error);
      alert('Erro ao atualizar sermão');
    } finally {
      setSubmitting(false);
    }
  };

  // Deletar sermão
  const handleDelete = async () => {
    if (!sermonToDelete) return;

    try {
      await api.delete(`/sermons/${sermonToDelete.id}/`);
      
      const updatedSermons = sermons.filter(s => s.id !== sermonToDelete.id);
      setSermons(updatedSermons);
      
      if (selectedSermon?.id === sermonToDelete.id) {
        setSelectedSermon(updatedSermons[0] || null);
      }
      
      setShowDeleteModal(false);
      setSermonToDelete(null);
      alert('Sermão excluído com sucesso!');
    } catch (error) {
      console.error('Erro ao excluir sermão:', error);
      alert('Erro ao excluir sermão');
    }
  };

  // Duplicar sermão
  const handleDuplicate = async (sermon) => {
    try {
      const duplicatedSermon = {
        title: `${sermon.title} (Cópia)`,
        scripture_reference: sermon.scripture_reference,
        sermon_date: new Date().toISOString().split('T')[0],
        content: sermon.content,
        notes: sermon.notes,
        tags: sermon.tags || [],
      };

      const response = await api.post('/sermons/', duplicatedSermon);
      
      setSermons([response.data, ...sermons]);
      setSelectedSermon(response.data);
      alert('Sermão duplicado com sucesso!');
    } catch (error) {
      console.error('Erro ao duplicar sermão:', error);
      alert('Erro ao duplicar sermão');
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      scripture_reference: '',
      sermon_date: '',
      content: '',
      notes: '',
      tags: [],
    });
    setErrors({});
    setIsEditing(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleContentChange = (e) => {
    if (selectedSermon) {
      setSelectedSermon({
        ...selectedSermon,
        content: e.target.innerHTML
      });
    }
  };

  const openNewSermonModal = () => {
    resetForm();
    setShowNewSermonModal(true);
  };

  const openDeleteModal = (sermon) => {
    setSermonToDelete(sermon);
    setShowDeleteModal(true);
  };

  // Filtrar sermões pela busca
  const filteredSermons = sermons.filter(sermon =>
    sermon.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (sermon.scripture_reference && sermon.scripture_reference.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Calcular estatísticas
  const calculateWordCount = (content) => {
    if (!content) return 0;
    const text = content.replace(/<[^>]*>/g, '');
    return text.split(/\s+/).filter(word => word.length > 0).length;
  };

  const estimateDuration = (wordCount) => {
    const wordsPerMinute = 130;
    const minutes = Math.ceil(wordCount / wordsPerMinute);
    return `${minutes} min`;
  };

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-green-600 mx-auto mb-4" />
          <p className="text-gray-600">Carregando sermões...</p>
        </div>
      </div>
    );
  }

  return (
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
              <button 
                onClick={openNewSermonModal}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors shadow-sm"
              >
                <Plus size={18} />
                <span className="font-medium">Novo Sermão</span>
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
          {selectedSermon ? (
            <>
              {/* Toolbar */}
              <div className="bg-white border-b border-gray-200 p-3 shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={handleUpdate}
                      disabled={submitting}
                      className="p-2 hover:bg-gray-100 rounded transition-colors disabled:opacity-50" 
                      title="Salvar"
                    >
                      {submitting ? (
                        <Loader2 size={18} className="text-gray-700 animate-spin" />
                      ) : (
                        <Save size={18} className="text-gray-700" />
                      )}
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
                  <div 
                    className="bg-white shadow-2xl min-h-[29.7cm] p-[2cm] relative"
                    style={{ width: '21cm', fontSize: `${fontSize}px` }}
                  >
                    {/* Document Header */}
                    <div className="mb-8 pb-4 border-b-2 border-gray-200">
                      <h1 
                        className="text-4xl font-bold text-gray-800 mb-2"
                        contentEditable
                        suppressContentEditableWarning
                        onBlur={(e) => setSelectedSermon({
                          ...selectedSermon,
                          title: e.target.textContent
                        })}
                      >
                        {selectedSermon.title}
                      </h1>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span className="flex items-center gap-1">
                          <Book size={14} />
                          <span
                            contentEditable
                            suppressContentEditableWarning
                            onBlur={(e) => setSelectedSermon({
                              ...selectedSermon,
                              scripture_reference: e.target.textContent
                            })}
                          >
                            {selectedSermon.scripture_reference || 'Adicionar referência'}
                          </span>
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar size={14} />
                          {new Date(selectedSermon.sermon_date).toLocaleDateString('pt-BR')}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock size={14} />
                          {estimateDuration(calculateWordCount(selectedSermon.content))}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div 
                      className="prose max-w-none min-h-[400px]" 
                      contentEditable
                      suppressContentEditableWarning
                      onBlur={handleContentChange}
                      dangerouslySetInnerHTML={{ __html: selectedSermon.content || '<p>Comece a escrever seu sermão...</p>' }}
                    />

                    {/* Page Number */}
                    <div className="absolute bottom-8 right-8 text-sm text-gray-400">
                      Página 1
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 text-lg mb-2">Nenhum sermão selecionado</p>
                <p className="text-gray-400 text-sm mb-4">Selecione um sermão da lista ou crie um novo</p>
                <button 
                  onClick={openNewSermonModal}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  Criar Primeiro Sermão
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Right Sidebar - Sermons List */}
        <aside className="w-80 bg-white border-l border-gray-200 flex flex-col shadow-xl">
          {/* Sidebar Header */}
          <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-green-50 to-emerald-50">
            <h3 className="text-lg font-bold text-gray-800 mb-1">Meus Sermões</h3>
            <p className="text-sm text-gray-600">{sermons.length} sermões salvos</p>
            
            {/* Search */}
            <div className="mt-3 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
              <input
                type="text"
                placeholder="Buscar sermões..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>

          {/* Sermons List */}
          <div className="flex-1 overflow-y-auto p-4">
            {filteredSermons.length > 0 ? (
              <div className="space-y-3">
                {filteredSermons.map((sermon) => {
                  const wordCount = calculateWordCount(sermon.content);
                  const duration = estimateDuration(wordCount);
                  
                  return (
                    <div
                      key={sermon.id}
                      onClick={() => setSelectedSermon(sermon)}
                      className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                        selectedSermon?.id === sermon.id
                          ? 'border-green-500 bg-green-50 shadow-md'
                          : 'border-gray-200 hover:border-green-300 hover:shadow-sm bg-white'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-semibold text-gray-800 text-sm leading-tight flex-1">
                          {sermon.title}
                        </h4>
                        <div className="relative group">
                          <button className="p-1 hover:bg-gray-200 rounded transition-colors">
                            <MoreVertical size={14} className="text-gray-500" />
                          </button>
                          <div className="absolute right-0 top-8 bg-white border border-gray-200 rounded-lg shadow-lg py-1 hidden group-hover:block z-10 min-w-[120px]">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDuplicate(sermon);
                              }}
                              className="w-full px-3 py-2 text-left text-sm hover:bg-gray-100 flex items-center gap-2"
                            >
                              <Copy size={14} />
                              Duplicar
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                openDeleteModal(sermon);
                              }}
                              className="w-full px-3 py-2 text-left text-sm hover:bg-red-50 text-red-600 flex items-center gap-2"
                            >
                              <Trash2 size={14} />
                              Excluir
                            </button>
                          </div>
                        </div>
                      </div>

                      {sermon.scripture_reference && (
                        <div className="flex items-center gap-1 text-xs text-purple-600 mb-2">
                          <Book size={12} />
                          <span>{sermon.scripture_reference}</span>
                        </div>
                      )}

                      <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                        <span className="flex items-center gap-1">
                          <Calendar size={12} />
                          {new Date(sermon.sermon_date).toLocaleDateString('pt-BR')}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Clock size={12} />
                          {duration}
                        </span>
                      </div>

                      {sermon.tags && sermon.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mb-2">
                          {sermon.tags.slice(0, 2).map((tag, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-0.5 bg-green-100 text-green-700 rounded-full text-xs"
                            >
                              {tag}
                            </span>
                          ))}
                          {sermon.tags.length > 2 && (
                            <span className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full text-xs">
                              +{sermon.tags.length - 2}
                            </span>
                          )}
                        </div>
                      )}

                      <div className="flex items-center justify-between text-xs text-gray-500 pt-2 border-t border-gray-200">
                        <span>{wordCount} palavras</span>
                        <span>{new Date(sermon.updated_at).toLocaleDateString('pt-BR')}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-8">
                <FileText className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500 text-sm">
                  {searchTerm ? 'Nenhum sermão encontrado' : 'Nenhum sermão cadastrado'}
                </p>
              </div>
            )}
          </div>

          {/* Sidebar Footer */}
          {selectedSermon && (
            <div className="p-4 border-t border-gray-200">
              <div className="grid grid-cols-2 gap-2">
                <button 
                  onClick={() => handleDuplicate(selectedSermon)}
                  className="flex items-center justify-center gap-2 px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors text-sm"
                >
                  <Copy size={14} />
                  <span>Duplicar</span>
                </button>
                <button 
                  onClick={() => openDeleteModal(selectedSermon)}
                  className="flex items-center justify-center gap-2 px-3 py-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg transition-colors text-sm"
                >
                  <Trash2 size={14} />
                  <span>Excluir</span>
                </button>
              </div>
            </div>
          )}
        </aside>
      </div>

      {/* New Sermon Modal */}
      {showNewSermonModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col">
            <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-green-50 to-emerald-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                    <Plus className="text-white" size={24} />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800">Novo Sermão</h2>
                    <p className="text-sm text-gray-600">Crie um novo sermão</p>
                  </div>
                </div>
                <button 
                  onClick={() => {
                    setShowNewSermonModal(false);
                    resetForm();
                  }}
                  className="p-2 hover:bg-white rounded-lg transition-colors"
                >
                  <X size={24} />
                </button>
              </div>
            </div>

            <form onSubmit={handleCreate} className="flex-1 overflow-y-auto p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Título do Sermão *
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="Ex: O Bom Pastor"
                    className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 ${
                      errors.title ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.title && (
                    <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                      <AlertCircle size={14} />
                      {errors.title}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Referência Bíblica
                    </label>
                    <input
                      type="text"
                      name="scripture_reference"
                      value={formData.scripture_reference}
                      onChange={handleInputChange}
                      placeholder="Ex: João 10:11-18"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Data do Sermão
                    </label>
                    <input
                      type="date"
                      name="sermon_date"
                      value={formData.sermon_date}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Conteúdo Inicial (opcional)
                  </label>
                  <textarea
                    name="content"
                    value={formData.content}
                    onChange={handleInputChange}
                    placeholder="Você pode adicionar o conteúdo depois..."
                    rows={6}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
                  />
                </div>
              </div>
            </form>

            <div className="p-6 border-t border-gray-200 bg-gray-50">
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowNewSermonModal(false);
                    resetForm();
                  }}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors font-medium"
                  disabled={submitting}
                >
                  Cancelar
                </button>
                <button 
                  onClick={handleCreate}
                  disabled={submitting}
                  className="flex-1 px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:from-green-700 hover:to-emerald-700 transition-colors font-medium flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="animate-spin" size={18} />
                      Criando...
                    </>
                  ) : (
                    <>
                      <Check size={18} />
                      Criar Sermão
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && sermonToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden">
            <div className="p-6 border-b border-gray-200 bg-red-50">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                  <AlertCircle className="text-red-600" size={24} />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-800">Excluir Sermão</h2>
                  <p className="text-sm text-gray-600">Esta ação não pode ser desfeita</p>
                </div>
              </div>
            </div>

            <div className="p-6">
              <p className="text-gray-700 mb-4">
                Tem certeza que deseja excluir o sermão <strong>"{sermonToDelete.title}"</strong>?
              </p>
              <p className="text-sm text-gray-500">
                Todo o conteúdo e informações relacionadas serão perdidos permanentemente.
              </p>
            </div>

            <div className="p-6 border-t border-gray-200 bg-gray-50">
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setShowDeleteModal(false);
                    setSermonToDelete(null);
                  }}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors font-medium"
                >
                  Cancelar
                </button>
                <button 
                  onClick={handleDelete}
                  className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium flex items-center justify-center gap-2"
                >
                  <Trash2 size={18} />
                  Excluir Sermão
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sermons;