import { css } from '@emotion/css';
import BigButton from 'components/BigButton';
import BigInput from 'components/BigInput';
import Box from 'styles/Box';
import GymGuy from 'images/gym-guy.svg';
import GameBar from 'components/GameBar';

export default function Start() {
  return (
    <Box padding={32} flexDirection="column" gap={42}>
      <GameBar max={12} onFinish={() => console.log('Finished?')} />

      <Box flexDirection="column" alignItems="center">
        <img src={GymGuy} alt="" width={256}></img>

        <h1
          className={css({
            fontFamily: 'Work Sans',
            fontWeight: 'bold',
            fontSize: 32,
          })}>
          Start a story
        </h1>
      </Box>

      <Box gap={16} flexDirection="column" alignItems="center">
        <BigInput placeholder="A grandma ate my father" icon="edit" />
        <BigButton icon="check">Save</BigButton>
      </Box>
    </Box>
  );
}
