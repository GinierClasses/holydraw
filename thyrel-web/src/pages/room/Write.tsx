import { Box, Grid } from '@material-ui/core';
import CurrentDrawImage from 'components/room/CurrentDrawImage';
import DirectiveLabel from 'components/room/DirectiveLabel';
import GameLayout from 'components/room/GameLayout';
import StartForm from 'components/room/start/SentenceForm';
import { useSessionContext } from 'hooks/SessionProvider';

export default function Write() {
  return (
    <GameLayout>
      <Box maxWidth={600} alignItems="center" height="100%">
        <Grid
          container
          spacing={3}
          direction="column"
          alignItems="center"
          className="full-height"
          justifyContent="center">
          <Grid item className="full-width">
            <DirectiveLabel directive="Describe this scene" />
          </Grid>
          <Grid item className="full-width">
            <CurrentDrawImageWithContext />
          </Grid>
          <StartFormLoading />
        </Grid>
      </Box>
    </GameLayout>
  );
}

function CurrentDrawImageWithContext() {
  const { currentElement } = useSessionContext();
  return (
    <CurrentDrawImage
      src={currentElement?.parent.drawImage}
      sx={{
        '& > img': {
          width: { xs: '100%', sm: 552 },
          height: 'auto',
          minHeight: { xs: 0, sm: 320 },
        },
      }}
    />
  );
}

function StartFormLoading() {
  const { currentElement } = useSessionContext();
  if (!currentElement) return null;

  return <StartForm />;
}
