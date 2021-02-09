import BigInput from '../components/lobby/BigInput';
import Box from '../styles/Box';
import { Icon, IconProps, Input, InputGroup, InputProps } from 'rsuite';

// component when we are in a Lobby (in waiting of game start)
export default function Lobby() {
  return (
    <div>
      this is the lobby
      <Box width={500} m={16} flexDirection="column">
        <BigInput icon="apple" placeholder="blabla" />
        <InputGroup style={{ marginTop: 100 }} size="lg">
          <Input />
          <InputGroup.Addon>
            <Icon icon="search" />
          </InputGroup.Addon>
        </InputGroup>
      </Box>
    </div>
  );
}
