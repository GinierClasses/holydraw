import React from 'react';
import { Notification } from 'rsuite';
import HolyElement from 'types/HolyElement.type';
import { client } from '../api/client';
import { getToken } from '../api/player-provider';
import Session from '../types/Session.type';
import { parseJson } from '../utils/json';
import useSessionStates from './useSessionStates';
import { WebsocketEvent, WebsocketMessage } from './useWebsocket';
import { useWebsocketContext } from './WebsocketProvider';

type SessionContextProps = {
  session?: Session;
  currentElement?: HolyElement;
};

const SessionContext = React.createContext<SessionContextProps>({});

type SessionContextProviderProps = { children: React.ReactElement };

export function SessionContextProvider({
  children,
}: SessionContextProviderProps) {
  const { session } = useSessionStates();
  const [currentElement, setCurrentElement] = React.useState<HolyElement>();
  const { websocket } = useWebsocketContext();

  console.log('SESSION', session);
  console.log('CURRENT ELEMENT', currentElement);

  React.useEffect(() => {
    function onMessage(event: { data: string }) {
      const websocketMessage = parseJson<WebsocketMessage>(event.data);
      if (!websocketMessage) return;

      switch (websocketMessage.websocketEvent) {
        case WebsocketEvent.NewOwnerPlayer:
          break;
      }
    }
    if (websocket) {
      websocket.addEventListener('message', onMessage);
      return () => websocket.removeEventListener('message', onMessage);
    }
  }, [session, websocket]);

  React.useEffect(() => {
    if (!session?.actualStep) return;

    let deleted = false;
    client<HolyElement>('element/current', { token: getToken() }).then(
      session => !deleted && setCurrentElement(session),
      () =>
        Notification.error({
          title: 'Element error',
          description: 'Go on Home or refresh the page...',
        }),
    );

    return () => {
      deleted = true;
    };
  }, [session?.actualStep]);

  const values = { session, currentElement };

  return (
    <SessionContext.Provider value={values}>{children}</SessionContext.Provider>
  );
}

export function useSessionContext() {
  const context = React.useContext(SessionContext);
  if (!context)
    throw new Error(
      'useSessionContext should be used within a SessionContextProvider',
    );
  return context;
}
