import React from 'react';
import { useHistory } from 'react-router-dom';
import { Notification } from 'rsuite';
import Player from '../types/Player.type';
import Room from '../types/Room.type';
import { parseJson } from '../utils/json';
import { useRoomStates } from './useRoomStates';
import { WebsocketMessage, WebsocketEvent, WsStates } from './useWebsocket';
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

type RoomSocketContextProviderProps = {
  children: React.ReactElement;
  onMessage?: (message: string) => void;
};

export function RoomContextProvider({
  children,
}: RoomSocketContextProviderProps) {
  const {
    room,
    players,
    updatePlayer,
    removePlayer,
    addPlayer,
  } = useRoomStates();
  const history = useHistory();
  const { wsState, websocket } = useWebsocketContext();

  React.useEffect(() => {
    function onMessage(event: { data: string }) {
      const message = event.data;
      const websocketMessage = parseJson<WebsocketMessage>(message);
      if (!websocketMessage) return;

      switch (websocketMessage.websocketEvent) {
        case WebsocketEvent.Invalid:
          Notification.error({
            title: "You're not in a game.",
            description: 'You will go back to the home.',
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
          history?.push('/r/start');
          break;
        case WebsocketEvent.PlayerKicked:
          removePlayer(websocketMessage.playerId);
          break;
      }
    }
    if (websocket) {
      websocket.addEventListener('message', onMessage);
      return () => websocket.removeEventListener('message', onMessage);
    }
  }, [addPlayer, history, removePlayer, updatePlayer, websocket]);

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
