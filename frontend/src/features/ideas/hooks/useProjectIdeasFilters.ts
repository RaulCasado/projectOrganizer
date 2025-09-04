import { useState, useMemo } from 'react';
import type { Idea } from '../../../shared/types/Idea';
import { DateUtils } from '../../../shared';

interface UseProjectIdeasFiltersProps {
  ideas: Idea[];
}

export function useProjectIdeasFilters({ ideas }: UseProjectIdeasFiltersProps) {
  const [filter, setFilter] = useState<'all' | 'inbox' | 'processing' | 'promoted' | 'archived'>('all');
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'priority' | 'title'>('newest');

  const filteredIdeas = useMemo(() => {
    return ideas.filter(idea => {
      if (filter === 'all') return true;
      return idea.status === filter;
    });
  }, [ideas, filter]);

  const sortedIdeas = useMemo(() => {
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
  }, [filteredIdeas, sortBy]);

  const stats = useMemo(() => ({
    total: ideas.length,
    inbox: ideas.filter(idea => idea.status === 'inbox').length,
    processing: ideas.filter(idea => idea.status === 'processing').length,
    promoted: ideas.filter(idea => idea.status === 'promoted').length,
    archived: ideas.filter(idea => idea.status === 'archived').length,
  }), [ideas]);

  return {
    filter,
    setFilter,
    sortBy,
    setSortBy,
    sortedIdeas,
    stats,
    filteredCount: sortedIdeas.length,
  };
}
