import React from 'react';
import { Box } from '@material-ui/core';
import BigButton from 'components/BigButton';
import BigInput from 'components/BigInput';
import { useSessionContext } from 'hooks/SessionProvider';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';

export default function StartForm() {
  const { currentElement, onSave } = useSessionContext();
  const [sentence, setSentence] = React.useState('');
  const isEditing = Boolean(!currentElement?.finishAt);

  return (
    <Box gridGap={16} display="flex" flexDirection="column" alignItems="center">
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
  );
}
