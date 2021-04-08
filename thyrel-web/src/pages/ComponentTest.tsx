import React, { useState } from 'react';
import BigButton from '../components/BigButton';
import PlayerCount from '../components/room/PlayerCount';
import HolyDrawLogo from '../components/HolyDrawLogo';
import BigInput from '../components/BigInput';
import PlayerCard from '../components/room/lobby/PlayerCard';
import PlayerCardList from '../components/room/lobby/PlayerCardList';
import StepTimer from '../components/room/StepTimer';
import profilesPictures from '../images/profiles/profiles-pictures';
import DirectiveLabel from '../components/room/DirectiveLabel';
import PlayerAvatar from '../components/home/PlayerAvatar';
import DrawColorPicker from '../components/room/draw/DrawColorPicker';
import SizePicker from '../components/room/draw/SizePicker';
import ShareRoomButton from '../components/room/lobby/ShareRoomButton';
import BookPlayerList from '../components/room/book/BookPlayerList';
import ButtonModalJoin from '../components/home/ButtonModalJoin';
import CanvasDraw from 'components/room/draw/CanvasDraw';
import testPlayerList from '__tests__/json/players.json';
import AccessibilityNewIcon from '@material-ui/icons/AccessibilityNew';
import { Box } from '@material-ui/core';
import SpinnerIcon from 'components/SpinnerIcon';
import StartButton from 'components/room/lobby/StartButton';
import StepProgress from 'components/room/StepProgress';
import { Slider } from '@material-ui/core';
import BookDrawingElement from 'components/room/book/BookDrawingElement';

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

export default function ComponentTest() {
  const [ppIndex, setPpIndex] = useState(0);
  const [color, setColor] = useState(colors[5]);
  const [size, setSize] = useState(8);
  const [progress, setProgress] = React.useState<number>(1);

  const handleChange = (event: any, newValue: any) => {
    setProgress(newValue);
  };

  const nextPp = () => {
    setPpIndex(p => (p > profilesPictures.length - 2 ? 0 : p + 1));
  };

  return (
    <Box>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        width="100%"
        gridGap={32}>
        <HolyDrawLogo />

        <Box display="flex" flexDirection="column">
          <Box display="flex">
            <DrawColorPicker
              colors={colors}
              currentColor={color}
              onColorChange={color => setColor(color)}
            />
            <CanvasDraw size={size} color={color} />
          </Box>
          <SizePicker currentSize={size} onSizeChange={size => setSize(size)} />
        </Box>

        <StepTimer
          finishAt={new Date('2021-03-30T08:31:00')}
          timeDuration={120}
        />
        <BookDrawingElement username="Jean-Philippes-Pascal" />
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

        <StartButton player={testPlayerList[1]} onStart={() => void 0} />

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

        <StepProgress stepActual={progress} stepMax={7} />
      </Box>
    </Box>
  );
}
