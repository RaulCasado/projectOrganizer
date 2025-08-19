import type { BlogEntry } from '../types/Project';

interface BlogDetailProps {
    entry: BlogEntry;
    onEdit: () => void;
    onDelete: () => void;
}

function BlogDetail({ entry, onEdit, onDelete }: BlogDetailProps) {
    return (
        <div>
            <div style={{ marginBottom: '20px' }}>
                <h2 style={{ margin: '0 0 10px 0' }}>{entry.title}</h2>
                <div style={{ 
                    display: 'flex', 
                    gap: '15px', 
                    fontSize: '0.9rem', 
                    color: '#666',
                    marginBottom: '15px'
                }}>
                    <span>📅 {new Date(entry.date).toLocaleDateString('es-ES', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                    })}</span>
                    {entry.timeSpent && entry.timeSpent > 0 && (
                        <span>⏱️ {entry.timeSpent} minutos</span>
                    )}
                    <span>🕒 {new Date(entry.createdAt).toLocaleTimeString('es-ES', {
                        hour: '2-digit',
                        minute: '2-digit'
                    })}</span>
                </div>
                {entry.tags && entry.tags.length > 0 && (
                    <div style={{ marginBottom: '15px' }}>
                        {entry.tags.map(tag => (
                            <span 
                                key={tag}
                                style={{
                                    backgroundColor: '#000000ff',
                                    padding: '4px 8px',
                                    borderRadius: '12px',
                                    fontSize: '0.8rem',
                                    marginRight: '8px'
                                }}
                            >
                                🏷️ {tag}
                            </span>
                        ))}
                    </div>
                )}
                <div style={{ display: 'flex', gap: '10px' }}>
                    <button 
                        onClick={onEdit}
                        style={{
                            backgroundColor: '#17a2b8',
                            color: 'white',
                            border: 'none',
                            padding: '8px 16px',
                            borderRadius: '4px',
                            cursor: 'pointer'
                        }}
                    >
                        ✏️ Editar
                    </button>
                    <button 
                        onClick={onDelete}
                        style={{
                            backgroundColor: '#dc3545',
                            color: 'white',
                            border: 'none',
                            padding: '8px 16px',
                            borderRadius: '4px',
                            cursor: 'pointer'
                        }}
                    >
                        🗑️ Eliminar
                    </button>
                </div>
            </div>
            <div style={{
                whiteSpace: 'pre-wrap',
                lineHeight: '1.8',
                fontSize: '1rem',
                border: '1px solid #eee',
                borderRadius: '4px',
                padding: '20px',
                backgroundColor: '#080808ff'
            }}>
                {entry.content}
            </div>
        </div>
    );
}

export default BlogDetail;
