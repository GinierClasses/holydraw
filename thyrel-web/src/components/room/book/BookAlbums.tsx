import { Grid } from '@material-ui/core';
import { useAlbumContext } from 'hooks/AlbumProvider';
import { useSessionContext } from 'hooks/SessionProvider';
import Album, { AlbumSkeleton } from './Album';
import BookStartAction from './BookStartAction';

export default function BookAlbums() {
  const { session } = useSessionContext();
  const { albums } = useAlbumContext();

  const currentAlbum = session?.albumInitiatorId
    ? albums?.[session?.albumInitiatorId]
    : undefined;
  const isAlbumFinish = currentAlbum?.length === session?.totalPlayers;

  return (
    <>
      {currentAlbum ? (
        <Grid item className="full-width">
          <Album album={currentAlbum} />
        </Grid>
      ) : session?.albumInitiatorId ? (
        <AlbumSkeleton />
      ) : null}
      <Grid item>
        {(isAlbumFinish || !(currentAlbum || session?.albumInitiatorId)) && (
          <BookStartAction />
        )}
      </Grid>
    </>
  );
}
