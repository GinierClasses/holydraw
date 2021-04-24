import { Box, useMediaQuery } from '@material-ui/core';
import BigButton from 'components/BigButton';
import DrawingCanvas from 'components/canvas/DrawingCanvas';
import { OnSaveAction } from 'components/canvas/DrawingCanvasActions';
import { DrawingCanvasProvider } from 'components/canvas/DrawingCanvasProvider';
import CanvasActionButtons from 'components/room/draw/CanvasActionButtons';
import { useSessionContext } from 'hooks/SessionProvider';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';
import theme from 'theme';
import { useState } from 'react';

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
    width: 332.8,
    height: 208,
    border: 2,
    scale: 4,
    lineScale: 2,
  },
};

export default function GameCanvas({ size, color }: GameCanvasProps) {
  const isDeviceSM = useMediaQuery(theme.breakpoints.up('sm'));
  const { currentElement, onSave } = useSessionContext();
  const isEditing = Boolean(!currentElement?.finishAt);
  const [loading, setLoading] = useState(false);

  return (
    <DrawingCanvasProvider
      color={color}
      disabled={!isEditing}
      lineSize={size}
      canvasSize={isDeviceSM ? canvasWidth.md : canvasWidth.xs}>
      <Box
        display="flex"
        flexDirection="column"
        gridGap={8}
        alignItems="center">
        <DrawingCanvas disabled={!isEditing} />
        <Box
          display="flex"
          flexDirection="row"
          gridGap={8}
          alignItems="center"
          justifyContent="space-between"
          width="100%">
          <CanvasActionButtons />
          <OnSaveAction
            onSave={canvasImage => {
              if (!canvasImage) return;
              setLoading(true);
              onSave(canvasImage).then(() => setLoading(false));
            }}>
            <BigButton
              loading={loading}
              startIcon={
                isEditing ? (
                  <SaveIcon style={{ fontSize: 32 }} />
                ) : (
                  <EditIcon style={{ fontSize: 32 }} />
                )
              }
              size="large">
              {isEditing ? 'Save' : 'Edit'}
            </BigButton>
          </OnSaveAction>
        </Box>
      </Box>
    </DrawingCanvasProvider>
  );
}
