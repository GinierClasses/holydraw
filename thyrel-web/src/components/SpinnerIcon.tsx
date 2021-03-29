import { makeStyles } from '@material-ui/core';
import clsx from 'clsx';
import LoopIcon from '@material-ui/icons/Loop';

const useStyles = makeStyles(() => ({
  spin: {
    animation: `spinnerIconEffect 1s linear infinite`,
  },
  '@global': {
    '@keyframes spinnerIconEffect': {
      '0%': { transform: 'rotate(0deg)' },
      '100%': { transform: 'rotate(-360deg)' },
    },
  },
}));

export default function SpinnerIcon(props: {
  className?: string;
  style?: any;
}) {
  const classes = useStyles();
  return (
    <LoopIcon
      style={props.style}
      aria-label="spinner icon"
      className={clsx(props.className, classes.spin)}
    />
  );
}
