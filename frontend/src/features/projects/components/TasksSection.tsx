import { TaskForm, TaskFilters, TaskList } from '../../tasks/components/';
import { useProjectDetailContext } from '../../../contexts/useProjectDetailContext';

export function TasksSection() {
  const {
    filteredTasks,
    statusFilter,
    priorityFilter,
    searchText,
    setStatusFilter,
    setPriorityFilter,
    setSearchText,
    setEditingTask,
    handleToggleTask,
    handleDeleteTask,
  } = useProjectDetailContext();

  return (
    <>
      <TaskForm />
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
