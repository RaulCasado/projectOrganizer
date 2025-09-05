import type { Task } from './Task';

export type BlogEntry = {
  id: string;
  title: string;
  content: string;
  date: string;
  timeSpent?: number;
  tags?: string[];
  createdAt: string;
};

export type Resource = {
  id: string;
  title: string;
  url: string;
  description?: string;
  category: 'documentation' | 'tutorial' | 'tool' | 'inspiration' | 'other';
  createdAt: string;
};

export type Project = {
  id: string;
  name: string;
  stack?: string[];
  requirements?: string[];
  dependencies?: string[];
  tasks?: Task[];
  tags?: string[];
  resources?: Resource[];
  mvp?: string;
  blogEntries?: BlogEntry[];
  lastActivityDate?: string;
};

export type ProjectFormData = {
  name: string;
  stack: string[];
  requirements: string[];
  dependencies: string[];
  tags: string[];
};

export type ResourceFormData = {
  title: string;
  url: string;
  description: string;
  category: Resource['category'];
};
