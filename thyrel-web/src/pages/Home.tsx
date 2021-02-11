import { RouteComponentProps, useHistory } from 'react-router-dom';
import { Button, Notification } from 'rsuite';
import { client } from '../api/client';
import { setToken } from '../api/player-provider';
import Box from '../styles/Box';
import Player from '../types/Player.type';

/*
  ReactRouter will pass the identifier in props if the route contain a identifier
  Use this identifier to know if user want create a game or join
  If any identifier was provided, the button `Join` will be hide and onStart will
  call the join endpoint with identifier.
*/
export default function Home(
  props: RouteComponentProps<{ identifier?: string }>,
) {
  // will be `Null` if no identifier was provided in the route
  // 🚮 remove this line ⬇️
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const identifier = props.match.params.identifier;

  const history = useHistory();

  function onStart() {
    // todo :
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
    <Box m={16}>
      HolyDraw - Home
      <div>
        <Button onClick={onStart}>Start game</Button>
      </div>
    </Box>
  );
}
