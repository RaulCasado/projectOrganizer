import {
  createContext,
  useCallback,
  useEffect,
  useState,
  useMemo,
} from 'react';
import { useProjects, useIdeas } from './index';
import { useProjectTasks, useProjectSketches } from '../features';
import { DateUtils, useForm } from '../shared';
import type {
  Project,
  BlogEntry,
  Resource,
  Idea,
  Task,
  QuickSketch,
  TaskFormData,
  ResourceFormData,
} from '../shared';

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

  taskForm: {
    values: TaskFormData;
    errors: Record<string, string | undefined>;
    isSubmitting: boolean;
    setFieldValue: (field: keyof TaskFormData, value: string | boolean) => void;
    handleSubmit: (
      onSubmit: (data: TaskFormData) => Promise<void> | void
    ) => void;
    resetForm: () => void;
  };

  resourceForm: {
    values: ResourceFormData;
    errors: Record<string, string | undefined>;
    isSubmitting: boolean;
    setFieldValue: (field: keyof ResourceFormData, value: string) => void;
    handleSubmit: (
      onSubmit: (data: ResourceFormData) => Promise<void> | void
    ) => void;
    resetForm: () => void;
  };
  editingResource: Resource | undefined;
  setEditingResource: (resource: Resource | undefined) => void;
  handleAddResource: (resource: Omit<Resource, 'id' | 'createdAt'>) => void;
  handleUpdateResource: (resource: Resource) => void;
  handleDeleteResource: (resourceId: string) => void;

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

const ProjectDetailContext = createContext<ProjectDetailContextType | null>(
  null
);

export { ProjectDetailContext };

interface ProjectDetailProviderProps {
  project: Project;
  children: React.ReactNode;
}

export function ProjectDetailProvider({
  project,
  children,
}: ProjectDetailProviderProps) {
  const { updateProject } = useProjects();
  const { ideas, addIdea, updateIdea, deleteIdea } = useIdeas();

  const taskActions = useProjectTasks(project, updateProject);
  const sketchActions = useProjectSketches(project.id);

  const taskValidationSchema = useMemo(
    () => ({
      title: (value: string) =>
        !value.trim()
          ? 'El título es obligatorio'
          : value.length < 3
            ? 'El título debe tener al menos 3 caracteres'
            : undefined,
      description: (value: string) =>
        value.length > 500
          ? 'La descripción no puede exceder 500 caracteres'
          : undefined,
    }),
    []
  );

  const taskFormInitialValues = useMemo(
    () => ({
      title: '',
      description: '',
      priority: 'low' as const,
      completed: false,
    }),
    []
  );

  const taskForm = useForm<TaskFormData>(
    taskFormInitialValues,
    taskValidationSchema
  );

  useEffect(() => {
    if (taskActions.editingTask) {
      taskForm.resetForm({
        title: taskActions.editingTask.title,
        description: taskActions.editingTask.description || '',
        priority: taskActions.editingTask.priority,
        completed: taskActions.editingTask.completed,
      });
    } else {
      taskForm.resetForm();
    }
  }, [taskActions.editingTask]);

  const [editingResource, setEditingResource] = useState<Resource | undefined>(
    undefined
  );

  const resourceValidationSchema = useMemo(
    () => ({
      title: (value: string) =>
        !value.trim() ? 'El título es obligatorio' : undefined,
      url: (value: string) =>
        !value.trim() ? 'La URL es obligatoria' : undefined,
    }),
    []
  );

  const resourceFormInitialValues = useMemo(
    () => ({
      title: '',
      url: '',
      description: '',
      category: 'documentation' as const,
    }),
    []
  );

  const resourceForm = useForm<ResourceFormData>(
    resourceFormInitialValues,
    resourceValidationSchema
  );

  useEffect(() => {
    if (editingResource) {
      resourceForm.resetForm({
        title: editingResource.title,
        url: editingResource.url,
        description: editingResource.description || '',
        category: editingResource.category,
      });
    } else {
      resourceForm.resetForm();
    }
  }, [editingResource]);

  const handleUpdateResources = useCallback(
    (resources: Resource[]) => {
      const updatedProject = {
        ...project,
        resources,
        lastActivityDate: DateUtils.timestampNow(),
      };
      updateProject(updatedProject);
    },
    [project, updateProject]
  );

  const handleAddResource = useCallback(
    (resourceData: Omit<Resource, 'id' | 'createdAt'>) => {
      const newResource: Resource = {
        id: crypto.randomUUID(),
        createdAt: DateUtils.timestampNow(),
        ...resourceData,
      };
      const updatedResources = [...(project.resources || []), newResource];
      handleUpdateResources(updatedResources);
    },
    [project.resources, handleUpdateResources]
  );

  const handleUpdateResource = useCallback(
    (updatedResource: Resource) => {
      const updatedResources = (project.resources || []).map(resource =>
        resource.id === updatedResource.id ? updatedResource : resource
      );
      handleUpdateResources(updatedResources);
      setEditingResource(undefined);
    },
    [project.resources, handleUpdateResources]
  );

  const handleDeleteResource = useCallback(
    (resourceId: string) => {
      const updatedResources = (project.resources || []).filter(
        resource => resource.id !== resourceId
      );
      handleUpdateResources(updatedResources);
      if (editingResource?.id === resourceId) {
        setEditingResource(undefined);
      }
    },
    [project.resources, editingResource, handleUpdateResources]
  );

  const handleUpdateBlogEntries = useCallback(
    (blogEntries: BlogEntry[]) => {
      updateProject({
        ...project,
        blogEntries,
        lastActivityDate: DateUtils.dateToday(),
      });
    },
    [project, updateProject]
  );

  const handleUpdateMVP = useCallback(
    (mvp: string) => {
      updateProject({
        ...project,
        mvp,
      });
    },
    [project, updateProject]
  );

  const ideaActions = useMemo(
    () => ({
      addIdea,
      updateIdea,
      deleteIdea,
    }),
    [addIdea, updateIdea, deleteIdea]
  );

  const contextValue = useMemo(
    () => ({
      project,

      ideas,
      ideaActions,

      ...taskActions,

      taskForm,

      resourceForm,
      editingResource,
      setEditingResource,
      handleAddResource,
      handleUpdateResource,
      handleDeleteResource,

      ...sketchActions,
      sketchesError: sketchActions.error,

      resources: project.resources || [],

      blogEntries: project.blogEntries || [],

      mvp: project.mvp || '',

      handleUpdateResources,
      handleUpdateBlogEntries,
      handleUpdateMVP,
    }),
    [
      project,
      ideas,
      ideaActions,
      taskActions,
      taskForm,
      resourceForm,
      editingResource,
      handleAddResource,
      handleUpdateResource,
      handleDeleteResource,
      sketchActions,
      handleUpdateResources,
      handleUpdateBlogEntries,
      handleUpdateMVP,
    ]
  );

  return (
    <ProjectDetailContext.Provider value={contextValue}>
      {children}
    </ProjectDetailContext.Provider>
  );
}
