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
    <div>
      <h1>📊 Dashboard General</h1>

      <StatsCards stats={stats} />

      <div>
        <div>
          <ActiveProjects activeProjects={activeProjects} />
          <PopularTags popularTags={popularTags} />
        </div>

        <div>
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
