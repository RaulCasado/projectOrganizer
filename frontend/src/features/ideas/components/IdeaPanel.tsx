import type { Idea } from '../../../shared/types/Idea';
import QuickIdeaCapture from './QuickIdeaCapture';
import IdeaList from './IdeaList';
import ProjectIdeasFilters from './ProjectIdeasFilters';
import { useIdeasWithProjects, useIdeasMainViewContext } from '../../../contexts';
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

    let mainViewContext = null;
    try {
        const contextValue = useIdeasMainViewContext();
        mainViewContext = !projectId ? contextValue : null;
    } catch {
        mainViewContext = null;
    }

    const localFilters = useProjectIdeasFilters({ ideas: projectIdeas });

    // Choose which filters to use
    const filters = mainViewContext || localFilters;

    const handleAddIdea = (ideaData: Omit<Idea, 'id' | 'createdAt' | 'projectId'>) => {
        addIdea({
            ...ideaData,
            projectId,
        });
    };

    const handleTagClick = (tag: string) => {
        filters.setSelectedTag(filters.selectedTag === tag ? null : tag);
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
                        {filters.stats.inbox > 0 && (
                            <span>
                                📥 {filters.stats.inbox}
                            </span>
                        )}
                        {filters.stats.processing > 0 && (
                            <span>
                                ⚙️ {filters.stats.processing}
                            </span>
                        )}
                        {filters.stats.promoted > 0 && (
                            <span>
                                🚀 {filters.stats.promoted}
                            </span>
                        )}
                        {filters.stats.archived > 0 && (
                            <span>
                                📦 {filters.stats.archived}
                            </span>
                        )}
                    </div>
                    
                    <span>
                        {filters.stats.total}
                    </span>
                </div>
            </div>

            <QuickIdeaCapture onAddIdea={handleAddIdea} />

            <ProjectIdeasFilters
                filter={filters.filter}
                setFilter={filters.setFilter}
                sortBy={filters.sortBy}
                setSortBy={filters.setSortBy}
                selectedTag={filters.selectedTag}
                setSelectedTag={filters.setSelectedTag}
                availableTags={filters.availableTags}
                stats={filters.stats}
                filteredCount={filters.filteredCount}
            />

            <IdeaList 
                ideas={filters.sortedIdeas}
                onUpdateIdea={updateIdea}
                onDeleteIdea={deleteIdea}
                onPromoteToProject={projectId ? undefined : promoteToProject}
                showPromoteButton={!projectId}
                onTagClick={handleTagClick}
            />

            {filters.sortedIdeas.length > 0 && (
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
