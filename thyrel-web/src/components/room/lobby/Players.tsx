import React from 'react';
import { client } from 'api/client';
import { usePlayerContext } from 'hooks/PlayerProvider';
import { useRoomContext } from 'hooks/RoomProvider';
import Loading from '../../Loading';
import PlayerCount from '../../room/PlayerCount';
import BookPlayerList from '../book/BookPlayerList';
import PlayerCardList from './PlayerCardList';
import { Box, useMediaQuery, useTheme } from '@material-ui/core';
import { useSnackbar } from 'notistack';
import { KickModal } from './KickModal';

export function Players() {
  const theme = useTheme();
  const isDeviceSM = useMediaQuery(theme.breakpoints.up('sm'));
  const { players } = useRoomContext();
  const { player } = usePlayerContext();
  const { enqueueSnackbar } = useSnackbar();
  const [playerToKick, setPlayerToKick] =
    React.useState<{
      id: number;
      name: string;
    } | null>(null);

  function onKick(id: number, name: string) {
    setPlayerToKick({ id, name });
  }

  function kickPlayer(id: number) {
    const url = `player/players/${id}/kick`;
    client(url, {
      token: player?.token?.tokenKey,
      method: 'PATCH',
    }).then(
      () => enqueueSnackbar('Player kicked 😎', { variant: 'success' }),
      () =>
        enqueueSnackbar('Sorry, an error occured 😕 [kick-PATCH]', {
          variant: 'error',
        }),
    );
    client(url, {
      token: player?.token?.tokenKey,
      method: 'PATCH',
    })
      .then(() => enqueueSnackbar('Player kicked 😎', { variant: 'success' }))
      .catch(() =>
        enqueueSnackbar('Sorry, an error occured 😕 [kick-PATCH]', {
          variant: 'error',
        }),
      );
  }

  return (
    <Box
      display="flex"
      mt={isDeviceSM ? 0 : 4}
      flexDirection="column"
      height="100%"
      justifyContent="flex-end">
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
      <KickModal
        open={Boolean(playerToKick)}
        username={playerToKick?.name}
        onKick={() => {
          if (!playerToKick) return;
          kickPlayer(playerToKick?.id);
          setPlayerToKick(null);
        }}
        onClose={() => setPlayerToKick(null)}
      />
    </Box>
  );
}

export function PlayerCountBox() {
  const { players } = useRoomContext();

  return (
    <Box pr={{ xs: 1, md: 2 }}>
      <PlayerCount count={players?.length || 0} max={12} />
    </Box>
  );
}
