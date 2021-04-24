import { usePlayerContext } from 'hooks/PlayerProvider';
import { client } from 'api/client';
import Session from 'types/Session.type';
import StartButton from './StartButton';
import { getToken } from 'api/player-provider';
import { useSnackbar } from 'notistack';

export default function LobbyStartAction() {
  const { player } = usePlayerContext();
  const { enqueueSnackbar } = useSnackbar();

  function onStart(): Promise<void> {
    return new Promise(resolve => {
      client<Session>('session', { method: 'POST', token: getToken() })
        .then(
          () =>
            enqueueSnackbar('Game successfully started 💪', {
              variant: 'success',
            }),
          () =>
            enqueueSnackbar('Sorry, an error occured 😕 [Session-POST]', {
              variant: 'error',
            }),
        )
        .finally(() => resolve());
    });
  }

  return <StartButton onStart={onStart} player={player} />;
}
