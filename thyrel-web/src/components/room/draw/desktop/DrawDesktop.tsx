import DrawDesktopCanvas from './DrawDesktopCanvas';
import GameLayout from 'components/room/GameLayout';
import { Box } from '@material-ui/core';

export default function DrawDesktop() {
  return (
    <GameLayout maxWidth="lg">
      <Box display="flex" height="100%" alignItems="center">
        <DrawDesktopCanvas />
      </Box>
    </GameLayout>
  );
}
