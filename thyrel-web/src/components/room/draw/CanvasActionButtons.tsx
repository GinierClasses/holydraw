import { Box, IconButton } from '@material-ui/core';
import {
  OnClearAction,
  OnRedoAction,
  OnUndoAction,
} from 'components/canvas/DrawingCanvasActions';
import DeleteIcon from '@material-ui/icons/Delete';
import UndoIcon from '@material-ui/icons/Undo';
import RedoIcon from '@material-ui/icons/Redo';

export default function CanvasActionButtons() {
  return (
    <Box display="flex" flexDirection="row">
      <OnClearAction>
        <IconButton>
          <DeleteIcon />
        </IconButton>
      </OnClearAction>
      <OnUndoAction>
        <IconButton>
          <UndoIcon />
        </IconButton>
      </OnUndoAction>
      <OnRedoAction>
        <IconButton>
          <RedoIcon />
        </IconButton>
      </OnRedoAction>
    </Box>
  );
}
