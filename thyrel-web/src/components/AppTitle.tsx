import { makeStyles, Typography } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  text: {
    margin: 0,
    fontWeight: 'normal',
    textAlign: 'center',
    color: theme.palette.common.white,
    width: '100%',
  },
  drawText: {
    color: theme.palette.secondary.main,
  },
}));

export default function AppTitle() {
  const classes = useStyles();
  return (
    <Typography variant="h1" className={classes.text}>
      Holy<span className={classes.drawText}>Draw</span>
    </Typography>
  );
}
