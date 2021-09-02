import { Box, Grid } from '@material-ui/core';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import { client } from 'api/client';
import { setToken } from 'api/player-provider';
import useMobileHorizontal from 'hooks/useMobileHorizontal';
import { useRandomUsername } from 'hooks/useRandomUsername';
import profilesPictures from 'images/profiles/profiles-pictures';
import { useSnackbar } from 'notistack';
import React from 'react';
import { useHistory } from 'react-router-dom';
import Player from 'types/Player.type';
import { randomInt } from 'utils/utils';
import BigButton from '../BigButton';
import BigInput from '../BigInput';
import ButtonModalJoin from './ButtonModalJoin';
import PlayerAvatar from './PlayerAvatar';

export default function PlayerForm({ identifier }: { identifier?: string }) {
  const [username, setUsername] = React.useState('');
  const [avatarIndex, setAvatarIndex] = React.useState(
    randomInt(0, profilesPictures.length - 1),
  );
  const [loading, setLoading] = React.useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const history = useHistory();
  const defaultUsername = useRandomUsername();
  const isHorizontal = useMobileHorizontal();

  const nextPp = () => {
    setAvatarIndex((p: number) =>
      p >= profilesPictures.length - 1 ? 0 : p + 1,
    );
  };

  function onConnect(token: string, text: string, isSuccess: boolean = true) {
    enqueueSnackbar(text, { variant: 'success' });
    setToken(token);
    history?.push('/room/lobby');
  }

  function onCreate() {
    setLoading(true);
    client<Player>('room', {
      data: {
        username: username || defaultUsername,
        avatarUrl: String(avatarIndex),
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
        avatarUrl: String(avatarIndex),
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
    <>
      <Grid item>
        <PlayerAvatar
          image={profilesPictures[avatarIndex]}
          data-testid={`player-avatar-index-${avatarIndex}`}
          onShuffle={nextPp}
          size={isHorizontal ? 192 : 256}
        />
      </Grid>

      <Grid item>
        <Box
          display="flex"
          flexDirection={isHorizontal ? 'row' : 'column'}
          px={1}
          pb={1}
          height={isHorizontal ? 72 : undefined}
          maxWidth={isHorizontal ? undefined : 356}>
          <BigInput
            value={username}
            fullWidth
            onChange={e => setUsername(e.target.value)}
            placeholder={defaultUsername}
          />

          <Box
            display="flex"
            mt={isHorizontal ? 0 : 2}
            ml={isHorizontal ? 1 : 0}>
            {(!isHorizontal || identifier) && (
              <ButtonModalJoin
                identifier={identifier}
                onClick={onJoin}
                loading={loading}
              />
            )}

            {!identifier && (
              <BigButton
                fullWidth={!isHorizontal}
                sx={isHorizontal ? {} : { marginLeft: 2 }}
                color="primary"
                startIcon={<PlayArrowIcon style={{ fontSize: 32 }} />}
                onClick={onCreate}
                loading={loading}>
                Create
              </BigButton>
            )}
          </Box>
        </Box>
      </Grid>
    </>
  );
}
