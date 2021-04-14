import React from 'react';
import { getCoordinates } from 'utils/canvas.utils';
import { DrawingCanvasProviderProps } from './canvas.type';
import { DrawingCanvasContext } from './DrawingCanvasContext';
import useCanvasEventListener from './useCanvasEventListener';
import useCanvasPaint from './useCanvasPaint';

const canvasWidth = {
  width: 512,
  height: 320,
  border: 4,
  scale: 2,
  lineScale: 2,
};

export function DrawingCanvasProvider({
  color = '#900050',
  lineSize = 4,
  disabled = false,
  canvasSize: size = canvasWidth,
  children,
}: DrawingCanvasProviderProps) {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const [isPainting, setIsPainting] = React.useState(false);

  const {
    paint,
    create,
    addLastLine,
    clear,
    undo,
    refresh,
    redo,
  } = useCanvasPaint({
    color,
    size: lineSize,
    canvasRef,
    scale: size.lineScale,
  });

  const onMouseDown = React.useCallback(
    (event: MouseEvent, isNewLine: boolean = true) => {
      const coordinates = getCoordinates(event, size.scale, canvasRef.current);
      if (!coordinates) return;
      setIsPainting(true);

      create(coordinates, isNewLine);
    },
    [canvasRef, create, size.scale],
  );

  const onMouseUp = React.useCallback(
    (event: MouseEvent) => {
      setIsPainting(false);
      const coordinate = getCoordinates(event, size.scale);
      addLastLine(coordinate);
    },
    [addLastLine, size.scale],
  );

  const onMouseEnter = React.useCallback(
    (event: MouseEvent) => {
      if (isPainting) onMouseDown(event, false);
    },
    [isPainting, onMouseDown],
  );

  const onMouseMove = React.useCallback(
    (event: MouseEvent) => {
      if (!isPainting || !canvasRef.current) return;
      const newMousePosition = getCoordinates(
        event,
        size.scale,
        canvasRef.current,
      );
      paint(newMousePosition);
    },
    [canvasRef, isPainting, paint, size.scale],
  );

  useCanvasEventListener({
    canvasRef,
    onMouseDown,
    onMouseUp,
    onMouseEnter,
    onMouseMove,
    isPainting,
    disabled,
  });

  React.useEffect(() => {
    if (!canvasRef.current) return;
    const canvas: HTMLCanvasElement = canvasRef.current;

    canvas.width = size.width * size.scale;
    canvas.height = size.height * size.scale;
    refresh();
  }, [canvasRef, refresh, size]);

  const values = React.useMemo(() => ({ clear, undo, canvasRef, redo, size }), [
    clear,
    size,
    redo,
    undo,
  ]);

  return (
    <DrawingCanvasContext.Provider value={values}>
      {children}
    </DrawingCanvasContext.Provider>
  );
}
