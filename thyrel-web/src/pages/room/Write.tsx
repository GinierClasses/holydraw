import { Box, Grid } from '@material-ui/core';
import StartForm from 'components/room/start/SentenceForm';
import React from 'react';
import DirectiveLabel from 'components/room/DirectiveLabel';
import { useSessionContext } from 'hooks/SessionProvider';
import GameLayout from 'components/room/GameLayout';

export default function Write() {
  const { currentElement } = useSessionContext();

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
            <Box
              bgcolor="common.white"
              border={4}
              borderColor="secondary.main"
              boxShadow={1}>
              <img src={currentElement?.parent.drawImage} alt="" width={512} />
            </Box>
          </Grid>
          <StartForm />
        </Grid>
      </Box>
    </GameLayout>
  );
}
