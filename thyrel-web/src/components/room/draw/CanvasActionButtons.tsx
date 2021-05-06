import React from 'react';
import { Box, IconButton, Tooltip } from '@material-ui/core';
import {
  OnClearAction,
  OnRedoAction,
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

export default function CanvasActionButtons() {
  return (
    <Box display="flex" flexDirection="row">
      <OnClearAction>
        <IconButton>
          <Tooltip title="hotkey: C">
            <DeleteIcon />
          </Tooltip>
        </IconButton>
      </OnClearAction>
      <OnUndoAction>
        <IconButton>
          <Tooltip title="CMD + Z">
            <UndoIcon />
          </Tooltip>
        </IconButton>
      </OnUndoAction>
      <OnRedoAction>
        <IconButton>
          <Tooltip title="CMD + SHIFT + Z">
            <RedoIcon />
          </Tooltip>
        </IconButton>
      </OnRedoAction>
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
      circleBg="none"
      spacing={1}
      action={open => (
        <IconButton>
          {open ? (
            <CloseIcon />
          ) : (
            <Tooltip title="Click to open">
              <Icon />
            </Tooltip>
          )}
        </IconButton>
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
