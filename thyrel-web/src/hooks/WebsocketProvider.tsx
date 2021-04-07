import React from 'react';
import { WsStates } from 'types/websocket.types';
import { useWebsocket } from './useWebsocket';

type WebsocketContextProps = {
  wsState: WsStates;
  websocket?: WebSocket;
};

const WebsocketContext = React.createContext<WebsocketContextProps>({
  wsState: WsStates.IDLE,
});

type WebsocketContextProviderProps = { children: React.ReactElement };

export function WebsocketProvider({ children }: WebsocketContextProviderProps) {
  const { wsState, websocket } = useWebsocket();

  const values = { wsState, websocket };

  return (
    <WebsocketContext.Provider value={values}>
      {children}
    </WebsocketContext.Provider>
  );
}

export function useWebsocketContext() {
  const context = React.useContext(WebsocketContext);
  if (!context)
    throw new Error(
      'useRoomContext should be used within a RoomSocketContextProvider',
    );
  return context;
}
