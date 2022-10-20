import LoopIcon from '@material-ui/icons/Loop';
import clsx from 'clsx';

export default function SpinnerIcon(props: {
  className?: string;
  style?: any;
}) {
  return (
    <LoopIcon
      style={props.style}
      aria-label="spinner icon"
      sx={{ animation: `spinnerIconEffect 1s linear infinite` }}
      className={clsx(props.className)}
    />
  );
}
