import { Session } from 'inspector';
import { useSnackbar } from 'notistack';
import React from 'react';
import { getToken } from '../api/player-provider';
import { testApiUrl } from '../test/data';
import Player from '../types/Player.type';
import useSafeMounted from 'hooks/useSafeMounted';

const apiURL = process.env.REACT_APP_API_URL || testApiUrl;
const domainRegExp = /\b(?:(?:https?|ftp):\/\/)?([^/\n]+)\/?/;
const url = `wss://${domainRegExp.exec(apiURL)?.[1]}/api/stream`;

export enum WsStates {
  IDLE = 'Loading...',
  CONNECTING = 'You will be connected',
  CONNECTED = 'You are connected',
  CLOSED = "You're disconnected",
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

  const onCloseCallback = React.useCallback(
    (isSocketOpened: boolean) => {
      setWsState(WsStates.CLOSED);
      if (isSocketOpened) {
        enqueueSnackbar('Connexion lost ⚡️ [ws]', { variant: 'error' });
        setWebsocket(undefined);
      }
    },
    [enqueueSnackbar],
  );
  const safeOnClose = useSafeMounted(onCloseCallback);

  const connect = React.useCallback(() => {
    const socket = new WebSocket(url);
    let isSocketOpened = false;
    setWsState(WsStates.CONNECTING);
    setWebsocket(socket);

    socket.onopen = function () {
      isSocketOpened = true;
      // identifie the request
      socket.send(JSON.stringify({ PlayerToken: getToken() }));
      setWsState(WsStates.CONNECTED);
    };

    socket.onclose = function () {
      safeOnClose(isSocketOpened);
    };
  }, [safeOnClose]);

  React.useEffect(() => {
    if (websocket) {
      return () => websocket.close();
    }
    connect();
  }, [connect, websocket]);

  return { wsState, websocket };
}
