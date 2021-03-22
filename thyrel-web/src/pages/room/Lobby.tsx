import AppTitle from 'components/AppTitle';
import LobbyStartButton from 'components/room/lobby/LobbyStartAction';
import { Players, PlayerCountBox } from 'components/room/lobby/Players';
import SettingsMenu from 'components/room/lobby/SettingsMenu';
import Box from 'styles/Box';
import { bgFade } from 'styles/colors';
import { css } from '@emotion/css';
import Mq from 'styles/breakpoint';

export default function Lobby() {
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
            width="100%"
            className={css({
              alignItems: 'center',
              flexDirection: 'column',
              gap: 64,
              [Mq.SM]: {
                alignItems: 'flex-start',
                flexDirection: 'row',
              },
            })}>
            <SettingsMenu />
            <Players />
          </Box>
        </Box>
        <LobbyStartButton />
      </Box>
    </Box>
  );
}
