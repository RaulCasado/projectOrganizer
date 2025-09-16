import type { Resource } from '../../../shared/types/Project';
import { DateUtils, useNotification } from '../../../shared';
import styles from './resources.module.css';

interface ResourceListProps {
  resources: Resource[];
  getCategoryIcon: (category: Resource['category']) => string;
  onEditResource: (resource: Resource) => void;
  onDeleteResource: (resourceId: string) => void;
}

export function ResourceList({
  resources,
  getCategoryIcon,
  onEditResource,
  onDeleteResource,
}: ResourceListProps) {
  const { confirmDelete } = useNotification();

  const handleDeleteResource = async (resource: Resource) => {
    try {
      const confirmed = await confirmDelete(
        `¿Eliminar recurso "${resource.title}"?`,
        'Esta acción no se puede deshacer'
      );

      if (confirmed) {
        onDeleteResource(resource.id);
      }
    } catch (error) {
      console.error('Error deleting resource:', error);
    }
  };

  if (resources.length === 0) {
    return (
      <div className={styles.emptyState}>
        <h4 className={styles.emptyTitle}>📎 Sin recursos aún</h4>
        <p className={styles.emptyDescription}>
          Añade enlaces útiles, documentación o tutoriales para este proyecto
        </p>
      </div>
    );
  }

  return (
    <div className={styles.listContainer}>
      {resources.map(resource => (
        <div key={resource.id} className={styles.resourceCard}>
          <div className={styles.resourceContent}>
            <div className={styles.resourceInfo}>
              <h4 className={styles.resourceTitle}>
                {getCategoryIcon(resource.category)} {resource.title}
              </h4>
              <div className={styles.resourceUrl}>
                <a
                  className={styles.resourceLink}
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  🔗 {resource.url}
                </a>
              </div>
              {resource.description && (
                <p className={styles.resourceDescription}>
                  {resource.description}
                </p>
              )}
              <div className={styles.resourceDate}>
                Añadido: {DateUtils.formatShort(resource.createdAt)}
              </div>
            </div>
            <div className={styles.resourceActions}>
              <button
                className={`${styles.actionButton} ${styles.editButton}`}
                onClick={() => onEditResource(resource)}
                title="Editar recurso"
              >
                ✏️
              </button>
              <button
                className={`${styles.actionButton} ${styles.deleteButton}`}
                onClick={() => handleDeleteResource(resource)}
                title="Eliminar recurso"
              >
                🗑️
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
