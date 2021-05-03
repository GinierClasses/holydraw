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
import CanvasLineTypeButtons from './CanvasLineTypeButtons';

type GameCanvasProps = {
  size: number;
  color: string;
};

export default function GameCanvas({ size, color }: GameCanvasProps) {
  // will be used when we will implement the GameCanvasV2
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const isDeviceSM = useMediaQuery(theme.breakpoints.up('sm'));
  const { currentElement, onSave } = useSessionContext();
  const isEditing = Boolean(!currentElement?.finishAt);
  const [loading, setLoading] = useState(false);

  return (
    <DrawingCanvasProvider color={color} disabled={!isEditing} lineSize={size}>
      <Box
        display="flex"
        flexDirection="column"
        gridGap={8}
        alignItems="center">
        <Box maxWidth={512} width="100%">
          <DrawingCanvas disabled={!isEditing} />
        </Box>
        <Box
          display="flex"
          flexDirection="row"
          gridGap={8}
          alignItems="center"
          justifyContent="space-between"
          width="100%">
          <CanvasActionButtons />
          <CanvasLineTypeButtons />
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
              color="primary"
              size="medium">
              {isEditing ? 'Save' : 'Edit'}
            </BigButton>
          </OnSaveAction>
        </Box>
      </Box>
    </DrawingCanvasProvider>
  );
}
