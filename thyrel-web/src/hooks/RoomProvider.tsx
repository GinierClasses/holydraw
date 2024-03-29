import { useSnackbar } from 'notistack';
import React from 'react';
import { useHistory } from 'react-router-dom';
import {
  WebsocketEvent,
  WebsocketMessage,
  WsStates,
} from 'types/websocket.types';
import Player from '../types/Player.type';
import Room from '../types/Room.type';
import { parseJson } from '../utils/json';
import { useRoomStates } from './useRoomStates';
import { useWebsocketContext } from './WebsocketProvider';

type RoomSocketContextProps = {
  room?: Room;
  wsState: WsStates;
  players: Player[];
};

const RoomContext = React.createContext<RoomSocketContextProps>({
  wsState: WsStates.IDLE,
  players: [],
});

type RoomSocketContextProviderProps = { children: React.ReactElement };

export function RoomContextProvider({
  children,
}: RoomSocketContextProviderProps) {
  const { room, players, updatePlayer, removePlayer, addPlayer, setRoom } =
    useRoomStates();

  const history = useHistory();
  const { wsState, websocket } = useWebsocketContext();
  const { enqueueSnackbar } = useSnackbar();

  React.useEffect(() => {
    function onMessage(event: { data: string }) {
      const message = event.data;
      const websocketMessage = parseJson<WebsocketMessage>(message);
      if (!websocketMessage) return;

      switch (websocketMessage.websocketEvent) {
        case WebsocketEvent.Invalid:
          enqueueSnackbar(websocketMessage.error || 'Error from Websocket.', {
            variant: 'error',
          });
          history.push('/home');
          break;
        case WebsocketEvent.PlayerJoin:
          addPlayer(websocketMessage.player);
          break;
        case WebsocketEvent.PlayerLeft:
          removePlayer(websocketMessage.playerId);
          break;
        case WebsocketEvent.NewOwnerPlayer:
          updatePlayer();
          break;
        case WebsocketEvent.SessionStart:
          history?.push('/room/start');
          break;
        case WebsocketEvent.PlayerKicked:
          removePlayer(websocketMessage.playerId);
          break;
        case WebsocketEvent.Restart:
          history?.push('/room/lobby');
          break;
        case WebsocketEvent.ReloadIdentifier:
          const roomReload = websocketMessage.room;
          if (!roomReload) break;
          setRoom(prev => prev && { ...prev, ...roomReload });
          break;
        case WebsocketEvent.RoomUpdate:
          const roomUpdate = websocketMessage.room;
          if (!roomUpdate) break;
          setRoom(prev => prev && { ...prev, ...roomUpdate });
          break;
      }
    }
    if (websocket) {
      websocket.addEventListener('message', onMessage);
      return () => websocket.removeEventListener('message', onMessage);
    }
  }, [
    addPlayer,
    enqueueSnackbar,
    setRoom,
    history,
    removePlayer,
    updatePlayer,
    websocket,
  ]);

  React.useEffect(() => {
    const playingPlayers = players.filter(player => player.isPlaying);
    if (
      history.location.pathname === '/room/lobby' &&
      playingPlayers.length > 0
    ) {
      history?.push('/room/start');
    }
  }, [players, history]);

  const values = { room, wsState, players };

  return <RoomContext.Provider value={values}>{children}</RoomContext.Provider>;
}

export function useRoomContext() {
  const context = React.useContext(RoomContext);
  if (!context)
    throw new Error(
      'useRoomContext should be used within a RoomSocketContextProvider',
    );
  return context;
}
