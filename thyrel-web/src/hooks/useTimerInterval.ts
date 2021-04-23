import React from 'react';

export type UseTimerIntervalProps = {
  finishAt: Date;
  timeDuration: number;
  onFinish?: () => void;
  onFinishPercentage?: number;
};

export default function useTimerInterval({
  finishAt,
  timeDuration,
  onFinish,
}: UseTimerIntervalProps) {
  const [progress, setProgress] = React.useState(0);
  const [timerInterval, setTimerInterval] = React.useState<NodeJS.Timeout>();

  React.useEffect(() => {
    setProgress(getProgressPercentage(finishAt, timeDuration));
    const interval = setInterval(
      () => setProgress(getProgressPercentage(finishAt, timeDuration)),
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

export function useTimerEvent({
  finishAt,
  timeDuration,
  onFinish,
  onFinishPercentage = 100,
}: UseTimerIntervalProps) {
  const intervalRef = React.useRef<NodeJS.Timeout>();

  React.useEffect(() => {
    const interval = setInterval(() => {
      if (getProgressPercentage(finishAt, timeDuration) >= onFinishPercentage) {
        onFinish?.();
        intervalRef.current && clearInterval(intervalRef.current);
        console.log(`Hi from intervalRef ${onFinishPercentage}`);
      }
    }, 1000);

    intervalRef.current = interval;
    return () => clearInterval(interval);
  }, [finishAt, timeDuration, onFinishPercentage, onFinish]);
}

function getProgressPercentage(finishAt: Date, timeDuration: number): number {
  const diff = Math.round((finishAt.getTime() - new Date().getTime()) / 1000);
  const progress = 100 - (diff * 100) / timeDuration;
  return progress > 100 ? 100 : progress;
}
