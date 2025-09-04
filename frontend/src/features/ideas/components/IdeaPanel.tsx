import type { Idea } from '../../../shared/types/Idea';
import QuickIdeaCapture from './QuickIdeaCapture';
import IdeaList from './IdeaList';
import ProjectIdeasFilters from './ProjectIdeasFilters';
import { useIdeasWithProjects } from '../../../contexts';
import { useProjectIdeasFilters } from '../hooks/useProjectIdeasFilters';

interface IdeaPanelProps {
    projectId?: string;
    ideas?: Idea[];
}

function IdeaPanel({ projectId, ideas: ideasProp }: IdeaPanelProps) {
    const { ideas: allIdeas, addIdea, updateIdea, deleteIdea, promoteToProject } = useIdeasWithProjects();
    
    const ideas = ideasProp || allIdeas;
    
    const projectIdeas = projectId 
        ? ideas.filter(idea => idea.projectId === projectId)
        : ideas.filter(idea => !idea.projectId);

    const {
        filter,
        setFilter,
        sortBy,
        setSortBy,
        sortedIdeas,
        stats,
        filteredCount
    } = useProjectIdeasFilters({ ideas: projectIdeas });

    const handleAddIdea = (ideaData: Omit<Idea, 'id' | 'createdAt' | 'projectId'>) => {
        addIdea({
            ...ideaData,
            projectId,
        });
    };

    return (
        <div>
            <div>
                <div>
                    <h3>
                        {projectId ? '💡 Ideas del Proyecto' : '🧠 Lluvia de Ideas'}
                    </h3>
                    <p>
                        {projectId 
                            ? 'Ideas específicas para este proyecto'
                            : 'Captura y organiza todas tus ideas'
                        }
                    </p>
                </div>
                
                <div>
                    <div>
                        {stats.inbox > 0 && (
                            <span>
                                📥 {stats.inbox}
                            </span>
                        )}
                        {stats.processing > 0 && (
                            <span>
                                ⚙️ {stats.processing}
                            </span>
                        )}
                        {stats.promoted > 0 && (
                            <span>
                                🚀 {stats.promoted}
                            </span>
                        )}
                        {stats.archived > 0 && (
                            <span>
                                📦 {stats.archived}
                            </span>
                        )}
                    </div>
                    
                    <span>
                        {stats.total}
                    </span>
                </div>
            </div>

            <QuickIdeaCapture onAddIdea={handleAddIdea} />

            <ProjectIdeasFilters
                filter={filter}
                setFilter={setFilter}
                sortBy={sortBy}
                setSortBy={setSortBy}
                stats={stats}
                filteredCount={filteredCount}
            />

            <IdeaList 
                ideas={sortedIdeas}
                onUpdateIdea={updateIdea}
                onDeleteIdea={deleteIdea}
                onPromoteToProject={projectId ? undefined : promoteToProject}
                showPromoteButton={!projectId}
            />

            {sortedIdeas.length > 0 && (
                <div>
                    {projectId ? (
                        <p>
                            💡 <strong>Tip:</strong> Estas ideas te ayudarán a refinar y mejorar tu proyecto
                        </p>
                    ) : (
                        <p>
                            🚀 <strong>Tip:</strong> Convierte tus mejores ideas en proyectos para empezar a trabajar en ellas
                        </p>
                    )}
                </div>
            )}
        </div>
    );
}

export default IdeaPanel;
