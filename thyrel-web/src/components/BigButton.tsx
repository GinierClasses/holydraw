import React from 'react';
import { Button, ButtonProps } from '@material-ui/core';
import SpinnerIcon from './SpinnerIcon';

type BigButtonProps = ButtonProps & {
  children?: React.ReactNode;
  loading?: boolean;
  onClick?: () => void;
};

export default function BigButton({
  children,
  loading,
  onClick,
  ...props
}: BigButtonProps) {
  return (
    <Button onClick={onClick} variant="contained" color="secondary" {...props}>
      {loading ? <SpinnerIcon /> : children}
    </Button>
  );
}
