import { usePlayerContext } from 'hooks/PlayerProvider';
import { useRoomContext } from 'hooks/RoomProvider';
import Box from 'styles/Box';
import Loading from '../../Loading';
import PlayerCount from '../../room/PlayerCount';
import PlayerCardList from './PlayerCardList';

export function Players() {
  const { players } = useRoomContext();
  const { player } = usePlayerContext();

  return (
    <Box flexDirection="column" alignItems="flex-end">
      {players?.length > 0 ? (
        <PlayerCardList players={players} isKickable={player?.isOwner} />
      ) : (
        <Loading />
      )}
    </Box>
  );
}

export function PlayerCountBox() {
  const { players } = useRoomContext();

  return (
    <Box pr={8}>
      <PlayerCount count={players?.length || 0} max={12} />
    </Box>
  );
}
