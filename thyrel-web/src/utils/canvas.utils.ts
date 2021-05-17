/* eslint-disable @typescript-eslint/no-unused-vars */
import { Coordinate, Line, LineType } from 'types/canvas.types';

export const rerenderDraw = (canvas: HTMLCanvasElement, lines: Line[]) => {
  const context = canvas.getContext('2d');
  if (!context) return;

  clearDraw(canvas);

  lines &&
    lines.forEach(line => {
      let currentPosition: Coordinate = line.points[0];
      const positionCopy: Coordinate[] = [];

      switch (line.type) {
        case LineType.LINE: {
          drawCanvasLine(
            context,
            { ...line, type: LineType.CIRCLE },
            { beginPosition: line.points[0] },
          );
          line.points.forEach(coordinate => {
            positionCopy.push(coordinate);
            if (positionCopy.length > 3) {
              const { controlPoint, endPoint } =
                getQuadraticCurveCoordinates(positionCopy);

              drawCanvasLine(context, line, {
                beginPosition: currentPosition,
                controlPosition: controlPoint,
                endPosition: endPoint,
              });
              currentPosition = endPoint;
            }
          });
          break;
        }
        case LineType.FILL: {
          fillCanvas(canvas, line.points[0], line.color);
        }
      }
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

export function getQuadraticCurveCoordinates(positions: Coordinate[]): {
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

type Color = {
  r: number;
  g: number;
  b: number;
};

function hexToRgb(hex: string): Color | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

const getStartColor = (
  coordinate: Coordinate,
  width: number,
  colorLayer: Uint8ClampedArray,
): Color => {
  const startCoordinate = (coordinate.y * width + coordinate.x) * 4;

  return {
    r: colorLayer[startCoordinate],
    g: colorLayer[startCoordinate + 1],
    b: colorLayer[startCoordinate + 2],
  };
};

// inspired from http://www.williammalone.com/articles/html5-canvas-javascript-paint-bucket-tool/
export function fillCanvas(
  canvas: HTMLCanvasElement,
  coordinate: Coordinate,
  color: string,
) {
  const context = canvas?.getContext('2d');
  if (!context) return;

  const colorLayer = context.getImageData(0, 0, canvas.width, canvas.height);
  const startColor = getStartColor(coordinate, canvas.width, colorLayer.data);
  const endColor = hexToRgb(color);

  // can not possible to fill a point alredy with the endcolor
  if (
    !endColor ||
    (endColor.r === startColor.r &&
      endColor.g === startColor.g &&
      endColor.b === startColor.b)
  )
    return;

  const matchStartColor = (pixelPos: number) => {
    const tempColor = {
      r: colorLayer.data[pixelPos],
      g: colorLayer.data[pixelPos + 1],
      b: colorLayer.data[pixelPos + 2],
    };

    return (
      tempColor.r === startColor.r &&
      tempColor.g === startColor.g &&
      tempColor.b === startColor.b
    );
  };

  const colorPixel = (pixelPos: number) => {
    colorLayer.data[pixelPos] = endColor.r;
    colorLayer.data[pixelPos + 1] = endColor.g;
    colorLayer.data[pixelPos + 2] = endColor.b;
    colorLayer.data[pixelPos + 3] = 255;
  };

  // stack of coordinate to test
  // the test will detect all pixels with different color on top and bottom
  // and add the pixel on the right or left in pixelStack if it's not the same color
  const pixelStack = [coordinate];

  const colorCanvasWidth = Math.round(canvas.width * 4);
  while (pixelStack.length) {
    const newCoordinate = pixelStack.pop();
    if (!newCoordinate) return;

    // this calcule is for have a number of the position
    // ooooo - width is 4
    // oooxo - `x` coordinate is 3, 1
    // ooooo - so 1 * 4 + 3 = 8, is the place of `x`
    let currentPosition = Math.round(
      (newCoordinate.y * canvas.width + newCoordinate.x) * 4,
    );
    let y = newCoordinate.y;

    // find the toppest position with the same color
    while (y-- >= 0 && matchStartColor(currentPosition)) {
      currentPosition -= colorCanvasWidth;
    }

    // get the after coordinate
    currentPosition += colorCanvasWidth;
    y++;
    // variables to know if we alredy reach corner, to avoid bug
    let reachLeft = false;
    let reachRight = false;

    while (y++ < canvas.height - 1 && matchStartColor(currentPosition)) {
      colorPixel(currentPosition);

      // check on the left, if matchStartColor add into
      if (newCoordinate.x > 0) {
        if (matchStartColor(currentPosition - 4)) {
          if (!reachLeft) {
            pixelStack.push({ x: newCoordinate.x - 1, y: y });

            reachLeft = true;
          } else if (reachLeft) {
            reachLeft = false;
          }
        }
      }
      if (newCoordinate.x < canvas.width - 1) {
        if (matchStartColor(currentPosition + 4)) {
          if (!reachRight) {
            pixelStack.push({ x: newCoordinate.x + 1, y: y });

            reachRight = true;
          } else if (reachRight) {
            reachRight = false;
          }
        }
      }
      // set currentPosition to bottom pixel
      currentPosition += colorCanvasWidth;
    }
  }

  context.putImageData(colorLayer, 0, 0);
}
