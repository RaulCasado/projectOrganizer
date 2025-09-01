import { useCallback } from 'react';
import { useIdeas } from './useIdeas';
import { useProjects } from './useProjects';
import type { Idea } from '../shared/types/Idea';
import type { Project } from '../shared/types/Project';
import { DateUtils } from '../shared/utils/dateUtils';

export function useIdeasWithProjects() {
  const ideasContext = useIdeas();
  const { addProject } = useProjects();
  
  const promoteToProject = useCallback((idea: Idea) => {
    const newProject: Project = {
      id: crypto.randomUUID(),
      name: idea.title,
      tags: idea.tags,
      lastActivityDate: DateUtils.dateToday(),
      tasks: [],
      blogEntries: [],
      resources: [],
      mvp: idea.description.length > 50 ? idea.description : undefined,
    };
    
    addProject(newProject);
    
    ideasContext.updateIdea({
      ...idea,
      status: 'promoted' as const,
      promotedToProjectId: newProject.id
    });
  }, [ideasContext, addProject]);

  return {
    ...ideasContext,
    promoteToProject
  };
}
