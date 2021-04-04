import { Box, makeStyles } from '@material-ui/core';
import HolyDrawLogo from 'images/holydraw-logo.svg';

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
  logo: {
    width: 192,
    height: 'auto',
    [theme.breakpoints.down('xs')]: {
      width: 128,
    },
  },
}));

export default function AppTitle() {
  const classes = useStyles();
  return (
    <Box>
      <img src={HolyDrawLogo} className={classes.logo} alt="holy draw logo" />
    </Box>
  );
}
