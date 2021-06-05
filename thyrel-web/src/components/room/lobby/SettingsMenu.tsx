import { Box, Typography } from '@material-ui/core';
import { usePlayerContext } from 'hooks/PlayerProvider';
import { useRoomContext } from 'hooks/RoomProvider';
import RoomModeSelector from './room-mode/RoomModeSelector';
import ShareRoomButton from './ShareRoomButton';

export default function SettingsMenu() {
  const { room, wsState } = useRoomContext();
  const { player } = usePlayerContext();

  return (
    <Box
      minWidth={288}
      pl={2}
      height="100%"
      display="flex"
      justifyContent="space-between"
      flexDirection="column"
      alignItems={{ xs: 'center', sm: 'flex-start' }}>
      <Box
        display="flex"
        width="100%"
        alignItems="inherit"
        flexDirection="column">
        <ShareRoomButton identifier={room?.identifier} player={player} />
        <Typography variant="body1">Debug: {wsState}</Typography>
      </Box>
      <Box
        display="flex"
        width="100%"
        alignItems="inherit"
        mt={{ xs: 4, sm: 0 }}
        pb={{ xs: 0, sm: 1 }}
        flexDirection="column">
        <RoomModeSelector />
      </Box>
    </Box>
  );
}
