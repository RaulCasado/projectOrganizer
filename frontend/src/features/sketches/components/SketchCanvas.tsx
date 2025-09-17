import { useState, useEffect } from 'react';
import { useSketchCanvas, useSketches } from '../../../shared';
import type { SketchTool } from '../../../shared';
import { Modal } from '../../../shared';

interface SketchCanvasProps {
  isOpen: boolean;
  onClose: () => void;
  projectId?: string;
  editingSketch?: {
    id: string;
    name: string;
    imageData: string;
  };
  onSketchSaved?: () => void;
}

export function SketchCanvas({
  isOpen,
  onClose,
  projectId,
  editingSketch,
  onSketchSaved,
}: SketchCanvasProps) {
  const [sketchName, setSketchName] = useState(editingSketch?.name || '');
  const [description, setDescription] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const { createSketch, error: sketchError } = useSketches({ projectId });

  const {
    canvasRef,
    currentTool,
    setCurrentTool,
    strokeColor,
    setStrokeColor,
    strokeWidth,
    setStrokeWidth,
    isDrawing,
    startDrawing,
    draw,
    stopDrawing,
    clearCanvas,
    saveCanvas,
    loadImage,
    undo,
    redo,
    canUndo,
    canRedo,
    historySize,
    memoryUsage,
  } = useSketchCanvas({
    width: 400,
    height: 300,
    onSave: handleSave,
  });

  useEffect(() => {
    if (editingSketch?.imageData) {
      loadImage(editingSketch.imageData);
    }
  }, [editingSketch, loadImage]);

  async function handleSave(canvas: HTMLCanvasElement) {
    if (!sketchName.trim()) {
      alert('Por favor ingresa un nombre para el sketch');
      return;
    }

    try {
      setIsSaving(true);

      const metadata = {
        name: sketchName.trim(),
        description: description.trim() || undefined,
        projectId,
      };

      await createSketch(canvas, metadata, editingSketch?.id);

      setSketchName('');
      setDescription('');
      onSketchSaved?.(); // Trigger parent refresh
      onClose();
    } catch (error) {
      console.error('Error saving sketch:', error);
      alert(
        'Error guardando sketch: ' +
          (error instanceof Error ? error.message : 'Error desconocido')
      );
    } finally {
      setIsSaving(false);
    }
  }

  const handleToolChange = (tool: SketchTool) => {
    setCurrentTool(tool);
  };

  const tools: { tool: SketchTool; label: string; icon: string }[] = [
    { tool: 'pen', label: 'Pluma', icon: '✏️' },
    { tool: 'eraser', label: 'Borrador', icon: '🧽' },
    { tool: 'rectangle', label: 'Rectángulo', icon: '⬜' },
    { tool: 'circle', label: 'Círculo', icon: '⭕' },
  ];

  if (!isOpen) return null;

  return (
    <Modal
      onClose={onClose}
      title={editingSketch ? 'Editar Sketch' : 'Nuevo Sketch'}
      isOpen={isOpen}
    >
      <div className="sketch-canvas-container">
        <div className="sketch-header">
          <h3>
            {editingSketch
              ? `Editando: ${editingSketch.name}`
              : 'Nuevo Quick Sketch'}
          </h3>

          <div className="sketch-metadata">
            <small>
              History: {historySize}/20 | Memory:{' '}
              {Math.round(memoryUsage / 1024)}KB
            </small>
          </div>
        </div>

        <div className="sketch-toolbar">
          <div className="tool-group">
            <label>Herramientas:</label>
            {tools.map(({ tool, label, icon }) => (
              <button
                key={tool}
                onClick={() => handleToolChange(tool)}
                className={`tool-btn ${currentTool === tool ? 'active' : ''}`}
                title={label}
              >
                {icon}
              </button>
            ))}
          </div>

          <div className="tool-group">
            <label>Color:</label>
            <input
              type="color"
              value={strokeColor}
              onChange={e => setStrokeColor(e.target.value)}
              disabled={currentTool === 'eraser'}
            />

            <label>Grosor:</label>
            <input
              type="range"
              min="1"
              max="20"
              value={strokeWidth}
              onChange={e => setStrokeWidth(Number(e.target.value))}
            />
            <span>{strokeWidth}px</span>
          </div>

          <div className="tool-group">
            <button onClick={undo} disabled={!canUndo} title="Deshacer">
              ↶ Undo
            </button>
            <button onClick={redo} disabled={!canRedo} title="Rehacer">
              ↷ Redo
            </button>
            <button onClick={clearCanvas} title="Limpiar canvas">
              🗑️ Clear
            </button>
          </div>
        </div>

        <div className="canvas-container">
          <canvas
            ref={canvasRef}
            width={400}
            height={300}
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
            onTouchStart={e => {
              e.preventDefault();
              startDrawing(e);
            }}
            onTouchMove={e => {
              e.preventDefault();
              draw(e);
            }}
            onTouchEnd={e => {
              e.preventDefault();
              stopDrawing();
            }}
            className={`sketch-canvas ${isDrawing ? 'drawing' : ''}`}
          />
        </div>

        <div className="sketch-form">
          <div className="form-group">
            <label htmlFor="sketch-name">Nombre del sketch *</label>
            <input
              id="sketch-name"
              type="text"
              value={sketchName}
              onChange={e => setSketchName(e.target.value)}
              placeholder="ej: Login wireframe, Architecture diagram..."
              maxLength={50}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="sketch-description">Descripción (opcional)</label>
            <textarea
              id="sketch-description"
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="Breve descripción del sketch..."
              maxLength={200}
              rows={2}
            />
          </div>

          {sketchError && <div className="error-message">{sketchError}</div>}
        </div>

        <div className="sketch-footer">
          <button
            type="button"
            onClick={onClose}
            disabled={isSaving}
            className="btn-secondary"
          >
            Cancelar
          </button>

          <button
            onClick={() => saveCanvas()}
            disabled={isSaving || !sketchName.trim()}
            className="btn-primary"
          >
            {isSaving
              ? 'Guardando...'
              : editingSketch
                ? 'Actualizar'
                : 'Guardar Sketch'}
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default SketchCanvas;
