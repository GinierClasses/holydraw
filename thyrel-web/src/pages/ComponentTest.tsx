import BigButton from '../components/BigButton';
import AvatarCard from '../components/Home/AvatarCard';
import AppLayout from '../components/lobby/AppLayout';
import AppTitle from '../components/lobby/AppTitle';
import UserCard from '../components/lobby/UserCard';
import StepTimer from '../components/StepTimer';
import profilesPictures from '../images/profiles/profiles-pictures';
import Box from '../styles/Box';

export default function ComponentTest() {
  return (
    <AppLayout>
      <Box flexDirection="column" alignItems="center" width="100%" gap={10}>
        <AppTitle />

        <Box display="block" width={100} height={100}>
          <StepTimer
            finishAt={new Date('2021-02-10T15:15:00')}
            timeDuration={1000}
            onFinish={() => console.log('finished')}
          />
        </Box>

        <AvatarCard image={profilesPictures[3]} />

        <UserCard
          id={1}
          name="John Doe"
          avatar={profilesPictures[3]}
          isOwner={true}
          isKickable={false}
          onKick={id => console.log('User id is :', id)}
        />

        <BigButton icon="star">Test</BigButton>
      </Box>
    </AppLayout>
  );
}
