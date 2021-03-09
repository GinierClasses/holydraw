import { usePlayerContext } from 'hooks/PlayerProvider';
import { client } from 'api/client';
import Session from 'types/Session.type';
import { useRoomContext } from 'hooks/RoomProvider';
import { Notification } from 'rsuite';
import StartButton from './StartButton';

export default function LobbyStartAction() {
  const { player } = usePlayerContext();
  const { room } = useRoomContext();

  function onStart() {
    client<Session>('session', {
      data: {
        roomId: room?.id,
      },
    }).then(
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
