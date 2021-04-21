import { usePlayerContext } from 'hooks/PlayerProvider';
import StartButton from '../lobby/StartButton';
//import { client } from 'api/client';
//import Session from 'types/Session.type';
//import { getToken } from 'api/player-provider';
//import { useSnackbar } from 'notistack';

export default function BookStartAction() {
  //const { enqueueSnackbar } = useSnackbar();
  const { player } = usePlayerContext();

  function onStart() {
    // TODO: When the NextAlbum() controller will be done.
    // client<Session>('session', { method: 'POST', token: getToken() }).then(
    //   () =>
    //     enqueueSnackbar('Game successfully started 💪', { variant: 'success' }),
    //   () =>
    //     enqueueSnackbar('Sorry, an error occured 😕 [Session-POST]', {
    //       variant: 'error',
    //     }),
    // );
  }

  return <StartButton onStart={onStart} book={true} player={player} />;
}
