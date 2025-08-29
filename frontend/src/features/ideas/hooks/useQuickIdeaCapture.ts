import { useState } from 'react';
import type { Idea } from '../../../shared/types/Idea';

interface UseQuickIdeaCaptureProps {
  onAddIdea: (idea: Omit<Idea, 'id' | 'createdAt' | 'projectId'>) => void;
}

export function useQuickIdeaCapture({ onAddIdea }: UseQuickIdeaCaptureProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium');
  const [category, setCategory] = useState<'feature' | 'project' | 'improvement' | 'research' | 'other'>('feature');
  const [tags, setTags] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    const newIdea = {
      title: title.trim(),
      description: description.trim(),
      priority,
      category,
      status: 'inbox' as const,
      tags: tags.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0),
    };
    onAddIdea(newIdea);
    resetForm();
  };

  const handleQuickAdd = () => {
    if (!title.trim()) return;
    const quickIdea = {
      title: title.trim(),
      description: '',
      priority: 'medium' as const,
      category: 'feature' as const,
      status: 'inbox' as const,
      tags: [],
    };
    onAddIdea(quickIdea);
    setTitle('');
  };

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setPriority('medium');
    setCategory('feature');
    setTags('');
    setIsExpanded(false);
  };

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return {
    title,
    setTitle,
    description,
    setDescription,
    priority,
    setPriority,
    category,
    setCategory,
    tags,
    setTags,
    isExpanded,
    setIsExpanded,
    handleSubmit,
    handleQuickAdd,
    toggleExpanded,
  };
}
