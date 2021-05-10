import {
  createStyles,
  withStyles,
  Theme,
  Box,
  LinearProgress,
  Typography,
} from '@material-ui/core';

type StepProgressProps = {
  stepActual?: number;
  stepMax?: number;
};

const CustomLinearProgress = withStyles((theme: Theme) =>
  createStyles({
    root: {
      height: theme.spacing(3),
    },
    colorPrimary: {
      backgroundColor: theme.palette.background.default,
    },
    bar: {
      borderRadius: 8,
      backgroundColor: theme.palette.primary.dark,
    },
  }),
)(LinearProgress);

export default function StepProgress({
  stepActual = 0,
  stepMax = 0,
}: StepProgressProps) {
  const progress = stepPercentage(stepActual, stepMax);

  return (
    <Box overflow="hidden" width="100%" position="relative" p={1}>
      <Box
        alignItems="center"
        justifyContent="center"
        display="flex"
        position="absolute"
        zIndex={1}
        top={4}
        bottom={0}
        left={16}>
        <Typography variant="subtitle1">
          {stepActual}/{stepMax}
        </Typography>
      </Box>
      <CustomLinearProgress variant="determinate" value={progress} />
    </Box>
  );
}

function stepPercentage(current: number, max: number) {
  const percentage = (current * 100) / max;
  return percentage > 100 ? 100 : percentage;
}
