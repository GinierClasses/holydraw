import React from 'react';
import { Box, IconButton, Tooltip } from '@material-ui/core';
import {
  OnClearAction,
  OnRedoAction,
  OnSaveAction,
  OnUndoAction,
} from 'components/canvas/DrawingCanvasActions';
import DeleteIcon from '@material-ui/icons/Delete';
import UndoIcon from '@material-ui/icons/Undo';
import RedoIcon from '@material-ui/icons/Redo';
import CircleButtons from 'components/circle-button/CircleButtons';
import FormatColorFillIcon from '@material-ui/icons/FormatColorFill';
import CloseIcon from '@material-ui/icons/Close';
import BrushIcon from '@material-ui/icons/Brush';
import { useCanvasContext } from 'components/canvas/DrawingCanvasContext';
import { LineType } from 'types/canvas.types';
import { makeStyles, Theme } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import CheckIcon from '@material-ui/icons/Check';

type CanvasActionButtonsProps = {
  onSave: (image?: string) => void;
  isFinish?: boolean;
};

export default function CanvasActionButtons({
  onSave,
  isFinish,
}: CanvasActionButtonsProps) {
  return (
    <Box
      mt={2}
      minHeight={80}
      display="flex"
      flexDirection="row"
      alignItems="flex-start"
      justifyContent="space-between">
      <CanvasLineTypeButton />
      <Box display="flex" alignItems="center">
        <OnClearAction>
          <ActionButton title="hotkey: C">
            <DeleteIcon />
          </ActionButton>
        </OnClearAction>
        <OnUndoAction>
          <ActionButton title="CMD + Z">
            <UndoIcon />
          </ActionButton>
        </OnUndoAction>
        <OnRedoAction>
          <ActionButton title="CMD + SHIFT + Z">
            <RedoIcon />
          </ActionButton>
        </OnRedoAction>
        <OnSaveAction onSave={onSave}>
          <ActionButton color="primary" title="Save you're drawing">
            {isFinish ? <EditIcon /> : <CheckIcon />}
          </ActionButton>
        </OnSaveAction>
      </Box>
    </Box>
  );
}

const useStyles = makeStyles<Theme, { color: string; ml: number }>(theme => ({
  root: {
    backgroundColor: props =>
      props.color === 'primary'
        ? theme.palette.primary.main
        : theme.palette.custom.main,
    marginLeft: props => theme.spacing(props.ml),
    '&:hover': {
      backgroundColor: props =>
        props.color === 'primary' ? theme.palette.primary.dark : undefined,
    },
  },
  label: {
    color: theme.palette.common.white,
  },
}));

type ActionButtonProps = {
  children: React.ReactElement;
  title: string;
  color?: 'primary' | 'default';
  ml?: number;
  className?: string;
  onClick?: () => void;
};

function ActionButton({
  children,
  title,
  color = 'default',
  ml = 1,
  className,
  onClick,
}: ActionButtonProps) {
  const classes = useStyles({ color, ml });

  return (
    <IconButton
      color={color}
      onClick={onClick}
      className={className}
      classes={{ root: classes.root, label: classes.label }}>
      <Tooltip title={title}>{children}</Tooltip>
    </IconButton>
  );
}

function getCurrentIcon(lineType: LineType) {
  switch (lineType) {
    case LineType.FILL:
      return FormatColorFillIcon;
    case LineType.LINE:
      return BrushIcon;
  }
  return BrushIcon;
}

export function CanvasLineTypeButton() {
  const { lineType, setLineType } = useCanvasContext();
  const Icon = getCurrentIcon(lineType);

  React.useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      switch (event.key) {
        case 'b':
          setLineType(LineType.LINE);
          break;
        case 'f':
          setLineType(LineType.FILL);
          break;
      }
    }

    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [setLineType]);

  return (
    <CircleButtons
      circleBg="border"
      spacing={1}
      action={open => (
        <ActionButton ml={0} title={open ? 'Close' : 'Open'}>
          {open ? <CloseIcon /> : <Icon />}
        </ActionButton>
      )}>
      <IconButton onClick={() => setLineType(LineType.LINE)}>
        <Tooltip title="hotkey: B">
          <BrushIcon />
        </Tooltip>
      </IconButton>
      <IconButton onClick={() => setLineType(LineType.FILL)}>
        <Tooltip title="hotkey: F">
          <FormatColorFillIcon />
        </Tooltip>
      </IconButton>
    </CircleButtons>
  );
}
