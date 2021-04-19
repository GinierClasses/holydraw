import React from 'react';
import { client } from 'api/client';
import { usePlayerContext } from 'hooks/PlayerProvider';
import { useRoomContext } from 'hooks/RoomProvider';
import Loading from '../../Loading';
import PlayerCount from '../../room/PlayerCount';
import BookPlayerList from '../book/BookPlayerList';
import PlayerCardList from './PlayerCardList';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  useMediaQuery,
  useTheme,
} from '@material-ui/core';
import { useSnackbar } from 'notistack';

export function Players() {
  const theme = useTheme();
  const isDeviceSM = useMediaQuery(theme.breakpoints.up('sm'));
  const { players } = useRoomContext();
  const { player } = usePlayerContext();
  const { enqueueSnackbar } = useSnackbar();
  const [open, setOpen] = React.useState(false);
  const [kickedPlayerId, setKickedPlayerId] = React.useState(Number);
  const [kickedPlayerName, setKickedPlayerName] = React.useState(String);

  function onKick(id: number, name: string) {
    setKickedPlayerId(id);
    setKickedPlayerName(name);
    setOpen(true);
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
  }

  return (
    <Box display="flex" flexDirection="column" alignItems="flex-end">
      {players?.length > 0 ? (
        isDeviceSM ? (
          <>
            <PlayerCardList
              players={players}
              playerId={player?.id}
              isKickable={player?.isOwner}
              onKick={(id, name) => onKick(id, name)}
            />

            <Dialog
              fullWidth
              maxWidth="xs"
              open={open}
              onClose={() => setOpen(false)}>
              <DialogTitle>
                Do you really want to kick {kickedPlayerName} ?
              </DialogTitle>
              <DialogActions>
                <Button onClick={() => setOpen(false)} color="primary">
                  Cancel 👋
                </Button>
                <Button
                  onClick={() => {
                    kickPlayer(kickedPlayerId);
                    setOpen(false);
                  }}
                  color="primary">
                  Kick 🤫
                </Button>
              </DialogActions>
            </Dialog>
          </>
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
    <Box pr={{ xs: 1, md: 2 }}>
      <PlayerCount count={players?.length || 0} max={12} />
    </Box>
  );
}
