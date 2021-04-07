import { Box, fade, makeStyles, Typography } from '@material-ui/core';

type DirectiveLabelProps = {
  directive: string;
  sentence?: string;
};

const useStyles = makeStyles(theme => ({
  sentence: {
    textAlign: 'center',
  },
  container: {
    backgroundColor: fade(theme.palette.secondary.main, 0.8),
    boxShadow: theme.shadows[2],
  },
}));

export default function DirectiveLabel({
  directive,
  sentence,
}: DirectiveLabelProps) {
  const classes = useStyles();
  return (
    <Box
      width="100%"
      display="flex"
      padding={1}
      borderRadius={4}
      alignItems="center"
      flexDirection="column"
      className={classes.container}>
      <Typography variant="subtitle1" color="textSecondary">
        {directive}
      </Typography>
      {sentence && (
        <Typography
          variant="h4"
          color="textPrimary"
          className={classes.sentence}>
          {sentence}
        </Typography>
      )}
    </Box>
  );
}
