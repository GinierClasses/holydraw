import PlayerCount from './room/PlayerCount';
import HolyDrawLogo from './HolyDrawLogo';
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
      px={{ xs: 2, sm: 4 }}
      justifyContent="space-between"
      width="100%">
      <Box width={{ xs: 32, sm: 64 }}>
        <PlayerCount
          count={session?.playerFinished || 0}
          max={session?.totalPlayers || 0}
        />
      </Box>
      <HolyDrawLogo />
      <Box width={{ xs: 32, sm: 64 }}>
        <StepTimer
          //finishAt={new Date(session?.stepFinishAt || '')}
          //finishAt={new Date(session?.stepFinishAt - 1500 || '')}
          finishAt={new Date(Date.now() + 6000)}
          //timeDuration={session?.timeDuration || 60}
          timeDuration={6}
          onFinish={onFinish}
        />
      </Box>
    </Box>
  );
}
