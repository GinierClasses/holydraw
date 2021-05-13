import React from 'react';
import { Box } from '@material-ui/core';
import { useSessionContext } from 'hooks/SessionProvider';
import DrawColorPicker from './DrawColorPicker';
import SizePickerV2 from './SizePickerV2';
import { colors } from 'utils/app-constant';
import DirectiveLabel from '../DirectiveLabel';
import { DrawingCanvasProvider } from 'components/canvas/DrawingCanvasProvider';
import DrawingCanvas from 'components/canvas/DrawingCanvas';
import CanvasActionButtons from './CanvasActionButtons';

export default function DrawDesktop() {
  const [color, setColor] = React.useState(colors[5]);
  const [size, setSize] = React.useState(8);

  return (
    <Box display="flex" justifyContent="center">
      <DrawColorPicker currentColor={color} onColorChange={setColor} />
      <Box display="flex" flexDirection="column">
        <CurrentDirectiveLabel />
        <DrawingCanvasProvider color={color} lineSize={size} disabled={false}>
          <DrawingCanvas />
          <CanvasActionButtons />
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
