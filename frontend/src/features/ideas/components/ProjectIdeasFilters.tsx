interface ProjectIdeasFiltersProps {
  filter: 'all' | 'inbox' | 'processing' | 'promoted' | 'archived';
  setFilter: (filter: 'all' | 'inbox' | 'processing' | 'promoted' | 'archived') => void;
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
  filteredCount
}: ProjectIdeasFiltersProps) {
  return (
    <div>
      <div>
        <label>Filtrar:</label>
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
        <label>Ordenar:</label>
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

      {availableTags.length > 0 && (
        <div>
          <label>Filtrar por etiqueta:</label>
          <select
            value={selectedTag || 'all'}
            onChange={(e) => setSelectedTag(e.target.value === 'all' ? null : e.target.value)}
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
        <div>
          <span>Mostrando ideas con etiqueta: </span>
          <strong>{selectedTag}</strong>
          <button 
            onClick={() => setSelectedTag(null)}
            style={{ marginLeft: '8px', cursor: 'pointer' }}
          >
            ✕ Limpiar
          </button>
        </div>
      )}

      <div>
        Mostrando {filteredCount} de {stats.total} ideas
      </div>
    </div>
  );
}

export default ProjectIdeasFilters;
