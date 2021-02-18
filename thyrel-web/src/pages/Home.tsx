import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import AppLayout from '../components/AppLayout';
import AppTitle from '../components/lobby/AppTitle';
import Box from '../styles/Box';
import PlayerForm from '../components/home/PlayerForm';

export default function Home(
  props: RouteComponentProps<{ identifier?: string }>,
) {
  const identifier = props.match.params.identifier;

  return (
    <AppLayout>
      <Box p={32} width="100%">
        <AppTitle />
      </Box>
      <Box mt={16}>
        <PlayerForm identifier={identifier} />
      </Box>
    </AppLayout>
  );
}
