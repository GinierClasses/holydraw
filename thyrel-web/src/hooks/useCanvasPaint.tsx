import React from 'react';
import { Coordinate, Line, LineType } from 'types/canvas.types';
import {
  drawCanvasLine,
  getQuadraticCurveCoordinates,
  rerenderDraw,
} from 'utils/canvas.utils';

type useCanvasMouseProps = {
  color: string;
  size: number;
  canvasRef: React.MutableRefObject<HTMLCanvasElement | null>;
};

function useCanvasPaint({ color, size, canvasRef }: useCanvasMouseProps) {
  const mouseCoordinate = React.useRef<Coordinate>({
    x: 0,
    y: 0,
  });
  const lines = React.useRef<Line[]>([]);

  const getLastLine = () => lines.current[lines.current.length - 1];

  const addLastLine = React.useCallback((coordinate?: Coordinate) => {
    if (!coordinate) return;
    getLastLine().points.push(coordinate);
    mouseCoordinate.current = coordinate;
  }, []);

  const paintLine = React.useCallback(
    (newMousePosition?: Coordinate) => {
      if (!newMousePosition || !mouseCoordinate || !canvasRef.current) return;

      const lastLine = getLastLine();
      lastLine.points.push(newMousePosition);

      const context = canvasRef.current.getContext('2d');
      if (!context || lastLine.points.length <= 2) return;

      const { controlPoint, endPoint } = getQuadraticCurveCoordinates(
        lastLine.points,
      );

      drawCanvasLine(
        context,
        mouseCoordinate.current,
        controlPoint,
        endPoint,
        lastLine,
      );
      mouseCoordinate.current = endPoint;
    },
    [canvasRef],
  );

  const createLine = React.useCallback(
    (coordinate: Coordinate, isNewLine?: boolean) => {
      mouseCoordinate.current = coordinate;
      if (isNewLine)
        lines.current.push({
          type: LineType.LINE,
          color,
          size,
          points: [coordinate],
        });
      else paintLine(coordinate);
    },
    [color, paintLine, size],
  );

  const undoLastLine = React.useCallback(() => {
    if (!canvasRef.current) return;
    lines.current.pop();
    rerenderDraw(canvasRef.current, lines.current);
  }, [canvasRef]);

  React.useEffect(() => {
    if (!canvasRef.current) return;
    const onKeyDown = (event: any) => {
      if (event.keyCode === 90 && (event.ctrlKey || event.metaKey))
        undoLastLine();
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [canvasRef, undoLastLine]);

  return {
    paintLine,
    createLine,
    addLastLine,
    undoLastLine,
    lines,
    mouseCoordinate,
  };
}

export default useCanvasPaint;
