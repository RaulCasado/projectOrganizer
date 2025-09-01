import { createContext, useCallback } from 'react';
import type { Project } from '../shared/types/Project';
import { useLocalStorage } from '../shared/hooks/useLocalStorage';
import { DateUtils } from '../shared/utils/dateUtils';

interface ProjectsContextType {
  projects: Project[];
  addProject: (projectData: Omit<Project, 'id'>) => void;
  updateProject: (updatedProject: Project) => void;
  deleteProject: (projectId: string) => void;
  getProject: (projectId: string) => Project | undefined;
}

const ProjectsContext = createContext<ProjectsContextType | null>(null);

export { ProjectsContext };

interface ProjectsProviderProps {
  children: React.ReactNode;
}

export function ProjectsProvider({ children }: ProjectsProviderProps) {
  const [projects, setProjects] = useLocalStorage<Project[]>('projects', []);

  const addProject = useCallback((projectData: Omit<Project, 'id'>) => {
    const newProject: Project = {
      id: crypto.randomUUID(),
      lastActivityDate: DateUtils.dateToday(),
      ...projectData
    };
    setProjects(prev => [...prev, newProject]);
  }, [setProjects]);

  const updateProject = useCallback((updatedProject: Project) => {
    setProjects(prev => 
      prev.map(project => 
        project.id === updatedProject.id ? updatedProject : project
      )
    );
  }, [setProjects]);

  const deleteProject = useCallback((projectId: string) => {
    setProjects(prev => prev.filter(project => project.id !== projectId));
  }, [setProjects]);

  const getProject = useCallback((projectId: string) => {
    return projects.find(project => project.id === projectId);
  }, [projects]);

  const value: ProjectsContextType = {
    projects,
    addProject,
    updateProject,
    deleteProject,
    getProject
  };

  return (
    <ProjectsContext.Provider value={value}>
      {children}
    </ProjectsContext.Provider>
  );
}
