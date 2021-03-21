/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { css } from '@emotion/css';
import useCanvasPaint from 'hooks/useCanvasPaint';
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
  const { paintLine, createLine, addLastLine } = useCanvasPaint({
    color,
    size,
    canvasRef,
  });

  const startPaint = React.useCallback(
    (event: MouseEvent, isNewLine: boolean = true) => {
      const coordinates = getCoordinates(event, canvasRef.current);
      if (!coordinates) return;
      setIsPainting(true);

      createLine(coordinates, isNewLine);
    },
    [createLine],
  );

  const stopPaint = React.useCallback(
    event => {
      setIsPainting(false);
      const coordinate = getCoordinates(event);
      addLastLine(coordinate);
    },
    [addLastLine],
  );

  const mouseEnter = React.useCallback(
    event => {
      if (isPainting) startPaint(event, false);
    },
    [isPainting, startPaint],
  );

  const paint = React.useCallback(
    (event: MouseEvent) => {
      if (!isPainting || !canvasRef.current) return;
      const newMousePosition = getCoordinates(event, canvasRef.current);
      paintLine(newMousePosition);
    },
    [isPainting, paintLine],
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

  return (
    <Box flexDirection="column" borderWidth={4} shadow={1}>
      <canvas
        ref={canvasRef}
        className={css({
          backgroundColor: '#DDDDDD',
          width: canvasWidth.width,
          height: canvasWidth.height,
        })}
      />
    </Box>
  );
}
