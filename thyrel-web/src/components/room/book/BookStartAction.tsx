import StartButton from '../lobby/StartButton';
import { usePlayerContext } from 'hooks/PlayerProvider';
import { client } from 'api/client';
import { getToken } from 'api/player-provider';
import { useSnackbar } from 'notistack';
import { useState } from 'react';
import { useSessionContext } from 'hooks/SessionProvider';
import { BookState } from 'types/Session.type';

export default function BookStartAction() {
  const { enqueueSnackbar } = useSnackbar();
  const { player } = usePlayerContext();
  const { session } = useSessionContext();
  const [isLoading, setIsLoading] = useState(false);

  const isBookFinish = session?.bookState === BookState.FINISHED;
  const label = isBookFinish
    ? 'Back to Lobby'
    : session?.albumInitiatorId
    ? 'Next'
    : 'Start';

  function onStart() {
    setIsLoading(true);
    if (isBookFinish) {
      client('room/restart', { method: 'PATCH', token: getToken() }).finally(
        () => setIsLoading(false),
      );
      return;
    }
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

  return (
    <StartButton
      onClick={onStart}
      isLoading={isLoading}
      startName="book"
      player={player}
      label={label}
    />
  );
}
