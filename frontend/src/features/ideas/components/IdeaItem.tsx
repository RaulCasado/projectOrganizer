import type { Idea } from '../../../shared/types/Idea';
import { DateUtils } from '../../../shared';

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
}: IdeaItemProps) {
  return (
    <div>
      <div>
        <div>
          <h4>
            {getCategoryEmoji(idea.category)}
            {idea.title}
          </h4>
          <div>
            <span>
              {idea.priority.toUpperCase()}
            </span>
            <span>{getStatusEmoji(idea.status)} {idea.status}</span>
            <span>
              {DateUtils.formatShort(idea.createdAt)}
            </span>
          </div>
        </div>

        <div>
          <button onClick={onToggleExpand}>
            {isExpanded ? '▲' : '▼'}
          </button>
          <button onClick={onEditStart}>
            ✏️
          </button>
          <button onClick={onDelete}>
            🗑️
          </button>
        </div>
      </div>

      {idea.description && (
        <p>
          {isExpanded
            ? idea.description
            : `${idea.description.substring(0, 100)}${idea.description.length > 100 ? '...' : ''}`
          }
        </p>
      )}

      {idea.tags.length > 0 && (
        <div>
          {idea.tags.map((tag, index) => (
            <span key={index}>
              {tag}
            </span>
          ))}
        </div>
      )}

      {isExpanded && (
        <div>
          <div>
            <label>
              Estado:
            </label>
            <select
              value={idea.status}
              onChange={(e) => onStatusChange(e.target.value as Idea['status'])}
            >
              <option value="inbox">📥 Inbox</option>
              <option value="processing">⚙️ Procesando</option>
              <option value="promoted">🚀 Promovida</option>
              <option value="archived">📦 Archivada</option>
            </select>
          </div>

          {showPromoteButton && onPromote && idea.status !== 'promoted' && (
            <button onClick={() => onPromote(idea)}>
              🚀 Convertir en Proyecto
            </button>
          )}

          {idea.status === 'promoted' && idea.promotedToProjectId && (
            <div>
              🚀 Esta idea fue convertida en proyecto
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default IdeaItem;
