import { Box, makeStyles, Typography, Theme } from '@material-ui/core';

type ReactionEmojiProps = {
  emoji: string;
  onClick: () => void;
  isSelected?: boolean;
  count?: number;
};

const useStyles = makeStyles<Theme, { isSelected: boolean }>(theme => ({
  container: {
    backgroundColor: theme.palette.background.default,
    borderWidth: props => (props.isSelected ? '1px' : undefined),
    borderStyle: props => (props.isSelected ? 'solid' : undefined),
    borderColor: props =>
      props.isSelected ? theme.palette.primary.main : undefined,
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
  isSelected = false,
  onClick,
}: ReactionEmojiProps) {
  const classes = useStyles({ isSelected });
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
