import { Box, Typography } from '@material-ui/core';
import { client } from 'api/client';
import { getToken } from 'api/player-provider';
import BigButton from 'components/BigButton';
// import BigButton from 'components/BigButton';
import Loading from 'components/Loading';
import BookDrawingElement from 'components/room/book/BookDrawingElement';
import BookSentenceElement from 'components/room/book/BookSentenceElement';
import { useSessionContext } from 'hooks/SessionProvider';
import profilesPictures from 'images/profiles/profiles-pictures';
import React from 'react';

import { ElementType, HolyElement } from 'types/HolyElement.type';

export default function BookMock() {
  const { session } = useSessionContext();
  const [album, setAlbum] = React.useState<HolyElement[][]>([]);
  const [albumNumber, setAlbumNumber] = React.useState(0);

  React.useEffect(() => {
    client<HolyElement[]>(`album/${session?.id || 1}`, { token: getToken() })
      .then(elements => {
        console.log(`elements is:`);
        console.log(elements);
        const sortedElements = elements.reduce(
          (accumulator: Record<number, HolyElement[]>, value: HolyElement) => {
            if (!value.initiatorId) return accumulator;
            if (accumulator[value.initiatorId]) {
              accumulator[value.initiatorId].push(value);
              return accumulator;
            }
            accumulator[value.initiatorId] = [value];
            return accumulator;
          },
          {},
        );
        console.log(`sorted elements is:`);
        console.log(sortedElements);
        const flatArray: HolyElement[][] = [];
        Object.keys(sortedElements).forEach((key: any) =>
          flatArray.push(sortedElements[key]),
        );
        console.log(`flat array is`);
        console.log(flatArray);
        setAlbum(flatArray);
      })
      .catch(alert);
  }, [session?.id]);

  return album.length >= 1 ? (
    <Box display="flex" flexDirection="row">
      {console.log('album is:')}
      {console.log(album)}
      <Box display="flex" flexDirection="column" maxWidth={300}>
        <Typography variant="h4">
          {album[albumNumber][0].creator?.username}'s album
        </Typography>
        {album[albumNumber].map(element => {
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
        <button
          onClick={() =>
            albumNumber >= album.length - 1
              ? setAlbumNumber(0)
              : setAlbumNumber(albumNumber + 1)
          }>
          {albumNumber >= album.length - 1 && albumNumber > 0
            ? 'First'
            : 'Next'}
        </button>
      </Box>
      {/* <BigButton onClick={() => setAlbumNumber(albumNumber + 1)}>Next</BigButton>; */}
    </Box>
  ) : (
    <Box>
      <Loading />
    </Box>
  );
}
