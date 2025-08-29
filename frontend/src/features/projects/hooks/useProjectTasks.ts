import { useState, useCallback } from 'react';
import type { Task, Project } from '../../../shared/types';
import { DateUtils } from '../../../shared';

export function useProjectTasks(project: Project, onUpdateProject: (p: Project) => void) {
  const [editingTask, setEditingTask] = useState<Task | undefined>(undefined);
  const [statusFilter, setStatusFilter] = useState<'all' | 'completed' | 'pending'>('all');
  const [priorityFilter, setPriorityFilter] = useState<'all' | 'low' | 'medium' | 'high'>('all');
  const [searchText, setSearchText] = useState('');

  const getFilteredTasks = useCallback(() => {
    if (!project.tasks) return [];
    return project.tasks.filter(task => {
      if (statusFilter === 'completed' && !task.completed) return false;
      if (statusFilter === 'pending' && task.completed) return false;
      if (priorityFilter !== 'all' && task.priority !== priorityFilter) return false;
      if (searchText) {
        const searchLower = searchText.toLowerCase();
        const titleMatch = task.title.toLowerCase().includes(searchLower);
        const descriptionMatch = task.description?.toLowerCase().includes(searchLower) || false;
        if (!titleMatch && !descriptionMatch) return false;
      }
      return true;
    });
  }, [project.tasks, statusFilter, priorityFilter, searchText]);

  const handleUpdateTask = useCallback((updatedTask: Task) => {
    const updatedTasks = (project.tasks || []).map(task =>
      task.id === updatedTask.id ? updatedTask : task
    );
    onUpdateProject({ ...project, tasks: updatedTasks });
    setEditingTask(undefined);
  }, [project, onUpdateProject]);

  const handleAddTask = useCallback((taskData: Omit<Task, 'id' | 'createdAt'>) => {
    const newTask: Task = {
      id: crypto.randomUUID(),
      createdAt: DateUtils.timestampNow(),
      ...taskData,
    };
    onUpdateProject({ ...project, tasks: [...(project.tasks || []), newTask] });
  }, [project, onUpdateProject]);

  const handleToggleTask = useCallback((taskId: string) => {
    const updatedTasks = (project.tasks || []).map(task =>
      task.id === taskId
        ? {
            ...task,
            completed: !task.completed,
            completedAt: !task.completed ? DateUtils.timestampNow() : undefined,
          }
        : task
    );
    onUpdateProject({ ...project, tasks: updatedTasks });
  }, [project, onUpdateProject]);

  const handleDeleteTask = useCallback((taskId: string) => {
    const updatedTasks = (project.tasks || []).filter(task => task.id !== taskId);
    onUpdateProject({ ...project, tasks: updatedTasks });
  }, [project, onUpdateProject]);

  const handleCancelEdit = useCallback(() => {
    setEditingTask(undefined);
  }, []);

  return {
    editingTask,
    setEditingTask,
    statusFilter,
    setStatusFilter,
    priorityFilter,
    setPriorityFilter,
    searchText,
    setSearchText,
    filteredTasks: getFilteredTasks(),
    handleUpdateTask,
    handleAddTask,
    handleToggleTask,
    handleDeleteTask,
    handleCancelEdit,
  };
}