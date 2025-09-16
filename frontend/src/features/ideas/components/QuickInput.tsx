import styles from './ideas.module.css';

interface QuickInputProps {
  title: string;
  setTitle: (title: string) => void;
  isExpanded: boolean;
  onQuickAdd: () => void;
  onToggleExpanded: () => void;
}

function QuickInput({
  title,
  setTitle,
  isExpanded,
  onQuickAdd,
  onToggleExpanded,
}: QuickInputProps) {
  return (
    <div className={styles.quickInputContainer}>
      <input
        type="text"
        className={styles.quickInputField}
        placeholder="💡 Captura rápida de idea..."
        value={title}
        onChange={e => setTitle(e.target.value)}
        onKeyDown={e => {
          if (e.key === 'Enter' && !isExpanded) {
            onQuickAdd();
          }
        }}
      />
      <button
        type="button"
        className={styles.quickInputButton}
        onClick={onQuickAdd}
        disabled={!title.trim()}
        title="Añadir idea rápida"
      >
        ➕
      </button>
      <button
        type="button"
        className={styles.quickInputButton}
        onClick={onToggleExpanded}
        title={isExpanded ? 'Formulario simple' : 'Formulario completo'}
      >
        {isExpanded ? '📝' : '⚙️'}
      </button>
    </div>
  );
}

export default QuickInput;
