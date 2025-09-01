interface TaskFiltersProps {
    statusFilter : 'all' | 'completed' | 'pending';
    priorityFilter : 'all' | 'low' | 'medium' | 'high';
    searchText : string;
    onStatusFilterChange : (status: 'all' | 'completed' | 'pending') => void;
    onPriorityFilterChange : (priority: 'all' | 'low' | 'medium' | 'high') => void;
    onSearchTextChange : (searchText: string) => void;
}

export function TaskFilters( {statusFilter, priorityFilter, searchText, onStatusFilterChange, onPriorityFilterChange, onSearchTextChange} : TaskFiltersProps ) {
    return (
        <div>
            <h4>Filtros</h4>
            <div>
                <label>
                    Estado:
                    <select value={statusFilter} onChange={(e) => onStatusFilterChange(e.target.value as 'all' | 'completed' | 'pending')}>
                        <option value="all">Todos</option>
                        <option value="completed">Completadas</option>
                        <option value="pending">Pendientes</option>
                    </select>
                </label>
            </div>
            <div>
                <label>
                    Prioridad:
                    <select value={priorityFilter} onChange={(e) => onPriorityFilterChange(e.target.value as 'all' | 'low' | 'medium' | 'high')}>
                        <option value="all">Todas</option>
                        <option value="low">Baja</option>
                        <option value="medium">Media</option>
                        <option value="high">Alta</option>
                    </select>
                </label>
            </div>
            <div>
                <label>
                    Buscar:
                    <input
                        type="text"
                        value={searchText}
                        onChange={(e) => onSearchTextChange(e.target.value)}
                    />
                </label>
            </div>
        </div>
    )
}
