import { useProjectDetailContext } from '../../../contexts/useProjectDetailContext';
import styles from './ProjectOverview.module.css';

function ProjectOverview() {
  const { project } = useProjectDetailContext();
  return (
    <div className={styles.container}>
      <h1 className={styles.projectName}>{project.name}</h1>

      <div className={styles.sectionsGrid}>
        {project.stack && project.stack.length > 0 && (
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>🛜️ Stack:</h3>
            <ul className={styles.list}>
              {project.stack.map((tech, index) => (
                <li key={index} className={styles.listItem}>
                  {tech}
                </li>
              ))}
            </ul>
          </div>
        )}

        {project.requirements && project.requirements.length > 0 && (
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>📋 Requirements:</h3>
            <ul className={styles.list}>
              {project.requirements.map((req, index) => (
                <li key={index} className={styles.listItem}>
                  {req}
                </li>
              ))}
            </ul>
          </div>
        )}

        {project.dependencies && project.dependencies.length > 0 && (
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>📦 Dependencies:</h3>
            <ul className={styles.list}>
              {project.dependencies.map((dep, index) => (
                <li key={index} className={styles.listItem}>
                  {dep}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {project.tags && project.tags.length > 0 && (
        <div className={styles.tagsSection}>
          <h3 className={styles.sectionTitle}>🏷️ Tags:</h3>
          <div className={styles.tagsContainer}>
            {project.tags.map((tag, index) => (
              <span key={index} className={styles.tag}>
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default ProjectOverview;
