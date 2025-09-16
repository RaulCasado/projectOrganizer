import { SketchesGrid } from '../../sketches/components/SketchesGrid';
import { useProjectDetailContext } from '../../../contexts/useProjectDetailContext';
import styles from './SketchesSection.module.css';

function SketchesSection() {
  const {
    sketches,
    sketchesError,
    sketchCount,
    maxSketches,
    isAtLimit,
    handleEditSketch,
    handleDeleteSketch,
    handleOpenSketchModal,
  } = useProjectDetailContext();
  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <h3 className={styles.title}>
          📐 Quick Sketches ({sketchCount}/{maxSketches})
        </h3>
      </div>

      <SketchesGrid
        sketches={sketches}
        error={sketchesError}
        sketchCount={sketchCount}
        maxSketches={maxSketches}
        isAtLimit={isAtLimit}
        onEditSketch={handleEditSketch}
        onDeleteSketch={handleDeleteSketch}
        onOpenSketchModal={handleOpenSketchModal}
      />

      {isAtLimit && (
        <div className={styles.limitWarning}>
          ⚠️ Has alcanzado el límite de {maxSketches} sketches por proyecto.
          Elimina algunos para crear nuevos.
        </div>
      )}
    </section>
  );
}

export default SketchesSection;
