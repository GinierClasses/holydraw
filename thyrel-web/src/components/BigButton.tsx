import React from 'react';
import { Button, ButtonProps, PropTypes } from '@material-ui/core';
import SpinnerIcon from './SpinnerIcon';

type BigButtonProps = ButtonProps & {
  children?: React.ReactNode;
  loading?: boolean;
  onClick?: () => void;
  color?: PropTypes.Color;
};

export default function BigButton({
  children,
  loading,
  color = 'default',
  ...props
}: BigButtonProps) {
  return (
    <Button variant="contained" color={color} {...props}>
      {loading ? (
        <SpinnerIcon style={{ fontSize: props.size === 'medium' ? 32 : 40 }} />
      ) : (
        children
      )}
    </Button>
  );
}
