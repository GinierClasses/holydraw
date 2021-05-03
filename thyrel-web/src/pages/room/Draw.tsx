import { Box, useMediaQuery } from '@material-ui/core';
import DirectiveLabel from 'components/room/DirectiveLabel';
import DrawColorPicker from 'components/room/draw/DrawColorPicker';
import SizePicker from 'components/room/draw/SizePicker';
import GameLayout from 'components/room/GameLayout';
import GameCanvas from 'components/room/draw/GameCanvas';
import { useState } from 'react';
import theme from 'theme';
import { useSessionContext } from 'hooks/SessionProvider';
import { useDisableBodyOverflow } from 'components/room/draw/useDisableBodyOverflow';

const colors = [
  '#010101',
  '#7f8c8d',
  '#bdc3c7',
  '#ecf0f1',
  '#00a8ff',
  '#1e3799',
  '#2ecc71',
  '#009432',
  '#e74c3c',
  '#c0392b',
  '#FA00FF',
  '#FDA7DF',
  '#FEAFA8',
  '#CB5A57',
  '#FFC312',
  '#F79F1F',
];

export default function Draw() {
  const isDeviceSM = useMediaQuery(theme.breakpoints.up('sm'));
  const [color, setColor] = useState(colors[5]);
  const [size, setSize] = useState(8);
  useDisableBodyOverflow();
  return (
    <GameLayout maxWidth="md">
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        gridGap={16}>
        <Box width="100%" maxWidth={682}>
          <CurrentDirectiveLabel />
        </Box>

        <Box
          display="flex"
          width="100%"
          justifyContent={{ xs: 'center', sm: 'auto' }}
          flexDirection={{ xs: 'column', sm: 'row' }}
          gridGap={16}>
          <Box order={{ xs: 1, sm: 0 }}>
            <DrawColorPicker
              colors={colors}
              currentColor={color}
              onColorChange={color => setColor(color)}
              flexDirection={isDeviceSM ? 'column' : 'row'}
            />
          </Box>

          <GameCanvas size={size} color={color} />
          <Box order={{ xs: 2, sm: 0 }}>
            <SizePicker
              currentSize={size}
              onSizeChange={size => setSize(size)}
              flexDirection={isDeviceSM ? 'column' : 'row'}
            />
          </Box>
        </Box>
      </Box>
    </GameLayout>
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
