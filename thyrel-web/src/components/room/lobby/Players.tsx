import { client } from 'api/client';
import { usePlayerContext } from 'hooks/PlayerProvider';
import { useRoomContext } from 'hooks/RoomProvider';
import Loading from '../../Loading';
import PlayerCount from '../../room/PlayerCount';
import BookPlayerList from '../book/BookPlayerList';
import PlayerCardList from './PlayerCardList';
import { Box, useMediaQuery, useTheme } from '@material-ui/core';
import { useSnackbar } from 'notistack';

export function Players() {
  const theme = useTheme();
  const isDeviceSM = useMediaQuery(theme.breakpoints.up('sm'));
  const { players } = useRoomContext();
  const { player } = usePlayerContext();
  const { enqueueSnackbar } = useSnackbar();

  function onKick(id: number, name: string) {
    window.confirm(`Do you really want to kick ${name} ?`) && kickPlayer(id);
  }

  function kickPlayer(id: number) {
    const url = `player/players/${id}/kick`;
    client(url, {
      token: player?.token?.tokenKey,
      method: 'PATCH',
    }).then(
      () => enqueueSnackbar('Player kicked 😎', { variant: 'success' }),
      () => enqueueSnackbar('Sorry, an error occured 😕', { variant: 'error' }),
    );
  }

  return (
    <Box display="flex" flexDirection="column" alignItems="flex-end">
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
            playerId={player?.id}
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
