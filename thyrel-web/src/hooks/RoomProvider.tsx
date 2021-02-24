import React from 'react';
import { useHistory } from 'react-router-dom';
import { Notification } from 'rsuite';
import { client } from '../api/client';
import Player from '../types/Player.type';
import Room from '../types/Room.type';
import { parseJson } from '../utils/json';
import { usePlayerContext } from './PlayerProvider';
import useWebsocket, {
  WebsocketMessage,
  WebsocketEvent,
  WsStates,
} from './useWebsocket';

type RoomSocketContextProps = {
  room?: Room;
  wsState: WsStates;
  players?: Player[];
};

const RoomContext = React.createContext<RoomSocketContextProps>({
  wsState: WsStates.IDLE,
});

type RoomSocketContextProviderProps = {
  children: React.ReactElement;
  onMessage?: (message: string) => void;
};

export function RoomContextProvider({
  children,
}: RoomSocketContextProviderProps) {
  const [room, setRoom] = React.useState<Room>();
  const [players, setPlayers] = React.useState<Player[]>();
  const { player } = usePlayerContext();
  const history = useHistory();

  const updateRoom = React.useCallback(() => {
    client<Room>(`room/${player?.room?.identifier}`).then(r => {
      setRoom(r);
    });
  }, [player]);

  const updatePlayer = React.useCallback(() => {
    client<Player[]>(`room/${player?.room?.id}/players`).then(p =>
      setPlayers(p),
    );
  }, [player]);

  React.useEffect(() => {
    updateRoom();
    updatePlayer();
  }, [updatePlayer, updateRoom]);

  const { wsState } = useWebsocket(
    React.useCallback(
      (message: string) => {
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
            console.log('Update player join');
            // todo : replace by `updatePlayer`
            updatePlayer();
            break;
          case WebsocketEvent.PlayerLeft:
            console.log('Update player left');
            // todo : replace by `updatePlayer`
            updatePlayer();
            break;
        }
      },
      [history, updatePlayer],
    ),
  );

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
