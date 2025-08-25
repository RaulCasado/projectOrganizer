import type { Task } from "../../../shared/types/Task";
import { Link } from 'react-router-dom';
import Swal from "sweetalert2";

interface TaskListProps {
    tasks: Task[];
    onToggleTask: (taskId: string) => void;
    onDeleteTask: (taskId: string) => void;
    onEditTask: (task: Task) => void;
}

function TaskList( {tasks, onToggleTask, onDeleteTask, onEditTask}: TaskListProps ) {
    if (tasks.length === 0) {
        return <p>No tasks available</p>;
    }

    const handleDeleteTask = (task: Task) => {
        Swal.fire({
            title: '¿Estás seguro?',
            text: 'Esta acción no se puede deshacer.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                onDeleteTask(task.id);
                Swal.fire({
                    title: '¡Eliminado!',
                    text: `La tarea "${task.title}" ha sido eliminada.`,
                    icon: 'success',
                    timer: 2000,
                    showConfirmButton: false
                });
            }
        });
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

export default TaskList;