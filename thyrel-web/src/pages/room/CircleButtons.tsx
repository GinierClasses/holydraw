import { Box } from '@material-ui/core';
import React from 'react';
import { makeStyles, Theme } from '@material-ui/core';
import clsx from 'clsx';

type CircleBg = 'fill' | 'border' | 'none';

type CircleStylesProps = {
  count: number;
  width: number;
  open: boolean;
  circleBg: CircleBg;
};

const transition = 'all .2s ease-in-out';

const useStyles = makeStyles<Theme, CircleStylesProps>(theme => ({
  root: {},
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
    transition,
    backgroundColor: props =>
      props.circleBg === 'fill' ? theme.palette.background.paper : undefined,
    border: props =>
      props.circleBg === 'border'
        ? `2px solid ${theme.palette.background.paper}`
        : undefined,
  },
}));

type CircleButtonsProps = {
  action: React.ReactElement;
  children: React.ReactElement[];
  width?: number;
  circleBg?: CircleBg;
};

export default function CircleButtons({
  action,
  children,
  width = 48,
  circleBg = 'border',
}: CircleButtonsProps) {
  const [open, setOpen] = React.useState(false);
  const classes = useStyles({ count: 4, width, open, circleBg });
  return (
    <Box
      position="relative"
      width={width}
      height={width}
      m={10}
      className={classes.root}>
      {React.cloneElement(action, {
        onClick: () => setOpen(!open),
        className: clsx(action.props.className, classes.action),
      })}
      <Box
        position="absolute"
        className={classes.circlebg}
        borderRadius="50%"
        width={width * 2.4}
        height={width * 2.4}
      />
      {children.map((button, index) => (
        <Cube open={open} width={width} count={index + 1} max={children.length}>
          {button}
        </Cube>
      ))}
    </Box>
  );
}

type CubeProps = {
  count: number;
  max: number;
  open: boolean;
  onClick?: () => void;
  children?: React.ReactElement;
  width: number;
};

type CubeStylesProps = {
  pi: number;
  count: number;
  max: number;
  open: boolean;
  width: number;
};

const useStyles2 = makeStyles<Theme, CubeStylesProps>(() => ({
  root: {
    top: props => (props.open ? Math.cos(props.pi) * props.width * 1.2 : 0),
    right: props => (props.open ? Math.sin(props.pi) * props.width * 1.2 : 0),
    visibility: props => (props.open ? 'visible' : 'hidden'),
    transition,
  },
}));

function Cube({ count, max, open, onClick, children, width }: CubeProps) {
  const pi = ((Math.PI * 2) / max) * count;
  const classes = useStyles2({ count, max, pi, open, width });
  return (
    <Box
      zIndex={1}
      width={width}
      height={width}
      className={classes.root}
      position="absolute">
      {onClick && children
        ? React.cloneElement(children, { onClick })
        : children}
    </Box>
  );
}
