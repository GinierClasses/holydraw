/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { css } from '@emotion/css';
import React from 'react';
import { Button } from 'rsuite';
import Box from 'styles/Box';
import { bgFade } from 'styles/colors';
import { Coordinate, Line, LineType } from 'types/canvas.types';
import {
  canvasScale,
  drawCanvasLine,
  getCoordinates,
  getQuadraticCurveCoordinates,
  rerenderDraw,
} from 'utils/canvas.utils';

/* // TODO :
 * premierclick affiche un cercle
 */

const canvasWidth = {
  width: 512,
  height: 320,
};

type CanvasDrawProps = {
  color?: string;
  size?: number;
};

export default function CanvasDraw({
  color = '#900050',
  size = 4,
}: CanvasDrawProps) {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const [isPainting, setIsPainting] = React.useState(false);
  const mouseCoordinate = React.useRef<Coordinate>({
    x: 0,
    y: 0,
  });
  const lines = React.useRef<Line[]>([]);

  const getLastLine = () => lines.current[lines.current.length - 1];

  const startPaint = React.useCallback(
    (event: MouseEvent, isNewLine: boolean = true) => {
      const coordinates = getCoordinates(event, canvasRef.current);
      if (coordinates) {
        setIsPainting(true);
        mouseCoordinate.current = coordinates;
        if (isNewLine) {
          lines.current.push({
            type: LineType.LINE,
            color,
            size,
            points: [coordinates],
          });
        } else getLastLine()?.points.push(coordinates);
      }
    },
    [color, size],
  );

  const drawLine = React.useCallback((lastLine: Line) => {
    if (!canvasRef.current) return;
    const context = canvasRef.current.getContext('2d');
    if (!context) return;
    // if (lastLine.points.length <= 1) return;

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
  }, []);

  const stopPaint = React.useCallback(event => {
    setIsPainting(false);
    const coordinate = getCoordinates(event);
    if (!coordinate) return;
    getLastLine().points.push(coordinate);
    mouseCoordinate.current = coordinate;
  }, []);

  const mouseEnter = React.useCallback(
    event => {
      if (isPainting) startPaint(event, false);
    },
    [isPainting, startPaint],
  );

  const paint = React.useCallback(
    (event: MouseEvent) => {
      if (!isPainting) return;
      const newMousePosition = getCoordinates(event, canvasRef.current);
      if (!mouseCoordinate || !newMousePosition) return;

      const lastLine = getLastLine();
      lastLine.points.push(newMousePosition);
      drawLine(lastLine);
    },
    [drawLine, isPainting],
  );

  React.useEffect(() => {
    if (!isPainting) return;

    window.document.addEventListener('mousemove', paint);
    return () => {
      window.document.removeEventListener('mousemove', paint);
    };
  }, [isPainting, paint]);

  React.useEffect(() => {
    if (!canvasRef.current) return;
    const canvas: HTMLCanvasElement = canvasRef.current;

    canvas.addEventListener('mouseenter', mouseEnter);
    return () => {
      canvas.removeEventListener('mouseenter', mouseEnter);
    };
  }, [mouseEnter]);

  React.useEffect(() => {
    if (!canvasRef.current) return;
    const canvas: HTMLCanvasElement = canvasRef.current;

    canvas.addEventListener('mousedown', startPaint);
    window.document.addEventListener('mouseup', stopPaint);
    return () => {
      canvas.removeEventListener('mousedown', startPaint);
      window.document.removeEventListener('mouseup', stopPaint);
    };
  }, [startPaint, stopPaint]);

  React.useEffect(() => {
    if (!canvasRef.current) return;
    const canvas: HTMLCanvasElement = canvasRef.current;

    canvas.width = canvasWidth.width * canvasScale;
    canvas.height = canvasWidth.height * canvasScale;
  }, [canvasRef]);

  function undolastpoint() {
    if (!canvasRef.current) return;
    lines.current.pop();
    rerenderDraw(canvasRef.current, lines.current);
  }

  return (
    <Box flexDirection="column" borderWidth={4} shadow={1}>
      <canvas
        ref={canvasRef}
        className={css({
          backgroundColor: '#000000',
          width: canvasWidth.width,
          height: canvasWidth.height,
        })}
      />
      <Button onClick={undolastpoint}>Undo last point</Button>
    </Box>
  );
}
