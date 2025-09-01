import type { Task } from "../../../shared/types/Task";
import { Link } from 'react-router-dom';
import { useNotification } from "../../../shared";

interface TaskListProps {
    tasks: Task[];
    onToggleTask: (taskId: string) => void;
    onDeleteTask: (taskId: string) => void;
    onEditTask: (task: Task) => void;
}

export function TaskList( {tasks, onToggleTask, onDeleteTask, onEditTask}: TaskListProps ) {
    const { notifySuccess, confirmDelete } = useNotification();
    if (tasks.length === 0) {
        return <p>No tasks available</p>;
    }

        const handleDeleteTask = async (task: Task) => {
        const confirmed = await confirmDelete('tarea', task.title);
        if (confirmed) {
            onDeleteTask(task.id);
            notifySuccess(`La tarea "${task.title}" ha sido eliminada.`, '¡Eliminado!');
        }
    }

    return (
        <ul>
            {tasks.map(task => (
                <li key={task.id}>
                    <span>{task.title}</span>
                    <input type="checkbox"
                        checked={task.completed}
                        onChange={() => onToggleTask(task.id)}
                    />
                    <button onClick={() => handleDeleteTask(task)}>Delete</button>
                    <button onClick={() => onEditTask(task)}>Edit</button>
                    <Link to={`/tasks/${task.id}`}>
                        View Details
                    </Link>
                </li>
            ))}
        </ul>
    );
}