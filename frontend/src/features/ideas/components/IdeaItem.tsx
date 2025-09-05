import type { Idea } from '../../../shared/types/Idea';
import { DateUtils, useNotification } from '../../../shared';

interface IdeaItemProps {
  idea: Idea;
  isExpanded: boolean;
  onToggleExpand: () => void;
  onEditStart: () => void;
  onDelete: () => void;
  onStatusChange: (newStatus: Idea['status']) => void;
  onPromote?: (idea: Idea) => void;
  showPromoteButton: boolean;
  getStatusEmoji: (status: Idea['status']) => string;
  getCategoryEmoji: (category: Idea['category']) => string;
  onTagClick?: (tag: string) => void;
}

function IdeaItem({
  idea,
  isExpanded,
  onToggleExpand,
  onEditStart,
  onDelete,
  onStatusChange,
  onPromote,
  showPromoteButton,
  getStatusEmoji,
  getCategoryEmoji,
  onTagClick,
}: IdeaItemProps) {
  const { confirmDelete } = useNotification();

  const handleDeleteIdea = async () => {
    try {
      const confirmed = await confirmDelete(
        `¿Eliminar la idea "${idea.title}"?`,
        'Esta acción no se puede deshacer'
      );

      if (confirmed) {
        onDelete();
      }
    } catch (error) {
      console.error('Error deleting idea:', error);
    }
  };

  const handlePromoteIdea = async () => {
    if (!onPromote) return;

    try {
      const confirmed = await confirmDelete(
        `¿Convertir "${idea.title}" en proyecto?`,
        'Esta acción creará un nuevo proyecto y cambiará el estado de la idea'
      );

      if (confirmed) {
        onPromote(idea);
      }
    } catch (error) {
      console.error('Error promoting idea:', error);
    }
  };

  const handleStatusChange = async (newStatus: Idea['status']) => {
    if (newStatus === 'promoted' && onPromote && showPromoteButton) {
      const confirmed = await confirmDelete(
        `¿Convertir "${idea.title}" en proyecto?`,
        'Esta acción creará un nuevo proyecto y cambiará el estado de la idea'
      );

      if (confirmed) {
        onPromote(idea);
      }
    } else {
      onStatusChange(newStatus);
    }
  };
  return (
    <div>
      <div>
        <div>
          <h4>
            {getCategoryEmoji(idea.category)}
            {idea.title}
          </h4>
          <div>
            <span>{idea.priority.toUpperCase()}</span>
            <span>
              {getStatusEmoji(idea.status)} {idea.status}
            </span>
            <span>{DateUtils.formatShort(idea.createdAt)}</span>
          </div>
        </div>

        <div>
          <button onClick={onToggleExpand}>{isExpanded ? '▲' : '▼'}</button>
          <button onClick={onEditStart}>✏️</button>
          <button onClick={handleDeleteIdea} title="Eliminar idea">
            🗑️
          </button>
        </div>
      </div>

      {idea.description && (
        <p>
          {isExpanded
            ? idea.description
            : `${idea.description.substring(0, 100)}${idea.description.length > 100 ? '...' : ''}`}
        </p>
      )}

      {idea.tags.length > 0 && (
        <div>
          {idea.tags.map((tag, index) => (
            <button
              key={index}
              onClick={() => onTagClick?.(tag)}
              title={`Filtrar por ${tag}`}
            >
              🏷️ {tag}
            </button>
          ))}
        </div>
      )}

      {isExpanded && (
        <div>
          <div>
            <label>Estado:</label>
            <select
              value={idea.status}
              onChange={e =>
                handleStatusChange(e.target.value as Idea['status'])
              }
            >
              <option value="inbox">📥 Inbox</option>
              <option value="processing">⚙️ Procesando</option>
              <option value="promoted">🚀 Promovida</option>
              <option value="archived">📦 Archivada</option>
            </select>
          </div>

          {showPromoteButton && onPromote && idea.status !== 'promoted' && (
            <button onClick={handlePromoteIdea}>
              🚀 Convertir en Proyecto
            </button>
          )}

          {idea.status === 'promoted' && idea.promotedToProjectId && (
            <div>🚀 Esta idea fue convertida en proyecto</div>
          )}
        </div>
      )}
    </div>
  );
}

export default IdeaItem;
