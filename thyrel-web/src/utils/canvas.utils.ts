import { Coordinate, Line, LineType } from 'types/canvas.types';

export const rerenderDraw = (canvas: HTMLCanvasElement, lines: Line[]) => {
  const context = canvas.getContext('2d');
  if (!context) return;

  clearDraw(canvas);

  lines &&
    lines.forEach(line => {
      let currentPosition: Coordinate = line.points[0];
      const positionCopy: Coordinate[] = [];

      drawCanvasLine(
        context,
        { ...line, type: LineType.CIRCLE },
        { beginPosition: line.points[0] },
      );

      line.points.forEach(coordinate => {
        positionCopy.push(coordinate);
        if (positionCopy.length > 3) {
          const { controlPoint, endPoint } = getQuadraticCurveCoordinates(
            positionCopy,
          );

          drawCanvasLine(context, line, {
            beginPosition: currentPosition,
            controlPosition: controlPoint,
            endPosition: endPoint,
          });
          currentPosition = endPoint;
        }
      });
    });
};

export const clearDraw = (canvas: HTMLCanvasElement) => {
  canvas.getContext('2d')?.clearRect(0, 0, canvas.width, canvas.height);
};

export const drawCanvasLine = (
  ctx: CanvasRenderingContext2D,
  line: Line,
  {
    beginPosition,
    controlPosition,
    endPosition,
  }: {
    beginPosition: Coordinate;
    controlPosition?: Coordinate;
    endPosition?: Coordinate;
  },
) => {
  ctx.strokeStyle = line.color;
  ctx.fillStyle = line.color;
  ctx.lineJoin = 'round';
  ctx.lineCap = 'round';
  ctx.lineWidth = line.size;

  ctx.beginPath();

  switch (line.type) {
    case LineType.LINE:
      if (!controlPosition || !endPosition) return;
      ctx.moveTo(beginPosition.x, beginPosition.y);
      ctx.quadraticCurveTo(
        controlPosition.x,
        controlPosition.y,
        endPosition.x,
        endPosition.y,
      );
      ctx.stroke();
      break;
    case LineType.CIRCLE:
      ctx.arc(beginPosition.x, beginPosition.y, line.size / 2, 0, 2 * Math.PI);
      ctx.fill();
      break;
  }
  ctx.closePath();
};

export function getQuadraticCurveCoordinates(
  positions: Coordinate[],
): {
  controlPoint: Coordinate;
  endPoint: Coordinate;
} {
  const [lastPoint, prevPoint] = positions.slice(-2);
  const controlPoint = lastPoint;
  const endPoint = {
    x: (lastPoint.x + prevPoint.x) / 2,
    y: (lastPoint.y + prevPoint.y) / 2,
  };

  return { controlPoint, endPoint };
}

export const getCoordinates = (
  event: MouseEvent,
  canvasScale: number,
  canvas?: HTMLCanvasElement | null,
): Coordinate | undefined => {
  if (!canvas) return;
  return {
    x: (event.pageX - canvas.offsetLeft) * canvasScale,
    y: (event.pageY - canvas.offsetTop) * canvasScale,
  };
};
