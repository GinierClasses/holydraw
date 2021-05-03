import {
  CircularProgress,
  createStyles,
  useMediaQuery,
  useTheme,
  withStyles,
} from '@material-ui/core';
import useTimerInterval, {
  UseTimerIntervalProps,
} from 'hooks/useTimerInterval';

const CustomCircularProgress = withStyles(theme =>
  createStyles({
    root: {
      height: theme.spacing(3),
    },
    circle: {
      backgroundColor: 'blue',
      strokeLinecap: 'round',
    },
  }),
)(CircularProgress);

export default function StepTimer(props: UseTimerIntervalProps) {
  const { progress } = useTimerInterval(props);
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));

  return (
    <CustomCircularProgress
      size={matches ? 64 : 32}
      thickness={4}
      variant="determinate"
      value={progress}
    />
  );
}
