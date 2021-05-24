import { Box, makeStyles, Typography } from '@material-ui/core';
import CurrentDrawImage from '../CurrentDrawImage';

type BookDrawingElementProps = {
  username?: string;
  src?: string;
};

const useStyles = makeStyles(theme => ({
  width: {
    width: 296,
    height: 186,
    [theme.breakpoints.down('xs')]: {
      width: '100%',
    },
  },

  username: {
    textAlign: 'right',
    maxWidth: 256,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    marginRight: theme.spacing(2),
  },
}));

export default function BookDrawingElement({
  username,
  src,
}: BookDrawingElementProps) {
  const classes = useStyles();
  return (
    <Box
      display="flex"
      alignItems="flex-end"
      flexDirection="column"
      maxWidth={{ xs: '84%', sm: 'auto' }}>
      <Typography variant="subtitle1" className={classes.username}>
        {username}
      </Typography>
      <CurrentDrawImage src={src} className={classes.width} />
    </Box>
  );
}
