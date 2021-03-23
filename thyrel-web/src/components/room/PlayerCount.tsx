import { Box, Typography } from '@material-ui/core';

type PlayerCountProps = {
  count: number;
  max: number;
};

export default function PlayerCount({ count, max }: PlayerCountProps) {
  return (
    <Box p={1}>
      <Typography variant="subtitle1">
        {count}/{max}
      </Typography>
    </Box>
  );
}
