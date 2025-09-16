import { Link } from 'react-router-dom';
import type { Project } from '../../../shared/types';
import { DateUtils } from '../../../shared';
import styles from './projects.module.css';

interface ProjectListProps {
  projects: Project[];
  onEditProject: (project: Project) => void;
  onDeleteProject: (projectId: string) => void;
  selectedTag: string | null;
  setSelectedTag: (tag: string | null) => void;
}

function ProjectList({
  projects,
  onEditProject,
  onDeleteProject,
  selectedTag,
  setSelectedTag,
}: ProjectListProps) {
  return (
    <div className={styles.projectsGrid}>
      {projects.length === 0 ? (
        <div className={styles.emptyState}>
          <p>No projects found.</p>
        </div>
      ) : (
        projects.map(project => (
          <div key={project.id} className={styles.projectCard}>
            <div className={styles.cardHeader}>
              <div className={styles.projectContent}>
                <Link
                  to={`/project/${project.id}`}
                  className={styles.projectTitle}
                >
                  <h2>📂 {project.name}</h2>
                </Link>

                {project.tags && project.tags.length > 0 && (
                  <div className={styles.tagsContainer}>
                    {project.tags.map((tag, index) => (
                      <button
                        key={index}
                        className={`${styles.tagButton} ${selectedTag === tag ? styles.selected : ''}`}
                        onClick={e => {
                          e.preventDefault();
                          setSelectedTag(selectedTag === tag ? null : tag);
                        }}
                        title={
                          selectedTag === tag
                            ? `Quitar filtro de ${tag}`
                            : `Filtrar por ${tag}`
                        }
                      >
                        🏷️ {tag}
                      </button>
                    ))}
                  </div>
                )}

                {project.stack && project.stack.length > 0 && (
                  <div className={styles.stackInfo}>
                    🛠️ Stack: {project.stack.join(', ')}
                  </div>
                )}

                {project.lastActivityDate && (
                  <div className={styles.lastActivity}>
                    📅 Última actividad:{' '}
                    {DateUtils.formatShort(project.lastActivityDate)}
                  </div>
                )}
              </div>

              <div className={styles.cardActions}>
                <button
                  className={`${styles.actionButton} ${styles.editButton}`}
                  onClick={() => onEditProject(project)}
                >
                  ✏️ Editar
                </button>
                <button
                  className={`${styles.actionButton} ${styles.deleteButton}`}
                  onClick={() => onDeleteProject(project.id)}
                >
                  🗑️ Eliminar
                </button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default ProjectList;
