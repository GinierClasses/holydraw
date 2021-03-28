import { useSnackbar } from 'notistack';
import React from 'react';
import { useHistory } from 'react-router';
import { client } from '../api/client';
import { getToken } from '../api/player-provider';
import Loading from '../components/Loading';
import Player from '../types/Player.type';
import { parseJson } from '../utils/json';
import { WebsocketEvent, WebsocketMessage } from './useWebsocket';
import { useWebsocketContext } from './WebsocketProvider';

type PlayerContextProps = {
  player?: Player;
};

const PlayerContext = React.createContext<PlayerContextProps>({});

type PlayerContextProviderProps = { children: React.ReactElement };

export function PlayerContextProvider({
  children,
}: PlayerContextProviderProps) {
  const [player, setPlayer] = React.useState<Player>();
  const { enqueueSnackbar } = useSnackbar();
  const { websocket } = useWebsocketContext();
  const history = useHistory();

  React.useEffect(() => {
    function onMessage(event: { data: string }) {
      const websocketMessage = parseJson<WebsocketMessage>(event.data);
      if (!websocketMessage) return;

      switch (websocketMessage.websocketEvent) {
        case WebsocketEvent.NewOwnerPlayer:
          if (websocketMessage?.player?.id === player?.id) {
            setPlayer(prev => (prev ? { ...prev, isOwner: true } : prev));
          }
          break;
      }
    }
    if (websocket && player) {
      websocket.addEventListener('message', onMessage);
      return () => websocket.removeEventListener('message', onMessage);
    }
  }, [player, websocket]);

  React.useEffect(() => {
    let deleted = false;
    client<Player>('player/me', { token: getToken() }).then(
      player => !deleted && setPlayer(player),
      () => {
        enqueueSnackbar("We couldn't get you back online.", {
          variant: 'error',
        });
        history.push('/home');
      },
    );

    return () => {
      deleted = true;
    };
  }, [enqueueSnackbar, history]);

  const values = { player };

  return (
    <PlayerContext.Provider value={values}>
      {player ? children : <Loading />}
    </PlayerContext.Provider>
  );
}

export function usePlayerContext() {
  const context = React.useContext(PlayerContext);
  if (!context)
    throw new Error(
      'usePlayerContext should be used within a PlayerContextProvider',
    );
  return context;
}
