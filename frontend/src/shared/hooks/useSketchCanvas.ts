import { useRef, useEffect, useState, useCallback } from 'react';
import { SKETCH_CONFIG } from '../../shared/config/sketchConfig';
import type { SketchTool } from '../../shared/types';

interface UseSketchCanvasProps {
  width?: number;
  height?: number;
  onSave?: (canvas: HTMLCanvasElement) => void;
}

export const useSketchCanvas = ({
  width = SKETCH_CONFIG.canvas.defaultWidth,
  height = SKETCH_CONFIG.canvas.defaultHeight,
  onSave,
}: UseSketchCanvasProps = {}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentTool, setCurrentTool] = useState<SketchTool>('pen');
  const [strokeColor, setStrokeColor] = useState('#000000');
  const [strokeWidth, setStrokeWidth] = useState(2);
  const [canvasHistory, setCanvasHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  const MAX_HISTORY = 20;

  const withCtx = useCallback(
    (
      fn: (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => void
    ) => {
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext('2d');
      if (canvas && ctx) {
        fn(ctx, canvas);
      }
    },
    []
  );

  const loadImageFromData = useCallback(
    async (imageData: string) => {
      try {
        const response = await fetch(imageData);
        const blob = await response.blob();
        const imageBitmap = await createImageBitmap(blob);

        withCtx((ctx, canvas) => {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(imageBitmap, 0, 0);
          imageBitmap.close();
        });
      } catch (error) {
        console.error(
          'Error loading image with ImageBitmap, falling back to Image:',
          error
        );
        const img = new Image();
        img.onload = () => {
          withCtx((ctx, canvas) => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 0, 0);
          });
        };
        img.src = imageData;
      }
    },
    [withCtx]
  );

  const saveToHistory = useCallback(() => {
    withCtx((_, canvas) => {
      const imageData = canvas.toDataURL();

      setCanvasHistory(prev => {
        const newHistory = prev.slice(0, historyIndex + 1);
        if (
          newHistory.length > 0 &&
          newHistory[newHistory.length - 1] === imageData
        ) {
          return prev;
        }

        let updatedHistory = [...newHistory, imageData];
        if (updatedHistory.length > MAX_HISTORY) {
          updatedHistory = updatedHistory.slice(
            updatedHistory.length - MAX_HISTORY
          );
        }
        return updatedHistory;
      });

      setHistoryIndex(prev => {
        const newIndex = Math.min(prev + 1, MAX_HISTORY - 1);
        return newIndex;
      });
    });
  }, [withCtx, historyIndex]);

  useEffect(() => {
    withCtx((ctx, canvas) => {
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.fillStyle = 'white';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      saveToHistory();
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    withCtx((ctx, canvas) => {
      const currentData = canvas.toDataURL();
      canvas.width = width;
      canvas.height = height;

      if (currentData && canvasHistory.length > 0) {
        loadImageFromData(currentData);
      } else {
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, width, height);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [width, height]);

  const getEventPos = useCallback(
    (
      e:
        | React.MouseEvent<HTMLCanvasElement>
        | React.TouchEvent<HTMLCanvasElement>
    ) => {
      const canvas = canvasRef.current;
      if (!canvas) return { x: 0, y: 0 };

      const rect = canvas.getBoundingClientRect();

      let clientX: number, clientY: number;

      if ('touches' in e) {
        const touch = e.touches[0] || e.changedTouches?.[0];
        if (!touch) return { x: 0, y: 0 };

        clientX = touch.clientX;
        clientY = touch.clientY;
      } else {
        clientX = e.clientX;
        clientY = e.clientY;
      }

      return {
        x: clientX - rect.left,
        y: clientY - rect.top,
      };
    },
    []
  );

  const startDrawing = useCallback(
    (
      e:
        | React.MouseEvent<HTMLCanvasElement>
        | React.TouchEvent<HTMLCanvasElement>
    ) => {
      withCtx(ctx => {
        setIsDrawing(true);
        const { x, y } = getEventPos(e);

        ctx.globalCompositeOperation =
          currentTool === 'eraser' ? 'destination-out' : 'source-over';
        ctx.strokeStyle = strokeColor;
        ctx.lineWidth =
          currentTool === 'eraser' ? strokeWidth * 2 : strokeWidth;

        ctx.beginPath();
        ctx.moveTo(x, y);
      });
    },
    [withCtx, getEventPos, currentTool, strokeColor, strokeWidth]
  );

  const draw = useCallback(
    (
      e:
        | React.MouseEvent<HTMLCanvasElement>
        | React.TouchEvent<HTMLCanvasElement>
    ) => {
      if (!isDrawing) return;
      withCtx(ctx => {
        const { x, y } = getEventPos(e);
        ctx.lineTo(x, y);
        ctx.stroke();
      });
    },
    [isDrawing, withCtx, getEventPos]
  );

  const stopDrawing = useCallback(() => {
    if (isDrawing) {
      setIsDrawing(false);
      withCtx(ctx => {
        ctx.beginPath();
        saveToHistory();
      });
    }
  }, [isDrawing, withCtx, saveToHistory]);

  const clearCanvas = useCallback(() => {
    withCtx((ctx, canvas) => {
      const currentData = canvas.toDataURL();
      ctx.fillStyle = 'white';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      const newData = canvas.toDataURL();
      if (currentData !== newData) {
        saveToHistory();
      }
    });
  }, [withCtx, saveToHistory]);

  const undo = useCallback(() => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      const imageData = canvasHistory[newIndex];
      if (imageData) {
        loadImageFromData(imageData);
        setHistoryIndex(newIndex);
      }
    }
  }, [historyIndex, canvasHistory, loadImageFromData]);

  const redo = useCallback(() => {
    if (historyIndex < canvasHistory.length - 1) {
      const newIndex = historyIndex + 1;
      const imageData = canvasHistory[newIndex];
      if (imageData) {
        loadImageFromData(imageData);
        setHistoryIndex(newIndex);
      }
    }
  }, [historyIndex, canvasHistory, loadImageFromData]);

  const saveCanvas = useCallback(() => {
    withCtx((_, canvas) => {
      if (onSave) {
        onSave(canvas);
      }
    });
  }, [withCtx, onSave]);

  const loadImage = useCallback(
    (imageData: string) => {
      loadImageFromData(imageData).then(() => {
        saveToHistory();
      });
    },
    [loadImageFromData, saveToHistory]
  );

  return {
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
    canUndo: historyIndex > 0,
    canRedo: historyIndex < canvasHistory.length - 1,
    historySize: canvasHistory.length,
    maxHistory: MAX_HISTORY,
    memoryUsage: canvasHistory.reduce((total, data) => total + data.length, 0),
  };
};
