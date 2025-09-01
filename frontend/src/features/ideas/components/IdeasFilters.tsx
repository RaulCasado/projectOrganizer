import { useIdeasMainViewContext } from '../../../contexts/IdeasMainViewContext';

function IdeasFilters() {
  const { 
    filter, 
    setFilter, 
    sortBy, 
    setSortBy, 
    stats, 
    filteredCount 
  } = useIdeasMainViewContext();

  return (
    <div>
      <div>
        <label>
          Filtrar:
        </label>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value as 'all' | 'inbox' | 'processing' | 'promoted' | 'archived')}
        >
          <option value="all">🔍 Todas ({stats.total})</option>
          <option value="inbox">📥 Inbox ({stats.inbox})</option>
          <option value="processing">⚙️ Procesando ({stats.processing})</option>
          <option value="promoted">🚀 Promovidas ({stats.promoted})</option>
          <option value="archived">📦 Archivadas ({stats.archived})</option>
        </select>
      </div>

      <div>
        <label>
          Ordenar:
        </label>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as 'newest' | 'oldest' | 'priority' | 'title')}
        >
          <option value="newest">📅 Más recientes</option>
          <option value="oldest">🕰️ Más antiguas</option>
          <option value="priority">🔥 Por prioridad</option>
          <option value="title">🔤 Por título</option>
        </select>
      </div>

      <div>
        Mostrando {filteredCount} de {stats.total} ideas
      </div>
    </div>
  );
}

export default IdeasFilters;