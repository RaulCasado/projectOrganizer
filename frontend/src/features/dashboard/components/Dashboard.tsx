import { useDashboardLogic } from '../hooks/useDashboardLogic';
import { useProjects } from '../../../contexts';
import {
  StatsCards,
  ActiveProjects,
  PopularTags,
  AbandonedProjects,
  RecentActivity,
  QuickActions,
} from './';
import styles from './Dashboard.module.css';

function Dashboard() {
  const { projects } = useProjects();
  const {
    stats,
    activeProjects,
    abandonedProjects,
    popularTags,
    recentActivity,
    projectsWithoutMVP,
  } = useDashboardLogic({ projects });

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>📊 Dashboard General</h1>

      <StatsCards stats={stats} />

      <div className={styles.grid}>
        <div className={styles.gridItem}>
          <ActiveProjects activeProjects={activeProjects} />
          <PopularTags popularTags={popularTags} />
        </div>

        <div className={styles.gridItem}>
          <AbandonedProjects abandonedProjects={abandonedProjects} />
          <RecentActivity recentActivity={recentActivity} />
        </div>
      </div>

      <QuickActions
        projectsWithoutMVP={projectsWithoutMVP}
        totalResources={stats.totalResources}
      />
    </div>
  );
}

export default Dashboard;
