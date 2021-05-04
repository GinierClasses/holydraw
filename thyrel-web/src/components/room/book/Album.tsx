import { Box, Typography } from '@material-ui/core';
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
    <Box display="flex" flexDirection="column" width="100%">
      <Typography variant="h4">{album[0].creator?.username}'s album</Typography>
      {album.map(element => {
        const isSentence = element.type === ElementType.Sentence;
        return (
          <Box
            display="flex"
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
