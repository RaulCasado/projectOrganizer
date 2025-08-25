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
        <div style={{
            backgroundColor: '#ffffff',
            border: '1px solid #dee2e6',
            borderRadius: '8px',
            padding: '20px',
            margin: '20px 0'
        }}>
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '20px',
                paddingBottom: '12px',
                borderBottom: '2px solid #f8f9fa'
            }}>
                <div>
                    <h3 style={{
                        margin: '0 0 4px 0',
                        fontSize: '20px',
                        color: '#495057'
                    }}>
                        {projectId ? '💡 Ideas del Proyecto' : '🧠 Lluvia de Ideas'}
                    </h3>
                    <p style={{
                        margin: 0,
                        fontSize: '14px',
                        color: '#6c757d'
                    }}>
                        {projectId 
                            ? 'Ideas específicas para este proyecto'
                            : 'Captura y organiza todas tus ideas'
                        }
                    </p>
                </div>
                
                <div style={{
                    display: 'flex',
                    gap: '12px',
                    alignItems: 'center'
                }}>
                    <div style={{
                        display: 'flex',
                        gap: '8px',
                        fontSize: '12px'
                    }}>
                        {inboxCount > 0 && (
                            <span style={{
                                backgroundColor: '#e3f2fd',
                                color: '#1976d2',
                                padding: '2px 6px',
                                borderRadius: '12px',
                                fontWeight: 'bold'
                            }}>
                                📥 {inboxCount}
                            </span>
                        )}
                        {processingCount > 0 && (
                            <span style={{
                                backgroundColor: '#fff3e0',
                                color: '#f57c00',
                                padding: '2px 6px',
                                borderRadius: '12px',
                                fontWeight: 'bold'
                            }}>
                                ⚙️ {processingCount}
                            </span>
                        )}
                        {promotedCount > 0 && (
                            <span style={{
                                backgroundColor: '#e8f5e8',
                                color: '#2e7d32',
                                padding: '2px 6px',
                                borderRadius: '12px',
                                fontWeight: 'bold'
                            }}>
                                🚀 {promotedCount}
                            </span>
                        )}
                        {archivedCount > 0 && (
                            <span style={{
                                backgroundColor: '#f3e5f5',
                                color: '#7b1fa2',
                                padding: '2px 6px',
                                borderRadius: '12px',
                                fontWeight: 'bold'
                            }}>
                                📦 {archivedCount}
                            </span>
                        )}
                    </div>
                    
                    <span style={{
                        fontSize: '18px',
                        fontWeight: 'bold',
                        color: '#495057',
                        backgroundColor: '#f8f9fa',
                        padding: '4px 8px',
                        borderRadius: '16px',
                        minWidth: '30px',
                        textAlign: 'center'
                    }}>
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
                <div style={{
                    marginTop: '20px',
                    paddingTop: '12px',
                    borderTop: '1px solid #dee2e6',
                    fontSize: '12px',
                    color: '#6c757d',
                    textAlign: 'center'
                }}>
                    {projectId ? (
                        <p style={{ margin: 0 }}>
                            💡 <strong>Tip:</strong> Estas ideas te ayudarán a refinar y mejorar tu proyecto
                        </p>
                    ) : (
                        <p style={{ margin: 0 }}>
                            🚀 <strong>Tip:</strong> Convierte tus mejores ideas en proyectos para empezar a trabajar en ellas
                        </p>
                    )}
                </div>
            )}
        </div>
    );
}

export default IdeaPanel;
