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
import { Box } from '@material-ui/core';
import { useSnackbar } from 'notistack';

export default function PlayerForm({ identifier }: { identifier?: string }) {
  const [username, setUsername] = React.useState('');
  const [ppIndex, setPpIndex] = React.useState(0);
  const [loading, setLoading] = React.useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const history = useHistory();
  const defaultUsername = useRandomUsername();
  const nextPp = () => {
    setPpIndex((p: number) => (p > profilesPictures.length - 2 ? 0 : p + 1));
  };

  function onStart() {
    setLoading(true);
    client<Player>('room', {
      data: {
        username: username || defaultUsername,
        avatarUrl: String(ppIndex),
      },
    }).then(
      (player: Player) => {
        setLoading(false);
        if (player.token?.tokenKey) {
          enqueueSnackbar('Room successfully created 🙌 Invite your friends.', {
            variant: 'success',
          });
          setToken(player.token.tokenKey);
          // to redirect to an other page
          history?.push('/r/lobby');
        }
      },
      () => {
        setLoading(false);
        enqueueSnackbar('Sorry 😅 An error occured', { variant: 'error' });
      },
    );
  }

  function onJoin(identifier: string) {
    setLoading(true);
    client<Player>(`room/join/${identifier}`, {
      data: {
        username: username || defaultUsername,
        avatarUrl: String(ppIndex),
      },
      method: 'PATCH',
    }).then(
      (player: Player) => {
        setLoading(false);
        if (player.token?.tokenKey) {
          enqueueSnackbar("You've joined the room!", { variant: 'success' });
          setToken(player.token.tokenKey);
          history?.push('/r/lobby');
        }
      },
      () => {
        setLoading(false);
        enqueueSnackbar('Sorry 😅 An error occured', { variant: 'error' });
      },
    );
  }

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      width="100%"
      gridGap={24}>
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
        gridGap={12}>
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
