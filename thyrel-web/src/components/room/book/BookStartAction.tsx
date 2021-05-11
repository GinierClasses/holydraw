import { usePlayerContext } from 'hooks/PlayerProvider';
import StartButton from '../lobby/StartButton';
import { client } from 'api/client';
import { getToken } from 'api/player-provider';
import { useSnackbar } from 'notistack';
import { useState } from 'react';

export default function BookStartAction({label}: {label?: string}) {
  const { enqueueSnackbar } = useSnackbar();
  const { player } = usePlayerContext();
  const [isLoading, setIsLoading] = useState(false);

  function onStart() {
    setIsLoading(true)
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
      .finally(() => setIsLoading(false));
  }

  return <StartButton onStart={onStart} isLoading={isLoading} startName="book" player={player} label={label} />;
}
