import { Box, makeStyles, Typography } from '@material-ui/core';

type ReactionEmojiProps = {
  emoji: string;
  onClick: () => void;
  count?: number;
};

const useStyles = makeStyles(theme => ({
  container: {
    backgroundColor: theme.palette.background.default,
    '&:hover': {
      backgroundColor: theme.palette.primary.dark,
    },
  },
  button: {
    backgroundColor: 'transparent',
    outline: 'none',
    border: 'none',
    cursor: 'pointer',
  },
}));

export default function ReactionEmoji({
  emoji,
  count,
  onClick,
}: ReactionEmojiProps) {
  const classes = useStyles();
  return (
    <button className={classes.button} onClick={onClick}>
      <Box
        display="flex"
        px={1}
        borderRadius={16}
        alignItems="space-between"
        justifyContent="center"
        flexDirection="row"
        className={classes.container}>
        <Typography variant="subtitle1" color="textSecondary">
          {emoji} {count}
        </Typography>
      </Box>
    </button>
  );
}
