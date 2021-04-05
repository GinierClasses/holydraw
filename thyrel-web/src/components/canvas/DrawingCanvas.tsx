import { makeStyles, Theme } from '@material-ui/core';
import useCanvasEventListener from 'components/canvas/useCanvasEventListener';
import useCanvasPaint from './useCanvasPaint';
import React from 'react';
import { getCoordinates } from 'utils/canvas.utils';
import CanvasDrawActions from './CanvasDrawActions';
import { CanvasWidth } from './canvas.type';

const canvasWidth: CanvasWidth = {
  width: 512,
  height: 320,
  border: 4,
  scale: 2,
  lineScale: 2,
};

type CanvasDrawProps = {
  color?: string;
  lineSize?: number;
  canvasSize?: CanvasWidth;
  canvasRef: React.RefObject<HTMLCanvasElement>;
};

const useStyles = makeStyles<Theme, { size: CanvasWidth }>(theme => ({
  canvas: {
    backgroundColor: '#DDDDDD',
    width: props => props.size.width,
    height: props => props.size.height,
    cursor: 'crosshair',
  },
  canvasBox: {
    width: props => props.size.width + props.size.border * 2,
    height: props => props.size.height + props.size.border * 2,
    border: props =>
      `${props.size.border}px solid ${theme.palette.secondary.main}`,
    boxShadow: theme.shadows[1],
  },
}));

export default function DrawingCanvas({
  color = '#900050',
  lineSize = 4,
  canvasSize: size = canvasWidth,
  canvasRef,
}: CanvasDrawProps) {
  const [isPainting, setIsPainting] = React.useState(false);
  const { paint, create, addLastLine, clear, undo, refresh } = useCanvasPaint({
    color,
    size: lineSize,
    canvasRef,
    scale: size.lineScale,
  });
  const classes = useStyles({ size });

  const onMouseDown = React.useCallback(
    (event: MouseEvent, isNewLine: boolean = true) => {
      const coordinates = getCoordinates(event, size.scale, canvasRef.current);
      if (!coordinates) return;
      setIsPainting(true);

      create(coordinates, isNewLine);
    },
    [canvasRef, create, size.scale],
  );

  const onMouseUp = React.useCallback(
    (event: MouseEvent) => {
      setIsPainting(false);
      const coordinate = getCoordinates(event, size.scale);
      addLastLine(coordinate);
    },
    [addLastLine, size.scale],
  );

  const onMouseEnter = React.useCallback(
    (event: MouseEvent) => {
      if (isPainting) onMouseDown(event, false);
    },
    [isPainting, onMouseDown],
  );

  const onMouseMove = React.useCallback(
    (event: MouseEvent) => {
      if (!isPainting || !canvasRef.current) return;
      const newMousePosition = getCoordinates(
        event,
        size.scale,
        canvasRef.current,
      );
      paint(newMousePosition);
    },
    [canvasRef, isPainting, paint, size.scale],
  );

  useCanvasEventListener({
    canvasRef,
    onMouseDown,
    onMouseUp,
    onMouseEnter,
    onMouseMove,
    isPainting,
  });

  React.useEffect(() => {
    if (!canvasRef.current) return;
    const canvas: HTMLCanvasElement = canvasRef.current;

    canvas.width = size.width * size.scale;
    canvas.height = size.height * size.scale;
    refresh();
  }, [canvasRef, refresh, size]);

  return (
    <>
      <div className={classes.canvasBox}>
        <canvas ref={canvasRef} className={classes.canvas} />
      </div>

      <CanvasDrawActions onClear={clear} onUndo={undo} />
    </>
  );
}
