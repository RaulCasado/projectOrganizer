import { useState, useEffect } from 'react';
import ProjectsMainView from './features/projects/components/ProjectsMainView';
import { Routes, Route } from 'react-router-dom';
import type { Project } from './shared/types';
import type { Idea } from './shared/types/Idea';
import ProjectDetail from './features/projects/components/ProjectDetail';
import { useParams } from 'react-router-dom';
import TaskDetail from './features/tasks/components/TaskDetail';
import type { Task } from './shared/types/Task';
import Dashboard from './features/dashboard/components/Dashboard';
import { useNotifications } from './shared/hooks/useNotifications';
import IdeasMainView from './features/ideas/components/IdeasMainView';

function ProjectDetailWrapper({ 
  projects, 
  ideas,
  onUpdateProject,
  onAddIdea,
  onUpdateIdea,
  onDeleteIdea
}: { 
  projects: Project[]; 
  ideas: Idea[];
  onUpdateProject: (project: Project) => void; 
  onAddIdea: (idea: Omit<Idea, 'id' | 'createdAt'>) => void;
  onUpdateIdea: (idea: Idea) => void;
  onDeleteIdea: (ideaId: string) => void;
}) {
  const { id } = useParams<{ id: string }>();
  const project = projects.find(p => p.id === id);
  
  if (!project) {
    return <div>Proyecto no encontrado</div>;
  }
  
  return (
    <ProjectDetail 
      project={project} 
      ideas={ideas}
      onUpdateProject={onUpdateProject}
      onAddIdea={onAddIdea}
      onUpdateIdea={onUpdateIdea}
      onDeleteIdea={onDeleteIdea}
    />
  );
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

  const [ideas, setIdeas] = useState<Idea[]>(() => {
    const savedIdeas = localStorage.getItem('ideas');
    return savedIdeas ? JSON.parse(savedIdeas) : [];
  });

  useNotifications(projects);

  useEffect(() => {
    localStorage.setItem('projects', JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    localStorage.setItem('ideas', JSON.stringify(ideas));
  }, [ideas]);

  const handleAddProject = (projectData: Omit<Project, 'id'>) => {
    const newProject: Project = {
      id: crypto.randomUUID(),
      ...projectData
    };
    setProjects(prevProjects => [...prevProjects, newProject]);
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

  // ✅ Funciones para manejar ideas
  const handleAddIdea = (ideaData: Omit<Idea, 'id' | 'createdAt'>) => {
    const newIdea: Idea = {
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      ...ideaData
    };
    setIdeas(prevIdeas => [...prevIdeas, newIdea]);
  };

  const handleUpdateIdea = (updatedIdea: Idea) => {
    setIdeas(prevIdeas => 
      prevIdeas.map(idea => 
        idea.id === updatedIdea.id ? updatedIdea : idea
      )
    );
  };

  const handleDeleteIdea = (ideaId: string) => {
    setIdeas(prevIdeas => 
      prevIdeas.filter(idea => idea.id !== ideaId)
    );
  };

  const handlePromoteToProject = (idea: Idea) => {
    const newProject: Project = {
      id: crypto.randomUUID(),
      name: idea.title,
      tags: idea.tags,
      lastActivityDate: new Date().toISOString(),
      tasks: [],
      blogEntries: [],
      resources: [],
      mvp: idea.description.length > 50 ? idea.description : undefined,
    };
    
    setProjects(prevProjects => [...prevProjects, newProject]);
    
    setIdeas(prevIdeas => prevIdeas.map(i => 
      i.id === idea.id 
        ? { ...i, status: 'promoted' as const, promotedToProjectId: newProject.id }
        : i
    ));
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
          path="/ideas"
          element={<IdeasMainView 
            ideas={ideas}
            onAddIdea={handleAddIdea}
            onUpdateIdea={handleUpdateIdea}
            onDeleteIdea={handleDeleteIdea}
            onPromoteToProject={handlePromoteToProject}
          />}
        />
        <Route
          path="/project/:id"
          element={<ProjectDetailWrapper 
            projects={projects} 
            ideas={ideas}
            onUpdateProject={handleUpdateProject}
            onAddIdea={handleAddIdea}
            onUpdateIdea={handleUpdateIdea}
            onDeleteIdea={handleDeleteIdea}
          />}
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
