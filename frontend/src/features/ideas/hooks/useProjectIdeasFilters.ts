import { useState, useMemo } from 'react';
import type { Idea } from '../../../shared/types/Idea';
import { DateUtils } from '../../../shared';

interface UseProjectIdeasFiltersProps {
  ideas: Idea[];
}

export function useProjectIdeasFilters({ ideas }: UseProjectIdeasFiltersProps) {
  const [filter, setFilter] = useState<
    'all' | 'inbox' | 'processing' | 'promoted' | 'archived'
  >('all');
  const [sortBy, setSortBy] = useState<
    'newest' | 'oldest' | 'priority' | 'title'
  >('newest');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const availableTags = useMemo(() => {
    const allTags = ideas.flatMap(idea => idea.tags || []);
    return Array.from(new Set(allTags));
  }, [ideas]);

  const filteredIdeas = useMemo(() => {
    return ideas.filter(idea => {
      if (filter !== 'all' && idea.status !== filter) {
        return false;
      }

      if (selectedTag && !idea.tags?.includes(selectedTag)) {
        return false;
      }

      return true;
    });
  }, [ideas, filter, selectedTag]);

  const sortedIdeas = useMemo(() => {
    const sorted = [...filteredIdeas];

    switch (sortBy) {
      case 'newest':
        return DateUtils.sortByDate(sorted, 'createdAt', 'desc');
      case 'oldest':
        return DateUtils.sortByDate(sorted, 'createdAt', 'asc');
      case 'priority': {
        const priorityOrder = { high: 3, medium: 2, low: 1 };
        return sorted.sort(
          (a, b) => priorityOrder[b.priority] - priorityOrder[a.priority]
        );
      }
      case 'title':
        return sorted.sort((a, b) => a.title.localeCompare(b.title));
      default:
        return sorted;
    }
  }, [filteredIdeas, sortBy]);

  const stats = useMemo(
    () => ({
      total: ideas.length,
      inbox: ideas.filter(idea => idea.status === 'inbox').length,
      processing: ideas.filter(idea => idea.status === 'processing').length,
      promoted: ideas.filter(idea => idea.status === 'promoted').length,
      archived: ideas.filter(idea => idea.status === 'archived').length,
    }),
    [ideas]
  );

  return {
    filter,
    setFilter,
    sortBy,
    setSortBy,
    selectedTag,
    setSelectedTag,
    availableTags,
    sortedIdeas,
    stats,
    filteredCount: sortedIdeas.length,
  };
}
