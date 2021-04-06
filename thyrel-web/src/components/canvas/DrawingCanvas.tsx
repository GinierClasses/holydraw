import { makeStyles, Theme } from '@material-ui/core';
import { CanvasWidth } from './canvas.type';
import { useCanvasContext } from './DrawingCanvasProvider';

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

export default function DrawingCanvas() {
  const { canvasRef, size } = useCanvasContext();
  const classes = useStyles({ size });

  return (
    <div className={classes.canvasBox}>
      <canvas ref={canvasRef} className={classes.canvas} />
    </div>
  );
}
