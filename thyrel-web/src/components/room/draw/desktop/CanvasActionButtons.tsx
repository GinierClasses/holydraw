import { Box, IconButton, Tooltip } from '@material-ui/core';
import BrushIcon from '@material-ui/icons/Brush';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import FormatColorFillIcon from '@material-ui/icons/FormatColorFill';
import RedoIcon from '@material-ui/icons/Redo';
import UndoIcon from '@material-ui/icons/Undo';
import {
  OnClearAction,
  OnRedoAction,
  OnSaveAction,
  OnUndoAction,
} from 'components/canvas/DrawingCanvasActions';
import { useCanvasContext } from 'components/canvas/DrawingCanvasContext';
import CircleButtons from 'components/circle-button/CircleButtons';
import React from 'react';
import { LineType } from 'types/canvas.types';
import ActionButton from './ActionButton';

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
      action={({ open, sx }) => (
        <ActionButton
          disabled={disabled}
          ml={0}
          sx={sx}
          title={open ? 'Close' : 'Open'}>
          {open ? <CloseIcon /> : <Icon />}
        </ActionButton>
      )}>
      <IconButton onClick={() => setLineType(LineType.LINE)} size="large">
        <Tooltip title="hotkey: B">
          <BrushIcon />
        </Tooltip>
      </IconButton>
      <IconButton onClick={() => setLineType(LineType.FILL)} size="large">
        <Tooltip title="hotkey: F">
          <FormatColorFillIcon />
        </Tooltip>
      </IconButton>
    </CircleButtons>
  );
}
