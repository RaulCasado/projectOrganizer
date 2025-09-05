import type { Idea } from '../../../shared';
import { EmptyIdeas, IdeaItem, IdeaEditForm } from './';
import { useIdeaList } from '../hooks/useIdeaList';

interface IdeaListProps {
  ideas: Idea[];
  onUpdateIdea: (idea: Idea) => void;
  onDeleteIdea: (ideaId: string) => void;
  onPromoteToProject?: (idea: Idea) => void;
  showPromoteButton: boolean;
  onTagClick?: (tag: string) => void;
}

function IdeaList({
  ideas,
  onUpdateIdea,
  onDeleteIdea,
  onPromoteToProject,
  showPromoteButton,
  onTagClick,
}: IdeaListProps) {
  const {
    expandedIdea,
    setExpandedIdea,
    editingIdea,
    editForm,
    setEditForm,
    handleEditStart,
    handleEditSave,
    handleEditCancel,
    handleStatusChange,
    getStatusEmoji,
    getCategoryEmoji,
  } = useIdeaList({ onUpdateIdea });

  if (ideas.length === 0) {
    return <EmptyIdeas />;
  }

  return (
    <div>
      {ideas.map(idea => (
        <div key={idea.id}>
          {editingIdea === idea.id ? (
            <IdeaEditForm
              editForm={editForm}
              setEditForm={setEditForm}
              onSave={handleEditSave}
              onCancel={handleEditCancel}
            />
          ) : (
            <IdeaItem
              idea={idea}
              isExpanded={expandedIdea === idea.id}
              onToggleExpand={() =>
                setExpandedIdea(expandedIdea === idea.id ? null : idea.id)
              }
              onEditStart={() => handleEditStart(idea)}
              onDelete={() => onDeleteIdea(idea.id)}
              onStatusChange={newStatus => handleStatusChange(idea, newStatus)}
              onPromote={onPromoteToProject}
              showPromoteButton={showPromoteButton}
              getStatusEmoji={getStatusEmoji}
              getCategoryEmoji={getCategoryEmoji}
              onTagClick={onTagClick}
            />
          )}
        </div>
      ))}
    </div>
  );
}

export default IdeaList;
