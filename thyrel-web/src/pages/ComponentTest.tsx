import { useState } from 'react';
import BigButton from '../components/BigButton';
import AvatarCard from '../components/Home/AvatarCard';
import AppLayout from '../components/AppLayout';
import AppTitle from '../components/lobby/AppTitle';
import UserCard from '../components/lobby/UserCard';
import PlayerCount from '../components/PlayerCount';
import UserCardList from '../components/lobby/UserCardList';
import StepTimer from '../components/StepTimer';
import profilesPictures from '../images/profiles/profiles-pictures';
import Box from '../styles/Box';

export default function ComponentTest() {
  const [ppIndex, setPpIndex] = useState(0);

  const nextPp = () => {
    setPpIndex(p => (p > profilesPictures.length - 2 ? 0 : p + 1));
  };

  return (
    <AppLayout>
      <Box flexDirection="column" alignItems="center" width="100%" gap={30}>
        <AppTitle />

        <Box display="block" width={100} height={100}>
          <StepTimer
            finishAt={new Date('2021-02-10T15:15:00')}
            timeDuration={1000}
            onFinish={() => console.log('finished')}
          />
        </Box>

        <AvatarCard image={profilesPictures[ppIndex]} onShuffle={nextPp} />

        <UserCard
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

        <UserCardList
          players={[
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
          ]}
          isKickable={true}
          onKick={id => console.log('id is', id)}
        />

        <PlayerCount count={8} max={12} />
      </Box>
    </AppLayout>
  );
}
