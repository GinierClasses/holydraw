import React from 'react';

export type UseTimerIntervalProps = {
  finishAt: Date;
  timeDuration: number;
  onFinish?: () => void;
};

export default function useTimerInterval({
  finishAt,
  timeDuration,
  onFinish,
}: UseTimerIntervalProps) {
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

  return { progress };
}

function updateProgress(finishAt: Date, timeDuration: number) {
  const diff = Math.round((finishAt.getTime() - new Date().getTime()) / 1000);
  const progress = 100 - (diff * 100) / timeDuration;
  return progress > 100 ? 100 : progress;
}
