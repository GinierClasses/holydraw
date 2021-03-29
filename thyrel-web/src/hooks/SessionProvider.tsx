import Loading from 'components/Loading';
import { useSnackbar } from 'notistack';
import React from 'react';
import StepElement from 'types/HolyElement.type';
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
  const { session, setSession } = useSessionStates();
  const [currentElement, setCurrentElement] = React.useState<StepElement>();
  const { websocket } = useWebsocketContext();
  const { enqueueSnackbar } = useSnackbar();

  console.log(session);

  React.useEffect(() => {
    function onMessage(event: { data: string }) {
      const websocketMessage = parseJson<WebsocketMessage>(event.data);
      if (!websocketMessage) return;
      switch (websocketMessage.websocketEvent) {
        case WebsocketEvent.SessionUpdate:
          const session = websocketMessage.session;
          setSession(prev => prev && { ...prev, ...session });
          break;
      }
    }
    if (websocket) {
      websocket.addEventListener('message', onMessage);
      return () => websocket.removeEventListener('message', onMessage);
    }
  }, [session, setSession, websocket]);

  React.useEffect(() => {
    if (!session?.actualStep) return;

    let deleted = false;
    client<HolyElement>('element/current', { token: getToken() }).then(
      session => !deleted && setCurrentElement(session),
      () =>
        enqueueSnackbar('Sorry, an error occured 😕 [Element-GET]', {
          variant: 'error',
        }),
    );

    return () => {
      deleted = true;
    };
  }, [enqueueSnackbar, session?.actualStep]);

  const values = { session, currentElement };

  return (
    <SessionContext.Provider value={values}>
      {session ? children : <Loading />}
    </SessionContext.Provider>
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
