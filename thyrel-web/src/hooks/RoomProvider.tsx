import React from 'react';
import { useHistory } from 'react-router-dom';
import { Notification } from 'rsuite';
import Room from '../types/Room.type';
import { parseJson } from '../utils/json';
import useWebsocket, {
  WebsocketMessage,
  WebsocketEvent,
  WsStates,
} from './useWebsocket';

type RoomSocketContextProps = {
  room?: Room;
  wsState: WsStates;
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
  const history = useHistory();

  const getRoom = React.useCallback(() => {
    // todo : set the room with api values
    setRoom(undefined);
    // if room -> getPlayers, else -> getRoom
  }, []);

  const { wsState } = useWebsocket(
    React.useCallback(
      (message: string) => {
        const websocketMessage = parseJson<WebsocketMessage>(message);
        if (!websocketMessage) return;

        switch (websocketMessage.WebsocketEvent) {
          case WebsocketEvent.Invalid:
            Notification['error']({
              title: "You're not in a game.",
              description: 'You will go back to the home.',
            });
            history.push('/home');
            break;
          case WebsocketEvent.PlayerJoin:
            getRoom();
            break;
          case WebsocketEvent.PlayerLeft:
            getRoom();
            break;
        }
      },
      [getRoom, history],
    ),
  );

  const values = { room, wsState };

  return <RoomContext.Provider value={values}>{children}</RoomContext.Provider>;
}

export function useRoomContext() {
  const context = React.useContext(RoomContext);
  if (!context)
    throw new Error(
      'useWebsocket should be used within a RoomSocketContextProvider',
    );
  return context;
}
