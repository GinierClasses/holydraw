import React from 'react';
import { client } from '../api/client';
import Player from '../types/Player.type';
import Room from '../types/Room.type';
import { usePlayerContext } from './PlayerProvider';

export function useRoomStates() {
  const [room, setRoom] = React.useState<Room>();
  const [players, setPlayers] = React.useState<Player[]>([]);
  const { player } = usePlayerContext();

  const updateRoom = React.useCallback(() => {
    client<Room>(`room/${player?.roomId}`).then(setRoom);
  }, [player?.roomId]);

  const updatePlayer = React.useCallback(() => {
    client<Player[]>(`room/${player?.roomId}/players`).then(setPlayers);
  }, [player?.roomId]);

  const removePlayer = React.useCallback((playerId?: number) => {
    if (!playerId) return;
    setPlayers(prevPlayers => {
      const playerIndex = prevPlayers?.findIndex(p => p.id === playerId);
      if (playerIndex !== -1) {
        const playersCopy = [...prevPlayers];
        playersCopy.splice(playerIndex, 1);
        return playersCopy;
      }
      return prevPlayers;
    });
  }, []);

  const addPlayer = React.useCallback((player?: Player) => {
    if (!player) return;

    setPlayers(prevPlayers => {
      if (prevPlayers.find(p => p.id === player.id)) return prevPlayers;
      return [...prevPlayers, player];
    });
  }, []);

  React.useEffect(() => {
    updateRoom();
    updatePlayer();
  }, [updatePlayer, updateRoom]);

  return { updatePlayer, updateRoom, removePlayer, addPlayer, room, players };
}
