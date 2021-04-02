import GymGuy from 'images/gym-guy.svg';
import GameBar from 'components/GameBar';
import { Box, Container, Grid, Typography } from '@material-ui/core';
import StartForm from 'components/room/start/StartForm';

export default function Start() {
  return (
    <Box padding={{ xs: 2, sm: 4 }} height="100vh">
      <GameBar />
      <Container maxWidth="sm" className="full-height-80">
        <Grid
          container
          spacing={2}
          direction="column"
          alignItems="center"
          className="full-height"
          justify="center">
          <Grid item>
            <img src={GymGuy} alt="" width={256} />
          </Grid>
          <Grid item>
            <Typography variant="h4">Start a story</Typography>
          </Grid>
          <StartForm />
        </Grid>
      </Container>
    </Box>
  );
}
