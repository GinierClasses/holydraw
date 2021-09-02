import { Box, LinearProgress, styled, Typography } from '@material-ui/core';

type StepProgressProps = {
  stepActual?: number;
  stepMax?: number;
};

const CustomLinearProgressV2 = styled(LinearProgress)({
  height: 24,
  backgroundColor: 'none',
  borderRadius: 8,
  '& .MuiLinearProgress-bar': {
    borderRadius: 8,
  },
});

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
        top={0}
        bottom={0}
        left={16}>
        <Typography variant="subtitle1">
          {stepActual}/{stepMax}
        </Typography>
      </Box>
      <CustomLinearProgressV2 variant="determinate" value={progress} />
    </Box>
  );
}

function stepPercentage(current: number, max: number) {
  const percentage = (current * 100) / max;
  return percentage > 100 ? 100 : percentage;
}
