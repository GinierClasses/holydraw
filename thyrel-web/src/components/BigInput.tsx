import React, { InputHTMLAttributes } from 'react';
import { fade, makeStyles, Theme } from '@material-ui/core';

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
    fontSize: props => (props.variant === 'medium' ? 24 : 32),
    height: props => (props.variant === 'medium' ? 28 : 38),
    cursor: 'inherit',
    [theme.breakpoints.up('sm')]: {
      fontSize: props => (props.variant === 'medium' ? 28 : 36),
      height: props => (props.variant === 'medium' ? 32 : 40),
    },
    '&:disabled': {
      color: theme.palette.text.disabled,
    },
  },
  container: {
    display: 'flex',
    padding: props => (props.variant === 'medium' ? '18px 20px' : '20px 24px'),
    backgroundColor: props =>
      props.disabled ? '#15181F' : theme.palette.background.paper,
    cursor: props => (props.disabled ? 'not-allowed' : 'text'),
    border: props =>
      props.disabled
        ? `1px solid ${fade(theme.palette.primary.main, 0.6)}`
        : `1px solid ${theme.palette.primary.main}`,
    borderRadius: props => (props.variant === 'medium' ? 32 : 38),
    alignItems: 'center',
    transition: 'box-shadow ease-in .2s',
    boxShadow: props =>
      props.focus
        ? `0 0 2px 0.2rem ${fade(theme.palette.primary.main, 0.4)}`
        : theme.shadows[2],
  },
  icon: {
    width: props => (props.variant === 'medium' ? 28 : 38),
    height: props => (props.variant === 'medium' ? 28 : 38),
    marginRight: theme.spacing(1.5),
    [theme.breakpoints.up('sm')]: {
      marginRight: theme.spacing(2),
      height: props => (props.variant === 'medium' ? 32 : 40),
      width: props => (props.variant === 'medium' ? 32 : 40),
    },
    color: props =>
      props.disabled ? theme.palette.text.disabled : theme.palette.text.primary,
  },
}));

type BigInputProps = {
  startIcon?: React.ReactElement;
  variant?: Variant;
} & InputHTMLAttributes<HTMLInputElement>;

export default function BigInput({
  disabled,
  variant = 'medium',
  startIcon,
  ...props
}: BigInputProps) {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [focus, setFocus] = React.useState(false);
  const classes = useStyles({ disabled, focus, variant });

  return (
    <div
      className={classes.container}
      onClick={() => inputRef.current?.focus()}>
      {startIcon &&
        React.cloneElement(startIcon, {
          className: classes.icon,
          'data-testid': 'biginput-icon',
        })}
      <input
        ref={inputRef}
        className={classes.input}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        disabled={disabled}
        {...props}
      />
    </div>
  );
}
