import { useState, useEffect } from 'react';
import { useNotification, TagInput, DateUtils } from '../../../shared';
import type { BlogEntry } from '../../../shared';
import styles from './blog.module.css';

interface BlogFormProps {
  onSave: (entry: Omit<BlogEntry, 'id' | 'createdAt'>) => void;
  onCancel: () => void;
  editingEntry: BlogEntry | null;
}

function BlogForm({ onSave, onCancel, editingEntry }: BlogFormProps) {
  const isEditing = !!editingEntry;
  const todayFormatted = DateUtils.dateToday();
  const { notifySuccess, notifyError } = useNotification();
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    timeSpent: 0,
    tags: [] as string[],
    date: todayFormatted,
  });

  useEffect(() => {
    if (editingEntry) {
      setFormData({
        title: editingEntry.title || '',
        content: editingEntry.content || '',
        timeSpent: editingEntry.timeSpent || 0,
        tags: editingEntry.tags || [],
        date: editingEntry.date || todayFormatted,
      });
    } else {
      setFormData({
        title: '',
        content: '',
        timeSpent: 0,
        tags: [],
        date: todayFormatted,
      });
    }
  }, [editingEntry, todayFormatted]);

  const handleSave = () => {
    if (!formData.title.trim() || !formData.content.trim()) {
      notifyError('Título y contenido son obligatorios');
      return;
    }

    const entryData = {
      title: formData.title.trim(),
      content: formData.content.trim(),
      timeSpent: formData.timeSpent,
      tags: formData.tags,
      date: formData.date,
    };

    onSave(entryData);

    if (!isEditing) {
      setFormData({
        title: '',
        content: '',
        timeSpent: 0,
        tags: [],
        date: todayFormatted,
      });
    }
    notifySuccess(
      `Tu registro diario ha sido ${isEditing ? 'actualizado' : 'guardado'}`
    );
  };

  return (
    <div className={styles.form}>
      <h4 className={styles.formTitle}>
        {isEditing ? 'Editar' : 'Nueva'} entrada -{' '}
        {DateUtils.formatShort(DateUtils.timestampNow())}
      </h4>

      <div className={styles.formGroup}>
        <label className={styles.formLabel}>Título</label>
        <input
          type="text"
          className={styles.formInput}
          placeholder="Título de la entrada"
          value={formData.title}
          onChange={e => setFormData({ ...formData, title: e.target.value })}
        />
      </div>

      <div className={styles.formGroup}>
        <label className={styles.formLabel}>Fecha</label>
        <input
          type="date"
          className={styles.formInput}
          value={formData.date}
          onChange={e => setFormData({ ...formData, date: e.target.value })}
        />
      </div>

      <div className={styles.formGroup}>
        <label className={styles.formLabel}>Contenido</label>
        <textarea
          className={styles.formTextarea}
          placeholder="Contenido (soporta Markdown)"
          value={formData.content}
          onChange={e => setFormData({ ...formData, content: e.target.value })}
        />
      </div>

      <div className={styles.formRow}>
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Tiempo invertido (minutos)</label>
          <input
            type="number"
            className={styles.formInput}
            placeholder="Tiempo invertido (minutos)"
            value={formData.timeSpent}
            onChange={e =>
              setFormData({ ...formData, timeSpent: Number(e.target.value) })
            }
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Tags</label>
          <TagInput
            value={formData.tags}
            onChange={tags => setFormData({ ...formData, tags })}
            placeholder="Tags: bug-fix, feature, learning"
          />
        </div>
      </div>

      <div className={styles.formActions}>
        <button className={styles.formButton} onClick={onCancel}>
          Cancelar
        </button>
        <button
          className={`${styles.formButton} ${styles.formButtonPrimary}`}
          onClick={handleSave}
        >
          {isEditing ? 'Actualizar entrada' : 'Guardar entrada'}
        </button>
      </div>
    </div>
  );
}

export default BlogForm;
