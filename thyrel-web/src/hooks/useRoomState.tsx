import React from 'react';
import { client } from '../api/client';
import Player from '../types/Player.type';
import Room from '../types/Room.type';
import { usePlayerContext } from './PlayerProvider';

export function useRoomState() {
  const [room, setRoom] = React.useState<Room>();
  const [players, setPlayers] = React.useState<Player[]>([]);
  const { player } = usePlayerContext();

  const updateRoom = React.useCallback(() => {
    client<Room>(`room/${player?.room?.identifier}`).then(r => {
      setRoom(r);
    });
  }, [player]);

  const removePlayer = (player?: Player) => {
    if (!player) return;
    setPlayers(prevPlayers => {
      const playerIndex = prevPlayers?.findIndex(p => p.id === player.id);
      if (playerIndex !== -1) {
        const playersCopy = [...prevPlayers];
        playersCopy.splice(playerIndex, 1);
        return playersCopy;
      }
      return prevPlayers;
    });
  };

  const addPlayer = (player?: Player) => {
    if (!player) return;

    setPlayers(prevPlayers => {
      if (prevPlayers.find(p => p.id === player.id)) return prevPlayers;
      return [...prevPlayers, player];
    });
  };

  const updatePlayer = React.useCallback(() => {
    client<Player[]>(`room/${player?.room?.id}/players`).then(p =>
      setPlayers(p),
    );
  }, [player?.room?.id]);

  React.useEffect(() => {
    updateRoom();
    updatePlayer();
  }, [updatePlayer, updateRoom]);

  return { updatePlayer, updateRoom, removePlayer, addPlayer, room, players };
}
