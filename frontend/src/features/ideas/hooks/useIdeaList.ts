import { useState } from 'react';
import type { Idea } from '../../../shared/types/Idea';

interface UseIdeaListProps {
  onUpdateIdea: (idea: Idea) => void;
}

export function useIdeaList({ onUpdateIdea }: UseIdeaListProps) {
  const [expandedIdea, setExpandedIdea] = useState<string | null>(null);
  const [editingIdea, setEditingIdea] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<Idea>>({});

  const handleEditStart = (idea: Idea) => {
    setEditingIdea(idea.id);
    setEditForm(idea);
  };

  const handleEditSave = () => {
    if (editingIdea && editForm) {
      onUpdateIdea(editForm as Idea);
      setEditingIdea(null);
      setEditForm({});
    }
  };

  const handleEditCancel = () => {
    setEditingIdea(null);
    setEditForm({});
  };

  const handleStatusChange = (idea: Idea, newStatus: Idea['status']) => {
    onUpdateIdea({ ...idea, status: newStatus });
  };

  const getStatusEmoji = (status: Idea['status']) => {
    switch (status) {
      case 'inbox':
        return '📥';
      case 'processing':
        return '⚙️';
      case 'promoted':
        return '🚀';
      case 'archived':
        return '📦';
      default:
        return '📝';
    }
  };

  const getCategoryEmoji = (category: Idea['category']) => {
    switch (category) {
      case 'feature':
        return '✨';
      case 'project':
        return '🚀';
      case 'improvement':
        return '⚡';
      case 'research':
        return '🔍';
      case 'other':
        return '📝';
      default:
        return '💡';
    }
  };

  return {
    expandedIdea,
    setExpandedIdea,
    editingIdea,
    setEditingIdea,
    editForm,
    setEditForm,
    handleEditStart,
    handleEditSave,
    handleEditCancel,
    handleStatusChange,
    getStatusEmoji,
    getCategoryEmoji,
  };
}
