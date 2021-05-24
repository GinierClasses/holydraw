import React from 'react';
import { Coordinate, Line, LineType } from 'types/canvas.types';
import {
  clearDraw,
  drawCanvasLine,
  fillCanvas,
  getQuadraticCurveCoordinates,
  rerenderDraw,
} from 'utils/canvas.utils';

type useCanvasMouseProps = {
  color: string;
  size: number;
  canvasRef: React.MutableRefObject<HTMLCanvasElement | null>;
  scale: number;
  lineType: LineType;
};

function useCanvasPaint({
  color,
  size,
  canvasRef,
  scale,
  lineType,
}: useCanvasMouseProps) {
  const mouseCoordinate = React.useRef<Coordinate>({ x: 0, y: 0 });
  const lines = React.useRef<Line[]>([]);
  const deletedLines = React.useRef<Line[]>([]);

  const getLastLine = () => lines.current[lines.current.length - 1];

  const addLastLine = React.useCallback((coordinate?: Coordinate) => {
    if (!coordinate) return;
    getLastLine().points.push(coordinate);
    mouseCoordinate.current = coordinate;
  }, []);

  const paint = React.useCallback(
    (newMousePosition?: Coordinate) => {
      if (!newMousePosition || !mouseCoordinate || !canvasRef.current) return;

      const lastLine = getLastLine();
      lastLine.points.push(newMousePosition);

      const context = canvasRef.current.getContext('2d');
      if (!context || lastLine.points.length <= 2) return;

      const { controlPoint, endPoint } = getQuadraticCurveCoordinates(
        lastLine.points,
      );

      drawCanvasLine(context, lastLine, {
        beginPosition: mouseCoordinate.current,
        controlPosition: controlPoint,
        endPosition: endPoint,
      });
      mouseCoordinate.current = endPoint;
    },
    [canvasRef],
  );

  const fill = React.useCallback(
    (coordinate: Coordinate) => {
      if (!canvasRef.current) return;
      fillCanvas(canvasRef.current, coordinate, color);
    },
    [canvasRef, color],
  );

  const create = React.useCallback(
    (coordinate: Coordinate, isNewLine?: boolean) => {
      mouseCoordinate.current = coordinate;
      deletedLines.current = [];
      if (isNewLine) {
        lines.current.push({
          type: lineType,
          color,
          size: size * scale,
          points: [coordinate],
        });
        switch (lineType) {
          case LineType.LINE:
            const context = canvasRef?.current?.getContext('2d');
            if (!context) return;
            drawCanvasLine(
              context,
              { ...getLastLine(), type: LineType.CIRCLE },
              { beginPosition: coordinate },
            );
            break;
          case LineType.FILL:
            fill(coordinate);
            break;
        }
      } else paint(coordinate);
    },
    [canvasRef, color, fill, lineType, paint, scale, size],
  );

  const refresh = React.useCallback(() => {
    if (!canvasRef.current) return;
    rerenderDraw(canvasRef.current, lines.current);
  }, [canvasRef]);

  const undo = React.useCallback(() => {
    const deletedLine = lines.current.pop();
    deletedLine && deletedLines.current.push(deletedLine);
    refresh();
  }, [refresh]);

  const redo = React.useCallback(() => {
    const redoLine = deletedLines.current.pop();
    redoLine && lines.current.push(redoLine);
    refresh();
  }, [refresh]);

  const clear = React.useCallback(() => {
    if (!canvasRef.current) return;
    if (
      !window.confirm(
        'This action is definitive. Are you sure you want to clear all ?',
      )
    )
      return;
    lines.current = [];
    deletedLines.current = [];
    clearDraw(canvasRef.current);
  }, [canvasRef]);

  React.useEffect(() => {
    if (!canvasRef.current) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'z' && (event.ctrlKey || event.metaKey)) {
        event.shiftKey ? redo() : undo();
      }
      if (event.key === 'c' && !(event.ctrlKey || event.metaKey)) clear();
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [canvasRef, clear, redo, undo]);

  return {
    paint,
    create,
    addLastLine,
    undo,
    lines,
    mouseCoordinate,
    clear,
    redo,
    refresh,
    fill,
  };
}

export default useCanvasPaint;
