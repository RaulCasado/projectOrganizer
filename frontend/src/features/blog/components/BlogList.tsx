import type { BlogEntry } from '../../../shared';
import { DateUtils } from '../../../shared';
import styles from './blog.module.css';

interface BlogListProps {
  entries: BlogEntry[];
  onViewEntry?: (entry: BlogEntry) => void;
  onEditEntry?: (entry: BlogEntry) => void;
  onDeleteEntry?: (entryId: string) => void;
}

function BlogList({
  entries,
  onViewEntry,
  onEditEntry,
  onDeleteEntry,
}: BlogListProps) {
  if (entries.length === 0) {
    return (
      <div className={styles.emptyState}>
        <div className={styles.emptyIcon}>📝</div>
        <h4 className={styles.emptyTitle}>Aún no hay entradas</h4>
        <p className={styles.emptyMessage}>
          Empieza a documentar tu progreso diario. Es muy útil para reflexionar
          sobre tu trabajo.
        </p>
      </div>
    );
  }
  const sortedEntries = DateUtils.sortByDate(entries, 'createdAt', 'desc');

  return (
    <div className={styles.blogList}>
      {sortedEntries.map(entry => (
        <div key={entry.id} className={styles.blogEntry}>
          <div className={styles.blogEntryHeader}>
            <h4 className={styles.blogEntryTitle}>{entry.title}</h4>
            <div className={styles.blogEntryActions}>
              {onViewEntry && (
                <button
                  className={styles.blogEntryButton}
                  onClick={() => onViewEntry(entry)}
                  title="Ver completo"
                >
                  Ver
                </button>
              )}
              {onEditEntry && (
                <button
                  className={styles.blogEntryButton}
                  onClick={() => onEditEntry(entry)}
                  title="Editar"
                >
                  Editar
                </button>
              )}
              {onDeleteEntry && (
                <button
                  className={`${styles.blogEntryButton} ${styles.blogEntryButtonDelete}`}
                  onClick={() => onDeleteEntry(entry.id)}
                  title="Eliminar"
                >
                  Eliminar
                </button>
              )}
            </div>
          </div>

          <div className={styles.blogEntryMeta}>
            <div className={styles.blogEntryMetaItem}>
              📅 {DateUtils.formatShort(entry.date)}
            </div>
            {entry.timeSpent && entry.timeSpent > 0 && (
              <div className={styles.blogEntryMetaItem}>
                ⏱️ {entry.timeSpent} min
              </div>
            )}
            {entry.tags && entry.tags.length > 0 && (
              <div className={styles.blogEntryMetaItem}>
                🏷️ {entry.tags.join(', ')}
              </div>
            )}
          </div>

          <div className={styles.blogEntryContent}>
            {entry.content.substring(0, 200)}
            {entry.content.length > 200 && '...'}
            {entry.content.length > 200 && onViewEntry && (
              <button
                className={styles.blogEntryReadMore}
                onClick={() => onViewEntry(entry)}
              >
                Ver completo...
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default BlogList;
