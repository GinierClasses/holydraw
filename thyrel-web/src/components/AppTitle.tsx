import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  text: {
    margin: 0,
    fontFamily: 'Modak',
    fontSize: 64,
    fontWeight: 'normal',
    textAlign: 'center',
    color: '#FFFFFF',
    width: '100%',
  },
  drawText: {
    color: theme.palette.secondary.main,
  },
}));

export default function AppTitle() {
  const classes = useStyles();
  return (
    <h1 className={classes.text}>
      Holy<span className={classes.drawText}>Draw</span>
    </h1>
  );
}
