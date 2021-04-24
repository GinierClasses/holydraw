import { usePlayerContext } from 'hooks/PlayerProvider';
import StartButton from '../lobby/StartButton';
import { client } from 'api/client';
import { getToken } from 'api/player-provider';
import { useSnackbar } from 'notistack';

export default function BookStartAction() {
  const { enqueueSnackbar } = useSnackbar();
  const { player } = usePlayerContext();

  function onStart(): Promise<void> {
    return new Promise(resolve => {
      client<null>('session/album/next', {
        method: 'POST',
        token: getToken(),
      })
        .then(
          () =>
            enqueueSnackbar(
              'Album successfully started, wait 3 seconds before starting 💪',
              { variant: 'success' },
            ),
          () =>
            enqueueSnackbar('Sorry, an error occured 😕 [Session-POST]', {
              variant: 'error',
            }),
        )
        .finally(() => resolve());
    });
  }

  return <StartButton onStart={onStart} startName="book" player={player} />;
}
