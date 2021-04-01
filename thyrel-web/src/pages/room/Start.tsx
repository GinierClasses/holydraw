import BigButton from 'components/BigButton';
import BigInput from 'components/BigInput';
import GymGuy from 'images/gym-guy.svg';
import GameBar from 'components/GameBar';
import EditIcon from '@material-ui/icons/Edit';
import { Box, Typography } from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import { useSessionContext } from 'hooks/SessionProvider';
import { useState } from 'react';

export default function Start() {
  const { currentElement, onSave } = useSessionContext();
  const [sentence, setSentence] = useState('');
  const isEditing = Boolean(!currentElement?.finishAt);

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
          disabled={!isEditing}
          placeholder="A grandma ate my father"
          startIcon={<EditIcon />}
          value={sentence}
          onChange={e => setSentence(e.target.value)}
        />
        <BigButton
          onClick={() => onSave(sentence)}
          startIcon={
            isEditing ? (
              <SaveIcon style={{ fontSize: 32 }} />
            ) : (
              <EditIcon style={{ fontSize: 32 }} />
            )
          }
          size="large">
          {isEditing ? 'Save' : 'Edit'}
        </BigButton>
      </Box>
    </Box>
  );
}
