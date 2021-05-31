import { Box, makeStyles } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

type BookAddReactionProps = {
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

const useStyles = makeStyles(theme => ({
  button: {
    backgroundColor: 'transparent',
    outline: 'none',
    border: 'none',
    cursor: 'pointer',
  },
}));

export default function BookAddReaction({ onClick }: BookAddReactionProps) {
  const classes = useStyles();
  return (
    <button className={classes.button} onClick={onClick}>
      <Box
        display="flex"
        maxWidth={24}
        borderRadius="50%"
        alignItems="center"
        justifyContent="center"
        bgcolor="background.default">
        <AddIcon color="action" />
      </Box>
    </button>
  );
}
