import GymGuy from 'images/gym-guy.svg';
import { Grid, Typography } from '@material-ui/core';
import StartForm from 'components/room/start/StartForm';
import GameLayout from 'components/room/GameLayout';

export default function Start() {
  return (
    <GameLayout maxWidth="sm">
      <Grid
        container
        spacing={2}
        direction="column"
        alignItems="center"
        className="full-height"
        wrap="nowrap"
        justify="center">
        <Grid item>
          <img src={GymGuy} alt="" width={384} />
        </Grid>
        <Grid item>
          <Typography variant="h4">Start a story</Typography>
        </Grid>
        <StartForm />
      </Grid>
    </GameLayout>
  );
}
