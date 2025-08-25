import { useState } from 'react';
import { Link } from 'react-router-dom';
import type { Idea } from '../../../shared/types/Idea';
import IdeaPanel from './IdeaPanel';

interface IdeasMainViewProps {
    ideas: Idea[];
    onAddIdea: (idea: Omit<Idea, 'id' | 'createdAt'>) => void;
    onUpdateIdea: (idea: Idea) => void;
    onDeleteIdea: (ideaId: string) => void;
    onPromoteToProject: (idea: Idea) => void;
}

function IdeasMainView({
    ideas,
    onAddIdea,
    onUpdateIdea,
    onDeleteIdea,
    onPromoteToProject
}: IdeasMainViewProps) {
    const [filter, setFilter] = useState<'all' | 'inbox' | 'processing' | 'promoted' | 'archived'>('all');
    const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'priority' | 'title'>('newest');

    const generalIdeas = ideas.filter(idea => !idea.projectId);

    const filteredIdeas = generalIdeas.filter(idea => {
        if (filter === 'all') return true;
        return idea.status === filter;
    });

    const sortedIdeas = [...filteredIdeas].sort((a, b) => {
        switch (sortBy) {
            case 'newest':
                return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
            case 'oldest':
                return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
            case 'priority': {
                const priorityOrder = { high: 3, medium: 2, low: 1 };
                return priorityOrder[b.priority] - priorityOrder[a.priority];
            }
            case 'title':
                return a.title.localeCompare(b.title);
            default:
                return 0;
        }
    });

    const stats = {
        total: generalIdeas.length,
        inbox: generalIdeas.filter(idea => idea.status === 'inbox').length,
        processing: generalIdeas.filter(idea => idea.status === 'processing').length,
        promoted: generalIdeas.filter(idea => idea.status === 'promoted').length,
        archived: generalIdeas.filter(idea => idea.status === 'archived').length,
    };

    return (
        <div style={{
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '20px'
        }}>
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '20px'
            }}>
                <div>
                    <h1 style={{
                        margin: '0 0 8px 0',
                        fontSize: '28px',
                        color: '#495057'
                    }}>
                        🧠 Lluvia de Ideas
                    </h1>
                    <p style={{
                        margin: 0,
                        fontSize: '16px',
                        color: '#6c757d'
                    }}>
                        Captura, organiza y convierte tus ideas en proyectos
                    </p>
                </div>

                <div style={{
                    display: 'flex',
                    gap: '12px',
                    alignItems: 'center'
                }}>
                    <Link
                        to="/"
                        style={{
                            padding: '8px 16px',
                            backgroundColor: '#6c757d',
                            color: 'white',
                            textDecoration: 'none',
                            borderRadius: '4px',
                            fontSize: '14px'
                        }}
                    >
                        ← Volver a Proyectos
                    </Link>
                    <Link
                        to="/dashboard"
                        style={{
                            padding: '8px 16px',
                            backgroundColor: '#17a2b8',
                            color: 'white',
                            textDecoration: 'none',
                            borderRadius: '4px',
                            fontSize: '14px'
                        }}
                    >
                        📊 Dashboard
                    </Link>
                </div>
            </div>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
                gap: '12px',
                marginBottom: '20px'
            }}>
                <div style={{
                    backgroundColor: '#f8f9fa',
                    border: '1px solid #dee2e6',
                    borderRadius: '8px',
                    padding: '16px',
                    textAlign: 'center'
                }}>
                    <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#495057' }}>
                        {stats.total}
                    </div>
                    <div style={{ fontSize: '12px', color: '#6c757d' }}>
                        Total Ideas
                    </div>
                </div>
                <div style={{
                    backgroundColor: '#e3f2fd',
                    border: '1px solid #90caf9',
                    borderRadius: '8px',
                    padding: '16px',
                    textAlign: 'center'
                }}>
                    <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#1976d2' }}>
                        {stats.inbox}
                    </div>
                    <div style={{ fontSize: '12px', color: '#1976d2' }}>
                        📥 Inbox
                    </div>
                </div>
                <div style={{
                    backgroundColor: '#fff3e0',
                    border: '1px solid #ffcc02',
                    borderRadius: '8px',
                    padding: '16px',
                    textAlign: 'center'
                }}>
                    <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#f57c00' }}>
                        {stats.processing}
                    </div>
                    <div style={{ fontSize: '12px', color: '#f57c00' }}>
                        ⚙️ Procesando
                    </div>
                </div>
                <div style={{
                    backgroundColor: '#e8f5e8',
                    border: '1px solid #81c784',
                    borderRadius: '8px',
                    padding: '16px',
                    textAlign: 'center'
                }}>
                    <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#2e7d32' }}>
                        {stats.promoted}
                    </div>
                    <div style={{ fontSize: '12px', color: '#2e7d32' }}>
                        🚀 Promovidas
                    </div>
                </div>
                <div style={{
                    backgroundColor: '#f3e5f5',
                    border: '1px solid #ce93d8',
                    borderRadius: '8px',
                    padding: '16px',
                    textAlign: 'center'
                }}>
                    <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#7b1fa2' }}>
                        {stats.archived}
                    </div>
                    <div style={{ fontSize: '12px', color: '#7b1fa2' }}>
                        📦 Archivadas
                    </div>
                </div>
            </div>

            <div style={{
                display: 'flex',
                gap: '12px',
                alignItems: 'center',
                marginBottom: '20px',
                padding: '16px',
                backgroundColor: '#f8f9fa',
                borderRadius: '8px',
                border: '1px solid #dee2e6'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <label style={{ fontSize: '14px', fontWeight: 'bold', color: '#495057' }}>
                        Filtrar:
                    </label>
                    <select
                        value={filter}
                        onChange={(e) => setFilter(e.target.value as 'all' | 'inbox' | 'processing' | 'promoted' | 'archived')}
                        style={{
                            padding: '6px 10px',
                            border: '1px solid #ccc',
                            borderRadius: '4px',
                            fontSize: '14px'
                        }}
                    >
                        <option value="all">🔍 Todas ({stats.total})</option>
                        <option value="inbox">📥 Inbox ({stats.inbox})</option>
                        <option value="processing">⚙️ Procesando ({stats.processing})</option>
                        <option value="promoted">🚀 Promovidas ({stats.promoted})</option>
                        <option value="archived">📦 Archivadas ({stats.archived})</option>
                    </select>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <label style={{ fontSize: '14px', fontWeight: 'bold', color: '#495057' }}>
                        Ordenar:
                    </label>
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value as 'newest' | 'oldest' | 'priority' | 'title')}
                        style={{
                            padding: '6px 10px',
                            border: '1px solid #ccc',
                            borderRadius: '4px',
                            fontSize: '14px'
                        }}
                    >
                        <option value="newest">📅 Más recientes</option>
                        <option value="oldest">🕰️ Más antiguas</option>
                        <option value="priority">🔥 Por prioridad</option>
                        <option value="title">🔤 Por título</option>
                    </select>
                </div>

                <div style={{ marginLeft: 'auto', fontSize: '14px', color: '#6c757d' }}>
                    Mostrando {sortedIdeas.length} de {stats.total} ideas
                </div>
            </div>

            <IdeaPanel
                ideas={sortedIdeas}
                onAddIdea={onAddIdea}
                onUpdateIdea={onUpdateIdea}
                onDeleteIdea={onDeleteIdea}
                onPromoteToProject={onPromoteToProject}
            />
        </div>
    );
}

export default IdeasMainView;
