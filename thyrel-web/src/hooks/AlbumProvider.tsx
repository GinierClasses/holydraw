import React from 'react';
import { HolyElement } from 'types/HolyElement.type';
import { parseJson } from '../utils/json';
import { WebsocketEvent, WebsocketMessage } from 'types/websocket.types';
import { useWebsocketContext } from './WebsocketProvider';

type AlbumContextProps = {
  albums?: Record<number, HolyElement[]>;
};

const AlbumContext = React.createContext<AlbumContextProps>({});

type AlbumContextProviderProps = { children: React.ReactElement };

/*
  AlbumContextProvider return `albums` than contain objects like this :

  44: [               <- is the id of the initiator 
    { id: 3, ... },   <- element with the same initiator id, the first element creator is equal to the initiator
    { id: 4, ... },
  ],
  45: [
    ...
  ]
*/
export function AlbumContextProvider({ children }: AlbumContextProviderProps) {
  const [albums, setAlbums] = React.useState<Record<number, HolyElement[]>>({});
  const { websocket } = useWebsocketContext();

  React.useEffect(() => {
    function onMessage(event: { data: string }) {
      const websocketMessage = parseJson<WebsocketMessage>(event.data);
      if (!websocketMessage) return;
      switch (websocketMessage.websocketEvent) {
        case WebsocketEvent.NewAlbumElement:
          if (!websocketMessage.album) break;

          const album = websocketMessage.album;
          setAlbums(prevAlbums => {
            if (!album.initiatorId) return prevAlbums;
            const prevAlbumsCopy = { ...prevAlbums };

            if (prevAlbumsCopy[album.initiatorId]) {
              prevAlbumsCopy[album.initiatorId].push(album);
            } else {
              prevAlbumsCopy[album.initiatorId] = [album];
            }

            return prevAlbumsCopy;
          });
          break;
      }
    }
    if (websocket) {
      websocket.addEventListener('message', onMessage);
      return () => websocket.removeEventListener('message', onMessage);
    }
  }, [websocket]);

  const values = { albums };

  return (
    <AlbumContext.Provider value={values}>{children}</AlbumContext.Provider>
  );
}

export function useAlbumContext() {
  const context = React.useContext(AlbumContext);
  if (!context)
    throw new Error(
      'useAlbumContext should be used within a AlbumContextProvider',
    );
  return context;
}
