interface QuickInputProps {
  title: string;
  setTitle: (title: string) => void;
  isExpanded: boolean;
  onQuickAdd: () => void;
  onToggleExpanded: () => void;
}

function QuickInput({ title, setTitle, isExpanded, onQuickAdd, onToggleExpanded }: QuickInputProps) {
  return (
    <div>
      <input
        type="text"
        placeholder="💡 Captura rápida de idea..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && !isExpanded) {
            onQuickAdd();
          }
        }}
      />
      <button
        type="button"
        onClick={onQuickAdd}
        disabled={!title.trim()}
      >
        ➕
      </button>
      <button
        type="button"
        onClick={onToggleExpanded}
      >
        {isExpanded ? '📝' : '⚙️'}
      </button>
    </div>
  );
}

export default QuickInput;
