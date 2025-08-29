import { useState } from 'react';
import type { Idea } from '../../../shared/types/Idea';
import { DateUtils } from '../../../shared';

interface UseIdeasMainViewProps {
  ideas: Idea[];
}

export function useIdeasMainView({ ideas }: UseIdeasMainViewProps) {
  const [filter, setFilter] = useState<'all' | 'inbox' | 'processing' | 'promoted' | 'archived'>('all');
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'priority' | 'title'>('newest');

  const generalIdeas = ideas.filter(idea => !idea.projectId);

  const filteredIdeas = generalIdeas.filter(idea => {
    if (filter === 'all') return true;
    return idea.status === filter;
  });

  const sortedIdeas = (() => {
    const sorted = [...filteredIdeas];

    switch (sortBy) {
      case 'newest':
        return DateUtils.sortByDate(sorted, 'createdAt', 'desc');
      case 'oldest':
        return DateUtils.sortByDate(sorted, 'createdAt', 'asc');
      case 'priority': {
        const priorityOrder = { high: 3, medium: 2, low: 1 };
        return sorted.sort((a, b) => priorityOrder[b.priority] - priorityOrder[a.priority]);
      }
      case 'title':
        return sorted.sort((a, b) => a.title.localeCompare(b.title));
      default:
        return sorted;
    }
  })();

  const stats = {
    total: generalIdeas.length,
    inbox: generalIdeas.filter(idea => idea.status === 'inbox').length,
    processing: generalIdeas.filter(idea => idea.status === 'processing').length,
    promoted: generalIdeas.filter(idea => idea.status === 'promoted').length,
    archived: generalIdeas.filter(idea => idea.status === 'archived').length,
  };

  return {
    filter,
    setFilter,
    sortBy,
    setSortBy,
    sortedIdeas,
    stats,
  };
}
