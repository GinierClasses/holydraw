import { Box, Typography } from '@material-ui/core';
import { usePlayerContext } from 'hooks/PlayerProvider';
import { useRoomContext } from 'hooks/RoomProvider';
import ShareRoomButton from './ShareRoomButton';

export default function SettingsMenu() {
  const { room, wsState } = useRoomContext();
  const { player } = usePlayerContext();

  return (
    <Box
      borderRadius="0 4px 4px 0"
      minWidth={328}
      pl={2}
      height="auto"
      display="flex"
      flexDirection="column"
      alignItems={{ xs: 'center', sm: 'flex-start' }}
      gridGap={24}>
      <ShareRoomButton identifier={room?.identifier} />
      <Typography variant="body1">Debug: {wsState}</Typography>
    </Box>
  );
}
