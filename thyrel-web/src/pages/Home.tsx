import { RouteComponentProps } from 'react-router-dom';
import AppTitle from 'components/AppTitle';
import PlayerForm from 'components/home/PlayerForm';
import { Box } from '@material-ui/core';

export default function Home(
  props: RouteComponentProps<{ identifier?: string }>,
) {
  const identifier = props.match.params.identifier;

  return (
    <Box display="flex" flexDirection="column" alignItems="center" width="100%">
      <Box p={{ xs: 1, sm: 2 }} width="100%">
        <AppTitle />
      </Box>
      <Box mt={{ xs: 1, sm: 2 }}>
        <PlayerForm identifier={identifier} />
      </Box>
    </Box>
  );
}
