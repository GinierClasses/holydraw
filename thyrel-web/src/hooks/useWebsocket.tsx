import React from 'react';
import { getToken } from '../api/player-provider';
import { testApiUrl } from '../test/data';

const apiURL = process.env.REACT_APP_API_URL || testApiUrl;
const domainRegExp = /\b(?:(?:https?|ftp):\/\/)?([^/\n]+)\/?/;

export enum WsStates {
  IDLE = 'IDLE TIME',
  CONNECTING = 'CONNECTION STARTED',
  CONNECTED = 'CONNECTION SUCCESSFUL',
  SENDING = 'MESSAGE IS SENDING',
  CLOSED = 'CONNECTION IS CLOSE',
}

export enum WebsocketEvent {
  Invalid = -1,
  NewPlayerJoin = 0,
}

export type WebsocketMessage = {
  websocketEvent: WebsocketEvent;
};

export default function useWebsocket(onMessage?: (data: string) => void) {
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

  return { wsState };
}
