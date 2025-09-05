import type { Project } from "../../../shared";
import { useMemo, useCallback, useState} from 'react'
import { useNotification } from "../../../shared";
import { useIdeas } from "../../../contexts";

export const useProjectsMainViewLogic = ({
  projects,
  onDeleteProject,
}: {
  projects: Project[];
  onDeleteProject: (projectId: string) => void;
}) => {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const { ideas, deleteIdea } = useIdeas();
  const { confirmDelete } = useNotification();
  const availableTags = useMemo(() => {
    const allTags = projects.flatMap(project => project.tags || []);
    return Array.from(new Set(allTags));
  }, [projects]);

  const filteredProjects = useMemo(() => {
    if (!selectedTag) return projects;
    return projects.filter(project => 
      project.tags?.includes(selectedTag)
    );
  }, [projects, selectedTag]);

  const handleDeleteProject = useCallback(async (projectId: string) => {
    const projectIdeas = ideas.filter(idea => idea.projectId === projectId);
    
    const message = projectIdeas.length > 0 
      ? `¿Eliminar proyecto y sus ${projectIdeas.length} ideas?`
      : '¿Eliminar este proyecto?';
    
    const result = await confirmDelete(message);
    
    if (result) {
      projectIdeas.forEach(idea => deleteIdea(idea.id));
      onDeleteProject(projectId);
    }
  }, [onDeleteProject, confirmDelete, ideas, deleteIdea]);

  return {
    selectedTag,
    setSelectedTag,
    availableTags,
    filteredProjects,
    handleDeleteProject,
  };
};