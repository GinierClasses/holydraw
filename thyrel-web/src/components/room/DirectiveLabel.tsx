import { alpha, Box, Typography } from '@material-ui/core';

type DirectiveLabelProps = {
  directive: string;
  sentence?: string;
};

export default function DirectiveLabel({
  directive,
  sentence,
}: DirectiveLabelProps) {
  return (
    <Box
      display="flex"
      padding={1}
      borderRadius="32px"
      alignItems="center"
      flexDirection="column"
      sx={{
        backgroundColor: theme => alpha(theme.palette.primary.main, 0.8),
        boxShadow: theme => theme.shadows[2],
      }}>
      <Typography variant="subtitle1" color="textSecondary">
        {directive}
      </Typography>
      {sentence && (
        <Typography
          variant="h4"
          color="textPrimary"
          sx={{ textAlign: 'center' }}>
          {sentence}
        </Typography>
      )}
    </Box>
  );
}
