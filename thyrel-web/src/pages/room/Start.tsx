import GymGuy from 'images/gym-guy.svg';
import GameBar from 'components/GameBar';
import { Box, Typography } from '@material-ui/core';
import StartForm from 'components/room/start/StartForm';

export default function Start() {
  return (
    <Box padding={4} display="flex" flexDirection="column" gridGap={42}>
      <GameBar />
      <Box display="flex" flexDirection="column" alignItems="center">
        <img src={GymGuy} alt="" width={256} />
        <Typography variant="h4">Start a story</Typography>
      </Box>

      <StartForm />
    </Box>
  );
}
