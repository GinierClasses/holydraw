import PlayerCount from './room/PlayerCount';
import AppTitle from './AppTitle';
import StepTimer from './room/StepTimer';
import { useRoomContext } from '../hooks/RoomProvider';
import { useSessionContext } from 'hooks/SessionProvider';
import { Box, makeStyles } from '@material-ui/core';

type GameBarProps = {
  max: number;
  onFinish?: () => void;
};

const useStyles = makeStyles(theme => ({
  infoContainer: {
    [theme.breakpoints.up('sm')]: {
      top: -64,
      position: 'relative',
    },
  },
}));

export default function GameBar({ max, onFinish }: GameBarProps) {
  const { players } = useRoomContext();
  const { session } = useSessionContext();
  const classes = useStyles();

  return (
    <Box display="flex" flexDirection="column" alignItems="center" width="100%">
      <AppTitle />

      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        width="100%"
        className={classes.infoContainer}>
        <PlayerCount count={players?.length || 0} max={max} />

        <Box display="block">
          <StepTimer
            finishAt={new Date(session?.stepFinishAt || '')}
            timeDuration={session?.timeDuration || 60}
            onFinish={onFinish}
          />
        </Box>
      </Box>
    </Box>
  );
}
