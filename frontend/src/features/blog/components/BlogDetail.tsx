import type { BlogEntry } from '../../../shared';
import { DateUtils } from '../../../shared';
interface BlogDetailProps {
  entry: BlogEntry;
  onEdit: () => void;
  onDelete: () => void;
}

function BlogDetail({ entry, onEdit, onDelete }: BlogDetailProps) {
  return (
    <div className="blog-detail">
      <div className="blog-detail-header">
        <h2 className="blog-detail-title">{entry.title}</h2>
        <div className="blog-detail-meta">
          <span>📅 {DateUtils.formatLong(entry.date)}</span>
          {entry.timeSpent && entry.timeSpent > 0 && (
            <span>⏱️ {entry.timeSpent} minutos</span>
          )}
          <span>🕒 {DateUtils.formatTime(entry.createdAt)}</span>
        </div>
        {entry.tags && entry.tags.length > 0 && (
          <div className="blog-detail-tags">
            {entry.tags.map(tag => (
              <span className="blog-detail-tag" key={tag}>
                🏷️ {tag}
              </span>
            ))}
          </div>
        )}
        <div className="blog-detail-actions">
          <button className="blog-detail-edit" onClick={onEdit}>
            ✏️ Editar
          </button>
          <button className="blog-detail-delete" onClick={onDelete}>
            🗑️ Eliminar
          </button>
        </div>
      </div>
      <div className="blog-detail-content">{entry.content}</div>
    </div>
  );
}

export default BlogDetail;
