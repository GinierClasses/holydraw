import { Box, IconButton, useMediaQuery } from '@material-ui/core';
import BigButton from 'components/BigButton';
import DrawingCanvas from 'components/canvas/DrawingCanvas';
import {
  OnClearAction,
  OnRedoAction,
  OnSaveAction,
  OnUndoAction,
} from 'components/canvas/DrawingCanvasActions';
import { DrawingCanvasProvider } from 'components/canvas/DrawingCanvasProvider';
import DirectiveLabel from 'components/room/DirectiveLabel';
import DrawColorPicker from 'components/room/draw/DrawColorPicker';
import SizePicker from 'components/room/draw/SizePicker';
import GameLayout from 'components/room/GameLayout';
import { useState } from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import UndoIcon from '@material-ui/icons/Undo';
import RedoIcon from '@material-ui/icons/Redo';
import theme from 'theme';

const colors = [
  '#000000',
  '#7f8c8d',
  '#bdc3c7',
  '#ecf0f1',
  '#00a8ff',
  '#1e3799',
  '#2ecc71',
  '#009432',
  '#e74c3c',
  '#c0392b',
  '#FA00FF',
  '#FDA7DF',
  '#FEAFA8',
  '#CB5A57',
  '#FFC312',
  '#F79F1F',
];

const canvasWidth = {
  md: {
    width: 512,
    height: 320,
    border: 4,
    scale: 2,
    lineScale: 2,
  },
  xs: {
    width: 256,
    height: 160,
    border: 2,
    scale: 4,
    lineScale: 2,
  },
};

export default function Draw() {
  const isDeviceSM = useMediaQuery(theme.breakpoints.up('sm'));
  const [color, setColor] = useState(colors[5]);
  const [size, setSize] = useState(8);
  return (
    <GameLayout maxWidth="sm">
      <DirectiveLabel directive="Time to Draw" />

      <Box display="flex" flexDirection="column">
        <DrawingCanvasProvider
          color={color}
          lineSize={size}
          canvasSize={isDeviceSM ? canvasWidth.md : canvasWidth.xs}>
          <Box display="flex" flexDirection="column">
            <Box display="flex" flexDirection="row">
              <DrawingCanvas />
              <Box display="flex" flexDirection="column">
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
            </Box>
            <Box display="flex" flexDirection="column">
              <DrawColorPicker
                colors={colors}
                currentColor={color}
                onColorChange={color => setColor(color)}
                flexDirection="row"
              />
              <SizePicker
                currentSize={size}
                onSizeChange={size => setSize(size)}
              />
            </Box>
          </Box>

          <OnSaveAction
            onSave={canvasImage => {
              if (!canvasImage) return;
              const win = window.open();
              win?.document.write(
                '<iframe width="1200px" height="700px" src=' +
                  canvasImage +
                  '></iframe>',
              );
            }}>
            <BigButton size="large">Submit</BigButton>
          </OnSaveAction>
        </DrawingCanvasProvider>
      </Box>

      <p>hello this is a test</p>
    </GameLayout>
  );
}
