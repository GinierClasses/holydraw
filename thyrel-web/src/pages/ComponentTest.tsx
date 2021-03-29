import React, { useState } from 'react';
import BigButton from '../components/BigButton';
import PlayerCount from '../components/room/PlayerCount';
import AppTitle from '../components/AppTitle';
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
import testPlayerList from '__tests__/json/players.json';
import AccessibilityNewIcon from '@material-ui/icons/AccessibilityNew';
import { Box } from '@material-ui/core';
import SpinnerIcon from 'components/SpinnerIcon';
import StartButton from 'components/room/lobby/StartButton';

const colors = [
  '#FF0000',
  '#FFC700',
  '#24FF00',
  '#001AAF',
  '#005A5F',
  '#6564A6',
  '#759F81',
  '#FFFA8A',
  '#8C33D2',
  '#FF8A00',
  '#00FFC2',
  '#002FFF',
  '#FA00FF',
  '#A450AC',
];

export default function ComponentTest() {
  const [ppIndex, setPpIndex] = useState(0);
  const [currentColor, setCurrentColor] = useState(colors[0]);
  const [size, setSize] = useState(8);

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
        <AppTitle />

        <DrawColorPicker
          colors={colors}
          currentColor={currentColor}
          onColorChange={color => setCurrentColor(color)}
        />

        <StepTimer
          finishAt={new Date('2021-03-02T10:27:00')}
          timeDuration={100}
        />
        <ButtonModalJoin
          loading={false}
          identifier={undefined}
          onClick={console.log}></ButtonModalJoin>
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
          onKick={id => console.log('User id is :', id)}
        />

        <BigButton size="large" onClick={nextPp}>
          Test
        </BigButton>

        <StartButton player={testPlayerList[1]} onStart={() => void 0} />

        <PlayerCardList
          players={testPlayerList}
          playerId={3}
          isKickable={true}
          onKick={id => console.log('id is', id)}
        />

        <SpinnerIcon />

        <PlayerCount count={8} max={12} />

        <DirectiveLabel
          directive="Time to draw"
          sentence="Mémé fait des fucks à la police"
        />

        <SizePicker currentSize={size} onSizeChange={size => setSize(size)} />

        <BookPlayerList players={testPlayerList} playerId={2}></BookPlayerList>
      </Box>
    </Box>
  );
}
