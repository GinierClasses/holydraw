import { css } from '@emotion/css';
import {
  IconButton,
  IconButtonProps,
  Tooltip,
  useTheme,
} from '@material-ui/core';
import React from 'react';

type ActionButtonProps = {
  children: React.ReactElement;
  title: string;
  color?: 'primary' | 'default';
  ml?: number;
  className?: string;
} & IconButtonProps;

export default function ActionButton({
  children,
  title,
  color = 'default',
  ml = 1,
  className,
  disabled,
  ...props
}: ActionButtonProps) {
  const theme = useTheme();

  return (
    <IconButton
      color={color}
      disabled={disabled}
      sx={{
        color: theme => theme.palette.common.white,
        backgroundColor: theme =>
          color === 'primary'
            ? theme.palette.primary.main
            : theme.palette.default.main,
        marginLeft: theme => theme.spacing(ml),
        '&:hover': {
          backgroundColor: theme =>
            color === 'primary' ? theme.palette.primary.dark : undefined,
        },
      }}
      className={className}
      size="large"
      {...props}>
      <Tooltip title={title}>
        {React.cloneElement(children, {
          className: css({
            color: disabled
              ? theme.palette.text.secondary
              : theme.palette.text.primary,
          }),
        })}
      </Tooltip>
    </IconButton>
  );
}
