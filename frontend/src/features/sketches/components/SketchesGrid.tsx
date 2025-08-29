import type { QuickSketch } from '../../../shared/types/QuickSketch';

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

function SketchesGrid({
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
    if (loading) return <div>Cargando sketches...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            <div>
                <button onClick={onOpenSketchModal} disabled={isAtLimit}>
                    Añadir Sketch
                </button>
                <span>{sketchCount} / {maxSketches}</span>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
                {sketches.map(sketch => (
                    <div key={sketch.id} style={{ border: '1px solid #ccc', padding: '8px' }}>
                        <img src={sketch.imageData} alt={sketch.name || 'Sketch'} style={{ width: 100, height: 100, objectFit: 'cover' }} />
                        <div>
                            <button onClick={() => onEditSketch(sketch)}>Editar</button>
                            <button onClick={() => onDeleteSketch(sketch.id)}>Eliminar</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default SketchesGrid;
