import { useIdeasMainViewContext } from '../../../contexts/IdeasMainViewContext';
import styles from './ideas.module.css';

function IdeasStats() {
  const { stats } = useIdeasMainViewContext();

  return (
    <div className={styles.statsContainer}>
      <h3 className={styles.statsTitle}>📊 Estadísticas</h3>
      <div className={styles.statsGrid}>
        <div className={styles.statItem}>📥 Inbox: {stats.inbox}</div>
        <div className={styles.statItem}>⚙️ Procesando: {stats.processing}</div>
        <div className={styles.statItem}>🚀 Promovidas: {stats.promoted}</div>
        <div className={styles.statItem}>📦 Archivadas: {stats.archived}</div>
        <div className={styles.statItem}>🔢 Total: {stats.total}</div>
      </div>
    </div>
  );
}

export default IdeasStats;
