import { Box, Typography } from '@material-ui/core';
import Skeleton from '@material-ui/core/Skeleton';
import BookDrawingElement from 'components/room/book/BookDrawingElement';
import BookSentenceElement from 'components/room/book/BookSentenceElement';
import profilesPictures from 'images/profiles/profiles-pictures';
import { ElementType, HolyElement } from 'types/HolyElement.type';

type AlbumProps = { album: Array<HolyElement> };

export default function Album({ album }: AlbumProps) {
  if (!album || album.length === 0) {
    return null;
  }
  return (
    <Box
      display="flex"
      border={2}
      borderColor="default.main"
      borderRadius="32px"
      flexDirection="column"
      width="100%"
      height="100%"
      p={{ xs: 1, sm: 2 }}
      minHeight={400}
      alignItems="center">
      <Typography variant="h4">{album[0].creator?.username}'s album</Typography>
      {album.map(element => {
        const isSentence = element.type === ElementType.Sentence;
        return (
          <Box
            display="flex"
            key={element.id}
            mt={1}
            width="100%"
            flexDirection={isSentence ? 'row' : 'row-reverse'}>
            {isSentence ? (
              <BookSentenceElement
                key={element.id}
                username={element.creator?.username}
                avatarUrl={
                  profilesPictures[Number(element.creator?.avatarUrl)]
                }>
                {element.text}
              </BookSentenceElement>
            ) : (
              <BookDrawingElement
                key={element.id}
                username={element.creator?.username}
                src={element.drawImage}
              />
            )}
          </Box>
        );
      })}
    </Box>
  );
}

export function AlbumSkeleton() {
  return (
    <Box
      display="flex"
      flexDirection="column"
      width="100%"
      p={2}
      alignItems="center">
      <Skeleton height={40} width="100%" />
      <Box display="flex" mt={1} width="100%">
        <Skeleton height={64} width="100%" />
      </Box>
    </Box>
  );
}
