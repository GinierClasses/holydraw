import { Progress } from 'rsuite';
import { baseColor } from '../../styles/colors';
import React from 'react';

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

  return (
    <Progress.Circle
      strokeColor={baseColor}
      percent={progress}
      showInfo={progress >= 100}
      strokeWidth={12}
      status={progress >= 100 ? 'success' : 'active'}
    />
  );
}

function updateProgress(finishAt: Date, timeDuration: number) {
  const diff = Math.round((finishAt.getTime() - new Date().getTime()) / 1000);
  return 100 - (diff * 100) / timeDuration;
}
