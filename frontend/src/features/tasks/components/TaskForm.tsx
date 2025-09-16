import { useProjectDetailContext } from '../../../contexts';
import type { TaskFormData } from '../../../shared';
import styles from './tasks.module.css';

interface TaskFormProps {
  onCancel?: () => void;
}

export function TaskForm({ onCancel }: TaskFormProps) {
  const {
    editingTask,
    taskForm,
    handleAddTask,
    handleUpdateTask,
    handleCancelEdit,
  } = useProjectDetailContext();

  const isEditing = !!editingTask;

  const priorityOptions = [
    { value: 'low', label: '🟢 Baja', color: '#22c55e' },
    { value: 'medium', label: '🟡 Media', color: '#eab308' },
    { value: 'high', label: '🔴 Alta', color: '#ef4444' },
  ];

  const onSubmitHandler = async (formData: TaskFormData) => {
    if (isEditing && editingTask) {
      handleUpdateTask({
        ...editingTask,
        ...formData,
      });
    } else {
      handleAddTask(formData);
      taskForm.resetForm();
    }

    if (onCancel) {
      onCancel();
    }
  };

  const handleCancel = () => {
    handleCancelEdit();
    taskForm.resetForm();
    if (onCancel) {
      onCancel();
    }
  };

  return (
    <div className={styles.formContainer}>
      <h3 className={styles.formTitle}>
        {isEditing ? 'Editar Tarea' : 'Añadir Nueva Tarea'}
      </h3>

      <form
        className={styles.form}
        onSubmit={e => {
          e.preventDefault();
          taskForm.handleSubmit(onSubmitHandler);
        }}
      >
        <div className={styles.fieldGroup}>
          <label className={styles.label} htmlFor="task-title">
            Título de la tarea *
          </label>
          <input
            className={styles.input}
            id="task-title"
            type="text"
            placeholder="Ej: Implementar login, Revisar diseño..."
            value={taskForm.values.title}
            onChange={e => taskForm.setFieldValue('title', e.target.value)}
            disabled={taskForm.isSubmitting}
          />
          {taskForm.errors.title && (
            <span className={styles.error}>{taskForm.errors.title}</span>
          )}
        </div>

        <div className={styles.fieldGroup}>
          <label className={styles.label} htmlFor="task-priority">
            Prioridad
          </label>
          <select
            className={styles.select}
            id="task-priority"
            value={taskForm.values.priority}
            onChange={e =>
              taskForm.setFieldValue(
                'priority',
                e.target.value as TaskFormData['priority']
              )
            }
            disabled={taskForm.isSubmitting}
          >
            {priorityOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.fieldGroup}>
          <label className={styles.label} htmlFor="task-description">
            Descripción (opcional)
          </label>
          <textarea
            className={styles.textarea}
            id="task-description"
            placeholder="Detalles adicionales sobre la tarea..."
            value={taskForm.values.description}
            onChange={e =>
              taskForm.setFieldValue('description', e.target.value)
            }
            rows={3}
            disabled={taskForm.isSubmitting}
          />
          {taskForm.errors.description && (
            <span className={styles.error}>{taskForm.errors.description}</span>
          )}
        </div>

        <div className={styles.buttonGroup}>
          <button
            className={styles.submitButton}
            type="submit"
            disabled={taskForm.isSubmitting || !taskForm.values.title.trim()}
          >
            {taskForm.isSubmitting
              ? isEditing
                ? 'Actualizando...'
                : 'Creando...'
              : isEditing
                ? 'Actualizar Tarea'
                : 'Añadir Tarea'}
          </button>

          {isEditing && (
            <button
              className={styles.cancelButton}
              type="button"
              onClick={handleCancel}
              disabled={taskForm.isSubmitting}
            >
              Cancelar
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
