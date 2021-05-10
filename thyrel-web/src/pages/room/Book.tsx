import BookPlayerList from 'components/room/book/BookPlayerList';
import { Container, Grid, Typography, Box } from '@material-ui/core';
import { useRoomContext } from 'hooks/RoomProvider';
import BookAlbums from 'components/room/book/BookAlbums';
import { AlbumContextProvider } from 'hooks/AlbumProvider';

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
          justify="space-between">
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
  const { players } = useRoomContext();
  return <BookPlayerList players={players} />;
};
