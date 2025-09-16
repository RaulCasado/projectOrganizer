import type { BlogEntry } from '../../../shared';
import { DateUtils } from '../../../shared';
import styles from './blog.module.css';
interface BlogDetailProps {
  entry: BlogEntry;
  onEdit: () => void;
  onDelete: () => void;
}

function BlogDetail({ entry, onEdit, onDelete }: BlogDetailProps) {
  return (
    <div className={styles.blogDetail}>
      <div className={styles.blogDetailHeader}>
        <h2 className={styles.blogDetailTitle}>{entry.title}</h2>
        <div className={styles.blogDetailMeta}>
          <div className={styles.blogDetailMetaItem}>
            📅 {DateUtils.formatLong(entry.date)}
          </div>
          {entry.timeSpent && entry.timeSpent > 0 && (
            <div className={styles.blogDetailMetaItem}>
              ⏱️ {entry.timeSpent} minutos
            </div>
          )}
          <div className={styles.blogDetailMetaItem}>
            🕒 {DateUtils.formatTime(entry.createdAt)}
          </div>
        </div>
        {entry.tags && entry.tags.length > 0 && (
          <div className={styles.blogDetailTags}>
            {entry.tags.map(tag => (
              <span className={styles.blogDetailTag} key={tag}>
                🏷️ {tag}
              </span>
            ))}
          </div>
        )}
        <div className={styles.blogDetailActions}>
          <button className={styles.blogDetailButton} onClick={onEdit}>
            ✏️ Editar
          </button>
          <button
            className={`${styles.blogDetailButton} ${styles.blogDetailButtonDelete}`}
            onClick={onDelete}
          >
            🗑️ Eliminar
          </button>
        </div>
      </div>
      <div className={styles.blogDetailContent}>{entry.content}</div>
    </div>
  );
}

export default BlogDetail;
