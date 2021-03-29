import BigButton from 'components/BigButton';
import BigInput from 'components/BigInput';
import GymGuy from 'images/gym-guy.svg';
import GameBar from 'components/GameBar';
import EditIcon from '@material-ui/icons/Edit';
import { Box, Typography } from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';

export default function Start() {
  return (
    <Box padding={4} display="flex" flexDirection="column" gridGap={42}>
      <GameBar max={12} />
      <Box display="flex" flexDirection="column" alignItems="center">
        <img src={GymGuy} alt="" width={256} />
        <Typography variant="h4">Start a story</Typography>
      </Box>
      <Box
        gridGap={16}
        display="flex"
        flexDirection="column"
        alignItems="center">
        <BigInput
          placeholder="A grandma ate my father"
          startIcon={<EditIcon />}
        />
        <BigButton
          startIcon={<SaveIcon style={{ fontSize: 32 }} />}
          size="large">
          Save
        </BigButton>
      </Box>
    </Box>
  );
}
