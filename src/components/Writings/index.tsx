import { useState, useEffect } from 'react';
import {
  FileText, Plus, Search, MoreVertical, Trash2, Copy, Clock, Book, Calendar,
  Loader2, AlertCircle, Check,
} from 'lucide-react';
import api from '../../services/api';
import type { Writing, WritingType } from '../../types/writing.types';
import { WRITING_TYPE_LABELS } from '../../types/writing.types';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { Modal } from '../ui/Modal';
import { Input } from '../ui/Input';
import WritingEditor from './WritingEditor';

const calculateWordCount = (content: string) => {
  if (!content) return 0;
  const text = content.replace(/<[^>]*>/g, '');
  return text.split(/\s+/).filter((word) => word.length > 0).length;
};

const estimateDuration = (wordCount: number) => `${Math.ceil(wordCount / 130)} min`;

const Writings = () => {
  const [writings, setWritings] = useState<Writing[]>([]);
  const [selectedWriting, setSelectedWriting] = useState<Writing | null>(null);
  const [loading, setLoading] = useState(true);
  const [showNewWritingModal, setShowNewWritingModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [writingToDelete, setWritingToDelete] = useState<Writing | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    base_text: '',
    preached_date: '',
    content: '',
    type: 'sermao' as WritingType,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchWritings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchWritings = async () => {
    try {
      setLoading(true);
      const response = await api.get('/writings/');
      const writingsData: Writing[] = response.data.results || response.data || [];
      setWritings(writingsData);
      if (writingsData.length > 0) {
        selectWriting(writingsData[0]);
      }
    } catch (error) {
      console.error('Erro ao carregar escritos:', error);
      alert('Erro ao carregar escritos');
    } finally {
      setLoading(false);
    }
  };

  // The list endpoint returns a simplified payload without `content` (for
  // performance), so opening a writing needs a follow-up fetch of the full
  // detail record — otherwise the editor shows the title with no content.
  // WritingEditor only reloads its content when `writing.id` changes, so we
  // fetch first and set state once rather than setting the content-less
  // list item first (which would share the same id and never trigger a
  // second reload).
  const selectWriting = async (writing: Writing) => {
    try {
      const response = await api.get(`/writings/${writing.id}/`);
      setSelectedWriting(response.data);
    } catch (error) {
      console.error('Erro ao carregar conteúdo do escrito:', error);
      setSelectedWriting(writing);
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setSubmitting(true);

    try {
      if (!formData.title.trim()) {
        setErrors({ title: 'Título é obrigatório' });
        setSubmitting(false);
        return;
      }

      const writingData = {
        title: formData.title.trim(),
        base_text: formData.base_text?.trim() || '',
        preached_date: formData.preached_date || new Date().toISOString().split('T')[0],
        content: formData.content || '<p></p>',
        type: formData.type,
        tags: [],
        status: 'draft',
      };

      const response = await api.post('/writings/', writingData);
      setWritings([response.data, ...writings]);
      setSelectedWriting(response.data);
      setShowNewWritingModal(false);
      resetForm();
    } catch (error) {
      console.error('Erro ao criar escrito:', error);
      alert('Erro ao criar escrito. Verifique sua conexão.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleUpdate = async () => {
    if (!selectedWriting) return;

    setSubmitting(true);
    try {
      const updateData = {
        title: selectedWriting.title,
        content: selectedWriting.content || '',
        base_text: selectedWriting.base_text || '',
        preached_date: selectedWriting.preached_date,
        status: selectedWriting.status || 'draft',
        type: selectedWriting.type,
        tags: selectedWriting.tags || [],
      };

      const response = await api.put(`/writings/${selectedWriting.id}/`, updateData);
      setWritings(writings.map((w) => (w.id === selectedWriting.id ? response.data : w)));
      setSelectedWriting(response.data);
    } catch (error) {
      console.error('Erro ao atualizar escrito:', error);
      alert('Erro ao atualizar escrito');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!writingToDelete) return;

    try {
      await api.delete(`/writings/${writingToDelete.id}/`);
      const remaining = writings.filter((w) => w.id !== writingToDelete.id);
      setWritings(remaining);
      if (selectedWriting?.id === writingToDelete.id) {
        if (remaining[0]) {
          selectWriting(remaining[0]);
        } else {
          setSelectedWriting(null);
        }
      }
      setShowDeleteModal(false);
      setWritingToDelete(null);
    } catch (error) {
      console.error('Erro ao excluir escrito:', error);
      alert('Erro ao excluir escrito');
    }
  };

  const handleDuplicate = async (writing: Writing) => {
    try {
      const duplicatedWriting = {
        title: `${writing.title} (Cópia)`,
        base_text: writing.base_text,
        preached_date: new Date().toISOString().split('T')[0],
        content: writing.content,
        type: writing.type,
        tags: writing.tags || [],
        status: 'draft',
      };

      const response = await api.post('/writings/', duplicatedWriting);
      setWritings([response.data, ...writings]);
      setSelectedWriting(response.data);
    } catch (error) {
      console.error('Erro ao duplicar escrito:', error);
      alert('Erro ao duplicar escrito');
    }
  };

  const resetForm = () => {
    setFormData({ title: '', base_text: '', preached_date: '', content: '', type: 'sermao' });
    setErrors({});
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const openNewWritingModal = () => {
    resetForm();
    setShowNewWritingModal(true);
  };

  const openDeleteModal = (writing: Writing) => {
    setWritingToDelete(writing);
    setShowDeleteModal(true);
  };

  const filteredWritings = writings.filter(
    (writing) =>
      writing.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (writing.base_text && writing.base_text.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center bg-bg">
        <div className="text-center">
          <Loader2 className="w-10 h-10 animate-spin text-accent mx-auto mb-3" />
          <p className="text-ink-muted text-sm">Carregando escritos...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* Header */}
      <header className="bg-surface border-b border-border">
        <div className="px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <FileText className="text-accent" size={22} />
            <div>
              <h1 className="text-lg font-semibold text-ink">Escritos</h1>
              <p className="text-sm text-ink-faint">Sermões, devocionais e esboços de estudo</p>
            </div>
          </div>
          <Button size="sm" onClick={openNewWritingModal}>
            <Plus size={16} />
            Novo Escrito
          </Button>
        </div>
      </header>

      {/* Editor Content with Right Sidebar */}
      <div className="flex-1 flex overflow-hidden">
        {/* Main Editor Area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {selectedWriting ? (
            <WritingEditor
              writing={selectedWriting}
              onUpdateWriting={(patch) => setSelectedWriting({ ...selectedWriting, ...patch })}
              onSave={handleUpdate}
              submitting={submitting}
            />
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <FileText className="w-14 h-14 text-ink-faint mx-auto mb-4" />
                <p className="text-ink-muted mb-1">Nenhum escrito selecionado</p>
                <p className="text-ink-faint text-sm mb-4">Selecione um escrito da lista ou crie um novo</p>
                <Button onClick={openNewWritingModal}>Criar Primeiro Escrito</Button>
              </div>
            </div>
          )}
        </div>

        {/* Right Sidebar - Writings List */}
        <aside className="w-80 bg-surface border-l border-border flex flex-col">
          <div className="p-4 border-b border-border">
            <h3 className="text-sm font-semibold text-ink mb-0.5">Meus Escritos</h3>
            <p className="text-sm text-ink-faint">{writings.length} escritos salvos</p>

            <div className="mt-3 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-ink-faint" size={16} />
              <input
                type="text"
                placeholder="Buscar escritos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-3 py-2 border border-border rounded-md bg-bg text-sm text-ink placeholder:text-ink-faint focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-3">
            {filteredWritings.length > 0 ? (
              <div className="space-y-2">
                {filteredWritings.map((writing) => {
                  const wordCount = calculateWordCount(writing.content);
                  const duration = estimateDuration(wordCount);

                  return (
                    <Card
                      key={writing.id}
                      hoverable
                      onClick={() => selectWriting(writing)}
                      className={`p-3 ${selectedWriting?.id === writing.id ? 'border-accent bg-accent-soft/30' : ''}`}
                    >
                      <div className="flex items-start justify-between mb-1.5">
                        <h4 className="font-medium text-ink text-sm leading-tight flex-1 pr-2">{writing.title}</h4>
                        <div className="relative group flex-shrink-0">
                          <button className="p-1 hover:bg-surface-hover rounded transition-colors">
                            <MoreVertical size={14} className="text-ink-faint" />
                          </button>
                          <div className="absolute right-0 top-7 bg-surface border border-border rounded-md shadow-lg py-1 hidden group-hover:block z-10 min-w-[120px]">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDuplicate(writing);
                              }}
                              className="w-full px-3 py-1.5 text-left text-sm text-ink hover:bg-surface-hover flex items-center gap-2"
                            >
                              <Copy size={13} /> Duplicar
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                openDeleteModal(writing);
                              }}
                              className="w-full px-3 py-1.5 text-left text-sm text-danger hover:bg-danger-soft flex items-center gap-2"
                            >
                              <Trash2 size={13} /> Excluir
                            </button>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5 mb-1.5">
                        <span className="text-[11px] font-medium text-accent bg-accent-soft px-1.5 py-0.5 rounded">
                          {WRITING_TYPE_LABELS[writing.type]}
                        </span>
                      </div>

                      {writing.base_text && (
                        <div className="flex items-center gap-1 text-xs text-accent mb-1.5">
                          <Book size={11} />
                          <span>{writing.base_text}</span>
                        </div>
                      )}

                      <div className="flex items-center gap-2 text-xs text-ink-faint mb-1.5">
                        <span className="flex items-center gap-1">
                          <Calendar size={11} />
                          {new Date(writing.preached_date).toLocaleDateString('pt-BR')}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Clock size={11} />
                          {duration}
                        </span>
                      </div>

                      <div className="flex items-center justify-between text-xs text-ink-faint pt-2 border-t border-border">
                        <span>{wordCount} palavras</span>
                        <span>{new Date(writing.updated_at).toLocaleDateString('pt-BR')}</span>
                      </div>
                    </Card>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-8">
                <FileText className="w-10 h-10 text-ink-faint mx-auto mb-3" />
                <p className="text-ink-muted text-sm">
                  {searchTerm ? 'Nenhum escrito encontrado' : 'Nenhum escrito cadastrado'}
                </p>
              </div>
            )}
          </div>
        </aside>
      </div>

      {/* New Writing Modal */}
      <Modal open={showNewWritingModal} onClose={() => { setShowNewWritingModal(false); resetForm(); }} title="Novo Escrito">
        <form onSubmit={handleCreate} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-ink-muted mb-1.5">Título *</label>
            <Input name="title" value={formData.title} onChange={handleInputChange} placeholder="Ex: O Bom Pastor" />
            {errors.title && (
              <p className="text-danger text-sm mt-1 flex items-center gap-1">
                <AlertCircle size={13} /> {errors.title}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-ink-muted mb-1.5">Tipo</label>
            <select
              name="type"
              value={formData.type}
              onChange={(e) => setFormData((prev) => ({ ...prev, type: e.target.value as WritingType }))}
              className="w-full px-3 py-2 border border-border rounded-md bg-bg text-sm text-ink focus:outline-none focus:ring-2 focus:ring-accent"
            >
              {Object.entries(WRITING_TYPE_LABELS).map(([value, label]) => (
                <option key={value} value={value}>{label}</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-ink-muted mb-1.5">Referência Bíblica</label>
              <Input name="base_text" value={formData.base_text} onChange={handleInputChange} placeholder="Ex: João 10:11-18" />
            </div>
            <div>
              <label className="block text-sm font-medium text-ink-muted mb-1.5">Data</label>
              <Input type="date" name="preached_date" value={formData.preached_date} onChange={handleInputChange} />
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <Button type="button" variant="secondary" className="flex-1" onClick={() => { setShowNewWritingModal(false); resetForm(); }} disabled={submitting}>
              Cancelar
            </Button>
            <Button type="submit" className="flex-1" disabled={submitting}>
              {submitting ? <Loader2 className="animate-spin" size={16} /> : <Check size={16} />}
              Criar Escrito
            </Button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal open={showDeleteModal && !!writingToDelete} onClose={() => setShowDeleteModal(false)} title="Excluir Escrito">
        {writingToDelete && (
          <>
            <p className="text-ink mb-2">
              Tem certeza que deseja excluir o escrito <strong>"{writingToDelete.title}"</strong>?
            </p>
            <p className="text-sm text-ink-faint mb-6">Todo o conteúdo será perdido permanentemente.</p>
            <div className="flex gap-3">
              <Button variant="secondary" className="flex-1" onClick={() => setShowDeleteModal(false)}>Cancelar</Button>
              <Button variant="danger" className="flex-1" onClick={handleDelete}>
                <Trash2 size={16} /> Excluir
              </Button>
            </div>
          </>
        )}
      </Modal>
    </div>
  );
};

export default Writings;
