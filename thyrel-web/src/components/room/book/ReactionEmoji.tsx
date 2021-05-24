import { Box, makeStyles, Typography } from '@material-ui/core';

type ReactionEmojiProps = {
  emoji: number;
  count?: number;
};

const useStyles = makeStyles(theme => ({
  container: {
    backgroundColor: theme.palette.background.default,
  },
}));

const emojiList = ['😓', '😅', '😐', '😂', '🤣'];

export default function ReactionEmoji({ emoji, count }: ReactionEmojiProps) {
  const classes = useStyles();
  return (
    <Box
      display="flex"
      px={1}
      borderRadius={16}
      alignItems="space-between"
      justifyContent="center"
      flexDirection="row"
      className={classes.container}>
      <Typography variant="subtitle1" color="textSecondary">
        {emojiList[emoji]} {count}
      </Typography>
    </Box>
  );
}
