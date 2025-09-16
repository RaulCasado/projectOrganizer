import type { Task } from '../../../shared/types/Task';
import { Link } from 'react-router-dom';
import { useNotification } from '../../../shared';
import styles from './tasks.module.css';

interface TaskListProps {
  tasks: Task[];
  onToggleTask: (taskId: string) => void;
  onDeleteTask: (taskId: string) => void;
  onEditTask: (task: Task) => void;
}

export function TaskList({
  tasks,
  onToggleTask,
  onDeleteTask,
  onEditTask,
}: TaskListProps) {
  const { notifySuccess, confirmDelete } = useNotification();
  if (tasks.length === 0) {
    return (
      <div className={styles.emptyState}>
        <p className={styles.emptyMessage}>No hay tareas disponibles</p>
      </div>
    );
  }

  const handleDeleteTask = async (task: Task) => {
    const confirmed = await confirmDelete('tarea', task.title);
    if (confirmed) {
      onDeleteTask(task.id);
      notifySuccess(
        `La tarea "${task.title}" ha sido eliminada.`,
        '¡Eliminado!'
      );
    }
  };

  const getPriorityLabel = (priority: Task['priority']) => {
    const labels = {
      low: '🟢 Baja',
      medium: '🟡 Media',
      high: '🔴 Alta',
    };
    return labels[priority];
  };

  return (
    <div className={styles.listContainer}>
      <ul className={styles.taskList}>
        {tasks.map(task => (
          <li
            key={task.id}
            className={`${styles.taskItem} ${task.completed ? styles.completed : ''}`}
          >
            <input
              className={styles.taskCheckbox}
              type="checkbox"
              checked={task.completed}
              onChange={() => onToggleTask(task.id)}
            />
            <div className={styles.taskContent}>
              <h4
                className={`${styles.taskTitle} ${task.completed ? styles.completed : ''}`}
              >
                {task.title}
              </h4>
              <div className={styles.taskMeta}>
                <span
                  className={`${styles.taskPriority} ${styles[task.priority]}`}
                >
                  {getPriorityLabel(task.priority)}
                </span>
              </div>
            </div>
            <div className={styles.taskActions}>
              <button
                className={`${styles.actionButton} ${styles.editButton}`}
                onClick={() => onEditTask(task)}
                title="Editar tarea"
              >
                ✏️
              </button>
              <button
                className={`${styles.actionButton} ${styles.deleteButton}`}
                onClick={() => handleDeleteTask(task)}
                title="Eliminar tarea"
              >
                🗑️
              </button>
              <Link
                className={`${styles.actionButton} ${styles.viewButton}`}
                to={`/tasks/${task.id}`}
                title="Ver detalles"
              >
                <span className={styles.taskLink}>👁️</span>
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
