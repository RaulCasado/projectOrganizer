import type { Idea } from '../../../shared/types/Idea';
import QuickIdeaCapture from './QuickIdeaCapture';
import IdeaList from './IdeaList';

interface IdeaPanelProps {
    projectId?: string;
    ideas: Idea[];
    onAddIdea: (idea: Omit<Idea, 'id' | 'createdAt'>) => void;
    onUpdateIdea: (idea: Idea) => void;
    onDeleteIdea: (ideaId: string) => void;
    onPromoteToProject?: (idea: Idea) => void;
}

function IdeaPanel({
    projectId,
    ideas,
    onAddIdea,
    onUpdateIdea,
    onDeleteIdea,
    onPromoteToProject
}: IdeaPanelProps) {
    const filteredIdeas = projectId 
        ? ideas.filter(idea => idea.projectId === projectId)
        : ideas.filter(idea => !idea.projectId);

    const handleAddIdea = (ideaData: Omit<Idea, 'id' | 'createdAt' | 'projectId'>) => {
        onAddIdea({
            ...ideaData,
            projectId,
        });
    };

    const inboxCount = filteredIdeas.filter(idea => idea.status === 'inbox').length;
    const processingCount = filteredIdeas.filter(idea => idea.status === 'processing').length;
    const promotedCount = filteredIdeas.filter(idea => idea.status === 'promoted').length;
    const archivedCount = filteredIdeas.filter(idea => idea.status === 'archived').length;

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
                        {inboxCount > 0 && (
                            <span>
                                📥 {inboxCount}
                            </span>
                        )}
                        {processingCount > 0 && (
                            <span>
                                ⚙️ {processingCount}
                            </span>
                        )}
                        {promotedCount > 0 && (
                            <span>
                                🚀 {promotedCount}
                            </span>
                        )}
                        {archivedCount > 0 && (
                            <span>
                                📦 {archivedCount}
                            </span>
                        )}
                    </div>
                    
                    <span>
                        {filteredIdeas.length}
                    </span>
                </div>
            </div>

            <QuickIdeaCapture onAddIdea={handleAddIdea} />

            <IdeaList 
                ideas={filteredIdeas}
                onUpdateIdea={onUpdateIdea}
                onDeleteIdea={onDeleteIdea}
                onPromoteToProject={projectId ? undefined : onPromoteToProject}
                showPromoteButton={!projectId}
            />

            {filteredIdeas.length > 0 && (
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
