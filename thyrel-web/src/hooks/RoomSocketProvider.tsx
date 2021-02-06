import React from 'react';
import { useHistory } from 'react-router-dom';
import { getToken } from '../api/player-provider';

type RoomSocketContextProps = {
  websocket?: WebSocket,
  connect?: () => void;
}

const RoomSocketContext = React.createContext<RoomSocketContextProps>({});

enum WsStates {
  IDLE = 'IDLE TIME',
  CONNECTING = 'CONNECTION STARTED',
  CONNECTED = 'CONNECTION SUCCESSFUL',
  SENDING = 'MESSAGE IS SENDING',
  CLOSED = 'CONNECTION IS CLOSE',
}

type RoomSocketContextProviderProps = {
  children: React.ReactElement;
};

export function RoomSocketContextProvider({
  children,
}: RoomSocketContextProviderProps) {
  const [websocket, setWebsocket] = React.useState<WebSocket>();
  const [wsState, setWsState] = React.useState<WsStates>(WsStates.IDLE);
  const history = useHistory();


  function connect() {
    const url = `${'wss'}://${'api'}/stream`;
    const socket = new WebSocket(url);

    setWsState(WsStates.CONNECTING);
    setWebsocket(socket);

    socket.onopen = function (event) {
      socket.send(JSON.stringify({ PlayerIdentifier: getToken() }));

      setWsState(WsStates.CONNECTED);
    };

    socket.onmessage = function (event) {};

    socket.onclose = function (event) {
      setWsState(WsStates.CLOSED);
    };
  }

  const values = { websocket, connect };
  

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
