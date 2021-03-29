import Loading from 'components/Loading';
import { useSnackbar } from 'notistack';
import React from 'react';
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
  onSave: (content: string) => void;
};

const SessionContext = React.createContext<SessionContextProps>({
  onSave: () => void 0,
});

type SessionContextProviderProps = { children: React.ReactElement };

export function SessionContextProvider({
  children,
}: SessionContextProviderProps) {
  const { session, setSession } = useSessionStates();
  const [currentElement, setCurrentElement] = React.useState<HolyElement>();
  const { websocket } = useWebsocketContext();
  const { enqueueSnackbar } = useSnackbar();

  console.log(currentElement);
  function onSave(content: string) {
    const elementId = currentElement?.id;
    const url = `element/${elementId}`;

    const elementContent =
      currentElement?.type == 1 ? { drawimage: content } : { text: content };

    client<HolyElement>(url, {
      token: getToken(),
      method: 'PATCH',
      data: elementContent,
    })
      .then(element => {
        enqueueSnackbar('Element Saved 😎', { variant: 'success' });
        setCurrentElement(e => ({ ...e, ...element }));
        console.log(currentElement);
      })
      .catch(() =>
        enqueueSnackbar('Sorry, an error occured while saving 😕', {
          variant: 'error',
        }),
      );
  }

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
      () => enqueueSnackbar('Sorry, an error occured 😕', { variant: 'error' }),
    );

    return () => {
      deleted = true;
    };
  }, [enqueueSnackbar, session?.actualStep]);

  const values = { session, currentElement, onSave };

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
