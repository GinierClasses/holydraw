import { Box } from '@material-ui/core';
import { useSessionContext } from 'hooks/SessionProvider';
import PlayerCount from './room/PlayerCount';
import StepTimer from './room/StepTimer';

type GameBarProps = {
  onFinish?: () => void;
};

export default function GameBar({ onFinish }: GameBarProps) {
  const { session } = useSessionContext();
  return (
    <Box
      display="flex"
      flexWrap="wrap"
      flexDirection="row"
      alignItems="center"
      p={1}
      px={{ xs: 2, sm: 4 }}
      justifyContent="space-between"
      width="100%">
      <Box width={{ xs: 32, sm: 64 }}>
        <PlayerCount
          count={session?.playerFinished || 0}
          max={session?.totalPlayers || 0}
        />
      </Box>

      <Box width={{ xs: 32, sm: 64 }}>
        <StepTimer
          finishAt={new Date(session?.stepFinishAt || '')}
          timeDuration={session?.timeDuration || 60}
          onFinish={onFinish}
        />
      </Box>
    </Box>
  );
}
