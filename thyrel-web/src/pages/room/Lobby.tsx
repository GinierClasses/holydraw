import { usePlayerContext } from '../../hooks/PlayerProvider';
import { useRoomContext } from '../../hooks/RoomProvider';

export default function Lobby() {
  const { wsState } = useRoomContext();
  const { player } = usePlayerContext();
  return (
    <div>
      <p>You're in Lobby</p>
      <p>Websocket state : {wsState}</p>
      <p>Player: {JSON.stringify(player || {})}</p>
    </div>
  );
}
