import Loading from 'components/Loading';
import { useSnackbar } from 'notistack';
import React from 'react';
import StepElement, { ElementType } from 'types/HolyElement.type';
import HolyElement from 'types/HolyElement.type';
import { client } from '../api/client';
import { getToken } from '../api/player-provider';
import Session, { SessionStepType } from '../types/Session.type';
import { parseJson } from '../utils/json';
import useSessionStates from './useSessionStates';
import { WebsocketEvent, WebsocketMessage } from 'types/websocket.types';
import { useWebsocketContext } from './WebsocketProvider';

type SessionContextProps = {
  session?: Session;
  currentElement?: HolyElement;
  onSave: (content: string) => Promise<void>;
};

const SessionContext = React.createContext<SessionContextProps>({
  onSave: () => Promise.resolve(),
});

type SessionContextProviderProps = { children: React.ReactElement };

export function SessionContextProvider({
  children,
}: SessionContextProviderProps) {
  const { session, setSession } = useSessionStates();
  const [currentElement, setCurrentElement] = React.useState<StepElement>();
  const { websocket } = useWebsocketContext();
  const { enqueueSnackbar } = useSnackbar();

  function onSave(content: string): Promise<void> {
    const elementId = currentElement?.id;

    const elementContent =
      currentElement?.type === ElementType.Drawing
        ? { drawimage: content }
        : { text: content };

    return new Promise(resolve => {
      client<HolyElement>(`element/${elementId}`, {
        token: getToken(),
        method: 'PATCH',
        data: elementContent,
      })
        .then(element => {
          enqueueSnackbar('Element Saved 😎', { variant: 'success' });
          setCurrentElement(e => ({ ...e, ...element }));
        })
        .catch(() =>
          enqueueSnackbar('Sorry, an error occured while saving 😕', {
            variant: 'error',
          }),
        )
        .finally(() => resolve());
    });
  }

  React.useEffect(() => {
    if (!websocket) return;

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
    websocket.addEventListener('message', onMessage);
    return () => websocket.removeEventListener('message', onMessage);
  }, [session, setSession, websocket]);

  React.useEffect(() => {
    if (!session?.actualStep || session.stepType === SessionStepType.Book)
      return;

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
  }, [enqueueSnackbar, session?.actualStep, session?.stepType]);

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
