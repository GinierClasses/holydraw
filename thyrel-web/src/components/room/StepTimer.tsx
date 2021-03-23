import React from 'react';
import { CircularProgress } from '@material-ui/core';

type StepTimerProps = {
  finishAt: Date;
  timeDuration: number;
  onFinish?: () => void;
};

export default function StepTimer({
  finishAt,
  timeDuration,
  onFinish,
}: StepTimerProps) {
  const [progress, setProgress] = React.useState(0);
  const [timerInterval, setTimerInterval] = React.useState<NodeJS.Timeout>();

  React.useEffect(() => {
    setProgress(updateProgress(finishAt, timeDuration));
    const interval = setInterval(
      () => setProgress(updateProgress(finishAt, timeDuration)),
      1000,
    );
    setTimerInterval(interval);
    return () => clearInterval(interval);
  }, [finishAt, timeDuration]);

  React.useEffect(() => {
    if (progress >= 100) {
      onFinish?.();
      timerInterval && clearInterval(timerInterval);
    }
  }, [progress, onFinish, timerInterval]);
  console.log(progress);
  return (
    <CircularProgress
      size={64}
      thickness={4}
      variant="determinate"
      value={progress}
    />
  );
}

function updateProgress(finishAt: Date, timeDuration: number) {
  const diff = Math.round((finishAt.getTime() - new Date().getTime()) / 1000);
  const progress = 100 - (diff * 100) / timeDuration;
  return progress > 100 ? 100 : progress;
}
