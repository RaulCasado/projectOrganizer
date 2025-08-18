import type { Task } from "./Task";

export type BlogEntry = {
  id: string;
  title: string;
  content: string;
  date: string;
  timeSpent?: number;
  tags?: string[];
  createdAt: string;
};

export type Project = {
  id: string;
  name: string;
  stack?: string[];
  requirements?: string[];
  dependencies?: string[];
  tasks? : Task[];
  tags?: string[];
  mvp?: string;
  blogEntries?: BlogEntry[];
  lastActivityDate?: string;
};