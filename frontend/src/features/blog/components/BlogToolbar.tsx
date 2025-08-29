interface BlogToolbarProps {
  blogEntriesLength: number;
  isWriting: boolean;
  onExportWeek: () => void;
  onNewEntry: () => void;
}

function BlogToolbar({ blogEntriesLength, isWriting, onExportWeek, onNewEntry }: BlogToolbarProps) {
  return (
    <div>
      <h3>📝 Diario del Proyecto</h3>

      <div>
        {blogEntriesLength > 0 && (
          <button onClick={onExportWeek}>
            📤 Exportar semana
          </button>
        )}

        {!isWriting && (
          <button onClick={onNewEntry}>
            ➕ Nueva Entrada
          </button>
        )}
      </div>
    </div>
  );
}

export default BlogToolbar;
