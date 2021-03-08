import React, { useState } from 'react';
import BigButton from '../components/BigButton';
import PlayerCount from '../components/room/PlayerCount';
import PlayerAvatar from '../components/home/PlayerAvatar';
import AppTitle from '../components/lobby/AppTitle';
import BigInput from '../components/lobby/BigInput';
import PlayerCard from '../components/lobby/PlayerCard';
import PlayerCardList from '../components/lobby/PlayerCardList';
import StepTimer from '../components/room/StepTimer';
import profilesPictures from '../images/profiles/profiles-pictures';
import Box from '../styles/Box';
import DirectiveLabel from '../components/room/DirectiveLabel';
import DrawColorPicker from '../components/draw/DrawColorPicker';
import SizePicker from '../components/room/SizePicker';

import ShareRoomButton from '../components/lobby/ShareRoomButton';

import BookPlayerList from '../components/room/BookPlayerList';
import ButtonModalJoin from '../components/home/ButtonModalJoin';

export default function ComponentTest() {
  const [ppIndex, setPpIndex] = useState(0);
  const [size, setSize] = useState(8);

  const nextPp = () => {
    setPpIndex(p => (p > profilesPictures.length - 2 ? 0 : p + 1));
  };

  const testPlayerList = [
    {
      id: 1,
      username: 'jeanmich',
      avatarUrl: profilesPictures[0],
      isOwner: true,
      isPlaying: true,
      createdAt: '',
      roomId: 1,
    },
    {
      id: 2,
      username: 'Xx_plao',
      avatarUrl: profilesPictures[1],
      isOwner: false,
      isPlaying: true,
      createdAt: '',
      roomId: 1,
    },
    {
      id: 3,
      username: 'AAAAAAHHHH',
      avatarUrl: profilesPictures[2],
      isOwner: false,
      isPlaying: true,
      createdAt: '',
      roomId: 1,
    },
    {
      id: 4,
      username: 'Melvyn',
      avatarUrl: profilesPictures[3],
      isOwner: false,
      isPlaying: true,
      createdAt: '',
      roomId: 1,
    },
    {
      id: 5,
      username: 'Ana',
      avatarUrl: profilesPictures[4],
      isOwner: false,
      isPlaying: true,
      createdAt: '',
      roomId: 1,
    },
    {
      id: 6,
      username: 'Alex',
      avatarUrl: profilesPictures[5],
      isOwner: false,
      isPlaying: true,
      createdAt: '',
      roomId: 1,
    },
    {
      id: 7,
      username: 'Luca',
      avatarUrl: profilesPictures[6],
      isOwner: false,
      isPlaying: true,
      createdAt: '',
      roomId: 1,
    },
  ];

  return (
    <Box>
      <Box flexDirection="column" alignItems="center" width="100%" gap={30}>
        <AppTitle />

        <DrawColorPicker
          colors={[
            '#FF0000',
            '#FFC700',
            '#24FF00',
            '#001AFF',
            '#00F0FF',
            '#6564A6',
            '#759F81',
            '#FFFA8A',
            '#8C33D2',
            '#FF8A00',
            '#00FFC2',
            '#001AFF',
            '#FA00FF',
            '#FA00FF',
          ]}
          currentColor="#24FF00"
        />

        <Box display="block" width={100} height={100}>
          <StepTimer
            finishAt={new Date('2021-03-02T10:27:00')}
            timeDuration={100}
            onFinish={() => console.log('finished')}
          />
        </Box>
        <ButtonModalJoin
          identifier={undefined}
          onClick={console.log}></ButtonModalJoin>
        <PlayerAvatar image={profilesPictures[ppIndex]} onShuffle={nextPp} />
        <BigInput value={'didier'} icon="apple" />
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

        <SizePicker
          currentSize={size}
          onSizeChange={size => {
            console.log('Size is :', size);
            setSize(size);
          }}
        />

        <BookPlayerList players={testPlayerList} playerId={2}></BookPlayerList>
      </Box>
    </Box>
  );
}
