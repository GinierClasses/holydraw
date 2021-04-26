import { useRandomUsername } from 'hooks/useRandomUsername';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { client } from 'api/client';
import { setToken } from 'api/player-provider';
import profilesPictures from 'images/profiles/profiles-pictures';
import Player from 'types/Player.type';
import BigButton from '../BigButton';
import BigInput from '../BigInput';
import ButtonModalJoin from './ButtonModalJoin';
import PlayerAvatar from './PlayerAvatar';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import CreateIcon from '@material-ui/icons/Create';
import { Box, makeStyles } from '@material-ui/core';
import { useSnackbar } from 'notistack';

const useStyles = makeStyles(theme => ({
  container: {
    '&>*': {
      marginBottom: theme.spacing(4),
    },
  },
  buttonContainer: {
    '&>*': {
      marginBottom: theme.spacing(2),
    },
  },
}));

export default function PlayerForm({ identifier }: { identifier?: string }) {
  const [username, setUsername] = React.useState('');
  const [ppIndex, setPpIndex] = React.useState(0);
  const [loading, setLoading] = React.useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const history = useHistory();
  const defaultUsername = useRandomUsername();
  const classes = useStyles();

  const nextPp = () => {
    setPpIndex((p: number) => (p >= profilesPictures.length - 1 ? 0 : p + 1));
  };

  function onConnect(token: string, text: string, isSuccess: boolean = true) {
    enqueueSnackbar(text, { variant: 'success' });
    setToken(token);
    history?.push('/r/lobby');
  }

  function onStart() {
    setLoading(true);
    client<Player>('room', {
      data: {
        username: username || defaultUsername,
        avatarUrl: String(ppIndex),
      },
    })
      .then(
        player => {
          if (player.token?.tokenKey)
            onConnect(player.token?.tokenKey, 'Room successfully created 🙌');
        },
        () =>
          enqueueSnackbar('Sorry, an error occured 😕 [Room-POST]', {
            variant: 'error',
          }),
      )
      .finally(() => setLoading(false));
  }

  function onJoin(identifier: string) {
    const catchedIdentifier = identifier.startsWith('http')
      ? identifier.split('/').pop()
      : identifier;
    setLoading(true);
    client<Player>(`room/join/${catchedIdentifier}`, {
      data: {
        username: username || defaultUsername,
        avatarUrl: String(ppIndex),
      },
      method: 'PATCH',
    })
      .then(
        player => {
          if (player.token?.tokenKey)
            onConnect(player.token?.tokenKey, "You've joined the room!");
        },
        () =>
          enqueueSnackbar('Sorry, an error occured 😕 [Room-PATCH]', {
            variant: 'error',
          }),
      )
      .finally(() => setLoading(false));
  }

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      width="100%"
      className={classes.container}>
      <PlayerAvatar image={profilesPictures[ppIndex]} onShuffle={nextPp} />

      <BigInput
        startIcon={<CreateIcon />}
        value={username}
        onChange={e => setUsername(e.target.value)}
        placeholder={defaultUsername}
      />

      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        className={classes.buttonContainer}>
        <ButtonModalJoin
          identifier={identifier}
          onClick={onJoin}
          loading={loading}
        />

        {!identifier && (
          <BigButton
            size="large"
            startIcon={<PlayArrowIcon style={{ fontSize: 32 }} />}
            onClick={onStart}
            loading={loading}>
            Start
          </BigButton>
        )}
      </Box>
    </Box>
  );
}
