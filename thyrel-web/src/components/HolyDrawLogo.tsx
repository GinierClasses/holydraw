import { Box, makeStyles, Theme } from '@material-ui/core';
import useMobileHorizontal from 'hooks/useMobileHorizontal';
import HolyDrawImage from 'images/holydraw-logo.svg';
import MediaqueryHeight from 'styles/breakpoint';

const useStyles = makeStyles<Theme, { width: number }>(theme => ({
  logo: {
    textAlign: 'center',
    width: props => props.width * 8,
    height: 'auto',
    [theme.breakpoints.down('xs')]: {
      width: props => ((props.width * 8) / 3) * 2,
    },
    [MediaqueryHeight.SM]: {
      width: props => ((props.width * 8) / 3) * 2,
    },
  },
}));

export default function HolyDrawLogo({ width = 24 }: { width?: number }) {
  const isHorizontal = useMobileHorizontal();
  if (isHorizontal) {
    width = 16;
  }
  const classes = useStyles({ width });

  if (isHorizontal) {
    return (
      <Box position="absolute" top={2} left={8}>
        <img
          src={HolyDrawImage}
          className={classes.logo}
          alt="holy draw logo"
        />
      </Box>
    );
  }

  return (
    <img src={HolyDrawImage} className={classes.logo} alt="holy draw logo" />
  );
}
