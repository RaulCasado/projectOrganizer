import { TaskForm, TaskFilters, TaskList } from '../../tasks/components';
import type { Task } from '../../../shared/types';

interface TasksSectionProps {
    editingTask: Task | undefined;
    setEditingTask: (task: Task | undefined) => void;
    statusFilter: 'all' | 'completed' | 'pending';
    setStatusFilter: (filter: 'all' | 'completed' | 'pending') => void;
    priorityFilter: 'all' | 'low' | 'medium' | 'high';
    setPriorityFilter: (filter: 'all' | 'low' | 'medium' | 'high') => void;
    searchText: string;
    setSearchText: (text: string) => void;
    filteredTasks: Task[];
    handleUpdateTask: (task: Task) => void;
    handleAddTask: (taskData: Omit<Task, 'id' | 'createdAt'>) => void;
    handleToggleTask: (taskId: string) => void;
    handleDeleteTask: (taskId: string) => void;
    handleCancelEdit: () => void;
}

function TasksSection({
    editingTask,
    setEditingTask,
    statusFilter,
    setStatusFilter,
    priorityFilter,
    setPriorityFilter,
    searchText,
    setSearchText,
    filteredTasks,
    handleUpdateTask,
    handleAddTask,
    handleToggleTask,
    handleDeleteTask,
    handleCancelEdit,
}: TasksSectionProps) {
    return (
        <>
            <TaskForm
                onAddTask={editingTask ? undefined : handleAddTask}
                onUpdateTask={editingTask ? handleUpdateTask : undefined}
                editingTask={editingTask}
                onCancel={editingTask ? handleCancelEdit : undefined}
            />
            <TaskFilters
                statusFilter={statusFilter}
                priorityFilter={priorityFilter}
                searchText={searchText}
                onStatusFilterChange={setStatusFilter}
                onPriorityFilterChange={setPriorityFilter}
                onSearchTextChange={setSearchText}
            />
            <TaskList
                tasks={filteredTasks}
                onToggleTask={handleToggleTask}
                onDeleteTask={handleDeleteTask}
                onEditTask={setEditingTask}
            />
        </>
    );
}

export default TasksSection;
