import AppTitle from 'components/AppTitle';
import LobbyStartButton from 'components/room/lobby/LobbyStartAction';
import { Players, PlayerCountBox } from 'components/room/lobby/Players';
import SettingsMenu from 'components/room/lobby/SettingsMenu';
import { useMediaQuery } from 'hooks/useMediaQuery';
import Box from 'styles/Box';
import { MediaQuery } from 'styles/breakpoint';
import { bgFade } from 'styles/colors';

export default function Lobby() {
  const isDeviceSM = useMediaQuery(MediaQuery.SM);

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
            {isDeviceSM && <Players />}
          </Box>
          {!isDeviceSM && <Players />}
        </Box>
        <LobbyStartButton />
      </Box>
    </Box>
  );
}
