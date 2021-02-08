import BigInput from '../components/lobby/BigInput';
import Box from '../styles/Box';

// component when we are in a Lobby (in waiting of game start)
export default function Lobby() {
  return (
    <div>
      this is the lobby
      <Box width={200} m={16}>
        <BigInput icon="apple" placeholder="blabla" />
      </Box>
    </div>
  );
}
