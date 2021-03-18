import React from 'react';

type useCanvasMouseProps = {
  paint: (event: MouseEvent) => void;
  stopPaint: (event: MouseEvent) => void;
  startPaint: (event: MouseEvent) => void;
  canvasRef: React.RefObject<HTMLCanvasElement>
};

function useCanvasMouseEvent({
  paint,
  stopPaint,
  startPaint,
  canvasRef
}: useCanvasMouseProps) {
  React.useEffect(() => {
    if (!canvasRef.current) {
      return;
    }
    const canvas: HTMLCanvasElement = canvasRef.current;
    canvas.addEventListener('mousemove', paint);
    return () => {
      canvas.removeEventListener('mousemove', paint);
    };
  }, [canvasRef, paint]);

  React.useEffect(() => {
    if (!canvasRef.current) {
      return;
    }
    const canvas: HTMLCanvasElement = canvasRef.current;
    canvas.addEventListener('mousedown', startPaint);
    canvas.addEventListener('mouseup', stopPaint);
    canvas.addEventListener('mouseleave', stopPaint);
    return () => {
      canvas.removeEventListener('mousedown', startPaint);
      canvas.removeEventListener('mouseup', stopPaint);
      canvas.removeEventListener('mouseleave', stopPaint);
    };
  }, [canvasRef, startPaint, stopPaint]);

  return canvasRef;
}

export default useCanvasMouseEvent;
