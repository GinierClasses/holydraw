import { Box, IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import UndoIcon from '@material-ui/icons/Undo';

type CanvasDrawActionsProps = {
  onClear?: () => void;
  onUndo?: () => void;
};

export default function CanvasDrawActions({
  onClear,
  onUndo,
}: CanvasDrawActionsProps) {
  return (
    <Box ml={1} display="flex" flexDirection="column">
      <IconButton onClick={onClear}>
        <DeleteIcon />
      </IconButton>
      <IconButton onClick={onUndo}>
        <UndoIcon />
      </IconButton>
    </Box>
  );
}
