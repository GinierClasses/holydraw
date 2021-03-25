import { Box, Typography } from '@material-ui/core';
import { useRoomContext } from 'hooks/RoomProvider';
import ShareRoomButton from './ShareRoomButton';

export default function SettingsMenu() {
  const { room, wsState } = useRoomContext();
  return (
    <Box
      borderRadius="0 4px 4px 0"
      minWidth={328}
      pl={2}
      height="auto"
      display="flex"
      flexDirection="column"
      gridGap={24}>
      <Typography variant="h5">{wsState}</Typography>
      <ShareRoomButton identifier={room?.identifier} />
    </Box>
  );
}
