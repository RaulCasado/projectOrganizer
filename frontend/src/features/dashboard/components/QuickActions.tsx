import { Link } from 'react-router-dom';
import type { Project } from '../../../shared/types';
import styles from './QuickActions.module.css';

interface QuickActionsProps {
  projectsWithoutMVP: Project[];
  totalResources: number;
}

function QuickActions({
  projectsWithoutMVP,
  totalResources,
}: QuickActionsProps) {
  return (
    <div className={styles.container}>
      <h3 className={styles.title}>🚀 Acciones rápidas</h3>
      <div className={styles.actionsContainer}>
        <div className={styles.actionItem}>
          <Link to="/" className={styles.actionLink}>
            ➕ Nuevo Proyecto
          </Link>
        </div>

        {projectsWithoutMVP.length > 0 && (
          <div className={`${styles.actionItem} ${styles.warning}`}>
            <span className={styles.actionText}>
              🎯 {projectsWithoutMVP.length} proyectos sin MVP
            </span>
          </div>
        )}

        <div className={`${styles.actionItem} ${styles.info}`}>
          <span className={styles.actionText}>
            📊 {totalResources} recursos guardados
          </span>
        </div>
      </div>
    </div>
  );
}

export default QuickActions;
