import { Box } from '@material-ui/core';
import { useSessionContext } from 'hooks/SessionProvider';
import PlayerCount from '../../../PlayerCount';
import StepTimer from '../../../StepTimer';
import GameCanvasVertical from '../../GameCanvasVertical';

export default function DrawMobileHorizontal() {
  return (
    <Box position="relative" height={1}>
      <HorizontalCustomHead />
      <GameCanvasVertical />
    </Box>
  );
}

function HorizontalCustomHead() {
  const { session } = useSessionContext();

  return (
    <Box
      display="flex"
      flexWrap="wrap"
      flexDirection="row"
      alignItems="center"
      justifyContent="space-between"
      position="absolute"
      top={8}
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
        />
      </Box>
    </Box>
  );
}
