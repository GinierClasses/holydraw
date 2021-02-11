import { useHistory } from 'react-router-dom';
import { Button, Notification } from 'rsuite';
import { client } from '../api/client';
import { setToken } from '../api/player-provider';
import AvatarCard from '../components/Home/AvatarCard';
import UserCard from '../components/lobby/UserCard';
import Player from '../types/Player.type';

// component when we aren't in a Lobby
export default function Home() {
  const history = useHistory();

  function onStart() {
    client<Player>('room', {
      data: { username: 'todo', avatarUrl: 'todo' },
    }).then((player: Player) => {
      if (player.token.tokenKey) {
        Notification['success']({
          title: 'Room successfully created.',
          description: 'Invite your friends.',
        });
        setToken(player.token.tokenKey);
        // to redirect to an other page
        history.push('/r/lobby');
      }
    });
  }

  return (
    <div style={{ margin: 16 }}>
      HolyDraw - Home
      <div>
        <Button onClick={onStart}>Start game</Button>
      </div>
    </div>
  );
}
