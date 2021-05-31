import { Box, useMediaQuery } from '@material-ui/core';
import BigButton from 'components/BigButton';
import DrawingCanvas from 'components/canvas/DrawingCanvas';
import { OnSaveAction } from 'components/canvas/DrawingCanvasActions';
import { DrawingCanvasProvider } from 'components/canvas/DrawingCanvasProvider';
import CanvasActionButtons, {
  CanvasLineTypeButton,
} from 'components/room/draw/desktop/CanvasActionButtons';
import { useSessionContext } from 'hooks/SessionProvider';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';
import theme from 'theme';
import { useState } from 'react';
import DirectiveLabel from 'components/room/DirectiveLabel';

type GameCanvasProps = {
  size: number;
  color: string;
};

export default function GameCanvas({ size, color }: GameCanvasProps) {
  // will be used when we will implement the GameCanvasV2
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const isDeviceSM = useMediaQuery(theme.breakpoints.up('sm'));
  const { currentElement, onSave } = useSessionContext();
  const isFinish = Boolean(currentElement?.finishAt);
  // const [loading, setLoading] = useState(false);

  return (
    <DrawingCanvasProvider color={color} disabled={isFinish} lineSize={size}>
      <Box
        display="flex"
        flexDirection={isDeviceSM ? 'row' : 'column'}
        gridGap={8}
        alignItems="center"
        justifyContent="center">
        <Box width="100%" maxWidth={682} position="relative">
          <Box width="100%" maxWidth={682} top={0}>
            <CurrentDirectiveLabel />
          </Box>

          <Box maxWidth={512} width="100%">
            <DrawingCanvas disabled={isFinish} />
          </Box>
        </Box>
        <Box
          display="flex"
          flexDirection="row"
          gridGap={8}
          alignItems="center"
          justifyContent="space-between"
          width="100%">
          <CanvasActionButtons onSave={() => void 0} />
        </Box>
      </Box>
    </DrawingCanvasProvider>
  );
}

function CurrentDirectiveLabel() {
  const { currentElement } = useSessionContext();
  return (
    <DirectiveLabel
      directive="Time to Draw"
      sentence={currentElement?.parent?.text}
    />
  );
}
