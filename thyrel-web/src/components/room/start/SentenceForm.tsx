import React from 'react';
import { Grid } from '@material-ui/core';
import BigButton from 'components/BigButton';
import BigInput from 'components/BigInput';
import { useSessionContext } from 'hooks/SessionProvider';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';
import { useRandomSentence } from 'hooks/useRandomSentence';
import { useTimerEvent } from 'hooks/useTimerInterval';

export default function StartForm() {
  const { session, currentElement, onSave, autoSave } = useSessionContext();
  const [sentence, setSentence] = React.useState('');
  const isEditing = Boolean(!currentElement?.finishAt);
  const defaultSentence = useRandomSentence();

  useTimerEvent({
    finishAt: new Date(session?.stepFinishAt || ''),
    timeDuration: session?.timeDuration || 60,
    onFinish: () => autoSave(sentence),
    onFinishPercentage: 98,
  });

  return (
    <>
      <Grid item className="full-width">
        <BigInput
          disabled={!isEditing}
          placeholder={defaultSentence}
          startIcon={<EditIcon />}
          value={sentence}
          onChange={e => setSentence(e.target.value)}
        />
      </Grid>
      <Grid item>
        <BigButton
          disabled={sentence.length === 0}
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
      </Grid>
    </>
  );
}
