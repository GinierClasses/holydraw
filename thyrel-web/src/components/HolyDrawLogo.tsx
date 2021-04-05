import { makeStyles, Theme } from '@material-ui/core';
import HolyDrawImage from 'images/holydraw-logo.svg';

const useStyles = makeStyles<Theme, { width: number }>(theme => ({
  logo: {
    textAlign: 'center',
    width: props => props.width * 8,
    height: 'auto',
    [theme.breakpoints.down('xs')]: {
      width: props => ((props.width * 8) / 3) * 2,
    },
  },
}));

export default function HolyDrawLogo({ width = 24 }: { width?: number }) {
  const classes = useStyles({ width });
  return (
    <img src={HolyDrawImage} className={classes.logo} alt="holy draw logo" />
  );
}
