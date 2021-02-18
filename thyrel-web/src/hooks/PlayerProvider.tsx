import React from 'react';
import { Notification } from 'rsuite';
import { client } from '../api/client';
import { getToken } from '../api/player-provider';
import Player from '../types/Player.type';

type PlayerContextProps = {
  player?: Player;
};

const PlayerContext = React.createContext<PlayerContextProps>({});

type PlayerContextProviderProps = {
  children: React.ReactElement;
  onMessage?: (message: string) => void;
};

export function PlayerContextProvider({
  children,
}: PlayerContextProviderProps) {
  const [player, setPlayer] = React.useState<Player>();

  React.useEffect(() => {
    let deleted = false;
    client<Player>('player/me', { token: getToken() || '' }).then(
      p => !deleted && setPlayer(p),
      () =>
        Notification['error']({
          title: 'Error on try to get your profile.',
          description: 'Try to refresh.',
        }),
    );

    return () => {
      deleted = true;
    };
  }, []);

  const values = { player };

  return (
    <PlayerContext.Provider value={values}>
      {player ? children : <p>loading</p>}
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
