import { useState } from 'react';
import type { Idea } from '../types/Idea';

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
            <div style={{
                textAlign: 'center',
                padding: '40px',
                color: '#6c757d',
                backgroundColor: '#000000ff',
                borderRadius: '8px',
                border: '2px dashed #dee2e6'
            }}>
                <div style={{ fontSize: '48px', marginBottom: '16px' }}>💡</div>
                <h3 style={{ margin: '0 0 8px 0' }}>No hay ideas aún</h3>
                <p style={{ margin: 0 }}>¡Captura tu primera idea arriba!</p>
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
                                    style={{ padding: '4px', borderRadius: '4px', border: '1px solid #ccc' }}
                                >
                                    <option value="low">🟢 Baja</option>
                                    <option value="medium">🟡 Media</option>
                                    <option value="high">🔴 Alta</option>
                                </select>
                                <select
                                    value={editForm.category || 'feature'}
                                    onChange={(e) => setEditForm({ ...editForm, category: e.target.value as Idea['category'] })}
                                    style={{ padding: '4px', borderRadius: '4px', border: '1px solid #ccc' }}
                                >
                                    <option value="feature">✨ Feature</option>
                                    <option value="project">🚀 Proyecto</option>
                                    <option value="improvement">⚡ Mejora</option>
                                    <option value="research">🔍 Investigación</option>
                                    <option value="other">📝 Otro</option>
                                </select>
                            </div>
                            <div style={{ display: 'flex', gap: '8px' }}>
                                <button
                                    onClick={handleEditSave}
                                    style={{
                                        padding: '6px 12px',
                                        backgroundColor: '#28a745',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '4px',
                                        cursor: 'pointer'
                                    }}
                                >
                                    Guardar
                                </button>
                                <button
                                    onClick={handleEditCancel}
                                    style={{
                                        padding: '6px 12px',
                                        backgroundColor: '#6c757d',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '4px',
                                        cursor: 'pointer'
                                    }}
                                >
                                    Cancelar
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div>
                            <div style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'flex-start',
                                marginBottom: '8px'
                            }}>
                                <div style={{ flex: 1 }}>
                                    <h4 style={{
                                        margin: '0 0 4px 0',
                                        fontSize: '16px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '8px'
                                    }}>
                                        {getCategoryEmoji(idea.category)}
                                        {idea.title}
                                    </h4>
                                    <div style={{
                                        display: 'flex',
                                        gap: '8px',
                                        alignItems: 'center',
                                        fontSize: '12px'
                                    }}>
                                        <span style={{
                                            color: getPriorityColor(idea.priority),
                                            fontWeight: 'bold'
                                        }}>
                                            {idea.priority.toUpperCase()}
                                        </span>
                                        <span>{getStatusEmoji(idea.status)} {idea.status}</span>
                                        <span style={{ color: '#6c757d' }}>
                                            {new Date(idea.createdAt).toLocaleDateString()}
                                        </span>
                                    </div>
                                </div>

                                <div style={{ display: 'flex', gap: '4px' }}>
                                    <button
                                        onClick={() => setExpandedIdea(expandedIdea === idea.id ? null : idea.id)}
                                        style={{
                                            padding: '4px 8px',
                                            backgroundColor: '#000000ff',
                                            border: '1px solid #dee2e6',
                                            borderRadius: '4px',
                                            cursor: 'pointer',
                                            fontSize: '12px'
                                        }}
                                    >
                                        {expandedIdea === idea.id ? '▲' : '▼'}
                                    </button>
                                    <button
                                        onClick={() => handleEditStart(idea)}
                                        style={{
                                            padding: '4px 8px',
                                            backgroundColor: '#ffc107',
                                            color: 'white',
                                            border: 'none',
                                            borderRadius: '4px',
                                            cursor: 'pointer',
                                            fontSize: '12px'
                                        }}
                                    >
                                        ✏️
                                    </button>
                                    <button
                                        onClick={() => onDeleteIdea(idea.id)}
                                        style={{
                                            padding: '4px 8px',
                                            backgroundColor: '#dc3545',
                                            color: 'white',
                                            border: 'none',
                                            borderRadius: '4px',
                                            cursor: 'pointer',
                                            fontSize: '12px'
                                        }}
                                    >
                                        🗑️
                                    </button>
                                </div>
                            </div>

                            {idea.description && (
                                <p style={{
                                    margin: '8px 0',
                                    color: '#495057',
                                    fontSize: '14px',
                                    lineHeight: '1.4'
                                }}>
                                    {expandedIdea === idea.id 
                                        ? idea.description 
                                        : `${idea.description.substring(0, 100)}${idea.description.length > 100 ? '...' : ''}`
                                    }
                                </p>
                            )}

                            {idea.tags.length > 0 && (
                                <div style={{ marginBottom: '8px' }}>
                                    {idea.tags.map((tag, index) => (
                                        <span
                                            key={index}
                                            style={{
                                                display: 'inline-block',
                                                backgroundColor: '#000000ff',
                                                color: '#495057',
                                                padding: '2px 6px',
                                                borderRadius: '12px',
                                                fontSize: '11px',
                                                marginRight: '4px',
                                                marginBottom: '4px'
                                            }}
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            )}

                            {expandedIdea === idea.id && (
                                <div style={{
                                    borderTop: '1px solid #dee2e6',
                                    paddingTop: '12px',
                                    marginTop: '12px'
                                }}>
                                    <div style={{ marginBottom: '12px' }}>
                                        <label style={{
                                            display: 'block',
                                            marginBottom: '4px',
                                            fontSize: '12px',
                                            fontWeight: 'bold'
                                        }}>
                                            Estado:
                                        </label>
                                        <select
                                            value={idea.status}
                                            onChange={(e) => handleStatusChange(idea, e.target.value as Idea['status'])}
                                            style={{
                                                padding: '4px 8px',
                                                border: '1px solid #ccc',
                                                borderRadius: '4px',
                                                fontSize: '12px'
                                            }}
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
                                            style={{
                                                padding: '8px 16px',
                                                backgroundColor: '#007bff',
                                                color: 'white',
                                                border: 'none',
                                                borderRadius: '4px',
                                                cursor: 'pointer',
                                                fontSize: '14px',
                                                fontWeight: 'bold'
                                            }}
                                        >
                                            🚀 Convertir en Proyecto
                                        </button>
                                    )}

                                    {idea.status === 'promoted' && idea.promotedToProjectId && (
                                        <div style={{
                                            padding: '8px',
                                            backgroundColor: '#000000ff',
                                            border: '1px solid #c3e6cb',
                                            borderRadius: '4px',
                                            fontSize: '12px'
                                        }}>
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
