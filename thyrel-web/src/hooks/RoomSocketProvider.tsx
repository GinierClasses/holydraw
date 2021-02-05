import React from 'react';
import { useHistory } from 'react-router-dom';

const RoomSocketContext = React.createContext({});

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

  const values = { websocket };

  function connect() {
    const url = `${'wss'}://${'api'}/stream`;
    const socket = new WebSocket(url);

    socket.onopen = function (event) {
      socket.send(JSON.stringify({ PlayerId: 12 }));

      setWsState(WsStates.CONNECTED);
    };

    socket.onmessage = function (event) {};

    socket.onclose = function (event) {
      setWsState(WsStates.CLOSED);
    };
    setWsState(WsStates.CONNECTING);
    setWebsocket(socket);
  }

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
