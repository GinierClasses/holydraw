import { Box, Container } from '@material-ui/core';
import { Breakpoint } from '@material-ui/core/styles/createBreakpoints';
import GameBar from 'components/GameBar';
import { useSessionContext } from 'hooks/SessionProvider';
import React from 'react';
import StepProgress from './StepProgress';

type GameLayoutProps = {
  displayHud?: boolean;
  maxWidth?: Breakpoint;
  children: React.ReactElement | React.ReactElement[];
};

export default function GameLayout({
  displayHud = true,
  maxWidth = 'sm',
  children,
}: GameLayoutProps) {
  return (
    <Box height="100vh" display="flex" flexDirection="column">
      <GameBar displayHud={displayHud} />
      <Container maxWidth={maxWidth} className="full-height">
        {children}
      </Container>
      {displayHud && <StepProgressWithContext />}
    </Box>
  );
}
function CallApi() {
  //here i call the api to save the element because the time is finished
  console.log('Finished time');
  const url = 'Api/url';
  console.log(url);
  //client(url);
}

const StepProgressWithContext = () => {
  const { session } = useSessionContext();
  return (
    <StepProgress
      stepActual={session?.actualStep}
      stepMax={session?.totalPlayers}
    />
  );
};
