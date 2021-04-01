import React from 'react';
import { CircularProgress, useMediaQuery, useTheme } from '@material-ui/core';
import useTimerInterval, {
  UseTimerIntervalProps,
} from 'hooks/useTimerInterval';

export default function StepTimer(props: UseTimerIntervalProps) {
  const { progress } = useTimerInterval(props);
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));

  return (
    <CircularProgress
      size={matches ? 64 : 32}
      thickness={4}
      variant="determinate"
      value={progress}
    />
  );
}
