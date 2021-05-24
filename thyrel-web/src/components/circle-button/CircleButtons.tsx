import { Box, ClickAwayListener } from '@material-ui/core';
import React from 'react';
import { makeStyles, Theme } from '@material-ui/core';
import clsx from 'clsx';
import CircleButton from './CircleButton';

type CircleBg = 'fill' | 'border' | 'none';

type CircleStylesProps = {
  count: number;
  width: number;
  open: boolean;
  circleBg: CircleBg;
};

const useStyles = makeStyles<Theme, CircleStylesProps>(theme => ({
  action: {
    position: 'absolute',
    width: props => props.width,
    height: props => props.width,
    top: 0,
    right: 0,
    zIndex: 2,
  },
  circlebg: {
    transform: 'translate(-50%, -50%)',
    top: '50%',
    left: '50%',
    opacity: props => (props.open ? '1' : '0'),
    transition: 'all .2s ease-in-out',
    backgroundColor: props =>
      props.circleBg === 'fill' ? theme.palette.background.paper : undefined,
    border: props =>
      props.circleBg === 'border'
        ? `2px solid ${theme.palette.background.paper}`
        : undefined,
  },
}));

type CircleButtonsProps = {
  action: (open: boolean) => React.ReactElement;
  children: React.ReactElement[];
  width?: number;
  circleBg?: CircleBg;
  spacing?: number;
};

export default function CircleButtons({
  action,
  children,
  width = 48,
  circleBg = 'border',
  spacing = 1.2,
}: CircleButtonsProps) {
  const [open, setOpen] = React.useState(false);
  const classes = useStyles({ count: 4, width, open, circleBg });

  const actionComponent = action(open);

  return (
    <ClickAwayListener onClickAway={() => setOpen(false)}>
      <Box
        position="relative"
        width={width}
        height={width}
        className={classes.root}>
        {React.cloneElement(actionComponent, {
          onClick: () => setOpen(prev => !prev),
          className: clsx(classes.action),
        })}
        <Box
          position="absolute"
          className={classes.circlebg}
          borderRadius="50%"
          width={width * (spacing * 2)}
          height={width * (spacing * 2)}
        />
        {children.map((button, index) => (
          <CircleButton
            key={index}
            open={open}
            spacing={spacing}
            width={width}
            count={index + 1}
            onClick={() => setOpen(false)}
            max={children.length}>
            {button}
          </CircleButton>
        ))}
      </Box>
    </ClickAwayListener>
  );
}
