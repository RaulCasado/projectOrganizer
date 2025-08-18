import type { Task } from '../types/Task';

interface TaskDetailProps {
    task : Task;
}

function TaskDetail({ task }: TaskDetailProps) {
    return (
        <div>
            <h2>{task.title}</h2>
            <p>{task.description}</p>
            <p>Status: {task.completed ? 'Completed' : 'In Progress'}</p>
        </div>
    );
}

export default TaskDetail;