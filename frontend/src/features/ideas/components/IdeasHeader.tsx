import { Link } from 'react-router-dom';
import styles from './ideas.module.css';

function IdeasHeader() {
  return (
    <div className={styles.header}>
      <div className={styles.headerContent}>
        <h1 className={styles.title}>🧠 Lluvia de Ideas</h1>
        <p className={styles.subtitle}>
          Captura, organiza y convierte tus ideas en proyectos
        </p>
      </div>

      <div className={styles.navigation}>
        <Link to="/" className={styles.navLink}>
          ← Volver a Proyectos
        </Link>
        <Link to="/dashboard" className={styles.navLink}>
          📊 Dashboard
        </Link>
      </div>
    </div>
  );
}

export default IdeasHeader;
