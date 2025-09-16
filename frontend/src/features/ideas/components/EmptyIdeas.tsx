import styles from './ideas.module.css';

function EmptyIdeas() {
  return (
    <div className={styles.emptyState}>
      <div className={styles.emptyIcon}>💡</div>
      <h3 className={styles.emptyTitle}>No hay ideas aún</h3>
      <p className={styles.emptyMessage}>¡Captura tu primera idea arriba!</p>
    </div>
  );
}

export default EmptyIdeas;
