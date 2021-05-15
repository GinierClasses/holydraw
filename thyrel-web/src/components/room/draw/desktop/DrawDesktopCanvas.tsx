import React from 'react';
import { Box } from '@material-ui/core';
import { useSessionContext } from 'hooks/SessionProvider';
import DesktopColorPicker from './DesktopColorPicker';
import SizePickerV2 from './SizePickerV2';
import { colors } from 'utils/app-constant';
import DirectiveLabel from '../../DirectiveLabel';
import { DrawingCanvasProvider } from 'components/canvas/DrawingCanvasProvider';
import DrawingCanvas from 'components/canvas/DrawingCanvas';
import CanvasActionButtons from './CanvasActionButtons';

export default function DrawDesktopCanvas() {
  const [color, setColor] = React.useState(colors[5]);
  const [size, setSize] = React.useState(8);
  const { onSave } = useSessionContext();

  return (
    <Box
      display="flex"
      justifyContent="center"
      width="100%"
      alignItems="center">
      <DesktopColorPicker currentColor={color} onColorChange={setColor} />
      <Box display="flex" flexDirection="column" mx={2}>
        <Box mb={2}>
          <CurrentDirectiveLabel />
        </Box>
        <DrawingCanvasProvider color={color} lineSize={size} disabled={false}>
          <Box width={768}>
            <DrawingCanvas />
          </Box>
          <CanvasActionButtons
            onSave={canvasImage => {
              if (!canvasImage) return;
              onSave(canvasImage);
            }}
          />
        </DrawingCanvasProvider>
      </Box>
      <Box>
        <SizePickerV2 size={size} onSizeChange={setSize} />
      </Box>
    </Box>
  );
}

function CurrentDirectiveLabel() {
  const { currentElement } = useSessionContext();
  return (
    <DirectiveLabel
      directive="Time to Draw"
      sentence={currentElement?.parent?.text || 'Default sentence text'}
    />
  );
}
