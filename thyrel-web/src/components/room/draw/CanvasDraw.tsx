/* eslint-disable @typescript-eslint/no-unused-vars */
import { css } from '@emotion/css';
import React from 'react';
import { Button } from 'rsuite';
import Box from 'styles/Box';
import { bgFade } from 'styles/colors';

type Coordinate = {
  x: number;
  y: number;
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
  const boxRef = React.useRef<HTMLDivElement>(null);
  const [isPainting, setIsPainting] = React.useState(false);
  const mousePosition = React.useRef<Coordinate>({
    x: 0,
    y: 0,
  });
  const positions = React.useRef<Coordinate[]>([]);

  const startPaint = React.useCallback((event: MouseEvent) => {
    const coordinates = getCoordinates(event, canvasRef.current);
    if (coordinates) {
      setIsPainting(true);
      mousePosition.current = coordinates;
      positions.current.push(coordinates);
    }
  }, []);

  const drawLine = React.useCallback(() => {
    if (!canvasRef.current) {
      return;
    }
    const canvas: HTMLCanvasElement = canvasRef.current;
    const context = canvas.getContext('2d');
    if (!context) return;
    if (positions.current.length > 3) {
      const [lastPoint, prevPoint] = positions.current.slice(-2);
      const controlPoint = lastPoint;
      const endPoint = {
        x: (lastPoint.x + prevPoint.x) / 2,
        y: (lastPoint.y + prevPoint.y) / 2,
      };
      drawLineOnContext(
        context,
        mousePosition.current,
        controlPoint,
        endPoint,
        {
          color,
          size,
        },
      );
      mousePosition.current = endPoint;
    }
  }, [color, size]);

  const stopPaint = React.useCallback(event => {
    setIsPainting(false);
    const position = getCoordinates(event);
    if (!position) return;
    positions.current.push(position);
    mousePosition.current = position;
  }, []);

  const mouseEnter = React.useCallback(
    event => {
      if (isPainting) startPaint(event);
    },
    [isPainting, startPaint],
  );

  const paint = React.useCallback(
    (event: MouseEvent) => {
      if (isPainting) {
        const newMousePosition = getCoordinates(event, canvasRef.current);

        if (mousePosition && newMousePosition) {
          positions.current.push(newMousePosition);

          drawLine();
        }
      }
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

  return (
    <Box ref={boxRef} borderWidth={4} shadow={1}>
      <canvas
        ref={canvasRef}
        className={css({ backgroundColor: '#EEEEEE' })}
        width={512}
        height={384}
      />
    </Box>
  );
}

const getCoordinates = (
  event: MouseEvent,
  canvas?: HTMLCanvasElement | null,
): Coordinate | undefined => {
  if (!canvas) return;
  return {
    x: event.pageX - canvas.offsetLeft,
    y: event.pageY - canvas.offsetTop,
  };
};

const drawLineOnContext = (
  ctx: CanvasRenderingContext2D,
  beginPosition: Coordinate,
  controlPosition: Coordinate,
  endPosition: Coordinate,
  {
    color = '#900050',
    size = 4,
  }: {
    color: string;
    size: number;
  },
) => {
  ctx.strokeStyle = color;
  ctx.lineJoin = 'round';
  ctx.lineCap = 'round';
  ctx.lineWidth = size;

  ctx.beginPath();
  ctx.moveTo(beginPosition.x, beginPosition.y);
  ctx.quadraticCurveTo(
    controlPosition.x,
    controlPosition.y,
    endPosition.x,
    endPosition.y,
  );
  ctx.stroke();
  ctx.closePath();
};
