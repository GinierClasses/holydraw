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
      <CanvasLineTypeButton disabled={isFinish} />
      <Box display="flex" alignItems="center">
        <OnClearAction>
          <ActionButton disabled={isFinish} title="hotkey: C">
            <DeleteIcon />
          </ActionButton>
        </OnClearAction>
        <OnUndoAction>
          <ActionButton disabled={isFinish} title="CMD + Z">
            <UndoIcon />
          </ActionButton>
        </OnUndoAction>
        <OnRedoAction>
          <ActionButton disabled={isFinish} title="CMD + SHIFT + Z">
            <RedoIcon />
          </ActionButton>
        </OnRedoAction>
        <OnSaveAction onSave={onSave}>
          <ActionButton color="primary" title={isFinish ? 'Edit' : 'Finish'}>
            {isFinish ? <EditIcon /> : <CheckIcon />}
          </ActionButton>
        </OnSaveAction>
      </Box>
    </Box>
  );
}

type ActionButtonStylesProps = {
  color: string;
  ml: number;
  disabled?: boolean;
};

const useStyles = makeStyles<Theme, ActionButtonStylesProps>(theme => ({
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
  icon: {
    color: props =>
      props.disabled
        ? theme.palette.text.secondary
        : theme.palette.text.primary,
  },
}));

type ActionButtonProps = {
  children: React.ReactElement;
  title: string;
  color?: 'primary' | 'default';
  ml?: number;
  disabled?: boolean;
  className?: string;
  onClick?: () => void;
};

function ActionButton({
  children,
  title,
  color = 'default',
  ml = 1,
  className,
  disabled,
  onClick,
}: ActionButtonProps) {
  const classes = useStyles({ color, ml, disabled });

  return (
    <IconButton
      color={color}
      onClick={onClick}
      disabled={disabled}
      className={className}
      classes={{ root: classes.root, label: classes.label }}>
      <Tooltip title={title}>
        {React.cloneElement(children, { className: classes.icon })}
      </Tooltip>
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

export function CanvasLineTypeButton({ disabled }: { disabled?: boolean }) {
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
        <ActionButton
          disabled={disabled}
          ml={0}
          title={open ? 'Close' : 'Open'}>
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
