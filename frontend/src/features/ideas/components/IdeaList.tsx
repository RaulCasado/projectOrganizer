import { useState } from 'react';
import type { Idea } from '../../../shared/types/Idea';

interface IdeaListProps {
    ideas: Idea[];
    onUpdateIdea: (idea: Idea) => void;
    onDeleteIdea: (ideaId: string) => void;
    onPromoteToProject?: (idea: Idea) => void;
    showPromoteButton: boolean;
}

function IdeaList({
    ideas,
    onUpdateIdea,
    onDeleteIdea,
    onPromoteToProject,
    showPromoteButton
}: IdeaListProps) {
    const [expandedIdea, setExpandedIdea] = useState<string | null>(null);
    const [editingIdea, setEditingIdea] = useState<string | null>(null);
    const [editForm, setEditForm] = useState<Partial<Idea>>({});

    const handleEditStart = (idea: Idea) => {
        setEditingIdea(idea.id);
        setEditForm(idea);
    };

    const handleEditSave = () => {
        if (editingIdea && editForm) {
            onUpdateIdea(editForm as Idea);
            setEditingIdea(null);
            setEditForm({});
        }
    };

    const handleEditCancel = () => {
        setEditingIdea(null);
        setEditForm({});
    };

    const handleStatusChange = (idea: Idea, newStatus: Idea['status']) => {
        onUpdateIdea({ ...idea, status: newStatus });
    };

    const getPriorityColor = (priority: Idea['priority']) => {
        switch (priority) {
            case 'high': return '#dc3545';
            case 'medium': return '#ffc107';
            case 'low': return '#28a745';
            default: return '#6c757d';
        }
    };

    const getStatusEmoji = (status: Idea['status']) => {
        switch (status) {
            case 'inbox': return '📥';
            case 'processing': return '⚙️';
            case 'promoted': return '🚀';
            case 'archived': return '📦';
            default: return '📝';
        }
    };

    const getCategoryEmoji = (category: Idea['category']) => {
        switch (category) {
            case 'feature': return '✨';
            case 'project': return '🚀';
            case 'improvement': return '⚡';
            case 'research': return '🔍';
            case 'other': return '📝';
            default: return '💡';
        }
    };

    if (ideas.length === 0) {
        return (
            <div>
                <div>💡</div>
                <h3>No hay ideas aún</h3>
                <p>¡Captura tu primera idea arriba!</p>
            </div>
        );
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {ideas.map((idea) => (
                <div
                    key={idea.id}
                    style={{
                        backgroundColor: 'black',
                        border: '1px solid #dee2e6',
                        borderRadius: '8px',
                        padding: '16px',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                    }}
                >
                    {editingIdea === idea.id ? (
                        <div>
                            <input
                                type="text"
                                value={editForm.title || ''}
                                onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                                style={{
                                    width: '100%',
                                    padding: '8px',
                                    border: '1px solid #ccc',
                                    borderRadius: '4px',
                                    marginBottom: '8px',
                                    fontSize: '16px',
                                    fontWeight: 'bold'
                                }}
                            />
                            <textarea
                                value={editForm.description || ''}
                                onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                                rows={3}
                                style={{
                                    width: '100%',
                                    padding: '8px',
                                    border: '1px solid #ccc',
                                    borderRadius: '4px',
                                    marginBottom: '8px',
                                    resize: 'vertical'
                                }}
                            />
                            <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
                                <select
                                    value={editForm.priority || 'medium'}
                                    onChange={(e) => setEditForm({ ...editForm, priority: e.target.value as Idea['priority'] })}
                                >
                                    <option value="low">🟢 Baja</option>
                                    <option value="medium">🟡 Media</option>
                                    <option value="high">🔴 Alta</option>
                                </select>
                                <select
                                    value={editForm.category || 'feature'}
                                    onChange={(e) => setEditForm({ ...editForm, category: e.target.value as Idea['category'] })}
                                >
                                    <option value="feature">✨ Feature</option>
                                    <option value="project">🚀 Proyecto</option>
                                    <option value="improvement">⚡ Mejora</option>
                                    <option value="research">🔍 Investigación</option>
                                    <option value="other">📝 Otro</option>
                                </select>
                            </div>
                            <div>
                                <button
                                    onClick={handleEditSave}
                                >
                                    Guardar
                                </button>
                                <button
                                    onClick={handleEditCancel}
                                >
                                    Cancelar
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div>
                            <div>
                                <div>
                                    <h4>
                                        {getCategoryEmoji(idea.category)}
                                        {idea.title}
                                    </h4>
                                    <div>
                                        <span>
                                            {idea.priority.toUpperCase()}
                                        </span>
                                        <span>{getStatusEmoji(idea.status)} {idea.status}</span>
                                        <span>
                                            {new Date(idea.createdAt).toLocaleDateString()}
                                        </span>
                                    </div>
                                </div>

                                <div>
                                    <button
                                        onClick={() => setExpandedIdea(expandedIdea === idea.id ? null : idea.id)}
                                    >
                                        {expandedIdea === idea.id ? '▲' : '▼'}
                                    </button>
                                    <button
                                        onClick={() => handleEditStart(idea)}
                                    >
                                        ✏️
                                    </button>
                                    <button
                                        onClick={() => onDeleteIdea(idea.id)}
                                    >
                                        🗑️
                                    </button>
                                </div>
                            </div>

                            {idea.description && (
                                <p>
                                    {expandedIdea === idea.id 
                                        ? idea.description 
                                        : `${idea.description.substring(0, 100)}${idea.description.length > 100 ? '...' : ''}`
                                    }
                                </p>
                            )}

                            {idea.tags.length > 0 && (
                                <div>
                                    {idea.tags.map((tag, index) => (
                                        <span
                                            key={index}
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            )}

                            {expandedIdea === idea.id && (
                                <div>
                                    <div>
                                        <label>
                                            Estado:
                                        </label>
                                        <select
                                            value={idea.status}
                                            onChange={(e) => handleStatusChange(idea, e.target.value as Idea['status'])}
                                        >
                                            <option value="inbox">📥 Inbox</option>
                                            <option value="processing">⚙️ Procesando</option>
                                            <option value="promoted">🚀 Promovida</option>
                                            <option value="archived">📦 Archivada</option>
                                        </select>
                                    </div>

                                    {showPromoteButton && onPromoteToProject && idea.status !== 'promoted' && (
                                        <button
                                            onClick={() => onPromoteToProject(idea)}
                                        >
                                            🚀 Convertir en Proyecto
                                        </button>
                                    )}

                                    {idea.status === 'promoted' && idea.promotedToProjectId && (
                                        <div>
                                            🚀 Esta idea fue convertida en proyecto
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}

export default IdeaList;
