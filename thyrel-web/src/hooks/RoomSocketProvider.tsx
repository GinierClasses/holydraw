import React from 'react';
import { getToken } from '../api/player-provider';
import { testApiUrl } from '../test/data';

const apiURL = process.env.REACT_APP_API_URL || testApiUrl;
const domainRegExp = /\b(?:(?:https?|ftp):\/\/)?([^/\n]+)\/?/;

type RoomSocketContextProps = {
  websocket?: WebSocket;
  connect?: () => void;
};
const RoomSocketContext = React.createContext<RoomSocketContextProps>({});

export enum WsStates {
  IDLE = 'IDLE TIME',
  CONNECTING = 'CONNECTION STARTED',
  CONNECTED = 'CONNECTION SUCCESSFUL',
  SENDING = 'MESSAGE IS SENDING',
  CLOSED = 'CONNECTION IS CLOSE',
}

type RoomSocketContextProviderProps = {
  children: React.ReactElement;
  onMessage?: (message: string) => void;
};

export function RoomSocketContextProvider({
  children,
  onMessage,
}: RoomSocketContextProviderProps) {
  const [websocket, setWebsocket] = React.useState<WebSocket>();
  const [wsState, setWsState] = React.useState<WsStates>(WsStates.IDLE);

  const connect = React.useCallback(() => {
    const url = `${'wss'}://${domainRegExp.exec(apiURL)?.[1]}/api/stream`;
    const socket = new WebSocket(url);

    setWsState(WsStates.CONNECTING);
    setWebsocket(socket);

    socket.onopen = function () {
      // identifie the request
      socket.send(JSON.stringify({ PlayerToken: getToken() }));
      setWsState(WsStates.CONNECTED);
    };

    socket.onclose = function () {
      setWsState(WsStates.CLOSED);
    };
  }, []);

  React.useEffect(() => {
    connect();
  }, [connect]);

  React.useEffect(() => {
    if (websocket) {
      websocket.onmessage = function (event) {
        onMessage?.(event.data);
      };
    }
    return () => websocket?.close();
  }, [onMessage, websocket]);

  const values = { websocket, wsState };

  return (
    <RoomSocketContext.Provider value={values}>
      {children}
    </RoomSocketContext.Provider>
  );
}

export function useWebsocket() {
  const context = React.useContext(RoomSocketContext);
  if (!context)
    throw new Error(
      'useWebsocket should be used within a RoomSocketContextProvider',
    );
  return context;
}
