export type Idea = {
  id: string;
  title: string;
  description: string;
  tags: string[];
  priority: 'low' | 'medium' | 'high';
  category: 'feature' | 'project' | 'improvement' | 'research' | 'other';
  status: 'inbox' | 'processing' | 'promoted' | 'archived';
  createdAt: string;
  projectId?: string;
  promotedToProjectId?: string;
};

export type IdeaFormData = {
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  category: 'feature' | 'project' | 'improvement' | 'research' | 'other';
  tags: string;
};
