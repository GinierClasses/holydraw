import { Coordinate, Line, LineType } from 'types/canvas.types';

export const canvasScale = 2;

export const rerenderDraw = (canvas: HTMLCanvasElement, lines: Line[]) => {
  const context = canvas.getContext('2d');
  if (!context) return;

  clearDraw(canvas, context);

  lines &&
    lines.forEach(line => {
      let currentPosition: Coordinate = line.points[0];
      const positionCopy: Coordinate[] = [];
      line.points.forEach(coordinate => {
        positionCopy.push(coordinate);
        if (positionCopy.length > 3) {
          const { controlPoint, endPoint } = getQuadraticCurveCoordinates(
            positionCopy,
          );

          drawCanvasLine(
            context,
            currentPosition,
            controlPoint,
            endPoint,
            line,
          );
          currentPosition = endPoint;
        }
      });
    });
};

export const clearDraw = (
  canvas: HTMLCanvasElement,
  context?: CanvasRenderingContext2D | null,
) => {
  context?.clearRect(0, 0, canvas.width, canvas.height);
};

export const drawCanvasLine = (
  ctx: CanvasRenderingContext2D,
  beginPosition: Coordinate,
  controlPosition: Coordinate,
  endPosition: Coordinate,
  line: Line,
) => {
  ctx.strokeStyle = line.color;
  ctx.lineJoin = 'round';
  ctx.lineCap = 'round';
  ctx.lineWidth = line.size;

  ctx.beginPath();

  switch (line.type) {
    case LineType.LINE:
      ctx.moveTo(beginPosition.x, beginPosition.y);
      ctx.quadraticCurveTo(
        controlPosition.x,
        controlPosition.y,
        endPosition.x,
        endPosition.y,
      );
      ctx.stroke();
      break;
  }
  ctx.closePath();
};

export function getQuadraticCurveCoordinates(positions: Coordinate[]) {
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
  canvas?: HTMLCanvasElement | null,
): Coordinate | undefined => {
  if (!canvas) return;
  return {
    x: (event.pageX - canvas.offsetLeft) * canvasScale,
    y: (event.pageY - canvas.offsetTop) * canvasScale,
  };
};
