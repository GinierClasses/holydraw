import {
  CircularProgress,
  styled,
  useMediaQuery,
  useTheme,
} from '@material-ui/core';
import useTimerInterval, {
  UseTimerIntervalProps,
} from 'hooks/useTimerInterval';

const CustomCircularProgress2 = styled(CircularProgress)({
  height: 24,
  '& .MuiCircularProgress-circle': {
    backgroundColor: 'blue',
    strokeLinecap: 'round',
  },
});

export default function StepTimer(props: UseTimerIntervalProps) {
  const { progress } = useTimerInterval(props);
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));

  return (
    <CustomCircularProgress2
      size={matches ? 64 : 32}
      thickness={4}
      variant="determinate"
      value={progress}
    />
  );
}
