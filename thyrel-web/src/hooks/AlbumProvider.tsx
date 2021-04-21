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
          
          const { element, initiatorId } = websocketMessage.album;
          setAlbums(prevAlbums => {
            if (prevAlbums[initiatorId]) {
              prevAlbums[initiatorId].push(element);
            } else {
              prevAlbums[initiatorId] = [element];
            }
            return prevAlbums;
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
