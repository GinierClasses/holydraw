import {
  Box,
  FormControlLabel,
  IconButton,
  Slider,
  Switch,
} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import AccessibilityNewIcon from '@material-ui/icons/AccessibilityNew';
import DeleteIcon from '@material-ui/icons/Delete';
import PaletteIcon from '@material-ui/icons/Palette';
import RedoIcon from '@material-ui/icons/Redo';
import UndoIcon from '@material-ui/icons/Undo';
import DrawingCanvas from 'components/canvas/DrawingCanvas';
import {
  OnClearAction,
  OnRedoAction,
  OnSaveAction,
  OnUndoAction,
} from 'components/canvas/DrawingCanvasActions';
import { DrawingCanvasProvider } from 'components/canvas/DrawingCanvasProvider';
import BookDrawingElement from 'components/room/book/BookDrawingElement';
import BookSentenceElement from 'components/room/book/BookSentenceElement';
import ReactionPicker from 'components/room/book/ReactionPicker';
import ColorPickerMobileModal from 'components/room/draw/ColorPickerMobileModal';
import SizePickerV2 from 'components/room/draw/desktop/SizePickerV2';
import RoomModeSelector from 'components/room/lobby/room-mode/RoomModeSelector';
import StartButton from 'components/room/lobby/StartButton';
import StepProgress from 'components/room/StepProgress';
import SpinnerIcon from 'components/SpinnerIcon';
import GymGuy from 'images/gym-guy.svg';
import React, { useState } from 'react';
import { colors } from 'utils/app-constant';
import testPlayerList from 'test/data/players.json';
import BigButton from '../components/BigButton';
import BigInput from '../components/BigInput';
import HolyDrawLogo from '../components/HolyDrawLogo';
import ButtonModalJoin from '../components/home/ButtonModalJoin';
import PlayerAvatar from '../components/home/PlayerAvatar';
import BookPlayerList from '../components/room/book/BookPlayerList';
import DirectiveLabel from '../components/room/DirectiveLabel';
import DesktopColorPicker from '../components/room/draw/desktop/DesktopColorPicker';
import SizePicker from '../components/room/draw/desktop/SizePicker';
import PlayerCard from '../components/room/lobby/PlayerCard';
import PlayerCardList from '../components/room/lobby/PlayerCardList';
import ShareRoomButton from '../components/room/lobby/ShareRoomButton';
import PlayerCount from '../components/room/PlayerCount';
import StepTimer from '../components/room/StepTimer';
import profilesPictures from '../images/profiles/profiles-pictures';

