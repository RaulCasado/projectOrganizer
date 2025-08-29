import { useState, useEffect } from 'react';
import type { Project } from '../../../shared/types';
import { useNotification } from '../../../shared';

interface UseProjectsMainViewLogicProps {
  projects: Project[];
  onAddProject: (project: Omit<Project, 'id'>) => void;
  onDeleteProject: (projectId: string) => void;
  onUpdateProject: (project: Project) => void;
}

export function useProjectsMainViewLogic({
  projects,
  onAddProject,
  onDeleteProject,
  onUpdateProject
}: UseProjectsMainViewLogicProps) {
  const [newProjectName, setNewProjectName] = useState('');
  const [newProjectStack, setNewProjectStack] = useState<string[]>([]);
  const [newProjectRequirements, setNewProjectRequirements] = useState<string[]>([]);
  const [newProjectDependencies, setNewProjectDependencies] = useState<string[]>([]);
  const [newProjectTags, setNewProjectTags] = useState<string[]>([]);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const { notifySuccess, confirmDelete } = useNotification();

  const isEditing = !!editingProject;

  const getAllTags = () => {
    const tags = new Set<string>();
    projects.forEach(project => {
      project.tags?.forEach(tag => tags.add(tag));
    });
    return Array.from(tags);
  };

  const getFilteredProjects = () => {
    if (!selectedTag) return projects;
    return projects.filter(project => project.tags?.includes(selectedTag));
  };

  useEffect(() => {
    if (editingProject) {
      setNewProjectName(editingProject.name);
      setNewProjectStack(editingProject.stack || []);
      setNewProjectRequirements(editingProject.requirements || []);
      setNewProjectDependencies(editingProject.dependencies || []);
      setNewProjectTags(editingProject.tags || []);
    } else {
      setNewProjectName('');
      setNewProjectStack([]);
      setNewProjectRequirements([]);
      setNewProjectDependencies([]);
      setNewProjectTags([]);
    }
  }, [editingProject]);

  const availableTags = getAllTags();
  const filteredProjects = getFilteredProjects();

  const handleAddProject = () => {
    if (!newProjectName) return;

    const projectData: Omit<Project, 'id'> = {
      name: newProjectName,
      stack: newProjectStack,
      requirements: newProjectRequirements,
      dependencies: newProjectDependencies,
      tags: newProjectTags,
    };

    if (editingProject) {
      onUpdateProject({ ...editingProject, ...projectData });
      setEditingProject(null);
    } else {
      onAddProject(projectData);
      setNewProjectName('');
      setNewProjectStack([]);
      setNewProjectRequirements([]);
      setNewProjectDependencies([]);
      setNewProjectTags([]);
    }
  };

  const handleDeleteProject = async (project: Project) => {
    const result = await confirmDelete('proyecto', project.name);

    if (result) {
      onDeleteProject(project.id);
      notifySuccess(`El proyecto "${project.name}" ha sido eliminado.`);
    }
  };

  return {
    newProjectName,
    setNewProjectName,
    newProjectStack,
    setNewProjectStack,
    newProjectRequirements,
    setNewProjectRequirements,
    newProjectDependencies,
    setNewProjectDependencies,
    newProjectTags,
    setNewProjectTags,
    selectedTag,
    setSelectedTag,
    editingProject,
    setEditingProject,
    isEditing,
    availableTags,
    filteredProjects,
    handleAddProject,
    handleDeleteProject,
  };
}
