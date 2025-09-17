import type { QuickSketch } from '../../../shared/types/QuickSketch';
import styles from './SketchesGrid.module.css';

interface SketchesGridProps {
  sketches: QuickSketch[];
  loading?: boolean;
  error?: string | null;
  sketchCount: number;
  maxSketches: number;
  isAtLimit: boolean;
  onEditSketch: (sketch: QuickSketch) => void;
  onDeleteSketch: (sketchId: string) => void;
  onOpenSketchModal: () => void;
}

export function SketchesGrid({
  sketches,
  loading,
  error,
  sketchCount,
  maxSketches,
  isAtLimit,
  onEditSketch,
  onDeleteSketch,
  onOpenSketchModal,
}: SketchesGridProps) {
  if (loading)
    return <div className={styles.loading}>Cargando sketches...</div>;
  if (error) return <div className={styles.error}>Error: {error}</div>;

  return (
    <div className={styles.sketchesContainer}>
      <div className={styles.sketchesHeader}>
        <button
          className={`${styles.addSketchBtn} ${isAtLimit ? styles.disabled : ''}`}
          onClick={onOpenSketchModal}
          disabled={isAtLimit}
        >
          + Añadir Sketch
        </button>
        <span className={styles.sketchCount}>
          {sketchCount} / {maxSketches}
        </span>
      </div>

      {sketches.length === 0 ? (
        <div className={styles.emptyState}>
          <p>No hay sketches aún. ¡Crea el primero!</p>
        </div>
      ) : (
        <div className={styles.sketchesGrid}>
          {sketches.map(sketch => (
            <div key={sketch.id} className={styles.sketchCard}>
              <div className={styles.sketchImageContainer}>
                <img
                  src={sketch.imageData}
                  alt={sketch.name || 'Sketch'}
                  className={styles.sketchImage}
                />
              </div>
              <div className={styles.sketchInfo}>
                <h4 className={styles.sketchTitle}>
                  {sketch.name || 'Sin título'}
                </h4>
                {sketch.description && (
                  <p className={styles.sketchDescription}>
                    {sketch.description}
                  </p>
                )}
                <div className={styles.sketchActions}>
                  <button
                    className={styles.editBtn}
                    onClick={() => onEditSketch(sketch)}
                    title="Editar sketch"
                  >
                    ✏️
                  </button>
                  <button
                    className={styles.deleteBtn}
                    onClick={() => onDeleteSketch(sketch.id)}
                    title="Eliminar sketch"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
