import React from 'react';
import { Box, makeStyles, Theme } from '@material-ui/core';
import { callAll } from 'utils/utils';

type CircleButtonProps = {
  count: number;
  max: number;
  open: boolean;
  onClick?: () => void;
  children?: React.ReactElement;
  width: number;
  spacing: number;
};

type StylesProps = {
  pi: number;
  count: number;
  spacing: number;
  max: number;
  open: boolean;
  width: number;
};

const useStyles = makeStyles<Theme, StylesProps>(() => ({
  root: {
    top: props =>
      props.open ? Math.sin(props.pi) * props.width * props.spacing : 0,
    right: props =>
      props.open ? Math.cos(props.pi) * props.width * props.spacing : 0,
    visibility: props => (props.open ? 'visible' : 'hidden'),
    transition: 'all .2s ease-in-out',
  },
}));

export default function CircleButton({
  count,
  max,
  open,
  onClick,
  children,
  width,
  spacing,
}: CircleButtonProps) {
  const pi = ((Math.PI * 2) / max) * count;
  const classes = useStyles({ count, max, pi, open, width, spacing });

  return (
    <Box
      zIndex={1}
      width={width}
      height={width}
      className={classes.root}
      position="absolute">
      {onClick && children
        ? React.cloneElement(children, {
            onClick: callAll(onClick, children.props.onClick),
          })
        : children}
    </Box>
  );
}
