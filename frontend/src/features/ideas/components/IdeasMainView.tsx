import { useState } from 'react';
import { Link } from 'react-router-dom';
import type { Idea } from '../../../shared/types/Idea';
import IdeaPanel from './IdeaPanel';
import { DateUtils } from '../../../shared';

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

    const sortedIdeas = (() => {
        const sorted = [...filteredIdeas];
        
        switch (sortBy) {
            case 'newest':
                return DateUtils.sortByDate(sorted, 'createdAt', 'desc');
            case 'oldest':
                return DateUtils.sortByDate(sorted, 'createdAt', 'asc');
            case 'priority': {
                const priorityOrder = { high: 3, medium: 2, low: 1 };
                return sorted.sort((a, b) => priorityOrder[b.priority] - priorityOrder[a.priority]);
            }
            case 'title':
                return sorted.sort((a, b) => a.title.localeCompare(b.title));
            default:
                return sorted;
        }
    })();

    const stats = {
        total: generalIdeas.length,
        inbox: generalIdeas.filter(idea => idea.status === 'inbox').length,
        processing: generalIdeas.filter(idea => idea.status === 'processing').length,
        promoted: generalIdeas.filter(idea => idea.status === 'promoted').length,
        archived: generalIdeas.filter(idea => idea.status === 'archived').length,
    };

    return (
        <div>
            <div>
                <div>
                    <h1>
                        🧠 Lluvia de Ideas
                    </h1>
                    <p>
                        Captura, organiza y convierte tus ideas en proyectos
                    </p>
                </div>

                <div>
                    <Link
                        to="/"
                    >
                        ← Volver a Proyectos
                    </Link>
                    <Link
                        to="/dashboard"
                    >
                        📊 Dashboard
                    </Link>
                </div>
            </div>

            <div>
                <div>
                    <div>
                        {stats.total}
                    </div>
                    <div>
                        Total Ideas
                    </div>
                </div>
                <div>
                    <div>
                        {stats.inbox}
                    </div>
                    <div>
                        📥 Inbox
                    </div>
                </div>
                <div>
                    <div>
                        {stats.processing}
                    </div>
                    <div>
                        ⚙️ Procesando
                    </div>
                </div>
                <div>
                    <div>
                        {stats.promoted}
                    </div>
                    <div>
                        🚀 Promovidas
                    </div>
                </div>
                <div>
                    <div>
                        {stats.archived}
                    </div>
                    <div>
                        📦 Archivadas
                    </div>
                </div>
            </div>

            <div>
                <div>
                    <label>
                        Filtrar:
                    </label>
                    <select
                        value={filter}
                        onChange={(e) => setFilter(e.target.value as 'all' | 'inbox' | 'processing' | 'promoted' | 'archived')}
                    >
                        <option value="all">🔍 Todas ({stats.total})</option>
                        <option value="inbox">📥 Inbox ({stats.inbox})</option>
                        <option value="processing">⚙️ Procesando ({stats.processing})</option>
                        <option value="promoted">🚀 Promovidas ({stats.promoted})</option>
                        <option value="archived">📦 Archivadas ({stats.archived})</option>
                    </select>
                </div>

                <div>
                    <label>
                        Ordenar:
                    </label>
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value as 'newest' | 'oldest' | 'priority' | 'title')}
                    >
                        <option value="newest">📅 Más recientes</option>
                        <option value="oldest">🕰️ Más antiguas</option>
                        <option value="priority">🔥 Por prioridad</option>
                        <option value="title">🔤 Por título</option>
                    </select>
                </div>

                <div>
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
