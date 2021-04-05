import React from 'react';

type UseCanvasEventListenerProps = {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  isPainting?: boolean;
  onMouseUp: (event: MouseEvent) => void;
  onMouseEnter: (event: MouseEvent) => void;
  onMouseMove: (event: MouseEvent) => void;
  onMouseDown: (event: MouseEvent) => void;
};

export default function useCanvasEventListener({
  canvasRef,
  isPainting,
  onMouseMove,
  onMouseEnter,
  onMouseDown,
  onMouseUp,
}: UseCanvasEventListenerProps) {
  React.useEffect(() => {
    if (!isPainting) return;

    window.document.addEventListener('mousemove', onMouseMove);
    return () => {
      window.document.removeEventListener('mousemove', onMouseMove);
    };
  }, [isPainting, onMouseMove]);

  React.useEffect(() => {
    if (!canvasRef.current) return;
    const canvas: HTMLCanvasElement = canvasRef.current;

    canvas.addEventListener('mouseenter', onMouseEnter);
    return () => {
      canvas.removeEventListener('mouseenter', onMouseEnter);
    };
  }, [canvasRef, onMouseEnter]);

  React.useEffect(() => {
    if (!canvasRef.current) return;
    const canvas: HTMLCanvasElement = canvasRef.current;

    canvas.addEventListener('mousedown', onMouseDown);
    window.document.addEventListener('mouseup', onMouseUp);
    return () => {
      canvas.removeEventListener('mousedown', onMouseDown);
      window.document.removeEventListener('mouseup', onMouseUp);
    };
  }, [canvasRef, onMouseDown, onMouseUp]);
}
