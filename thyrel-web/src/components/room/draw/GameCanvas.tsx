import { Box, useMediaQuery } from '@material-ui/core';
import BigButton from 'components/BigButton';
import DrawingCanvas from 'components/canvas/DrawingCanvas';
import { OnSaveAction } from 'components/canvas/DrawingCanvasActions';
import { DrawingCanvasProvider } from 'components/canvas/DrawingCanvasProvider';
import CanvasActionButtons from 'components/room/draw/CanvasActionButtons';
import { useSessionContext } from 'hooks/SessionProvider';
import theme from 'theme';

type GameCanvasProps = {
  size: number;
  color: string;
};

const canvasWidth = {
  md: {
    width: 512,
    height: 320,
    border: 4,
    scale: 2,
    lineScale: 2,
  },
  xs: {
    width: 320,
    height: 224,
    border: 2,
    scale: 4,
    lineScale: 2,
  },
};

export default function GameCanvas({ size, color }: GameCanvasProps) {
  const isDeviceSM = useMediaQuery(theme.breakpoints.up('sm'));
  const { onSave } = useSessionContext();
  return (
    <DrawingCanvasProvider
      color={color}
      lineSize={size}
      canvasSize={isDeviceSM ? canvasWidth.md : canvasWidth.xs}>
      <Box
        display="flex"
        flexDirection="column"
        gridGap={8}
        alignItems="center">
        <DrawingCanvas />
        <Box
          display="flex"
          flexDirection={{ xs: 'row', sm: 'column' }}
          gridGap={8}
          alignItems="center"
          justifyContent="space-between"
          width="100%">
          <CanvasActionButtons />
          <OnSaveAction
            onSave={canvasImage => {
              if (!canvasImage) return;
              onSave(canvasImage);
            }}>
            <BigButton size="large">Submit</BigButton>
          </OnSaveAction>
        </Box>
      </Box>
    </DrawingCanvasProvider>
  );
}
