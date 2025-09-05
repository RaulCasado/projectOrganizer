import { useCallback } from 'react';
import { useIdeas } from './useIdeas';
import { useProjects } from './useProjects';
import type { Idea, Project } from '../shared';
import { DateUtils } from '../shared';

export function useIdeasWithProjects() {
  const ideasContext = useIdeas();
  const { addProject } = useProjects();

  const promoteToProject = useCallback(
    (idea: Idea) => {
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
        promotedToProjectId: newProject.id,
      });
    },
    [ideasContext, addProject]
  );

  return {
    ...ideasContext,
    promoteToProject,
  };
}
