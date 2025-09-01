import React, { createContext, useContext } from 'react';
import type { Idea } from '../shared';
import { useIdeasMainView } from '../features/ideas/hooks/useIdeasMainView';


interface IdeasMainViewContextType {
  filter: 'all' | 'inbox' | 'processing' | 'promoted' | 'archived';
  setFilter: (filter: 'all' | 'inbox' | 'processing' | 'promoted' | 'archived') => void;
  sortBy: 'newest' | 'oldest' | 'priority' | 'title';
  setSortBy: (sortBy: 'newest' | 'oldest' | 'priority' | 'title') => void;
  sortedIdeas: Idea[];
  stats: {
    total: number;
    inbox: number;
    processing: number;
    promoted: number;
    archived: number;
  };
  filteredCount: number;
}

const IdeasMainViewContext = createContext<IdeasMainViewContextType | null>(null);

export function IdeasMainViewProvider({ 
  children, 
  ideas 
}: { 
  children: React.ReactNode; 
  ideas: Idea[];
}) {
  const ideasLogic = useIdeasMainView({ ideas });
  
  const value = {
    ...ideasLogic,
    filteredCount: ideasLogic.sortedIdeas.length,
  };

  return (
    <IdeasMainViewContext.Provider value={value}>
      {children}
    </IdeasMainViewContext.Provider>
  );
}

export function useIdeasMainViewContext() {
  const context = useContext(IdeasMainViewContext);
  if (!context) {
    throw new Error('useIdeasMainViewContext must be used within IdeasMainViewProvider');
  }
  return context;
}