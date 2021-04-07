import { RouteComponentProps } from 'react-router-dom';
import HolyDrawLogo from 'components/HolyDrawLogo';
import PlayerForm from 'components/home/PlayerForm';
import { Box } from '@material-ui/core';

export default function Home(
  props: RouteComponentProps<{ identifier?: string }>,
) {
  const identifier = props.match.params.identifier;

  return (
    <Box display="flex" flexDirection="column" alignItems="center" width="100%">
      <HolyDrawLogo width={32} />
      <Box mt={{ xs: 1, sm: 2 }}>
        <PlayerForm identifier={identifier} />
      </Box>
    </Box>
  );
}
