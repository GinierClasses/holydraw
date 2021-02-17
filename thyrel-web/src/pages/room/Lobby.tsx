import PlayerCardList from '../../components/lobby/PlayerCardList';
import { usePlayerContext } from '../../hooks/PlayerProvider';
import { useRoomContext } from '../../hooks/RoomProvider';

export default function Lobby() {
  const { wsState, players } = useRoomContext();
  const { player } = usePlayerContext();
  return (
    <div>
      <p>You're in Lobby</p>
      <p>Websocket state : {wsState}</p>
      <p>Player: {JSON.stringify(player || {})}</p>
      <PlayerCardList players={players} />
    </div>
  );
}
