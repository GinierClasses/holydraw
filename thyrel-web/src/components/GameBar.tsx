import PlayerCount from './room/PlayerCount';
import AppTitle from './lobby/AppTitle';
import StepTimer from './room/StepTimer';
import Box from '../styles/Box';
import { css } from '@emotion/css';
import Mq from '../styles/breakpoint';
//import { useRoomContext } from '../hooks/RoomProvider';

type GameBarProps = {
  count?: number;
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
  //const { players } = useRoomContext();

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
        <PlayerCount count={6} max={max} />

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
            finishAt={finishAt}
            timeDuration={timeDuration}
            onFinish={onFinish}
          />
        </Box>
      </Box>
    </Box>
  );
}