export default function ComponentTest() {
  const [ppIndex, setPpIndex] = useState(0);
  const [color, setColor] = useState(colors[5]);
  const [mobileCanvas, setMobileCanvas] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [size, setSize] = useState(8);
  const [size2, setSize2] = useState<number>(10);
  const [progress, setProgress] = React.useState<number>(1);
  const [open, setOpen] = React.useState(false);

  const handleChange = (event: any, newValue: any) => {
    setProgress(newValue);
  };

  const nextPp = () => {
    setPpIndex(p => (p > profilesPictures.length - 2 ? 0 : p + 1));
  };

  type Reaction = {
    emojiId: number;
    count: number;
    isSelected: boolean;
  };

  const reactionsExample: Reaction[] = [
    { emojiId: 0, count: 2, isSelected: false },
    { emojiId: 1, count: 6, isSelected: true },
    { emojiId: 2, count: 3, isSelected: false },
    { emojiId: 3, count: 2, isSelected: false },
    { emojiId: 4, count: 1, isSelected: false },
  ];

  return (
    <Box>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        width="100%"
        gap={4}>
        <HolyDrawLogo />

        <Box>
          <RoomModeSelector></RoomModeSelector>
        </Box>

        <Box>
          <Button
            onClick={() => {
              setOpen(true);
            }}>
            <PaletteIcon />
          </Button>
          <ColorPickerMobileModal
            open={open}
            onClose={() => setOpen(false)}
            currentColor={color}
            onColorChange={color => setColor(color)}
          />
        </Box>

        <Box>
          <DesktopColorPicker
            currentColor={color}
            onColorChange={color => setColor(color)}
          />
        </Box>

        <Box>
          <BookSentenceElement
            username="Houn Salade"
            avatarUrl={profilesPictures[ppIndex]}>
            Combien sont ces six saucissons-ci ?
          </BookSentenceElement>
        </Box>

        <BookDrawingElement username="Jean-Philippes-Pascal" src={GymGuy} />

        <FormControlLabel
          control={
            <Switch
              checked={mobileCanvas}
              onChange={e => setMobileCanvas(e.target.checked)}
            />
          }
          label="Is mobile canvas"
        />
        <FormControlLabel
          control={
            <Switch
              checked={disabled}
              onChange={e => setDisabled(e.target.checked)}
            />
          }
          label="Is canvas disabled"
        />
        <Box display="flex" width="100%" maxWidth={1000} flexDirection="column">
          <DrawingCanvasProvider
            color={color}
            disabled={disabled}
            lineSize={size}>
            <Box display="flex" width="100%" flexWrap="wrap">
              <Box width="100%">
                <DrawingCanvas disabled={disabled} />
              </Box>
              <Box display="flex" flexDirection="column">
                <OnClearAction>
                  <IconButton size="large">
                    <DeleteIcon />
                  </IconButton>
                </OnClearAction>
                <OnUndoAction>
                  <IconButton size="large">
                    <UndoIcon />
                  </IconButton>
                </OnUndoAction>
                <OnRedoAction>
                  <IconButton size="large">
                    <RedoIcon />
                  </IconButton>
                </OnRedoAction>
              </Box>

              <DesktopColorPicker
                currentColor={color}
                onColorChange={color => setColor(color)}
              />
              <SizePicker
                currentSize={size}
                onSizeChange={size => setSize(size)}
                flexDirection="column"
              />
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

        <StepTimer
          finishAt={new Date('2021-03-30T08:31:00')}
          timeDuration={120}
        />
        <ButtonModalJoin
          loading={false}
          identifier={undefined}
          onClick={() => void 0}></ButtonModalJoin>
        <PlayerAvatar image={profilesPictures[ppIndex]} onShuffle={nextPp} />
        <BigInput
          onChange={() => void 0}
          value={'didier'}
          startIcon={<AccessibilityNewIcon />}
        />
        <ShareRoomButton identifier="LH4AH3" />
        <PlayerCard
          id={1}
          name="John Doe"
          avatar={profilesPictures[ppIndex]}
          isOwner={true}
          isKickable={false}
          onKick={id => void 0}
        />

        <BigButton size="large" onClick={nextPp}>
          Test
        </BigButton>

        <StartButton player={testPlayerList[1]} onClick={() => void 0} />

        <PlayerCardList
          players={testPlayerList}
          playerId={3}
          isKickable={true}
          onKick={id => void 0}
        />
        <DirectiveLabel sentence="Salzt" directive="bonsoir" />

        <SpinnerIcon />

        <PlayerCount count={8} max={12} />

        <PlayerCardList
          players={testPlayerList}
          isKickable={true}
          onKick={id => void 0}
        />

        <BookPlayerList players={testPlayerList} playerId={2} />

        <Slider
          defaultValue={progress}
          onChange={handleChange}
          aria-labelledby="discrete-slider"
          valueLabelDisplay="auto"
          step={1}
          min={1}
          max={7}
        />

        <SizePickerV2
          size={size2}
          orientation="vertical"
          onSizeChange={value => setSize2(value)}
        />

        <Box
          bgcolor="#C6C6C6"
          borderRadius="50%"
          height={size2}
          width={size2}
        />

        <Box bgcolor="primary.main" p={4}>
          <ReactionPicker onClick={() => void 0} reactions={reactionsExample} />
        </Box>

        <StepProgress stepActual={progress} stepMax={7} />
      </Box>
    </Box>
  );
}
