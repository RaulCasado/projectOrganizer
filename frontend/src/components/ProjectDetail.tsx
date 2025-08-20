import type { Project } from '../types/Project';
import type { Task } from '../types/Task';
import TaskList from './TaskList';
import TaskForm from './TaskForm';
import { useState } from 'react';
import TaskFilters from './TaskFilters';
import MVPSection from './MVPSection';
import type { BlogEntry } from '../types/Project';
import ProjectBlog from './ProjectBlog';
import ProjectResources from './ProjectResources';
import type { Resource } from '../types/Project';

interface ProjectDetailProps {
  project: Project;
  onUpdateProject: (updatedProject: Project) => void;
}

function ProjectDetail({ project, onUpdateProject }: ProjectDetailProps) {

  const [editingTask, setEditingTask] = useState<Task | undefined>(undefined);
  const [statusFilter, setStatusFilter] = useState<'all' | 'completed' | 'pending'>('all');
  const [priorityFilter, setPriorityFilter] = useState<'all' | 'low' | 'medium' | 'high'>('all');
  const [searchText, setSearchText] = useState('');

  const getFilteredTasks = () => {
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
    };

  const handleUpdateResources = (resources: Resource[]) => {
    const updatedProject = {
      ...project,
      resources,
      lastActivityDate: new Date().toISOString().split('T')[0]
    };
    onUpdateProject(updatedProject);
  };

  const handleUpdateBlogEntries = (blogEntries: BlogEntry[]) => {
    onUpdateProject({
      ...project,
      blogEntries,
      lastActivityDate: new Date().toISOString().split('T')[0]
    });
  };
  const filteredTasks = getFilteredTasks();

  const handleUpdateMVP = (mvp: string) => {
    onUpdateProject({
      ...project,
      mvp
    });
  };

  const handleUpdateTask = (updatedTask: Task) => {
    const updatedTasks = (project.tasks || []).map(task =>
      task.id === updatedTask.id ? updatedTask : task
    );

    onUpdateProject({
      ...project,
      tasks: updatedTasks,
    });

    setEditingTask(undefined);
  };

  const handleCancelEdit = () => {
    setEditingTask(undefined);
  };

  const handleAddTask = (taskData: Omit<Task, 'id' | 'createdAt'>) => {
    const newTask: Task = {
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      ...taskData,
    };

    const updatedProject = {
      ...project,
      tasks: [...(project.tasks || []), newTask],
    };
    
    onUpdateProject(updatedProject);
  };

  const handleToggleTask = (taskId: string) => {
    const updatedTasks = (project.tasks || []).map(task =>
      task.id === taskId 
        ? { 
            ...task, 
            completed: !task.completed,
            completedAt: !task.completed ? new Date().toISOString() : undefined
          }
        : task
    );
    
    onUpdateProject({
      ...project,
      tasks: updatedTasks,
    });
  };

  const handleDeleteTask = (taskId: string) => {
    const updatedTasks = (project.tasks || []).filter(task => task.id !== taskId);
    onUpdateProject({
      ...project,
      tasks: updatedTasks,
    });
  };

  return (
    <div>
      <h1>{project.name}</h1>
      
      {project.stack && project.stack.length > 0 && (
        <div>
          <h3>Stack:</h3>
          <ul>
            {project.stack.map((tech, index) => (
              <li key={index}>{tech}</li>
            ))}
          </ul>
        </div>
      )}

      {project.requirements && project.requirements.length > 0 && (
        <div>
          <h3>Requirements:</h3>
          <ul>
            {project.requirements.map((req, index) => (
              <li key={index}>{req}</li>
            ))}
          </ul>
        </div>
      )}

      {project.dependencies && project.dependencies.length > 0 && (
        <div>
          <h3>Dependencies:</h3>
          <ul>
            {project.dependencies.map((dep, index) => (
              <li key={index}>{dep}</li>
            ))}
          </ul>
        </div>
      )}
      
      <MVPSection 
        mvp={project.mvp}
        onUpdateMVP={handleUpdateMVP}
      />

      <ProjectResources
        resources={project.resources}
        onUpdateResources={handleUpdateResources}
      />

      <ProjectBlog 
        blogEntries={project.blogEntries}
        onUpdateBlogEntries={handleUpdateBlogEntries}
        project={project}
      />

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
    </div>
  );
}

export default ProjectDetail;