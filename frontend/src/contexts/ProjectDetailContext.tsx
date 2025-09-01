import { createContext, useCallback } from 'react';
import { useProjects, useIdeas } from './index';
import { useProjectTasks, useProjectSketches } from '../features';
import { DateUtils } from '../shared';
import type { Project, BlogEntry, Resource, Idea, Task, QuickSketch } from '../shared';

interface ProjectDetailContextType {
  project: Project;
  
  ideas: Idea[];
  ideaActions: {
    addIdea: (idea: Omit<Idea, 'id' | 'createdAt'>) => void;
    updateIdea: (idea: Idea) => void;
    deleteIdea: (ideaId: string) => void;
  };
  
  editingTask: Task | undefined;
  setEditingTask: (task: Task | undefined) => void;
  statusFilter: 'all' | 'completed' | 'pending';
  setStatusFilter: (status: 'all' | 'completed' | 'pending') => void;
  priorityFilter: 'all' | 'low' | 'medium' | 'high';
  setPriorityFilter: (priority: 'all' | 'low' | 'medium' | 'high') => void;
  searchText: string;
  setSearchText: (text: string) => void;
  filteredTasks: Task[];
  handleUpdateTask: (task: Task) => void;
  handleAddTask: (task: Omit<Task, 'id' | 'createdAt'>) => void;
  handleToggleTask: (taskId: string) => void;
  handleDeleteTask: (taskId: string) => void;
  handleCancelEdit: () => void;
  
  sketches: QuickSketch[];
  editingSketch: QuickSketch | null;
  showSketchModal: boolean;
  sketchesError: string | null;
  handleOpenSketchModal: () => void;
  handleCloseSketchModal: () => void;
  handleEditSketch: (sketch: QuickSketch) => void;
  handleDeleteSketch: (sketchId: string) => void;
  sketchCount: number;
  maxSketches: number;
  isAtLimit: boolean;
  
  resources: Resource[];
  
  blogEntries: BlogEntry[];
  
  mvp: string;
  
  handleUpdateResources: (resources: Resource[]) => void;
  handleUpdateBlogEntries: (blogEntries: BlogEntry[]) => void;
  handleUpdateMVP: (mvp: string) => void;
}

const ProjectDetailContext = createContext<ProjectDetailContextType | null>(null);

export { ProjectDetailContext };

interface ProjectDetailProviderProps {
  project: Project;
  children: React.ReactNode;
}

export function ProjectDetailProvider({ project, children }: ProjectDetailProviderProps) {
  const { updateProject } = useProjects();
  const { ideas, addIdea, updateIdea, deleteIdea } = useIdeas();
  
  const taskActions = useProjectTasks(project, updateProject);
  const sketchActions = useProjectSketches(project.id);
  
  const handleUpdateResources = useCallback((resources: Resource[]) => {
    const updatedProject = {
      ...project,
      resources,
      lastActivityDate: DateUtils.dateToday()
    };
    updateProject(updatedProject);
  }, [project, updateProject]);

  const handleUpdateBlogEntries = useCallback((blogEntries: BlogEntry[]) => {
    updateProject({
      ...project,
      blogEntries,
      lastActivityDate: DateUtils.dateToday()
    });
  }, [project, updateProject]);

  const handleUpdateMVP = useCallback((mvp: string) => {
    updateProject({
      ...project,
      mvp
    });
  }, [project, updateProject]);

  const value: ProjectDetailContextType = {
    project,
    
    ideas,
    ideaActions: { addIdea, updateIdea, deleteIdea },
    
    ...taskActions,
    
    ...sketchActions,
    sketchesError: sketchActions.error,
    
    resources: project.resources || [],
    
    blogEntries: project.blogEntries || [],
    
    mvp: project.mvp || '',
    
    handleUpdateResources,
    handleUpdateBlogEntries,
    handleUpdateMVP,
  };

  return (
    <ProjectDetailContext.Provider value={value}>
      {children}
    </ProjectDetailContext.Provider>
  );
}
