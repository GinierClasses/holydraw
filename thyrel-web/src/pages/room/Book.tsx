import BookPlayerList from 'components/room/book/BookPlayerList';
import React from 'react';
import { Container, Grid } from '@material-ui/core';
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
            <BookPlayerListWithContext />
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
