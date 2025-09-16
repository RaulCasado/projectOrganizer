import styles from './StatsCards.module.css';

interface StatsCardsProps {
  stats: {
    totalProjects: number;
    totalTasks: number;
    completedTasks: number;
    totalBlogEntries: number;
    totalResources: number;
    totalMinutes: number;
    totalHours: number;
  };
}

function StatsCards({ stats }: StatsCardsProps) {
  const completionPercentage =
    stats.totalTasks > 0
      ? Math.round((stats.completedTasks / stats.totalTasks) * 100)
      : 0;

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h3 className={styles.cardTitle}>📂 Proyectos</h3>
        <div className={styles.cardValue}>{stats.totalProjects}</div>
      </div>

      <div className={`${styles.card} ${styles.progressCard}`}>
        <h3 className={styles.cardTitle}>✅ Tareas</h3>
        <div className={styles.cardValue}>
          {stats.completedTasks}/{stats.totalTasks}
        </div>
        <div className={styles.progressBar}>
          <div
            className={styles.progressFill}
            style={{ width: `${completionPercentage}%` }}
          />
        </div>
        <div className={styles.cardSubtext}>
          {completionPercentage}% completado
        </div>
      </div>

      <div className={styles.card}>
        <h3 className={styles.cardTitle}>📝 Blog</h3>
        <div className={styles.cardValue}>{stats.totalBlogEntries}</div>
        <div className={styles.cardSubtext}>entradas</div>
      </div>

      <div className={styles.card}>
        <h3 className={styles.cardTitle}>⏱️ Tiempo</h3>
        <div className={styles.cardValue}>{stats.totalHours}h</div>
        <div className={styles.cardSubtext}>{stats.totalMinutes} minutos</div>
      </div>
    </div>
  );
}

export default StatsCards;
