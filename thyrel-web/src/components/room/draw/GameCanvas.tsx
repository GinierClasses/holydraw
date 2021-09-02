import { Box } from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import RedoIcon from '@material-ui/icons/Redo';
import UndoIcon from '@material-ui/icons/Undo';
import DrawingCanvas from 'components/canvas/DrawingCanvas';
import PaletteIcon from '@material-ui/icons/Palette';
import {
  OnClearAction,
  OnRedoAction,
  OnSaveAction,
  OnUndoAction,
} from 'components/canvas/DrawingCanvasActions';
import { DrawingCanvasProvider } from 'components/canvas/DrawingCanvasProvider';
import { useSessionContext } from 'hooks/SessionProvider';
import { useState } from 'react';
import ColorPickerMobileModal from './ColorPickerMobileModal';
import ActionButton from './desktop/ActionButton';
import { colors } from 'utils/app-constant';
import SizePickerV2 from './desktop/SizePickerV2';

export default function GameCanvas() {
  const { currentElement, onSave } = useSessionContext();
  const isFinish = Boolean(currentElement?.finishAt);
  const [color, setColor] = useState(colors[5]);
  const [size, setSize] = useState(8);

  return (
    <DrawingCanvasProvider color={color} disabled={isFinish} lineSize={size}>
      <Box display="flex" flexDirection="column" gap={4} alignItems="center">
        <Box width="100%">
          <DrawingCanvas disabled={isFinish} />
        </Box>
        <Box
          display="flex"
          flexDirection="row"
          flexWrap="wrap"
          alignItems="center"
          justifyContent="space-between"
          width="100%">
          <OnClearAction>
            <ActionButton ml={0} disabled={isFinish} title="hotkey: C">
              <DeleteIcon />
            </ActionButton>
          </OnClearAction>
          <OnUndoAction>
            <ActionButton ml={0} disabled={isFinish} title="CMD + Z">
              <UndoIcon />
            </ActionButton>
          </OnUndoAction>
          <OnRedoAction>
            <ActionButton ml={0} disabled={isFinish} title="CMD + SHIFT + Z">
              <RedoIcon />
            </ActionButton>
          </OnRedoAction>
          <CPicker
            isFinish={isFinish}
            currentColor={color}
            onColorChange={setColor}
          />
          <OnSaveAction
            onSave={canvasImage => {
              if (!canvasImage) return;
              onSave(canvasImage);
            }}>
            <ActionButton
              ml={0}
              color="primary"
              title={isFinish ? 'Edit' : 'Finish'}>
              {isFinish ? <EditIcon /> : <CheckIcon />}
            </ActionButton>
          </OnSaveAction>
        </Box>
        <SizePickerV2
          orientation="horizontal"
          onSizeChange={setSize}
          size={size}
        />
      </Box>
    </DrawingCanvasProvider>
  );
}

function CPicker({
  isFinish,
  currentColor,
  onColorChange,
}: {
  isFinish: boolean;
  currentColor: string;
  onColorChange: (color: string) => void;
}) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <ActionButton ml={0} disabled={isFinish} onClick={() => setOpen(p => !p)}>
        <PaletteIcon />
      </ActionButton>
      <ColorPickerMobileModal
        open={open}
        onClose={() => setOpen(false)}
        currentColor={currentColor}
        onColorChange={color => onColorChange(color)}
      />
    </>
  );
}
