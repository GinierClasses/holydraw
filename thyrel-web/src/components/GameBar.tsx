import PlayerCount from './room/PlayerCount';
import AppTitle from './lobby/AppTitle';
import StepTimer from './room/StepTimer';
import Box from '../styles/Box';

type GameBarProps = {
  count: number;
  max: number;
  finishAt: Date;
  timeDuration: number;
  onFinish?: () => void;
};

export default function GameBar({
  count,
  max,
  finishAt,
  timeDuration,
  onFinish,
}: GameBarProps) {
  return (
    <Box flexDirection="row" width="100%">
      <PlayerCount count={count} max={max} />

      <AppTitle />

      <Box display="block" width={100} height={100}>
        <StepTimer
          finishAt={finishAt}
          timeDuration={timeDuration}
          onFinish={onFinish}
        />
      </Box>
    </Box>
  );
}
