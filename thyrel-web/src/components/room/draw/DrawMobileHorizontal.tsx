import { Box, useMediaQuery } from '@material-ui/core';
import DrawColorPicker from 'components/room/draw/desktop/DesktopColorPicker';
import SizePicker from 'components/room/draw/desktop/SizePicker';
import GameLayout from 'components/room/GameLayout';
import GameCanvas from 'components/room/draw/GameCanvas';
import { useState } from 'react';
import theme from 'theme';
import { useSessionContext } from 'hooks/SessionProvider';
import { useDisableBodyOverflow } from 'components/room/draw/useDisableBodyOverflow';
import { colors } from 'utils/app-constant';

export default function DrawMobileHorizontal() {
  const [color, setColor] = useState(colors[5]);

  const [size, setSize] = useState(8);
  const isDeviceSM = useMediaQuery(theme.breakpoints.up('sm'));
  useDisableBodyOverflow();
  return (
    <GameLayout maxWidth="md">
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        gridGap={16}>
        <Box
          display="flex"
          width="100%"
          justifyContent={{ xs: 'center', sm: 'auto' }}
          flexDirection={{ xs: 'column', sm: 'row' }}
          gridGap={16}>
          {/* <Box order={{ xs: 1, sm: 0 }}>
            <DrawColorPicker
              currentColor={color}
              onColorChange={color => setColor(color)}
            />
          </Box> */}

          <GameCanvas size={size} color={color} />
          {/* <Box order={{ xs: 2, sm: 0 }}>
            <SizePicker
              currentSize={size}
              onSizeChange={size => setSize(size)}
              flexDirection={isDeviceSM ? 'column' : 'row'}
            />
          </Box> */}
        </Box>
      </Box>
    </GameLayout>
  );
}

// export default function DrawMobileHorizontal() {
//   return <div>horizontal mode</div>;
// }
