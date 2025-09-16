import styles from './ideas.module.css';

interface ProjectIdeasFiltersProps {
  filter: 'all' | 'inbox' | 'processing' | 'promoted' | 'archived';
  setFilter: (
    filter: 'all' | 'inbox' | 'processing' | 'promoted' | 'archived'
  ) => void;
  sortBy: 'newest' | 'oldest' | 'priority' | 'title';
  setSortBy: (sortBy: 'newest' | 'oldest' | 'priority' | 'title') => void;
  selectedTag: string | null;
  setSelectedTag: (tag: string | null) => void;
  availableTags: string[];
  stats: {
    total: number;
    inbox: number;
    processing: number;
    promoted: number;
    archived: number;
  };
  filteredCount: number;
}

function ProjectIdeasFilters({
  filter,
  setFilter,
  sortBy,
  setSortBy,
  selectedTag,
  setSelectedTag,
  availableTags,
  stats,
  filteredCount,
}: ProjectIdeasFiltersProps) {
  return (
    <div className={styles.projectFiltersContainer}>
      <div className={styles.projectFiltersGrid}>
        <div className={styles.projectFilterGroup}>
          <label className={styles.projectFilterLabel}>Filtrar:</label>
          <select
            className={styles.projectFilterSelect}
            value={filter}
            onChange={e =>
              setFilter(
                e.target.value as
                  | 'all'
                  | 'inbox'
                  | 'processing'
                  | 'promoted'
                  | 'archived'
              )
            }
          >
            <option value="all">🔍 Todas ({stats.total})</option>
            <option value="inbox">📥 Inbox ({stats.inbox})</option>
            <option value="processing">
              ⚙️ Procesando ({stats.processing})
            </option>
            <option value="promoted">🚀 Promovidas ({stats.promoted})</option>
            <option value="archived">📦 Archivadas ({stats.archived})</option>
          </select>
        </div>

        <div className={styles.projectFilterGroup}>
          <label className={styles.projectFilterLabel}>Ordenar:</label>
          <select
            className={styles.projectFilterSelect}
            value={sortBy}
            onChange={e =>
              setSortBy(
                e.target.value as 'newest' | 'oldest' | 'priority' | 'title'
              )
            }
          >
            <option value="newest">📅 Más recientes</option>
            <option value="oldest">🕰️ Más antiguas</option>
            <option value="priority">🔥 Por prioridad</option>
            <option value="title">🔤 Por título</option>
          </select>
        </div>

        {availableTags.length > 0 && (
          <div className={styles.projectFilterGroup}>
            <label className={styles.projectFilterLabel}>
              Filtrar por etiqueta:
            </label>
            <select
              className={styles.projectFilterSelect}
              value={selectedTag || 'all'}
              onChange={e =>
                setSelectedTag(e.target.value === 'all' ? null : e.target.value)
              }
            >
              <option value="all">Todas las etiquetas</option>
              {availableTags.map(tag => (
                <option key={tag} value={tag}>
                  🏷️ {tag}
                </option>
              ))}
            </select>
          </div>
        )}

        {selectedTag && (
          <div className={styles.projectFilterGroup}>
            <span>
              Etiqueta: <strong>{selectedTag}</strong>
            </span>
            <button
              className={styles.projectFilterButton}
              onClick={() => setSelectedTag(null)}
            >
              ✕ Limpiar
            </button>
          </div>
        )}

        <div className={styles.projectFilterCount}>
          Mostrando {filteredCount} de {stats.total} ideas
        </div>
      </div>
    </div>
  );
}

export default ProjectIdeasFilters;
