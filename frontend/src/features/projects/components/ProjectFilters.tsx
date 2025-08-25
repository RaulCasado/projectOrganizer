interface ProjectFiltersProps {
    selectedTag : string | null;
    onTagFilterChange: (tag: string | null) => void;
    availableTags: string[];
}

function ProjectFilters({ selectedTag, onTagFilterChange, availableTags }: ProjectFiltersProps) {
    return (
        <div>
            <h3>Filtros</h3>
            <div>
                <label>
                    Filtrar por etiqueta:
                    <select
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
        <div style={{ marginTop: '0.5rem' }}>
          <span>Mostrando proyectos con tag: </span>
          <strong>{selectedTag}</strong>
          <button 
            onClick={() => onTagFilterChange(null)}
            style={{ marginLeft: '0.5rem' }}
          >
            ✕ Limpiar
          </button>
        </div>
      )}
        </div>
    )
}

export default ProjectFilters;