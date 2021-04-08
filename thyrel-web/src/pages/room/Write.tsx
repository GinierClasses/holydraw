import { Box, Grid, makeStyles } from '@material-ui/core';
import StartForm from 'components/room/start/SentenceForm';
import DirectiveLabel from 'components/room/DirectiveLabel';
import GameLayout from 'components/room/GameLayout';
import CurrentDrawImage from 'components/room/CurrentDrawImage';

const useStyles = makeStyles(theme => ({
  width: {
    width: 512,
    height: 'auto',
    minHeight: 527,
    [theme.breakpoints.down('xs')]: {
      width: '100%',
    },
  },
}));

export default function Write() {
  const classes = useStyles();
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
            <CurrentDrawImage className={classes.width} />
          </Grid>
          <StartForm />
        </Grid>
      </Box>
    </GameLayout>
  );
}
