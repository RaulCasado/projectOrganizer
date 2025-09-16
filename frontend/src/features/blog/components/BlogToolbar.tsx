import styles from './blog.module.css';

interface BlogToolbarProps {
  blogEntriesLength: number;
  isWriting: boolean;
  onExportWeek: () => void;
  onNewEntry: () => void;
}

function BlogToolbar({
  blogEntriesLength,
  isWriting,
  onExportWeek,
  onNewEntry,
}: BlogToolbarProps) {
  return (
    <div className={styles.toolbar}>
      <h3 className={styles.toolbarTitle}>📝 Diario del Proyecto</h3>

      <div className={styles.toolbarActions}>
        {blogEntriesLength > 0 && (
          <button className={styles.toolbarButton} onClick={onExportWeek}>
            📤 Exportar semana
          </button>
        )}

        {!isWriting && (
          <button
            className={`${styles.toolbarButton} ${styles.toolbarButtonPrimary}`}
            onClick={onNewEntry}
          >
            ➕ Nueva Entrada
          </button>
        )}
      </div>
    </div>
  );
}

export default BlogToolbar;
