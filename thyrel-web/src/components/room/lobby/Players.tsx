import { client } from 'api/client';
import { usePlayerContext } from 'hooks/PlayerProvider';
import { useRoomContext } from 'hooks/RoomProvider';
import { useMediaQuery } from 'hooks/useMediaQuery';
import Box from 'styles/Box';
import { MediaQuery } from 'styles/breakpoint';
import Loading from '../../Loading';
import PlayerCount from '../../room/PlayerCount';
import BookPlayerList from '../book/BookPlayerList';
import PlayerCardList from './PlayerCardList';
import { Notification } from 'rsuite';

export function Players() {
  const isDeviceSM = useMediaQuery(MediaQuery.SM);
  const { players } = useRoomContext();
  const { player } = usePlayerContext();

  function onKick(id: number, name: string) {
    window.confirm(`Do you really want to kick ${name} ?`) && kickPlayer(id);
  }

  function kickPlayer(id: number) {
    const url = `player/players/${id}/kick`;
    client(url, {
      token: player?.token?.tokenKey,
      method: 'PATCH',
    })
      .then(response => {
        Notification['success']({
          title: 'Player successfully kicked.',
          description: 'Play with the bests!',
        });
      })
      .catch(error => {
        Notification['error']({
          title: 'An error occurred while trying to kick a player.',
          description: error,
        });
      });
  }

  return (
    <Box flexDirection="column" alignItems="flex-end">
      {players?.length > 0 ? (
        isDeviceSM ? (
          <PlayerCardList
            players={players}
            playerId={player?.id}
            isKickable={player?.isOwner}
            onKick={(id, name) => onKick(id, name)}
          />
        ) : (
          <BookPlayerList
            players={players}
            isKickable={player?.isOwner}
            onClick={(id, name) => onKick(id, name)}
          />
        )
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
