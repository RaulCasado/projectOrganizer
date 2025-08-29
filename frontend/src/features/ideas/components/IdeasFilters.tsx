interface IdeasFiltersProps {
  filter: 'all' | 'inbox' | 'processing' | 'promoted' | 'archived';
  setFilter: (filter: 'all' | 'inbox' | 'processing' | 'promoted' | 'archived') => void;
  sortBy: 'newest' | 'oldest' | 'priority' | 'title';
  setSortBy: (sortBy: 'newest' | 'oldest' | 'priority' | 'title') => void;
  totalIdeas: number;
  filteredCount: number;
}

function IdeasFilters({ filter, setFilter, sortBy, setSortBy, totalIdeas, filteredCount }: IdeasFiltersProps) {
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
          <option value="all">🔍 Todas ({totalIdeas})</option>
          <option value="inbox">📥 Inbox ({filteredCount})</option>
          <option value="processing">⚙️ Procesando ({filteredCount})</option>
          <option value="promoted">🚀 Promovidas ({filteredCount})</option>
          <option value="archived">📦 Archivadas ({filteredCount})</option>
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
        Mostrando {filteredCount} de {totalIdeas} ideas
      </div>
    </div>
  );
}

export default IdeasFilters;
