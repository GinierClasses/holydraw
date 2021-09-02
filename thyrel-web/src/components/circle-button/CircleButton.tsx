import { Box } from '@material-ui/core';
import React from 'react';
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

  return (
    <Box
      zIndex={1}
      width={width}
      height={width}
      sx={{
        top: open ? Math.sin(pi) * width * spacing : 0,
        right: open ? Math.cos(pi) * width * spacing : 0,
        visibility: open ? 'visible' : 'hidden',
        transition: 'all .2s ease-in-out',
      }}
      position="absolute">
      {onClick && children
        ? React.cloneElement(children, {
            onClick: callAll(onClick, children.props.onClick),
          })
        : children}
    </Box>
  );
}
