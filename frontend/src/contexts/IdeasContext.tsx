import { createContext, useCallback } from 'react';
import type { Idea } from '../shared/types/Idea';
import { useLocalStorage } from '../shared/hooks/useLocalStorage';
import { DateUtils } from '../shared/utils/dateUtils';

interface IdeasContextType {
  ideas: Idea[];
  addIdea: (ideaData: Omit<Idea, 'id' | 'createdAt'>) => void;
  updateIdea: (updatedIdea: Idea) => void;
  deleteIdea: (ideaId: string) => void;
  getIdea: (ideaId: string) => Idea | undefined;
  getIdeasByProject: (projectId: string) => Idea[];
}

const IdeasContext = createContext<IdeasContextType | null>(null);

export { IdeasContext };

interface IdeasProviderProps {
  children: React.ReactNode;
}

export function IdeasProvider({ children }: IdeasProviderProps) {
  const [ideas, setIdeas] = useLocalStorage<Idea[]>('ideas', []);

  const addIdea = useCallback(
    (ideaData: Omit<Idea, 'id' | 'createdAt'>) => {
      const newIdea: Idea = {
        id: crypto.randomUUID(),
        createdAt: DateUtils.timestampNow(),
        ...ideaData,
      };
      setIdeas(prev => [...prev, newIdea]);
    },
    [setIdeas]
  );

  const updateIdea = useCallback(
    (updatedIdea: Idea) => {
      setIdeas(prev =>
        prev.map(idea => (idea.id === updatedIdea.id ? updatedIdea : idea))
      );
    },
    [setIdeas]
  );

  const deleteIdea = useCallback(
    (ideaId: string) => {
      setIdeas(prev => prev.filter(idea => idea.id !== ideaId));
    },
    [setIdeas]
  );

  const getIdea = useCallback(
    (ideaId: string) => {
      return ideas.find(idea => idea.id === ideaId);
    },
    [ideas]
  );

  const getIdeasByProject = useCallback(
    (projectId: string) => {
      return ideas.filter(idea => idea.projectId === projectId);
    },
    [ideas]
  );

  const value: IdeasContextType = {
    ideas,
    addIdea,
    updateIdea,
    deleteIdea,
    getIdea,
    getIdeasByProject,
  };

  return (
    <IdeasContext.Provider value={value}>{children}</IdeasContext.Provider>
  );
}
