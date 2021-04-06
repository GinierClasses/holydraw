import React from 'react';
import { Box, IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import UndoIcon from '@material-ui/icons/Undo';
import { useCanvasContext } from './DrawingCanvasProvider';
import { callAll } from 'utils/utils';

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

export function OnClearAction({ children }: { children: React.ReactElement }) {
  const { clear } = useCanvasContext();
  return React.cloneElement(children, {
    onClick: callAll(clear, children.props.onClick),
  });
}

export function OnUndoAction({ children }: { children: React.ReactElement }) {
  const { undo } = useCanvasContext();
  return React.cloneElement(children, {
    onClick: callAll(undo, children.props.onClick),
  });
}

export function OnRedoAction({ children }: { children: React.ReactElement }) {
  const { redo } = useCanvasContext();
  return React.cloneElement(children, {
    onClick: callAll(redo, children.props.onClick),
  });
}

export function OnSaveAction({
  children,
  onSave,
}: {
  children: React.ReactElement;
  onSave: (drawImage?: string) => void;
}) {
  const { canvasRef } = useCanvasContext();
  return React.cloneElement(children, {
    onClick: () => {
      onSave(canvasRef.current?.toDataURL());
      children.props.onClick?.();
    },
  });
}
