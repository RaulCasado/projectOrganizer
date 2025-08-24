import React, { useState } from 'react';
import type { Idea } from '../types/Idea';

interface QuickIdeaCaptureProps {
    onAddIdea: (idea: Omit<Idea, 'id' | 'createdAt' | 'projectId'>) => void;
}

function QuickIdeaCapture({ onAddIdea }: QuickIdeaCaptureProps) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium');
    const [category, setCategory] = useState<'feature' | 'project' | 'improvement' | 'research' | 'other'>('feature');
    const [tags, setTags] = useState('');
    const [isExpanded, setIsExpanded] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim()) return;
        const newIdea = {
            title: title.trim(),
            description: description.trim(),
            priority,
            category,
            status: 'inbox' as const,
            tags: tags.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0),
        };
        onAddIdea(newIdea);
        setTitle('');
        setDescription('');
        setPriority('medium');
        setCategory('feature');
        setTags('');
        setIsExpanded(false);
    };

    const handleQuickAdd = () => {
        if (!title.trim()) return;
        const quickIdea = {
            title: title.trim(),
            description: '',
            priority: 'medium' as const,
            category: 'feature' as const,
            status: 'inbox' as const,
            tags: [],
        };
        onAddIdea(quickIdea);
        setTitle('');
    };

    return (
        <div>
            <div>
                <input
                    type="text"
                    placeholder="💡 Captura rápida de idea..."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' && !isExpanded) {
                            handleQuickAdd();
                        }
                    }}
                />
                <button
                    type="button"
                    onClick={handleQuickAdd}
                    disabled={!title.trim()}
                >
                    ➕
                </button>
                <button
                    type="button"
                    onClick={() => setIsExpanded(!isExpanded)}
                >
                    {isExpanded ? '📝' : '⚙️'}
                </button>
            </div>

            {isExpanded && (
                <form onSubmit={handleSubmit}>
                    <div>
                        <div>
                            <label>
                                Prioridad:
                            </label>
                            <select
                                value={priority}
                                onChange={(e) => setPriority(e.target.value as 'low' | 'medium' | 'high')}
                            >
                                <option value="low">🟢 Baja</option>
                                <option value="medium">🟡 Media</option>
                                <option value="high">🔴 Alta</option>
                            </select>
                        </div>

                        <div>
                            <label>
                                Categoría:
                            </label>
                            <select
                                value={category}
                                onChange={(e) => setCategory(e.target.value as 'feature' | 'project' | 'improvement' | 'research' | 'other')}
                            >
                                <option value="feature">✨ Feature</option>
                                <option value="project">🚀 Proyecto</option>
                                <option value="improvement">⚡ Mejora</option>
                                <option value="research">🔍 Investigación</option>
                                <option value="other">📝 Otro</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label>
                            Descripción:
                        </label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Describe tu idea con más detalle..."
                            rows={3}
                        />
                    </div>

                    <div>
                        <label>
                            Tags (separados por comas):
                        </label>
                        <input
                            type="text"
                            value={tags}
                            onChange={(e) => setTags(e.target.value)}
                            placeholder="frontend, ui, mejora, ..."
                        />
                    </div>

                    <div>
                        <button
                            type="button"
                            onClick={() => setIsExpanded(false)}
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            disabled={!title.trim()}
                        >
                            Crear Idea
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
}

export default QuickIdeaCapture;
