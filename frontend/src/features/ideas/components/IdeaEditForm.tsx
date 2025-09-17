import type { Idea } from '../../../shared/types/Idea';
import { TagInput } from '../../../shared';
import styles from './ideas.module.css';

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
    <div className={styles.editForm}>
      <input
        type="text"
        className={styles.editFormInput}
        value={editForm.title || ''}
        onChange={e => setEditForm({ ...editForm, title: e.target.value })}
        placeholder="Título de la idea"
      />
      <textarea
        className={styles.editFormTextarea}
        value={editForm.description || ''}
        onChange={e =>
          setEditForm({ ...editForm, description: e.target.value })
        }
        rows={3}
        placeholder="Descripción de la idea"
      />
      <div className={styles.editFormGroup}>
        <label className={styles.editFormLabel}>Tags:</label>
        <TagInput
          value={editForm.tags || []}
          onChange={(newTags: string[]) =>
            setEditForm({ ...editForm, tags: newTags })
          }
          placeholder="Añadir tags..."
        />
      </div>
      <div className={styles.editFormSelectRow}>
        <select
          className={styles.editFormSelect}
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
          className={styles.editFormSelect}
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
      <div className={styles.editFormActions}>
        <button className={styles.formButton} onClick={onCancel}>
          Cancelar
        </button>
        <button
          className={`${styles.formButton} ${styles.formButtonPrimary}`}
          onClick={onSave}
        >
          Guardar
        </button>
      </div>
    </div>
  );
}

export default IdeaEditForm;
