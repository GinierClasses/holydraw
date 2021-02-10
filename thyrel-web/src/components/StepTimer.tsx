import { css } from '@emotion/css';
import { Progress } from 'rsuite';
import { baseColor } from '../styles/colors';

type StepTimerProps = {
  timeDuration?: number;
  timeProgress?: string;
};

export default function StepTimer({
  timeDuration,
  timeProgress,
}: StepTimerProps) {
  return (
    <div
      className={css({
        height: 100,
        width: 100,
      })}>
      <Progress.Circle
        strokeColor={baseColor}
        percent={90}
        showInfo={false}
        strokeWidth={12}></Progress.Circle>
    </div>
  );
}
