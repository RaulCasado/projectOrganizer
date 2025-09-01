import StatsCards from './StatsCards';
import ActiveProjects from './ActiveProjects';
import PopularTags from './PopularTags';
import AbandonedProjects from './AbandonedProjects';
import RecentActivity from './RecentActivity';
import QuickActions from './QuickActions';
import { useDashboardLogic } from '../hooks/useDashboardLogic';
import { useProjects } from '../../../contexts';

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