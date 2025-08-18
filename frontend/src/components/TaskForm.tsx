import { useState, useEffect } from 'react';
import type { Task } from '../types/Task';

interface TaskFormProps {
    onAddTask?: (task: Omit<Task, 'id' | 'createdAt'>) => void;
    onUpdateTask?: (task: Task) => void;
    editingTask?: Task;
    onCancel?: () => void;
}

function TaskForm({ onAddTask, onUpdateTask, editingTask, onCancel }: TaskFormProps) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('low');
    const priorityOptions = ['low', 'medium', 'high'];

    const isEditing = !!editingTask;

    useEffect(() => {
        if (editingTask) {
            setTitle(editingTask.title);
            setDescription(editingTask.description || '');
            setPriority(editingTask.priority || 'low');
        } else {
            setTitle('');
            setDescription('');
            setPriority('low');
        }
    }, [editingTask]);

    const handleSubmit = () => {
        if (!title.trim()) return;

        if (isEditing && onUpdateTask && editingTask) {
            onUpdateTask({
                ...editingTask,
                title: title.trim(),
                description: description.trim() || undefined,
                priority,
            });
        } else if (onAddTask) {
            onAddTask({
                title: title.trim(),
                description: description.trim() || undefined,
                completed: false,
                priority,
            });
            setTitle('');
            setDescription('');
            setPriority('low');
        }
    };

    return (
        <div>
            <h3>{isEditing ? 'Editar Tarea' : 'Añadir Nueva Tarea'}</h3>
            <input
                type="text"
                placeholder="Título de la tarea"
                value={title}
                onChange={e => setTitle(e.target.value)}
            />
            <select value={priority} onChange={e => setPriority(e.target.value as 'low' | 'medium' | 'high')}>
                {priorityOptions.map(option => (
                    <option key={option} value={option}>
                        {option.charAt(0).toUpperCase() + option.slice(1)}
                    </option>
                ))}
            </select>
            <textarea
                placeholder="Descripción (opcional)"
                value={description}
                onChange={e => setDescription(e.target.value)}
            />
            <button onClick={handleSubmit}>
                {isEditing ? 'Actualizar Tarea' : 'Añadir Tarea'}
            </button>
            {isEditing && onCancel && (
                <button onClick={onCancel}>Cancelar</button>
            )}
        </div>
    );
}

export default TaskForm;