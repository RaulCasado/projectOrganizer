import { useState, useCallback } from 'react';
import type { QuickSketch } from '../../../shared/types/QuickSketch';
import SketchStorageService from '../../../shared/services/sketchStorageService';

export function useProjectSketches(projectId: string) {
  const [sketches, setSketches] = useState<QuickSketch[]>(() =>
    SketchStorageService.getSketchesByProject(projectId)
  );
  const [editingSketch, setEditingSketch] = useState<QuickSketch | null>(null);
  const [showSketchModal, setShowSketchModal] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const refreshSketches = useCallback(() => {
    try {
      setSketches(SketchStorageService.getSketchesByProject(projectId));
      setError(null);
    } catch {
      setError('Error cargando sketches');
    }
  }, [projectId]);

  const handleOpenSketchModal = useCallback(() => {
    setShowSketchModal(true);
  }, []);

  const handleCloseSketchModal = useCallback(() => {
    setShowSketchModal(false);
    setEditingSketch(null);
  }, []);

  const handleEditSketch = useCallback((sketch: QuickSketch) => {
    setEditingSketch(sketch);
    setShowSketchModal(true);
  }, []);

  const handleDeleteSketch = useCallback((sketchId: string) => {
    SketchStorageService.deleteSketch(sketchId);
    refreshSketches();
  }, [refreshSketches]);

  return {
    sketches,
    editingSketch,
    showSketchModal,
    error,
    refreshSketches,
    handleOpenSketchModal,
    handleCloseSketchModal,
    handleEditSketch,
    handleDeleteSketch,
    sketchCount: sketches.length,
    maxSketches: 20,
    isAtLimit: sketches.length >= 20,
  };
}
