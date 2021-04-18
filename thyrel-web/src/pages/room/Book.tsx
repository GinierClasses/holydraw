import { Box } from '@material-ui/core';
import { client } from 'api/client';
import { getToken } from 'api/player-provider';
import Loading from 'components/Loading';
import BookDrawingElement from 'components/room/book/BookDrawingElement';
import BookSentenceElement from 'components/room/book/BookSentenceElement';
import profilesPictures from 'images/profiles/profiles-pictures';
import React from 'react';

import { ElementType, HolyElement } from 'types/HolyElement.type';

export default function Book() {
  const [album, setAlbum] = React.useState<HolyElement[]>([]);

  React.useEffect(() => {
    client<HolyElement[]>('get_own_album', { token: getToken() })
      .then(setAlbum)
      .catch(alert);
  }, []);

  return album.length >= 1 ? (
    <Box display="flex" flexDirection="column" maxWidth={300}>
      {album.map(element => {
        const isSentence = element.type === ElementType.Sentence;

        return isSentence ? (
          <BookSentenceElement
            key={element.id}
            username={element.creator?.username}
            avatarUrl={profilesPictures[Number(element.creator?.avatarUrl)]}
            sentence={element.text}
          />
        ) : (
          <BookDrawingElement
            key={element.id}
            username={element.creator?.username}
            src={element.drawImage}
          />
        );
      })}
    </Box>
  ) : (
    <Box>
      <Loading />
    </Box>
  );
}
