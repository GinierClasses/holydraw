import PlayerCount from './room/PlayerCount';
import AppTitle from './AppTitle';
import StepTimer from './room/StepTimer';
import { useSessionContext } from 'hooks/SessionProvider';
import { Box } from '@material-ui/core';

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
      justifyContent="space-between"
      width="100%">
      <Box order={{ xs: 2, sm: 1 }}>
        <PlayerCount
          count={session?.playerFinished || 0}
          max={session?.totalPlayers || 0}
        />
      </Box>
      <Box width={{ xs: '100%', sm: 'auto' }} order={{ xs: 1, sm: 2 }}>
        <AppTitle />
      </Box>
      <Box order={3}>
        <StepTimer
          finishAt={new Date(session?.stepFinishAt || '')}
          timeDuration={session?.timeDuration || 60}
          onFinish={onFinish}
        />
      </Box>
    </Box>
  );
}
