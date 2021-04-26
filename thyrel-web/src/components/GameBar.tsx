import PlayerCount from './room/PlayerCount';
import HolyDrawLogo from './HolyDrawLogo';
import StepTimer from './room/StepTimer';
import { useSessionContext } from 'hooks/SessionProvider';
import { Box } from '@material-ui/core';

type GameBarProps = {
  displayHud?: boolean;
  onFinish?: () => void;
};

export default function GameBar({ displayHud = true, onFinish }: GameBarProps) {
  const { session } = useSessionContext();
  return (
    <Box
      display="flex"
      flexWrap="wrap"
      flexDirection="row"
      alignItems="center"
      px={{ xs: 2, sm: 4 }}
      justifyContent={displayHud ? 'space-between' : 'center'}
      width="100%">
      {displayHud && (
        <Box width={{ xs: 32, sm: 64 }}>
          <PlayerCount
            count={session?.playerFinished || 0}
            max={session?.totalPlayers || 0}
          />
        </Box>
      )}

      <HolyDrawLogo />

      {displayHud && (
        <Box width={{ xs: 32, sm: 64 }}>
          <StepTimer
            finishAt={new Date(session?.stepFinishAt || '')}
            timeDuration={session?.timeDuration || 60}
            onFinish={onFinish}
          />
        </Box>
      )}
    </Box>
  );
}
