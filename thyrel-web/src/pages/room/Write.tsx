import { Box, Grid, makeStyles } from '@material-ui/core';
import StartForm from 'components/room/start/SentenceForm';
import DirectiveLabel from 'components/room/DirectiveLabel';
import GameLayout from 'components/room/GameLayout';
import CurrentDrawImage from 'components/room/CurrentDrawImage';
import { useSessionContext } from 'hooks/SessionProvider';

const useStyles = makeStyles(theme => ({
  width: {
    width: 552,
    height: 'auto',
    minHeight: 320,
    [theme.breakpoints.down('xs')]: {
      width: '100%',
      minHeight: 0,
    },
  },
}));

export default function Write() {
  const classes = useStyles();
  return (
    <GameLayout>
      <Box maxWidth={600} alignItems="center" height="100%">
        <Grid
          container
          spacing={3}
          direction="column"
          alignItems="center"
          className="full-height"
          justify="center">
          <Grid item className="full-width">
            <DirectiveLabel directive="Describe this scene" />
          </Grid>
          <Grid item className="full-width">
            <CurrentDrawImageWithContext className={classes.width} />
          </Grid>
          <StartFormLoading />
        </Grid>
      </Box>
    </GameLayout>
  );
}

function CurrentDrawImageWithContext({ className }: { className: string }) {
  const { currentElement } = useSessionContext();
  return (
    <CurrentDrawImage
      src={currentElement?.parent.drawImage}
      className={className}
    />
  );
}

function StartFormLoading() {
  const { currentElement } = useSessionContext();
  if (!currentElement) return null;

  return <StartForm />;
}
