import type { Project } from "../../../shared";
import { useMemo, useCallback, useState} from 'react'
import { useNotification } from "../../../shared";
export const useProjectsMainViewLogic = ({
  projects,
  onDeleteProject,
}: {
  projects: Project[];
  onDeleteProject: (projectId: string) => void;
}) => {
  const [selectedTag, setSelectedTag] = useState<string | null>('all');
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const { confirmDelete } = useNotification();
  const availableTags = useMemo(() => {
    const allTags = projects.flatMap(project => project.tags || []);
    return ['all', ...Array.from(new Set(allTags))];
  }, [projects]);

  const filteredProjects = useMemo(() => {
    if (!selectedTag || selectedTag === 'all') return projects;
    return projects.filter(project => 
      project.tags?.includes(selectedTag)
    );
  }, [projects, selectedTag]);

  const handleDeleteProject = useCallback(async (projectId: string) => {
   const result = await confirmDelete('Are you sure you want to delete this project?');
   if (result) {
     onDeleteProject(projectId);
   }
  }, [onDeleteProject, confirmDelete]);

  return {
    selectedTag,
    setSelectedTag,
    editingProject,
    setEditingProject,
    availableTags,
    filteredProjects,
    handleDeleteProject,
  };
};