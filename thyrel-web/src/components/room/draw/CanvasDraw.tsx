import { Box, makeStyles } from '@material-ui/core';
import useCanvasEventListener from 'components/room/draw/useCanvasEventListener';
import useCanvasPaint from './useCanvasPaint';
import React from 'react';
import { canvasScale, getCoordinates } from 'utils/canvas.utils';
import CanvasDrawActions from './CanvasDrawActions';

const canvasWidth = {
  width: 512,
  height: 320,
  border: 4,
};

type CanvasDrawProps = {
  color?: string;
  size?: number;
};

const useStyles = makeStyles(theme => ({
  canvas: {
    backgroundColor: '#DDDDDD',
    width: canvasWidth.width,
    height: canvasWidth.height,
    cursor: 'crosshair',
  },
}));

export default function CanvasDraw({
  color = '#900050',
  size = 4,
}: CanvasDrawProps) {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const [isPainting, setIsPainting] = React.useState(false);
  const { paint, create, addLastLine, clear, undo } = useCanvasPaint({
    color,
    size,
    canvasRef,
  });
  const classes = useStyles();

  const onMouseDown = React.useCallback(
    (event: MouseEvent, isNewLine: boolean = true) => {
      const coordinates = getCoordinates(event, canvasRef.current);
      if (!coordinates) return;
      setIsPainting(true);

      create(coordinates, isNewLine);
    },
    [create],
  );

  const onMouseUp = React.useCallback(
    (event: MouseEvent) => {
      setIsPainting(false);
      const coordinate = getCoordinates(event);
      addLastLine(coordinate);
    },
    [addLastLine],
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
      const newMousePosition = getCoordinates(event, canvasRef.current);
      paint(newMousePosition);
    },
    [isPainting, paint],
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

    canvas.width = canvasWidth.width * canvasScale;
    canvas.height = canvasWidth.height * canvasScale;
  }, [canvasRef]);

  return (
    <>
      <Box
        width={canvasWidth.width + canvasWidth.border * canvasScale}
        height={canvasWidth.height + canvasWidth.border * canvasScale}
        border={canvasWidth.border}
        borderColor="secondary.main"
        boxShadow={1}>
        <canvas ref={canvasRef} className={classes.canvas} />
      </Box>

      <CanvasDrawActions onClear={clear} onUndo={undo} />
    </>
  );
}
