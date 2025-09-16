import { Link } from 'react-router-dom';
import { DateUtils } from '../../../shared';
import styles from './RecentActivity.module.css';

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
    <div className={styles.container}>
      <h3 className={styles.title}>📝 Actividad reciente</h3>
      {recentActivity.length === 0 ? (
        <p className={styles.emptyState}>No hay actividad reciente</p>
      ) : (
        recentActivity.map(entry => (
          <div key={entry.id} className={styles.activityItem}>
            <div className={styles.projectSection}>
              <Link
                to={`/project/${entry.projectId}`}
                className={styles.projectLink}
              >
                {entry.projectName}
              </Link>
            </div>
            <div className={styles.activityTitle}>"{entry.title}"</div>
            <div className={styles.activityMeta}>
              {DateUtils.formatShort(entry.date || entry.createdAt)}
              {entry.timeSpent && entry.timeSpent > 0 && (
                <span className={styles.timeSpent}>{entry.timeSpent} min</span>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default RecentActivity;
