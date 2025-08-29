import type { Project } from '../../../shared/types';
import { DateUtils } from '../../../shared';

interface UseDashboardLogicProps {
  projects: Project[];
}

export function useDashboardLogic({ projects }: UseDashboardLogicProps) {
  const getTotalStats = () => {
    const totalTasks = projects.flatMap(p => p.tasks || []).length;
    const completedTasks = projects.flatMap(p => p.tasks || []).filter(t => t.completed).length;
    const totalBlogEntries = projects.flatMap(p => p.blogEntries || []).length;
    const totalResources = projects.flatMap(p => p.resources || []).length;

    const totalMinutes = projects
      .flatMap(p => p.blogEntries || [])
      .reduce((sum, entry) => sum + (entry.timeSpent || 0), 0);

    return {
      totalProjects: projects.length,
      totalTasks,
      completedTasks,
      totalBlogEntries,
      totalResources,
      totalMinutes,
      totalHours: Math.round(totalMinutes / 60 * 10) / 10
    };
  };

  const getActiveProjects = () => {
    return DateUtils.sortByDate(
      DateUtils.filterRecentDays(projects, 7, 'lastActivityDate'),
      'lastActivityDate',
      'desc'
    ).slice(0, 5);
  };

  const getAbandonedProjects = () => {
    return projects
      .filter(p => p.lastActivityDate && DateUtils.isOlderThan(p.lastActivityDate, 7))
      .sort((a, b) => DateUtils.daysSince(a.lastActivityDate!) - DateUtils.daysSince(b.lastActivityDate!))
      .slice(0, 3);
  };

  const getPopularTags = () => {
    const tagCounts: { [key: string]: number } = {};

    projects.forEach(project => {
      project.tags?.forEach(tag => {
        if (tag.trim()) {
          tagCounts[tag.trim()] = (tagCounts[tag.trim()] || 0) + 1;
        }
      });
    });

    return Object.entries(tagCounts)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 8);
  };

  const getRecentActivity = () => {
    const allEntries = projects.flatMap(project =>
      (project.blogEntries || []).map(entry => ({
        ...entry,
        projectName: project.name,
        projectId: project.id
      }))
    );

    const entriesWithDates = allEntries.map(entry => ({
        ...entry,
        sortDate: entry.date || entry.createdAt
      }));

      return DateUtils.sortByDate(entriesWithDates, 'sortDate', 'desc').slice(0, 5);
  };

  const getProjectsWithoutMVP = () => {
    return projects.filter(p => !p.mvp || p.mvp.trim() === '');
  };

  const stats = getTotalStats();
  const activeProjects = getActiveProjects();
  const abandonedProjects = getAbandonedProjects();
  const popularTags = getPopularTags();
  const recentActivity = getRecentActivity();
  const projectsWithoutMVP = getProjectsWithoutMVP();

  return {
    stats,
    activeProjects,
    abandonedProjects,
    popularTags,
    recentActivity,
    projectsWithoutMVP,
  };
}
