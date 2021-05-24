import React from 'react';
import { Box, Grid, makeStyles } from '@material-ui/core';
import BigButton from 'components/BigButton';
import BigInput from 'components/BigInput';
import { useSessionContext } from 'hooks/SessionProvider';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';
import { useRandomSentence } from 'hooks/useRandomSentence';
import { useTimerEvent } from 'hooks/useTimerInterval';
import { client } from 'api/client';
import { HolyElement } from 'types/HolyElement.type';
import { getToken } from 'api/player-provider';
import { SessionStepType } from 'types/Session.type';
import { RoomMode } from 'types/Room.type';
import { useRoomContext } from 'hooks/RoomProvider';

const useStyles = makeStyles(theme => ({
  button: {
    marginLeft: theme.spacing(1),
    fontSize: 28,
    [theme.breakpoints.down('xs')]: {
      width: '100%',
      marginLeft: theme.spacing(0),
      marginTop: theme.spacing(1),
    },
  },
}));

export default function StartForm() {
  const { session, currentElement, onSave } = useSessionContext();
  const [sentence, setSentence] = React.useState(currentElement?.text || '');
  const [loading, setLoading] = React.useState(false);
  const isEditing = Boolean(!currentElement?.finishAt);
  const { room } = useRoomContext();
  const isOneWord = room?.mode === RoomMode.OneWord;
  const defaultSentence = useRandomSentence(isOneWord);
  const classes = useStyles();

  useTimerEvent({
    finishAt: new Date(session?.stepFinishAt || ''),
    timeDuration: session?.timeDuration || 60,
    onFinish: () => {
      client<HolyElement>(`element/auto/${currentElement?.id}`, {
        token: getToken(),
        method: 'PATCH',
        data: { text: sentence || defaultSentence },
      });
    },
    onFinishPercentage: 98,
  });

  return (
    <>
      <Grid item className="full-width">
        <Box
          display="flex"
          width="100%"
          flexDirection={{ xs: 'column', sm: 'row' }}>
          <BigInput
            fullWidth
            disabled={!isEditing}
            placeholder={
              session?.stepType === SessionStepType.Start
                ? defaultSentence
                : 'Your description here'
            }
            value={sentence}
            onChange={e => setSentence(e.target.value)}
          />

          <BigButton
            className={classes.button}
            color="primary"
            loading={loading}
            disabled={sentence.length === 0}
            onClick={() => {
              setLoading(true);
              onSave(sentence).then(() => setLoading(false));
            }}
            startIcon={
              isEditing ? (
                <SaveIcon style={{ fontSize: 28 }} />
              ) : (
                <EditIcon style={{ fontSize: 28 }} />
              )
            }>
            {isEditing ? 'Save' : 'Edit'}
          </BigButton>
        </Box>
      </Grid>
    </>
  );
}
