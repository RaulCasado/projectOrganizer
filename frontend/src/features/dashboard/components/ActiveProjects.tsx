import { Link } from 'react-router-dom';
import type { Project } from '../../../shared/types';
import { DateUtils } from '../../../shared';
import styles from './ActiveProjects.module.css';

interface ActiveProjectsProps {
  activeProjects: Project[];
}

function ActiveProjects({ activeProjects }: ActiveProjectsProps) {
  return (
    <div className={styles.container}>
      <h3 className={styles.title}>🔥 Proyectos más activos</h3>
      {activeProjects.length === 0 ? (
        <p className={styles.emptyState}>No hay actividad reciente</p>
      ) : (
        activeProjects.map(project => (
          <div key={project.id} className={styles.projectItem}>
            <Link to={`/project/${project.id}`} className={styles.projectLink}>
              📂 {project.name}
            </Link>
            <span className={styles.timestamp}>
              {DateUtils.getRelativeLabel(project.lastActivityDate!)}
            </span>
          </div>
        ))
      )}
    </div>
  );
}

export default ActiveProjects;
