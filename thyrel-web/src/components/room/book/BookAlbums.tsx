import { Grid } from '@material-ui/core';
import { useAlbumContext } from 'hooks/AlbumProvider';
import { useSessionContext } from 'hooks/SessionProvider';
import Album, { AlbumSkeleton } from './Album';
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
      {currentAlbum ? (
        <Grid item className="full-width">
          <Album album={currentAlbum} />
        </Grid>
      ) : session?.currentAlbumId ? (
        <AlbumSkeleton />
      ) : null}
      {isFinish || !currentAlbum ? (
        <Grid item>
          <BookStartAction label={session?.currentAlbumId ? 'Next' : 'Start'} />
        </Grid>
      ) : (
        <div></div>
      )}
    </>
  );
}
