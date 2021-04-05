import { Box, Grid } from '@material-ui/core';
import StartForm from 'components/room/start/SentenceForm';
import DirectiveLabel from 'components/room/DirectiveLabel';
import GameLayout from 'components/room/GameLayout';
import CurrentDrawImage from 'components/room/CurrentDrawImage';

export default function Write() {
  return (
    <GameLayout>
      <Box maxWidth={520}>
        <Grid
          container
          spacing={2}
          direction="column"
          alignItems="center"
          className="full-height"
          wrap="nowrap"
          justify="center">
          <Grid item className="full-width">
            <DirectiveLabel directive="Describe this scene" />
          </Grid>
          <Grid item>
            <CurrentDrawImage />
          </Grid>
          <StartForm />
        </Grid>
      </Box>
    </GameLayout>
  );
}
