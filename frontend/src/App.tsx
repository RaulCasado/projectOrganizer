import { useState, useEffect } from 'react';
import './App.css';
import ProjectsMainView from './components/ProjectsMainView';
import { Routes, Route } from 'react-router-dom';
import type { Project } from './types/Project';
import ProjectDetail from './components/ProjectDetail';
import { useParams } from 'react-router-dom';
import TaskDetail from './components/TaskDetail';
import type { Task } from './types/Task';
import Dashboard from './components/Dashboard';
import { useNotifications } from './hooks/useNotifications';

function ProjectDetailWrapper({ projects, onUpdateProject }: { 
    projects: Project[]; 
    onUpdateProject: (project: Project) => void; 
  }) {
  const { id } = useParams<{ id: string }>();
  const project = projects.find(p => p.id === id);
  
  if (!project) {
    return <div>Proyecto no encontrado</div>;
  }
  
  return <ProjectDetail project={project} onUpdateProject={onUpdateProject} />;
}

function TaskDetailWrapper({ projects }: { projects: Project[] }) {
  const { taskId } = useParams<{ taskId: string }>();
  
  let foundTask: Task | undefined;

  for (const project of projects) {
    const task = project.tasks?.find(t => t.id === taskId);
    if (task) {
      foundTask = task;
      break;
    }
  }
  
  if (!foundTask) {
    return <div>Tarea no encontrada</div>;
  }
  
  return <TaskDetail task={foundTask} />;
}

function App() {
  const [projects, setProjects] = useState<Project[]>(() => {
    const savedProjects = localStorage.getItem('projects');
    return savedProjects ? JSON.parse(savedProjects) : [];
  });

  useNotifications(projects);

  useEffect(() => {
    localStorage.setItem('projects', JSON.stringify(projects));
  }, [projects]);

  const handleAddProject = (projectData: Omit<Project, 'id'>) => {
    const newProject: Project = {
      id: crypto.randomUUID(),
      ...projectData
    };
    setProjects([...projects, newProject]);
  };

  const handleUpdateProject = (updatedProject: Project) => {
    setProjects(prevProjects => 
      prevProjects.map(project => 
        project.id === updatedProject.id ? updatedProject : project
      )
    );
  };

  const handleDeleteProject = (projectId: string) => {
    setProjects(prevProjects => 
      prevProjects.filter(project => project.id !== projectId)
    );
  };
  

  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={<ProjectsMainView projects={projects} 
          onAddProject={handleAddProject} onDeleteProject={handleDeleteProject} 
          onUpdateProject={handleUpdateProject} />}
        />
        <Route
          path="/project/:id"
          element={<ProjectDetailWrapper projects={projects} onUpdateProject={handleUpdateProject} />}
        />
        <Route
          path="/tasks/:taskId"
          element={<TaskDetailWrapper projects={projects} />}
        />
        <Route
          path="/dashboard"
          element={<Dashboard projects={projects} />}
        />
      </Routes>
    </div>
  );
}

export default App;
