import { Session } from 'inspector';
import { useSnackbar } from 'notistack';
import React from 'react';
import { getToken } from '../api/player-provider';
import { testApiUrl } from '../test/data';
import Player from '../types/Player.type';

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
  PlayerJoin = 1,
  PlayerLeft = 2,
  PlayerFinished = 3,
  NewOwnerPlayer = 4,
  PlayerKicked = 5,
  SessionStart = 11,
  SessionUpdate = 12,
  NextStep = 13, // on a step is finish
}

export type WebsocketMessage = {
  websocketEvent: WebsocketEvent;
  player?: Player;
  playerId?: number;
  session?: Partial<Session>;
};

export function useWebsocket() {
  const [websocket, setWebsocket] = React.useState<WebSocket>();
  const [wsState, setWsState] = React.useState<WsStates>(WsStates.IDLE);
  const { enqueueSnackbar } = useSnackbar();

  const connect = React.useCallback(() => {
    const url = `wss://${domainRegExp.exec(apiURL)?.[1]}/api/stream`;
    const socket = new WebSocket(url);
    let isOpen = false;
    setWsState(WsStates.CONNECTING);
    setWebsocket(socket);

    socket.onopen = function () {
      isOpen = true;
      // identifie the request
      socket.send(JSON.stringify({ PlayerToken: getToken() }));
      setWsState(WsStates.CONNECTED);
    };

    socket.onclose = function () {
      setWsState(WsStates.CLOSED);

      isOpen && enqueueSnackbar('Connexion lost ⚡️', { variant: 'error' });
      // set to undefined to reload the useEffect and rerun connection
      isOpen && setWebsocket(undefined);
    };
  }, [enqueueSnackbar]);

  React.useEffect(() => {
    if (websocket) {
      return () => websocket.close();
    }
    connect();
  }, [connect, websocket]);

  return { wsState, websocket };
}
