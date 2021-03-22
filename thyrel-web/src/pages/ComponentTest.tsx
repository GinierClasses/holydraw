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

const testPlayerList = [
  {
    id: 1,
    username: 'jeanmich',
    avatarUrl: '0',
    isOwner: true,
    isPlaying: true,
    createdAt: '',
    roomId: 1,
  },
  {
    id: 2,
    username: 'Xx_plao',
    avatarUrl: '1',
    isOwner: false,
    isPlaying: true,
    createdAt: '',
    roomId: 1,
  },
  {
    id: 3,
    username: 'AAAAAAHHHH',
    avatarUrl: '2',
    isOwner: false,
    isPlaying: true,
    createdAt: '',
    roomId: 1,
  },
  {
    id: 4,
    username: 'Melvyn',
    avatarUrl: '3',
    isOwner: false,
    isPlaying: true,
    createdAt: '',
    roomId: 1,
  },
  {
    id: 5,
    username: 'Ana',
    avatarUrl: '4',
    isOwner: false,
    isPlaying: true,
    createdAt: '',
    roomId: 1,
  },
  {
    id: 6,
    username: 'Alex',
    avatarUrl: '5',
    isOwner: false,
    isPlaying: true,
    createdAt: '',
    roomId: 1,
  },
  {
    id: 7,
    username: 'Luca',
    avatarUrl: '6',
    isOwner: false,
    isPlaying: true,
    createdAt: '',
    roomId: 1,
  },
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
      <Box flexDirection="column" alignItems="center" width="100%" gap={30}>
        <AppTitle />

        <DrawColorPicker
          colors={colors}
          currentColor={currentColor}
          onColorChange={color => setCurrentColor(color)}
        />

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
          playerId={3}
          isKickable={true}
          onKick={id => console.log('id is', id)}
        />

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
