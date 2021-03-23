import { usePlayerContext } from 'hooks/PlayerProvider';
import { client } from 'api/client';
import Session from 'types/Session.type';
import StartButton from './StartButton';
import { getToken } from 'api/player-provider';
import { useSnackbar } from 'notistack';

export default function LobbyStartAction() {
  const { player } = usePlayerContext();
  const { enqueueSnackbar } = useSnackbar();

  function onStart() {
    client<Session>('session', { method: 'POST', token: getToken() }).then(
      () =>
        enqueueSnackbar('Game successfully started 💪', { variant: 'success' }),
      () => enqueueSnackbar('Sorry 😅 An error occured', { variant: 'error' }),
    );
  }

  return <StartButton onStart={onStart} player={player} />;
}
