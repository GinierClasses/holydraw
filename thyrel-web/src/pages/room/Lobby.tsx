import AppTitle from 'components/AppTitle';
import LobbyStartButton from 'components/room/lobby/LobbyStartAction';
import { Players, PlayerCountBox } from 'components/room/lobby/Players';
import SettingsMenu from 'components/room/lobby/SettingsMenu';
import { Box, fade, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  playersContainer: {
    alignItems: 'center',
    flexDirection: 'column',
    gap: 64,
    [theme.breakpoints.up('sm')]: {
      alignItems: 'flex-start',
      flexDirection: 'row',
    },
  },
  container: {
    backgroundColor: fade(theme.palette.background.default, 0.8),
  },
}));

export default function Lobby() {
  const classes = useStyles();
  return (
    <Box
      display="flex"
      flexDirection="column"
      height="100vh"
      alignItems="center"
      width="100%">
      <Box p={4} mb={3} width="100%">
        <AppTitle />
      </Box>
      <Box
        display="flex"
        justifyContent="space-between"
        width="100%"
        m={3}
        height="100vh"
        alignItems="center"
        flexDirection="column">
        <Box
          display="flex"
          className={classes.container}
          flexDirection="column"
          alignItems="flex-end"
          width="100%">
          <PlayerCountBox />
          <Box
            display="flex"
            justifyContent="space-between"
            width="100%"
            className={classes.playersContainer}>
            <SettingsMenu />
            <Players />
          </Box>
        </Box>
        <LobbyStartButton />
      </Box>
    </Box>
  );
}
