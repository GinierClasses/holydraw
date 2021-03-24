import React, { InputHTMLAttributes } from 'react';
import { fade, makeStyles, Theme } from '@material-ui/core';

type ContainerProps = {
  focus: boolean;
  disabled?: boolean;
};

const useStyles = makeStyles<Theme, ContainerProps>(theme => ({
  input: {
    backgroundColor: 'inherit',
    border: 'none',
    width: '100%',
    fontSize: 24,
    height: 34,
    fontFamily: 'Work Sans',
    color: theme.palette.text.primary,
    [theme.breakpoints.up('sm')]: {
      fontSize: 32,
      height: 36,
    },
    '&:disabled': {
      color: theme.palette.text.disabled,
    },
  },
  container: {
    display: 'flex',
    backgroundColor: props =>
      props.disabled
        ? fade(theme.palette.background.default, 0.4)
        : theme.palette.background.default,
    cursor: props => (props.disabled ? 'not-allowed' : 'pointer'),
    border: props =>
      props.disabled
        ? `1px solid ${fade(theme.palette.secondary.main, 0.6)}`
        : `1px solid ${theme.palette.secondary.main}`,
    borderRadius: 4,
    alignItems: 'center',
    transition: 'box-shadow ease-in .2s',
    gap: 12,
    height: 40,
    padding: '4px 0 4px 8px',
    [theme.breakpoints.up('sm')]: {
      gap: 16,
      height: 48,
      padding: '8px 4px 8px 16px',
    },
    boxShadow: props =>
      props.focus
        ? `0 0 2px 0.2rem ${fade(theme.palette.secondary.main, 0.4)}`
        : undefined,
  },
  icon: {
    width: 32,
    height: 32,
    color: props =>
      props.disabled ? theme.palette.text.disabled : theme.palette.text.primary,
  },
}));

type BigInputProps = InputHTMLAttributes<HTMLInputElement> & {
  startIcon?: React.ReactElement;
};

export default function BigInput({
  disabled,
  startIcon,
  ...props
}: BigInputProps) {
  const [focus, setFocus] = React.useState(false);
  const classes = useStyles({ disabled, focus });

  return (
    <div className={classes.container}>
      {startIcon &&
        React.cloneElement(startIcon, {
          className: classes.icon,
          'data-testid': 'biginput-icon',
        })}
      <input
        className={classes.input}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        disabled={disabled}
        {...props}
      />
    </div>
  );
}
