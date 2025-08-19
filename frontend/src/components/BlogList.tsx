import type { BlogEntry } from '../types/Project';

interface BlogListProps {
    entries: BlogEntry[];
    onViewEntry?: (entry: BlogEntry) => void;
    onEditEntry?: (entry: BlogEntry) => void; 
    onDeleteEntry?: (entryId: string) => void;
}

function BlogList({ entries, onViewEntry, onEditEntry, onDeleteEntry }: BlogListProps) {
    if (entries.length === 0) {
        return (
            <div>
                <h4>Aún no hay entradas</h4>
                <p>Empieza a documentar tu progreso diario. Es muy útil para reflexionar sobre tu trabajo.</p>
            </div>
        );
    }

    const sortedEntries = entries.sort((a, b) => 
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    return (
        <div>
            {sortedEntries.map(entry => (
                <div key={entry.id}>
                    <div>
                        <h4>{entry.title}</h4>
                        <div>
                            {onViewEntry && (
                                <button onClick={() => onViewEntry(entry)} title="Ver completo">
                                    Ver
                                </button>
                            )}
                            {onEditEntry && (
                                <button onClick={() => onEditEntry(entry)} title="Editar">
                                    Editar
                                </button>
                            )}
                            {onDeleteEntry && (
                                <button onClick={() => onDeleteEntry(entry.id)} title="Eliminar">
                                    Eliminar
                                </button>
                            )}
                        </div>
                    </div>
                    <div>
                        Fecha: {new Date(entry.date).toLocaleDateString()}
                        {entry.timeSpent && entry.timeSpent > 0 && ` | Tiempo invertido: ${entry.timeSpent} min`}
                        {entry.tags && entry.tags.length > 0 && ` | Etiquetas: ${entry.tags.join(', ')}`}
                    </div>
                    <div>
                        {entry.content.substring(0, 200)}
                        {entry.content.length > 200 && '...'}
                    </div>
                    {entry.content.length > 200 && onViewEntry && (
                        <button 
                            onClick={() => onViewEntry(entry)}
                        >
                            Ver completo...
                        </button>
                    )}
                </div>
            ))}
        </div>
    );
}

export default BlogList;
