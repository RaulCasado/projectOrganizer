import { useState, useMemo } from 'react';
import type { Idea } from '../../../shared/types/Idea';
import { DateUtils } from '../../../shared';

interface UseIdeasMainViewProps {
  ideas: Idea[];
}

export function useIdeasMainView({ ideas }: UseIdeasMainViewProps) {
  const [filter, setFilter] = useState<'all' | 'inbox' | 'processing' | 'promoted' | 'archived'>('all');
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'priority' | 'title'>('newest');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const generalIdeas = ideas.filter(idea => !idea.projectId);

  const availableTags = useMemo(() => {
    const allTags = generalIdeas.flatMap(idea => idea.tags || []);
    return Array.from(new Set(allTags));
  }, [generalIdeas]);

  const filteredIdeas = useMemo(() => {
    return generalIdeas.filter(idea => {
      if (filter !== 'all' && idea.status !== filter) {
        return false;
      }
      
      if (selectedTag && !idea.tags?.includes(selectedTag)) {
        return false;
      }
      
      return true;
    });
  }, [generalIdeas, filter, selectedTag]);

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
    total: generalIdeas.length,
    inbox: generalIdeas.filter(idea => idea.status === 'inbox').length,
    processing: generalIdeas.filter(idea => idea.status === 'processing').length,
    promoted: generalIdeas.filter(idea => idea.status === 'promoted').length,
    archived: generalIdeas.filter(idea => idea.status === 'archived').length,
  }), [generalIdeas]);

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
  };
}
