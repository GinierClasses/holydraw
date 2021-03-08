import AppTitle from '../../components/lobby/AppTitle';
import LobbyStartButton from '../../components/lobby/LobbyStartButton';
import { Players, PlayerCountBox } from '../../components/lobby/Players';
import SettingsMenu from '../../components/lobby/SettingsMenu';
import Box from '../../styles/Box';
import { bgFade } from '../../styles/colors';

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
            alignItems="flex-start"
            width="100%">
            <SettingsMenu />
            <Players />
          </Box>
        </Box>
        <LobbyStartButton />
      </Box>
    </Box>
  );
}
