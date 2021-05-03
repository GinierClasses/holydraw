import { Box } from '@material-ui/core';
import { client } from 'api/client';
import { getToken } from 'api/player-provider';
import Loading from 'components/Loading';
import { useSessionContext } from 'hooks/SessionProvider';
import React from 'react';

import { HolyElement } from 'types/HolyElement.type';
import Album from './Album';

export default function BookMock() {
  const { session } = useSessionContext();
  const [album, setAlbum] = React.useState<HolyElement[][]>([]);

  React.useEffect(() => {
    client<HolyElement[]>(`album/${session?.id || 1}`, { token: getToken() })
      .then(elements => {
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
        const flatArray: HolyElement[][] = [];
        Object.keys(sortedElements).forEach((key: any) =>
          flatArray.push(sortedElements[key]),
        );
        setAlbum(flatArray);
      })
      .catch(alert);
  }, [session?.id]);

  return album.length >= 1 ? (
    <Box display="flex" flexDirection="column" style={{ gap: '40px' }}>
      <Album album={album[0]} />
    </Box>
  ) : (
    <Box>
      <Loading />
    </Box>
  );
}
