import React from 'react';
import { getCoordinates } from 'utils/canvas.utils';
import { DrawingCanvasProviderProps } from './canvas.type';
import { DrawingCanvasContext } from './DrawingCanvasContext';
import useCanvasEventListener from './useCanvasEventListener';
import useCanvasPaint from './useCanvasPaint';

// TODO: clean scale, lineScale and border
const canvasWidth = {
  width: 512,
  height: 320,
  border: 4,
  scale: 2,
  lineScale: 2,
};

const ratio = 1.6;

export function DrawingCanvasProvider({
  color = '#900050',
  lineSize = 4,
  disabled = false,
  canvasSize: size = canvasWidth,
  children,
}: DrawingCanvasProviderProps) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [currentSize, setCurrentSize] = React.useState(size);

  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const [isPainting, setIsPainting] = React.useState(false);

  React.useEffect(() => {
    function onResize() {
      const newWidth = canvasRef.current?.parentElement?.parentElement?.getBoundingClientRect()
        .width;
      if (!newWidth) return;
      const newHeight = newWidth / ratio;
      console.log(newWidth, newHeight);
    }

    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [currentSize]);

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
      const coordinates = getCoordinates(
        event,
        currentSize.scale,
        canvasRef.current,
      );
      if (!coordinates) return;
      setIsPainting(true);

      create(coordinates, isNewLine);
    },
    [canvasRef, create, currentSize.scale],
  );

  const onMouseUp = React.useCallback(
    (event: MouseEvent) => {
      setIsPainting(false);
      const coordinate = getCoordinates(event, currentSize.scale);
      addLastLine(coordinate);
    },
    [addLastLine, currentSize.scale],
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
