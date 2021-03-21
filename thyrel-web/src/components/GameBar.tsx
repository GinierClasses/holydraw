import PlayerCount from './room/PlayerCount';
import AppTitle from './AppTitle';
import StepTimer from './room/StepTimer';
import Box from '../styles/Box';
import { css } from '@emotion/css';
import Mq from '../styles/breakpoint';
import { useRoomContext } from '../hooks/RoomProvider';
import { useSessionContext } from 'hooks/SessionProvider';

type GameBarProps = {
  max: number;
  onFinish?: () => void;
};

export default function GameBar({ max, onFinish }: GameBarProps) {
  const { players } = useRoomContext();
  const { session } = useSessionContext();

  return (
    <Box
      className={css({
        flexDirection: 'column',
        alignItems: 'center',
      })}
      width="100%">
      <AppTitle />

      <Box
        className={css({
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
          [Mq.SM]: {
            position: 'relative',
            top: '-64px',
          },
        })}>
        <PlayerCount count={players?.length || 0} max={max} />

        <Box
          display="block"
          className={css({
            height: 64,
            width: 64,
            [Mq.SM]: {
              height: 100,
              width: 100,
            },
          })}>
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
