import type { Idea } from '../../../shared/types/Idea';

interface IdeaEditFormProps {
  editForm: Partial<Idea>;
  setEditForm: (form: Partial<Idea>) => void;
  onSave: () => void;
  onCancel: () => void;
}

function IdeaEditForm({
  editForm,
  setEditForm,
  onSave,
  onCancel,
}: IdeaEditFormProps) {
  return (
    <div>
      <input
        type="text"
        value={editForm.title || ''}
        onChange={e => setEditForm({ ...editForm, title: e.target.value })}
      />
      <textarea
        value={editForm.description || ''}
        onChange={e =>
          setEditForm({ ...editForm, description: e.target.value })
        }
        rows={3}
      />
      <div>
        <select
          value={editForm.priority || 'medium'}
          onChange={e =>
            setEditForm({
              ...editForm,
              priority: e.target.value as Idea['priority'],
            })
          }
        >
          <option value="low">🟢 Baja</option>
          <option value="medium">🟡 Media</option>
          <option value="high">🔴 Alta</option>
        </select>
        <select
          value={editForm.category || 'feature'}
          onChange={e =>
            setEditForm({
              ...editForm,
              category: e.target.value as Idea['category'],
            })
          }
        >
          <option value="feature">✨ Feature</option>
          <option value="project">🚀 Proyecto</option>
          <option value="improvement">⚡ Mejora</option>
          <option value="research">🔍 Investigación</option>
          <option value="other">📝 Otro</option>
        </select>
      </div>
      <div>
        <button onClick={onSave}>Guardar</button>
        <button onClick={onCancel}>Cancelar</button>
      </div>
    </div>
  );
}

export default IdeaEditForm;
