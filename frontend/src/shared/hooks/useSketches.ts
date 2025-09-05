import { useState, useEffect, useCallback } from 'react';
import type { QuickSketch, SketchStorageInfo } from '../types';
import sketchStorageService from '../services/sketchStorageService';

interface UseSketchesOptions {
  projectId?: string;
  autoRefresh?: boolean;
}

export const useSketches = (options: UseSketchesOptions = {}) => {
  const { projectId, autoRefresh = false } = options;

  const [sketches, setSketches] = useState<QuickSketch[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [storageInfo, setStorageInfo] = useState<SketchStorageInfo | null>(
    null
  );

  const loadSketches = useCallback(() => {
    try {
      setLoading(true);
      setError(null);

      let loadedSketches: QuickSketch[];

      if (projectId) {
        loadedSketches = sketchStorageService.getSketchesByProject(projectId);
      } else {
        loadedSketches = sketchStorageService.getAllSketches();
      }

      setSketches(loadedSketches);

      const info = sketchStorageService.getStorageInfo();
      setStorageInfo(info);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error cargando sketches');
    } finally {
      setLoading(false);
    }
  }, [projectId]);

  const createSketch = useCallback(
    async (
      canvas: HTMLCanvasElement,
      metadata: {
        name: string;
        description?: string;
        projectId?: string;
        links?: {
          linkedTasks?: string[];
          linkedIdeas?: string[];
          mentionedInBlog?: string[];
        };
      }
    ) => {
      try {
        setError(null);

        const completeMetadata = {
          name: metadata.name,
          description: metadata.description,
          projectId: metadata.projectId,
          links: {
            linkedTasks: metadata.links?.linkedTasks || [],
            linkedIdeas: metadata.links?.linkedIdeas || [],
            mentionedInBlog: metadata.links?.mentionedInBlog || [],
          },
        };

        const newSketch = sketchStorageService.saveSketch(
          canvas,
          completeMetadata
        );

        if (newSketch) {
          loadSketches();
          return newSketch;
        } else {
          throw new Error('Error creando sketch');
        }
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : 'Error creando sketch';
        setError(errorMessage);
        throw new Error(errorMessage);
      }
    },
    [loadSketches]
  );

  const deleteSketch = useCallback(
    (id: string) => {
      try {
        setError(null);
        const success = sketchStorageService.deleteSketch(id);

        if (success) {
          loadSketches();
          return true;
        } else {
          throw new Error('Error eliminando sketch');
        }
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : 'Error eliminando sketch';
        setError(errorMessage);
        return false;
      }
    },
    [loadSketches]
  );

  const exportSketch = useCallback((id: string) => {
    try {
      sketchStorageService.exportSketch(id);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Error exportando sketch';
      setError(errorMessage);
    }
  }, []);

  const getSketch = useCallback((id: string) => {
    try {
      return sketchStorageService.getSketch(id);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error obteniendo sketch');
      return null;
    }
  }, []);

  const cleanupOldSketches = useCallback(() => {
    try {
      const deleted = sketchStorageService.autoCleanup(projectId);
      if (deleted > 0) {
        loadSketches();
      }
      return deleted;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error en cleanup');
      return 0;
    }
  }, [projectId, loadSketches]);

  useEffect(() => {
    loadSketches();
  }, [loadSketches]);

  useEffect(() => {
    if (!autoRefresh) return;

    const interval = setInterval(() => {
      loadSketches();
    }, 30000);

    return () => clearInterval(interval);
  }, [autoRefresh, loadSketches]);

  const sketchCount = sketches.length;
  const maxSketches = projectId ? 5 : 10;
  const isNearLimit = sketchCount >= maxSketches - 1;
  const isAtLimit = sketchCount >= maxSketches;

  return {
    sketches,
    loading,
    error,
    storageInfo,

    sketchCount,
    maxSketches,
    isNearLimit,
    isAtLimit,

    createSketch,
    deleteSketch,
    exportSketch,
    getSketch,
    cleanupOldSketches,
    refreshSketches: loadSketches,

    clearError: () => setError(null),
  };
};
