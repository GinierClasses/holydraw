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
  const { players } = useRoomContext();
  const { player } = usePlayerContext();
  const isDeviceSM = useMediaQuery(MediaQuery.SM);

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
        <PlayerCardList
          players={players}
          isKickable={player?.isOwner}
          onKick={(id, name) =>
            window.confirm(`Do you really want to kick ${name} ?`) &&
            kickPlayer(id)
          }
        />
        isDeviceSM ? (<PlayerCardList players={players} isKickable={player?.isOwner} />) : (<BookPlayerList players={players} />)  
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
