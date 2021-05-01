import BookPlayerList from 'components/room/book/BookPlayerList';
import React from 'react';
import GameLayout from 'components/room/GameLayout';
import { Grid } from '@material-ui/core';
import BookStartAction from 'components/room/book/BookStartAction';
import { useRoomContext } from 'hooks/RoomProvider';
import BookMock from 'components/room/book/BookMock';
import { AlbumContextProvider } from 'hooks/AlbumProvider';

export default function Book() {
  const { players } = useRoomContext();
  return (
    <AlbumContextProvider>
      <GameLayout maxWidth="sm">
        <BookMock />
        <Grid
          container
          spacing={2}
          direction="column"
          alignItems="center"
          className="full-height"
          wrap="nowrap"
          justify="space-between">
          <Grid item>
            <BookPlayerList players={players} />
          </Grid>
          <Grid item>
            <BookStartAction />
          </Grid>
        </Grid>
      </GameLayout>
    </AlbumContextProvider>
  );
}
