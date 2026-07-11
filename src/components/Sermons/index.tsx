import { useState, useEffect } from 'react';
import {
  FileText, Plus, Search, MoreVertical, Trash2, Copy, Clock, Book, Calendar,
  Loader2, AlertCircle, Check,
} from 'lucide-react';
import api from '../../services/api';
import type { MockSermon } from '../../mocks/sermonsMockData';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { Modal } from '../ui/Modal';
import { Input } from '../ui/Input';
import SermonEditor from './SermonEditor';

const calculateWordCount = (content: string) => {
  if (!content) return 0;
  const text = content.replace(/<[^>]*>/g, '');
  return text.split(/\s+/).filter((word) => word.length > 0).length;
};

const estimateDuration = (wordCount: number) => `${Math.ceil(wordCount / 130)} min`;

const Sermons = () => {
  const [sermons, setSermons] = useState<MockSermon[]>([]);
  const [selectedSermon, setSelectedSermon] = useState<MockSermon | null>(null);
  const [loading, setLoading] = useState(true);
  const [showNewSermonModal, setShowNewSermonModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [sermonToDelete, setSermonToDelete] = useState<MockSermon | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    scripture_reference: '',
    sermon_date: '',
    content: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchSermons();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchSermons = async () => {
    try {
      setLoading(true);
      const response = await api.get('/sermons/');
      const sermonsData: MockSermon[] = response.data.results || response.data || [];
      setSermons(sermonsData);
      if (sermonsData.length > 0) {
        setSelectedSermon((prev) => prev ?? sermonsData[0]);
      }
    } catch (error) {
      console.error('Erro ao carregar sermões:', error);
      alert('Erro ao carregar sermões');
    } finally {
      setLoading(false);
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

      const sermonData = {
        title: formData.title.trim(),
        scripture_reference: formData.scripture_reference?.trim() || '',
        sermon_date: formData.sermon_date || new Date().toISOString().split('T')[0],
        content: formData.content || '<p></p>',
        notes: '',
        tags: [],
        status: 'draft',
      };

      const response = await api.post('/sermons/', sermonData);
      setSermons([response.data, ...sermons]);
      setSelectedSermon(response.data);
      setShowNewSermonModal(false);
      resetForm();
    } catch (error) {
      console.error('Erro ao criar sermão:', error);
      alert('Erro ao criar sermão. Verifique sua conexão.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleUpdate = async () => {
    if (!selectedSermon) return;

    setSubmitting(true);
    try {
      const updateData = {
        title: selectedSermon.title,
        content: selectedSermon.content || '',
        scripture_reference: selectedSermon.scripture_reference || '',
        sermon_date: selectedSermon.sermon_date,
        status: selectedSermon.status || 'draft',
        tags: selectedSermon.tags || [],
      };

      const response = await api.put(`/sermons/${selectedSermon.id}/`, updateData);
      setSermons(sermons.map((s) => (s.id === selectedSermon.id ? response.data : s)));
      setSelectedSermon(response.data);
    } catch (error) {
      console.error('Erro ao atualizar sermão:', error);
      alert('Erro ao atualizar sermão');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!sermonToDelete) return;

    try {
      await api.delete(`/sermons/${sermonToDelete.id}/`);
      const remaining = sermons.filter((s) => s.id !== sermonToDelete.id);
      setSermons(remaining);
      if (selectedSermon?.id === sermonToDelete.id) {
        setSelectedSermon(remaining[0] ?? null);
      }
      setShowDeleteModal(false);
      setSermonToDelete(null);
    } catch (error) {
      console.error('Erro ao excluir sermão:', error);
      alert('Erro ao excluir sermão');
    }
  };

  const handleDuplicate = async (sermon: MockSermon) => {
    try {
      const duplicatedSermon = {
        title: `${sermon.title} (Cópia)`,
        scripture_reference: sermon.scripture_reference,
        sermon_date: new Date().toISOString().split('T')[0],
        content: sermon.content,
        notes: sermon.notes,
        tags: sermon.tags || [],
        status: 'draft',
      };

      const response = await api.post('/sermons/', duplicatedSermon);
      setSermons([response.data, ...sermons]);
      setSelectedSermon(response.data);
    } catch (error) {
      console.error('Erro ao duplicar sermão:', error);
      alert('Erro ao duplicar sermão');
    }
  };

  const resetForm = () => {
    setFormData({ title: '', scripture_reference: '', sermon_date: '', content: '' });
    setErrors({});
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const openNewSermonModal = () => {
    resetForm();
    setShowNewSermonModal(true);
  };

  const openDeleteModal = (sermon: MockSermon) => {
    setSermonToDelete(sermon);
    setShowDeleteModal(true);
  };

  const filteredSermons = sermons.filter(
    (sermon) =>
      sermon.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (sermon.scripture_reference && sermon.scripture_reference.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center bg-bg">
        <div className="text-center">
          <Loader2 className="w-10 h-10 animate-spin text-accent mx-auto mb-3" />
          <p className="text-ink-muted text-sm">Carregando sermões...</p>
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
              <h1 className="text-lg font-semibold text-ink">Editor de Sermões</h1>
              <p className="text-sm text-ink-faint">Crie e organize seus sermões</p>
            </div>
          </div>
          <Button size="sm" onClick={openNewSermonModal}>
            <Plus size={16} />
            Novo Sermão
          </Button>
        </div>
      </header>

      {/* Editor Content with Right Sidebar */}
      <div className="flex-1 flex overflow-hidden">
        {/* Main Editor Area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {selectedSermon ? (
            <SermonEditor
              sermon={selectedSermon}
              onUpdateSermon={(patch) => setSelectedSermon({ ...selectedSermon, ...patch })}
              onSave={handleUpdate}
              submitting={submitting}
            />
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <FileText className="w-14 h-14 text-ink-faint mx-auto mb-4" />
                <p className="text-ink-muted mb-1">Nenhum sermão selecionado</p>
                <p className="text-ink-faint text-sm mb-4">Selecione um sermão da lista ou crie um novo</p>
                <Button onClick={openNewSermonModal}>Criar Primeiro Sermão</Button>
              </div>
            </div>
          )}
        </div>

        {/* Right Sidebar - Sermons List */}
        <aside className="w-80 bg-surface border-l border-border flex flex-col">
          <div className="p-4 border-b border-border">
            <h3 className="text-sm font-semibold text-ink mb-0.5">Meus Sermões</h3>
            <p className="text-sm text-ink-faint">{sermons.length} sermões salvos</p>

            <div className="mt-3 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-ink-faint" size={16} />
              <input
                type="text"
                placeholder="Buscar sermões..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-3 py-2 border border-border rounded-md bg-bg text-sm text-ink placeholder:text-ink-faint focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-3">
            {filteredSermons.length > 0 ? (
              <div className="space-y-2">
                {filteredSermons.map((sermon) => {
                  const wordCount = calculateWordCount(sermon.content);
                  const duration = estimateDuration(wordCount);

                  return (
                    <Card
                      key={sermon.id}
                      hoverable
                      onClick={() => setSelectedSermon(sermon)}
                      className={`p-3 ${selectedSermon?.id === sermon.id ? 'border-accent bg-accent-soft/30' : ''}`}
                    >
                      <div className="flex items-start justify-between mb-1.5">
                        <h4 className="font-medium text-ink text-sm leading-tight flex-1 pr-2">{sermon.title}</h4>
                        <div className="relative group flex-shrink-0">
                          <button className="p-1 hover:bg-surface-hover rounded transition-colors">
                            <MoreVertical size={14} className="text-ink-faint" />
                          </button>
                          <div className="absolute right-0 top-7 bg-surface border border-border rounded-md shadow-lg py-1 hidden group-hover:block z-10 min-w-[120px]">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDuplicate(sermon);
                              }}
                              className="w-full px-3 py-1.5 text-left text-sm text-ink hover:bg-surface-hover flex items-center gap-2"
                            >
                              <Copy size={13} /> Duplicar
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                openDeleteModal(sermon);
                              }}
                              className="w-full px-3 py-1.5 text-left text-sm text-danger hover:bg-danger-soft flex items-center gap-2"
                            >
                              <Trash2 size={13} /> Excluir
                            </button>
                          </div>
                        </div>
                      </div>

                      {sermon.scripture_reference && (
                        <div className="flex items-center gap-1 text-xs text-accent mb-1.5">
                          <Book size={11} />
                          <span>{sermon.scripture_reference}</span>
                        </div>
                      )}

                      <div className="flex items-center gap-2 text-xs text-ink-faint mb-1.5">
                        <span className="flex items-center gap-1">
                          <Calendar size={11} />
                          {new Date(sermon.sermon_date).toLocaleDateString('pt-BR')}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Clock size={11} />
                          {duration}
                        </span>
                      </div>

                      <div className="flex items-center justify-between text-xs text-ink-faint pt-2 border-t border-border">
                        <span>{wordCount} palavras</span>
                        <span>{new Date(sermon.updated_at).toLocaleDateString('pt-BR')}</span>
                      </div>
                    </Card>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-8">
                <FileText className="w-10 h-10 text-ink-faint mx-auto mb-3" />
                <p className="text-ink-muted text-sm">
                  {searchTerm ? 'Nenhum sermão encontrado' : 'Nenhum sermão cadastrado'}
                </p>
              </div>
            )}
          </div>
        </aside>
      </div>

      {/* New Sermon Modal */}
      <Modal open={showNewSermonModal} onClose={() => { setShowNewSermonModal(false); resetForm(); }} title="Novo Sermão">
        <form onSubmit={handleCreate} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-ink-muted mb-1.5">Título do Sermão *</label>
            <Input name="title" value={formData.title} onChange={handleInputChange} placeholder="Ex: O Bom Pastor" />
            {errors.title && (
              <p className="text-danger text-sm mt-1 flex items-center gap-1">
                <AlertCircle size={13} /> {errors.title}
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-ink-muted mb-1.5">Referência Bíblica</label>
              <Input name="scripture_reference" value={formData.scripture_reference} onChange={handleInputChange} placeholder="Ex: João 10:11-18" />
            </div>
            <div>
              <label className="block text-sm font-medium text-ink-muted mb-1.5">Data do Sermão</label>
              <Input type="date" name="sermon_date" value={formData.sermon_date} onChange={handleInputChange} />
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <Button type="button" variant="secondary" className="flex-1" onClick={() => { setShowNewSermonModal(false); resetForm(); }} disabled={submitting}>
              Cancelar
            </Button>
            <Button type="submit" className="flex-1" disabled={submitting}>
              {submitting ? <Loader2 className="animate-spin" size={16} /> : <Check size={16} />}
              Criar Sermão
            </Button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal open={showDeleteModal && !!sermonToDelete} onClose={() => setShowDeleteModal(false)} title="Excluir Sermão">
        {sermonToDelete && (
          <>
            <p className="text-ink mb-2">
              Tem certeza que deseja excluir o sermão <strong>"{sermonToDelete.title}"</strong>?
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

export default Sermons;
