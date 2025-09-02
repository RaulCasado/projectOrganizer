import { createContext, useCallback, useState, useEffect, useRef } from 'react';
import type { Project, ProjectFormData } from '../shared/types/Project';
import { useLocalStorage } from '../shared/hooks/useLocalStorage';
import { DateUtils } from '../shared/utils/dateUtils';
import { useForm } from '../shared';

interface ProjectsContextType {
  projects: Project[];
  addProject: (projectData: Omit<Project, 'id'>) => void;
  updateProject: (updatedProject: Project) => void;
  deleteProject: (projectId: string) => void;
  getProject: (projectId: string) => Project | undefined;
  projectForm: ReturnType<typeof useForm<ProjectFormData>>;
  editingProject: Project | null;
  setEditingProject: (project: Project | null) => void;
  handleSaveProject: (projectData: ProjectFormData) => void;
}

const ProjectsContext = createContext<ProjectsContextType | null>(null);

export { ProjectsContext };

interface ProjectsProviderProps {
  children: React.ReactNode;
}

export function ProjectsProvider({ children }: ProjectsProviderProps) {
  const [projects, setProjects] = useLocalStorage<Project[]>('projects', []);
  
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  const addProject = useCallback((projectData: Omit<Project, 'id'>) => {
    const newProject: Project = {
      id: crypto.randomUUID(),
      lastActivityDate: DateUtils.timestampNow(),
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

  const projectForm = useForm<ProjectFormData>({
    name: '',
    stack: [],
    requirements: [],
    dependencies: [],
    tags: []
  }, {
    name: (value: string) =>
      !value.trim() ? 'El nombre del proyecto es obligatorio' : undefined,
  });

  const projectFormRef = useRef(projectForm);
  projectFormRef.current = projectForm;

  useEffect(() => {
    if (editingProject) {
      projectFormRef.current.setValues({
        name: editingProject.name,
        stack: editingProject.stack || [],
        requirements: editingProject.requirements || [],
        dependencies: editingProject.dependencies || [],
        tags: editingProject.tags || [],
      });
    } else {
      projectFormRef.current.setValues({
        name: '',
        stack: [],
        requirements: [],
        dependencies: [],
        tags: []
      });
    }
  }, [editingProject]);

  const handleSaveProject = useCallback(async (projectData: ProjectFormData) => {
    if (editingProject) {
      updateProject({
        ...editingProject,
        ...projectData,
        lastActivityDate: DateUtils.timestampNow(),
      });
    } else {
      addProject(projectData);
      projectFormRef.current.resetForm();
    }
    setEditingProject(null);
  }, [editingProject, updateProject, addProject]);

  const value: ProjectsContextType = {
    projects,
    addProject,
    updateProject,
    deleteProject,
    getProject,
    projectForm,
    editingProject,
    setEditingProject,
    handleSaveProject,
  };

  return (
    <ProjectsContext.Provider value={value}>
      {children}
    </ProjectsContext.Provider>
  );
}