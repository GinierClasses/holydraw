import { css } from '@emotion/css';
import { useRoomContext } from '../../hooks/RoomProvider';
import Box from '../../styles/Box';
import ShareRoomButton from './ShareRoomButton';

export default function SettingsMenu() {
  const { room, wsState } = useRoomContext();
  return (
    <Box
      borderRadius="0 4px 4px 0"
      minWidth={328}
      pl={16}
      height="auto"
      flexDirection="column"
      gap={24}>
      <p>{wsState}</p>
      <ShareRoomButton identifier={room?.identifier || 'loading...'} />
    </Box>
  );
}
