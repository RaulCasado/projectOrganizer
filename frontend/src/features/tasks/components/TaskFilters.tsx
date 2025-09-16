import styles from './tasks.module.css';

interface TaskFiltersProps {
  statusFilter: 'all' | 'completed' | 'pending';
  priorityFilter: 'all' | 'low' | 'medium' | 'high';
  searchText: string;
  onStatusFilterChange: (status: 'all' | 'completed' | 'pending') => void;
  onPriorityFilterChange: (priority: 'all' | 'low' | 'medium' | 'high') => void;
  onSearchTextChange: (searchText: string) => void;
}

export function TaskFilters({
  statusFilter,
  priorityFilter,
  searchText,
  onStatusFilterChange,
  onPriorityFilterChange,
  onSearchTextChange,
}: TaskFiltersProps) {
  return (
    <div className={styles.filtersContainer}>
      <h4 className={styles.filtersTitle}>Filtros</h4>
      <div className={styles.filtersGrid}>
        <div className={styles.filterGroup}>
          <label className={styles.filterLabel}>
            Estado:
            <select
              className={styles.filterSelect}
              value={statusFilter}
              onChange={e =>
                onStatusFilterChange(
                  e.target.value as 'all' | 'completed' | 'pending'
                )
              }
            >
              <option value="all">Todos</option>
              <option value="completed">Completadas</option>
              <option value="pending">Pendientes</option>
            </select>
          </label>
        </div>
        <div className={styles.filterGroup}>
          <label className={styles.filterLabel}>
            Prioridad:
            <select
              className={styles.filterSelect}
              value={priorityFilter}
              onChange={e =>
                onPriorityFilterChange(
                  e.target.value as 'all' | 'low' | 'medium' | 'high'
                )
              }
            >
              <option value="all">Todas</option>
              <option value="low">Baja</option>
              <option value="medium">Media</option>
              <option value="high">Alta</option>
            </select>
          </label>
        </div>
        <div className={styles.filterGroup}>
          <label className={styles.filterLabel}>
            Buscar:
            <input
              className={styles.filterInput}
              type="text"
              placeholder="Buscar tareas..."
              value={searchText}
              onChange={e => onSearchTextChange(e.target.value)}
            />
          </label>
        </div>
      </div>
    </div>
  );
}
