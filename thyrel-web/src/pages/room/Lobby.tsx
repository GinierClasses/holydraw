import { useRoomContext } from '../../hooks/RoomProvider';

export default function Lobby() {
  const { wsState } = useRoomContext();
  return (
    <div>
      <p>You're in Lobby</p>
      <p>Websocket state : {wsState}</p>
    </div>
  );
}
