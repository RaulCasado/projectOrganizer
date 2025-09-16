import { useIdeasMainViewContext } from '../../../contexts/IdeasMainViewContext';
import styles from './ideas.module.css';

function IdeasFilters() {
  const {
    filter,
    setFilter,
    sortBy,
    setSortBy,
    selectedTag,
    setSelectedTag,
    availableTags,
    stats,
    filteredCount,
  } = useIdeasMainViewContext();

  return (
    <div className={styles.filtersContainer}>
      <div className={styles.filtersGrid}>
        <div className={styles.filterGroup}>
          <label className={styles.filterLabel}>Filtrar:</label>
          <select
            className={styles.filterSelect}
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

        <div className={styles.filterGroup}>
          <label className={styles.filterLabel}>Ordenar:</label>
          <select
            className={styles.filterSelect}
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
          <div className={styles.filterGroup}>
            <label className={styles.filterLabel}>Filtrar por etiqueta:</label>
            <select
              className={styles.filterSelect}
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
          <div className={styles.filterGroup}>
            <span>Mostrando ideas con etiqueta: </span>
            <strong>{selectedTag}</strong>
            <button
              className={styles.filterButton}
              onClick={() => setSelectedTag(null)}
            >
              ✕ Limpiar
            </button>
          </div>
        )}

        <div className={styles.filterGroup}>
          <span className={styles.filterLabel}>
            Mostrando {filteredCount} de {stats.total} ideas
          </span>
        </div>
      </div>
    </div>
  );
}

export default IdeasFilters;
