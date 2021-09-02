import { Box, useMediaQuery } from '@material-ui/core';
import DirectiveLabel from 'components/room/DirectiveLabel';
import DrawColorPicker from 'components/room/draw/desktop/DesktopColorPicker';
import SizePicker from 'components/room/draw/desktop/SizePicker';
import GameCanvas from 'components/room/draw/GameCanvas';
import { useDisableBodyOverflow } from 'components/room/draw/useDisableBodyOverflow';
import GameLayout from 'components/room/GameLayout';
import { useSessionContext } from 'hooks/SessionProvider';
import { useState } from 'react';
import theme from 'theme';
import { colors } from 'utils/app-constant';

export default function DrawMobileVertical() {
  const [color, setColor] = useState(colors[5]);

  const [size, setSize] = useState(8);
  const isDeviceSM = useMediaQuery(theme.breakpoints.up('sm'));
  useDisableBodyOverflow();
  return (
    <GameLayout maxWidth="md">
      <Box display="flex" flexDirection="column" alignItems="center" gap={16}>
        <Box width="100%" maxWidth={682}>
          <CurrentDirectiveLabel />
        </Box>

        <Box
          display="flex"
          width="100%"
          justifyContent={{ xs: 'center', sm: 'auto' }}
          flexDirection={{ xs: 'column', sm: 'row' }}
          gap={16}>
          <Box order={{ xs: 1, sm: 0 }}>
            <DrawColorPicker
              currentColor={color}
              onColorChange={color => setColor(color)}
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
