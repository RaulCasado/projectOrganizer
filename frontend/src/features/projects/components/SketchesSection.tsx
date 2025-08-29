import type { QuickSketch } from '../../../shared/types';
import SketchesGrid from '../../sketches/components/SketchesGrid';

interface SketchesSectionProps {
  sketches: QuickSketch[];
  error: string | null;
  sketchCount: number;
  maxSketches: number;
  isAtLimit: boolean;
  onEditSketch: (sketch: QuickSketch) => void;
  onDeleteSketch: (sketchId: string) => void;
  onOpenSketchModal: () => void;
}

function SketchesSection({
  sketches,
  error,
  sketchCount,
  maxSketches,
  isAtLimit,
  onEditSketch,
  onDeleteSketch,
  onOpenSketchModal
}: SketchesSectionProps) {
  return (
    <section className="project-sketches">
      <div className="section-header">
        <h3>📐 Quick Sketches ({sketchCount}/{maxSketches})</h3>
      </div>

      <SketchesGrid
        sketches={sketches}
        error={error}
        sketchCount={sketchCount}
        maxSketches={maxSketches}
        isAtLimit={isAtLimit}
        onEditSketch={onEditSketch}
        onDeleteSketch={onDeleteSketch}
        onOpenSketchModal={onOpenSketchModal}
      />

      {isAtLimit && (
        <div className="limit-warning">
          ⚠️ Has alcanzado el límite de {maxSketches} sketches por proyecto.
          Elimina algunos para crear nuevos.
        </div>
      )}
    </section>
  );
}

export default SketchesSection;
