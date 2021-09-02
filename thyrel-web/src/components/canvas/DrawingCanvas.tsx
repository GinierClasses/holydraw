import { Box } from '@material-ui/system';
import { useCanvasContext } from './DrawingCanvasContext';

export default function DrawingCanvas({ disabled }: { disabled?: boolean }) {
  const { canvasRef, size } = useCanvasContext();

  return (
    <Box
      sx={{
        width: size.width + size.border * 2,
        height: size.height + size.border * 2,
        borderRadius: 8,
        overflow: 'hidden',
        border: theme => `${size.border}px solid ${theme.palette.default.main}`,
        boxShadow: 1,
      }}>
      <Box
        component="canvas"
        ref={canvasRef}
        sx={{
          backgroundColor: disabled ? '#BBBBBB' : '#DDDDDD',
          width: size.width,
          height: size.height,
          cursor: disabled ? 'not-allowed' : 'crosshair',
          borderRadius: 8,
        }}
      />
    </Box>
  );
}
