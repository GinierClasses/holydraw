import { RouteComponentProps } from 'react-router-dom';
import AppTitle from 'components/AppTitle';
import Box from 'styles/Box';
import PlayerForm from 'components/home/PlayerForm';

export default function Home(
  props: RouteComponentProps<{ identifier?: string }>,
) {
  const identifier = props.match.params.identifier;

  return (
    <Box flexDirection="column" alignItems="center" width="100%" gap={24}>
      <Box p={32} width="100%">
        <AppTitle />
      </Box>
      <Box mt={16}>
        <PlayerForm identifier={identifier} />
      </Box>
    </Box>
  );
}
