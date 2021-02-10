import StepTimer from '../components/StepTimer';
import Box from '../styles/Box';

export default function ComponentTest() {
  return (
    // Timer TEST ✅ - Change finish at and timeDuration to test
    <Box display="block" width={100} height={100}>
      <StepTimer
        finishAt={new Date('2021-02-10T15:15:00')}
        timeDuration={1000}
        onFinish={() => console.log('finished')}
      />
    </Box>
  );
}
