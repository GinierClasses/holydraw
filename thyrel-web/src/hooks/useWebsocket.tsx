import { useSnackbar } from 'notistack';
import React from 'react';
import { getToken } from '../api/player-provider';
import { testApiUrl } from '../test/data';
import useSafeMounted from 'hooks/useSafeMounted';
import { SendMessageType, WsStates } from 'types/websocket.types';

const apiURL = process.env.REACT_APP_API_URL || testApiUrl;
const domainRegExp = /\b(?:(?:https?|ftp):\/\/)?([^/\n]+)\/?/;
const url = `wss://${domainRegExp.exec(apiURL)?.[1]}/api/stream`;

export function useWebsocket() {
  const [websocket, setWebsocket] = React.useState<WebSocket>();
  const [wsState, setWsState] = React.useState<WsStates>(WsStates.IDLE);
  const { enqueueSnackbar } = useSnackbar();

  const onCloseCallback = React.useCallback(
    (isSocketOpened: boolean) => {
      setWsState(WsStates.CLOSED);
      if (isSocketOpened) {
        enqueueSnackbar('Connexion lost ⚡️', { variant: 'error' });
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
      socket.send(
        JSON.stringify({
          type: SendMessageType.Authentication,
          playerToken: getToken(),
        }),
      );
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
