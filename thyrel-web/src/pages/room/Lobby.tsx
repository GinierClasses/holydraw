import React from 'react';
import AppTitle from '../../components/lobby/AppTitle';
import PlayerCardList from '../../components/lobby/PlayerCardList';
import SettingsMenu from '../../components/lobby/SettingsMenu';
import { usePlayerContext } from '../../hooks/PlayerProvider';
import { useRoomContext } from '../../hooks/RoomProvider';
import Box from '../../styles/Box';

export default function Lobby() {
  const { wsState, players } = useRoomContext();
  const { player } = usePlayerContext();
  return (
    <Box flexDirection="column" alignItems="center" width="100%" gap={24}>
      <Box p={32} width="100%">
        <AppTitle />
      </Box>
      <Box justifyContent="space-between">
        <SettingsMenu />
      </Box>
    </Box>
  );
}
