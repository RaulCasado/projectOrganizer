import styles from './ProjectFilters.module.css';

interface ProjectFiltersProps {
  selectedTag: string | null;
  onTagFilterChange: (tag: string | null) => void;
  availableTags: string[];
}

function ProjectFilters({
  selectedTag,
  onTagFilterChange,
  availableTags,
}: ProjectFiltersProps) {
  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Filtros</h3>
      <div className={styles.filterGroup}>
        <label className={styles.label}>
          Filtrar por etiqueta:
          <select
            className={styles.select}
            value={selectedTag || ''}
            onChange={e => onTagFilterChange(e.target.value || null)}
          >
            <option value="">Todas</option>
            {availableTags.map(tag => (
              <option key={tag} value={tag}>
                {tag}
              </option>
            ))}
          </select>
        </label>
      </div>
      {selectedTag && (
        <div className={styles.activeFilter}>
          <span className={styles.activeFilterText}>
            Mostrando proyectos con tag:{' '}
          </span>
          <span className={styles.activeFilterTag}>{selectedTag}</span>
          <button
            className={styles.clearButton}
            onClick={() => onTagFilterChange(null)}
          >
            ✕ Limpiar
          </button>
        </div>
      )}
    </div>
  );
}

export default ProjectFilters;
