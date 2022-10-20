import { Box, Container, Grid, Typography } from '@material-ui/core';
import BookAlbums from 'components/room/book/BookAlbums';
import BookPlayerList from 'components/room/book/BookPlayerList';
import { AlbumContextProvider, useAlbumContext } from 'hooks/AlbumProvider';
import { useSessionContext } from 'hooks/SessionProvider';

export default function Book() {
  return (
    <AlbumContextProvider>
      <Container maxWidth="sm" className="full-height">
        <Grid
          container
          spacing={2}
          direction="column"
          alignItems="center"
          className="full-height"
          wrap="nowrap"
          justifyContent="space-between">
          <Grid item>
            <Box
              mt={1}
              display="flex"
              flexDirection="column"
              alignItems="center">
              <Typography variant="h4">Albums</Typography>
              <Box mt={1}>
                <BookPlayerListWithContext />
              </Box>
            </Box>
          </Grid>
          <BookAlbums />
        </Grid>
      </Container>
    </AlbumContextProvider>
  );
}

const BookPlayerListWithContext = () => {
  const { players } = useAlbumContext();
  const { session } = useSessionContext();
  return (
    <BookPlayerList playerId={session?.albumInitiatorId} players={players} />
  );
};
