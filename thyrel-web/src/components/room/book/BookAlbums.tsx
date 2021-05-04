import { Grid } from '@material-ui/core';
import { useAlbumContext } from 'hooks/AlbumProvider';
import { useSessionContext } from 'hooks/SessionProvider';
import React from 'react';
import Album from './Album';
import BookStartAction from './BookStartAction';

export default function BookAlbums() {
  const { session } = useSessionContext();
  const { albums } = useAlbumContext();

  const currentAlbum = session?.currentAlbumId
    ? albums?.[session?.currentAlbumId]
    : undefined;
  const isFinish = currentAlbum?.length === session?.totalPlayers;

  return (
    <>
      {currentAlbum && (
        <Grid item>
          <Album album={currentAlbum} />
        </Grid>
      )}
      {(isFinish || !currentAlbum) && (
        <Grid item>
          <BookStartAction />
        </Grid>
      )}
    </>
  );
}
