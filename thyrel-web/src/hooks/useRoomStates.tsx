import React from 'react';
import { useHistory } from 'react-router-dom';
import { client } from '../api/client';
import { getToken } from '../api/player-provider';
import Player from '../types/Player.type';
import Room from '../types/Room.type';
import { usePlayerContext } from './PlayerProvider';
import { Notification } from 'rsuite';

export function useRoomStates() {
  const [room, setRoom] = React.useState<Room>();
  const [players, setPlayers] = React.useState<Player[]>([]);
  const { player } = usePlayerContext();
  const history = useHistory();

  const updateRoom = React.useCallback(() => {
    client<Room>(`room/${player?.roomId}`).then(setRoom);
  }, [player?.roomId]);

  const updatePlayer = React.useCallback(() => {
    client<Player[]>(`room/${player?.roomId}/players`, {
      token: getToken(),
    }).then(setPlayers);
  }, [player?.roomId]);

  const removePlayer = React.useCallback((playerId?: number) => {
    if (!playerId) return;
    if(playerId === player?.id){
      history?.push('/home');
      Notification['info']({
        title: 'Bye bye.',
        description: "You have been kicked from the room 😓",
      })
    }
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
