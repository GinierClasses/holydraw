import React, { useState } from 'react';
import BigButton from '../components/BigButton';
import PlayerCount from '../components/room/PlayerCount';
import AppTitle from '../components/AppTitle';
import BigInput from '../components/BigInput';
import PlayerCard from '../components/room/lobby/PlayerCard';
import PlayerCardList from '../components/room/lobby/PlayerCardList';
import StepTimer from '../components/room/StepTimer';
import profilesPictures from '../images/profiles/profiles-pictures';
import Box from '../styles/Box';
import DirectiveLabel from '../components/room/DirectiveLabel';
import PlayerAvatar from '../components/home/PlayerAvatar';
import DrawColorPicker from '../components/room/draw/DrawColorPicker';
import SizePicker from '../components/room/draw/SizePicker';
import ShareRoomButton from '../components/room/lobby/ShareRoomButton';
import BookPlayerList from '../components/room/book/BookPlayerList';
import ButtonModalJoin from '../components/home/ButtonModalJoin';
import CanvasDraw from 'components/room/draw/CanvasDraw';
import testPlayerList from '__tests__/json/players.json';

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

  const nextPp = () => {
    setPpIndex(p => (p > profilesPictures.length - 2 ? 0 : p + 1));
  };

  return (
    <Box flexDirection="column" alignItems="center" width="100%" gap={30}>
      <AppTitle />

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

      <Box display="block" width={100} height={100}>
        <StepTimer
          finishAt={new Date('2021-03-02T10:27:00')}
          timeDuration={100}
        />
      </Box>
      <ButtonModalJoin
        identifier={undefined}
        onClick={console.log}></ButtonModalJoin>
      <PlayerAvatar image={profilesPictures[ppIndex]} onShuffle={nextPp} />
      <BigInput onChange={() => void 0} value={'didier'} icon="apple" />
      <ShareRoomButton identifier="LH4AH3" />
      <PlayerCard
        id={1}
        name="John Doe"
        avatar={profilesPictures[ppIndex]}
        isOwner={true}
        isKickable={false}
        onKick={id => console.log('User id is :', id)}
      />

      <BigButton icon="star" onClick={nextPp}>
        Test
      </BigButton>

      <PlayerCardList
        players={testPlayerList}
        isKickable={true}
        onKick={id => console.log('id is', id)}
      />

      <PlayerCount count={8} max={12} />

      <DirectiveLabel
        directive="Time to draw"
        sentence="Mémé fait des fucks à la police"
      />

      <BookPlayerList players={testPlayerList} playerId={2}></BookPlayerList>
    </Box>
  );
}
