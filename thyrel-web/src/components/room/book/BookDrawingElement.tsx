import { Box, makeStyles, Typography } from '@material-ui/core';
import CurrentDrawImage from '../CurrentDrawImage';

type BookDrawingElementProps = {
  username?: string;
};

const useStyles = makeStyles(theme => ({
  width: {
    width: 256,
    height: 'auto',
    minHeight: 160,
    [theme.breakpoints.down('xs')]: {
      width: '100%',
    },
  },

  username: {
    textAlign: 'right',
    maxWidth: 256,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
  },
}));

export default function BookDrawingElement({
  username,
}: BookDrawingElementProps) {
  const classes = useStyles();
  return (
    <Box display="flex" flexDirection="column">
      <Typography variant="subtitle1" className={classes.username}>
        {username}
      </Typography>
      <CurrentDrawImage className={classes.width} />
    </Box>
  );
}
