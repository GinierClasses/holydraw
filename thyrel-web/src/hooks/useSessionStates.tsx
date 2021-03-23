import { client } from 'api/client';
import { getToken } from 'api/player-provider';
import { useSnackbar } from 'notistack';
import React from 'react';
import { useHistory } from 'react-router';
import Session, { SessionStepType } from 'types/Session.type';

function useSessionStates() {
  const [session, setSession] = React.useState<Session>();
  const { enqueueSnackbar } = useSnackbar();
  const history = useHistory();

  React.useEffect(() => {
    let deleted = false;
    client<Session>('session/current', { token: getToken() }).then(
      session => !deleted && setSession(session),
      () => {
        enqueueSnackbar('Sorry 😅 An error occured', { variant: 'error' });
        history.push('/r/lobby');
      },
    );

    return () => {
      deleted = true;
    };
  }, [enqueueSnackbar, history]);

  // handling page with the Session
  React.useEffect(() => {
    const pathname = history.location.pathname;
    let newPathname = '';
    switch (session?.stepType) {
      case SessionStepType.Start:
        newPathname = '/r/start';
        break;
      case SessionStepType.Write:
        newPathname = '/r/write';
        break;
      case SessionStepType.Draw:
        newPathname = '/r/draw';
        break;
      case SessionStepType.Book:
        newPathname = '/r/book';
        break;
    }
    // change only if pathname is different than before
    if (newPathname && pathname !== newPathname) history.push(newPathname);
  }, [session?.stepType, history]);

  return { session, setSession };
}

export default useSessionStates;
