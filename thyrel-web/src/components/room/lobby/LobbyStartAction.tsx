import { usePlayerContext } from 'hooks/PlayerProvider';
import { client } from 'api/client';
import Session from 'types/Session.type';
import { Notification } from 'rsuite';
import StartButton from './StartButton';
import { getToken } from 'api/player-provider';

export default function LobbyStartAction() {
  const { player } = usePlayerContext();

  function onStart() {
    client<Session>('session', { method: 'POST', token: getToken() }).then(
      () => {
        Notification.success({
          title: 'Game successfully started',
          description: 'Begin to play !',
        });
      },
      () => {
        Notification.error({
          title: "Couldn't start game",
          description: 'Try again later',
        });
      },
    );
  }

  return <StartButton onStart={onStart} player={player} />;
}
