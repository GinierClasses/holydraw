import React from 'react';
import { CircularProgress } from '@material-ui/core';
import useTimerInterval, {
  UseTimerIntervalProps,
} from 'hooks/useTimerInterval';

export default function StepTimer(props: UseTimerIntervalProps) {
  const { progress } = useTimerInterval(props);

  return (
    <CircularProgress
      size={64}
      thickness={4}
      variant="determinate"
      value={progress}
    />
  );
}
