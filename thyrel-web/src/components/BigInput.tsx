import React, { InputHTMLAttributes } from 'react';
import { fade, makeStyles, Theme } from '@material-ui/core';
import clsx from 'clsx';

type Variant = 'medium' | 'large';

type StylesProps = {
  focus: boolean;
  disabled?: boolean;
  variant: Variant;
};

const useStyles = makeStyles<Theme, StylesProps>(theme => ({
  input: {
    backgroundColor: 'inherit',
    border: 'none',
    width: '100%',
    fontFamily: 'Work Sans',
    color: theme.palette.text.primary,
    cursor: 'inherit',
  },
  inputMedium: {
    fontSize: 24,
    height: 32,
    [theme.breakpoints.up('sm')]: {
      fontSize: 28,
      height: 32,
    },
  },
  inputLarge: {
    fontSize: 32,
    height: 38,
    [theme.breakpoints.up('sm')]: {
      fontSize: 36,
      height: 40,
    },
  },
  container: {
    display: 'flex',
    padding: props => (props.variant === 'medium' ? '18px 20px' : '20px 20px'),
    backgroundColor: props =>
      props.disabled ? '#15181F' : theme.palette.background.paper,
    cursor: props => (props.disabled ? 'not-allowed' : 'text'),
    border: props =>
      props.disabled
        ? `2px solid ${fade(theme.palette.primary.main, 0.6)}`
        : `2px solid ${theme.palette.primary.main}`,
    borderRadius: props => (props.variant === 'medium' ? 34 : 38),
    alignItems: 'center',
    transition: 'box-shadow ease-in .2s',
    boxShadow: props =>
      props.focus
        ? `0 0 2px 0.2rem ${fade(theme.palette.primary.main, 0.4)}`
        : theme.shadows[2],
  },
  iconMedium: {
    width: 28,
    height: 28,
    marginRight: theme.spacing(1.5),
    [theme.breakpoints.up('sm')]: {
      marginRight: theme.spacing(2),
      height: 32,
      width: 32,
    },
    color: props =>
      props.disabled ? theme.palette.text.disabled : theme.palette.text.primary,
  },
  iconLarge: {
    width: 38,
    height: 38,
    marginRight: theme.spacing(1.5),
    [theme.breakpoints.up('sm')]: {
      marginRight: theme.spacing(2),
      height: 40,
      width: 40,
    },
    color: props =>
      props.disabled ? theme.palette.text.disabled : theme.palette.text.primary,
  },
}));

type BigInputProps = {
  startIcon?: React.ReactElement;
  variant?: Variant;
  fullWidth?: boolean;
} & InputHTMLAttributes<HTMLInputElement>;

export default function BigInput({
  disabled,
  variant = 'medium',
  startIcon,
  fullWidth,
  ...props
}: BigInputProps) {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [focus, setFocus] = React.useState(false);
  const classes = useStyles({ disabled, focus, variant });

  return (
    <div
      className={clsx(classes.container, { 'full-width': fullWidth })}
      onClick={() => inputRef.current?.focus()}>
      {startIcon &&
        React.cloneElement(startIcon, {
          className:
            variant === 'medium' ? classes.iconMedium : classes.iconLarge,
          'data-testid': 'biginput-icon',
        })}
      <input
        ref={inputRef}
        className={clsx(
          classes.input,
          variant === 'medium' ? classes.inputMedium : classes.inputLarge,
          'big-input-safari',
        )}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        disabled={disabled}
        {...props}
      />
    </div>
  );
}
