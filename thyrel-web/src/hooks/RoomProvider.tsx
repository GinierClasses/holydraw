import React from 'react';
import { useHistory } from 'react-router-dom';
import { Notification } from 'rsuite';
import Player from '../types/Player.type';
import Room from '../types/Room.type';
import { parseJson } from '../utils/json';
import { useRoomState } from './useRoomState';
import useWebsocket, {
  WebsocketMessage,
  WebsocketEvent,
  WsStates,
} from './useWebsocket';

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
  } = useRoomState();
  // const { player } = usePlayerContext();
  const history = useHistory();

  const { wsState } = useWebsocket((message: string) => {
    const websocketMessage = parseJson<WebsocketMessage>(message);
    if (!websocketMessage) return;

    switch (websocketMessage.websocketEvent) {
      case WebsocketEvent.Invalid:
        Notification['error']({
          title: "You're not in a game.",
          description: 'You will go back to the home.',
        });
        history.push('/home');
        break;
      case WebsocketEvent.PlayerJoin:
        addPlayer(websocketMessage.player);
        break;
      case WebsocketEvent.PlayerLeft:
        removePlayer(websocketMessage.player);
        break;
      case WebsocketEvent.NewOwnerPlayer:
        console.log('New Owner player');
        updatePlayer();
    }
  });

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
