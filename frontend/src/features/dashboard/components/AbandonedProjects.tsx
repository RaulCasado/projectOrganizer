import { Link } from 'react-router-dom';
import type { Project } from '../../../shared/types';
import { DateUtils } from '../../../shared';
import styles from './AbandonedProjects.module.css';

interface AbandonedProjectsProps {
  abandonedProjects: Project[];
}

function AbandonedProjects({ abandonedProjects }: AbandonedProjectsProps) {
  if (abandonedProjects.length === 0) return null;

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>⚠️ Proyectos que necesitan atención</h3>
      {abandonedProjects.map(project => (
        <div key={project.id} className={styles.projectItem}>
          <div className={styles.projectContent}>
            <Link to={`/project/${project.id}`} className={styles.projectLink}>
              💔 {project.name}
            </Link>
            <div className={styles.warningText}>
              Sin actividad hace{' '}
              <span className={styles.daysCount}>
                {DateUtils.daysSince(project.lastActivityDate!)}
              </span>{' '}
              días
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default AbandonedProjects;
