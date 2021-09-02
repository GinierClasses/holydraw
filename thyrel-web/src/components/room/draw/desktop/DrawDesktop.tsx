import { Box } from '@material-ui/core';
import GameLayout from 'components/room/GameLayout';
import DrawDesktopCanvas from './DrawDesktopCanvas';

export default function DrawDesktop() {
  return (
    <GameLayout maxWidth="lg">
      <Box display="flex" height="100%" alignItems="center">
        <DrawDesktopCanvas />
      </Box>
    </GameLayout>
  );
}
