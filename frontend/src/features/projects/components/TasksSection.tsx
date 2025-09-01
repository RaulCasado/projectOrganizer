import {TaskForm} from '../../tasks/components/TaskForm';
import {TaskFilters} from '../../tasks/components/TaskFilters';
import {TaskList} from '../../tasks/components/TaskList';
import { useProjectDetailContext } from '../../../contexts/useProjectDetailContext';

export function TasksSection() {
    const {
        filteredTasks,
        statusFilter,
        priorityFilter,
        searchText,
        editingTask,
        setStatusFilter,
        setPriorityFilter,
        setSearchText,
        setEditingTask,
        handleAddTask,
        handleUpdateTask,
        handleToggleTask,
        handleDeleteTask,
        handleCancelEdit,
    } = useProjectDetailContext();
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

