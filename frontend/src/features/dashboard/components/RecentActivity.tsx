import { Link } from 'react-router-dom';
import { DateUtils } from '../../../shared';

interface RecentActivityProps {
  recentActivity: Array<{
    id: string;
    title: string;
    date?: string;
    createdAt: string;
    timeSpent?: number;
    projectName: string;
    projectId: string;
  }>;
}

function RecentActivity({ recentActivity }: RecentActivityProps) {
  return (
    <div>
      <h3>📝 Actividad reciente</h3>
      {recentActivity.length === 0 ? (
        <p>No hay actividad reciente</p>
      ) : (
        recentActivity.map(entry => (
          <div key={entry.id}>
            <div>
              <Link to={`/project/${entry.projectId}`}>
                {entry.projectName}
              </Link>
            </div>
            <div>"{entry.title}"</div>
            <div>
              {DateUtils.formatShort(entry.date || entry.createdAt)}
              {entry.timeSpent && entry.timeSpent > 0 && (
                <span> • {entry.timeSpent} min</span>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default RecentActivity;
