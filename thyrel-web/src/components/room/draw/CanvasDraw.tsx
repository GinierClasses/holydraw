/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { css } from '@emotion/css';
import React from 'react';
import { Button } from 'rsuite';
import Box from 'styles/Box';
import { bgFade } from 'styles/colors';

/* // TODO :
 * premierclick affiche un cercle
 */

type Coordinate = {
  x: number;
  y: number;
};

enum LineType {
  LINE = 0,
}

type Line = {
  id?: number;
  type: LineType;
  color: string;
  size: number;
  points: Coordinate[];
};

type CanvasDrawProps = {
  color?: string;
  size?: number;
};

const scale = 2;

export default function CanvasDraw({
  color = '#900050',
  size = 4,
}: CanvasDrawProps) {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const [isPainting, setIsPainting] = React.useState(false);
  const mousePosition = React.useRef<Coordinate>({
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
        mousePosition.current = coordinates;
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
    if (!canvasRef.current) {
      return;
    }
    const canvas: HTMLCanvasElement = canvasRef.current;
    const context = canvas.getContext('2d');
    if (!context) return;
    if (lastLine.points.length > 3) {
      const { controlPoint, endPoint } = getQuadraticCurvePoints(
        lastLine.points,
      );

      drawLineOnContext(
        context,
        mousePosition.current,
        controlPoint,
        endPoint,
        {
          color: lastLine.color,
          size: lastLine.size,
        },
      );
      mousePosition.current = endPoint;
    }
  }, []);

  const stopPaint = React.useCallback(event => {
    setIsPainting(false);
    const position = getCoordinates(event);
    if (!position) return;
    getLastLine().points.push(position);
    mousePosition.current = position;
  }, []);

  const mouseEnter = React.useCallback(
    event => {
      if (isPainting) startPaint(event, false);
    },
    [isPainting, startPaint],
  );

  const paint = React.useCallback(
    (event: MouseEvent) => {
      if (isPainting) {
        const newMousePosition = getCoordinates(event, canvasRef.current);

        if (mousePosition && newMousePosition) {
          const lastLine = getLastLine();
          lastLine.points.push(newMousePosition);

          drawLine(lastLine);
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

  React.useEffect(() => {
    if (!canvasRef.current) return;
    const canvas: HTMLCanvasElement = canvasRef.current;

    canvas.width = 512 * scale;
    canvas.height = 320 * scale;
  }, [canvasRef]);

  function undolastpoint() {
    if (!canvasRef.current) return;
    const canvas: HTMLCanvasElement = canvasRef.current;
    console.log('undo last point');
    lines.current.pop();
    rerenderDraw(canvas, lines.current);
  }

  return (
    <Box flexDirection="column" borderWidth={4} shadow={1}>
      <canvas
        ref={canvasRef}
        className={css({ backgroundColor: '#EEEEEE', width: 512, height: 320 })}
      />
      <Button onClick={undolastpoint}>Undo last point</Button>
    </Box>
  );
}

const getCoordinates = (
  event: MouseEvent,
  canvas?: HTMLCanvasElement | null,
): Coordinate | undefined => {
  if (!canvas) return;
  return {
    x: (event.pageX - canvas.offsetLeft) * scale,
    y: (event.pageY - canvas.offsetTop) * scale,
  };
};

const rerenderDraw = (canvas: HTMLCanvasElement, lines: Line[]) => {
  const context = canvas.getContext('2d');
  if (!context) return;

  context.clearRect(0, 0, canvas.width, canvas.height);

  lines &&
    lines.forEach(line => {
      let currentPosition: Coordinate = line.points[0];
      let positionCopy: Coordinate[] = [];
      line.points.forEach(coordinate => {
        positionCopy.push(coordinate);
        if (positionCopy.length > 3) {
          const { controlPoint, endPoint } = getQuadraticCurvePoints(
            positionCopy,
          );

          drawLineOnContext(context, currentPosition, controlPoint, endPoint, {
            color: line.color,
            size: line.size,
          });
          currentPosition = endPoint;
        }
      });
    });
};

const drawLineOnContext = (
  ctx: CanvasRenderingContext2D,
  beginPosition: Coordinate,
  controlPosition: Coordinate,
  endPosition: Coordinate,
  { color = '#900050', size = 4 }: Required<CanvasDrawProps>,
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

function getQuadraticCurvePoints(positions: Coordinate[]) {
  const [lastPoint, prevPoint] = positions.slice(-2);
  const controlPoint = lastPoint;
  const endPoint = {
    x: (lastPoint.x + prevPoint.x) / 2,
    y: (lastPoint.y + prevPoint.y) / 2,
  };

  return { controlPoint, endPoint };
}
