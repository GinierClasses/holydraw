import { Session } from 'inspector';
import React from 'react';
import { client } from '../../api/client';
import BigButton from '../../components/BigButton';
import AppTitle from '../../components/lobby/AppTitle';
import LobbyStartButton from '../../components/lobby/LobbyStartButton';
import { Players, PlayerCountBox } from '../../components/lobby/Players';
import SettingsMenu from '../../components/lobby/SettingsMenu';
import { useRoomContext } from '../../hooks/RoomProvider';
import Box from '../../styles/Box';
import { Notification } from 'rsuite';

export default function Lobby() {
  const { room } = useRoomContext();

  function onStart() {
    client<Session>('session', {
      data: {
        roomId: room?.id,
      },
    }).then((session: Session) => {
      Notification['success']({
        title: 'Game successfully started',
        description: 'Begin to play !',
      });
    });
  }

  return (
    <Box flexDirection="column" height="100vh" alignItems="center" width="100%">
      <Box p={32} mb={24} width="100%">
        <AppTitle />
      </Box>
      <Box
        justifyContent="space-between"
        width="100%"
        m={24}
        height="100vh"
        alignItems="center"
        flexDirection="column">
        <Box
          bg={bgFade(0.8)}
          flexDirection="column"
          alignItems="flex-end"
          width="100%">
          <PlayerCountBox />
          <Box
            justifyContent="space-between"
            alignItems="flex-start"
            width="100%">
            <SettingsMenu />
            <Players />
          </Box>
        </Box>
        <Box m={24}>
          <BigButton icon="angle-double-right" onClick={() => onStart()}>
            Start
          </BigButton>
        </Box>
      </Box>
    </Box>
  );
}
