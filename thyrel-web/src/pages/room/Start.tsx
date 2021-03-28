import { css } from '@emotion/css';
import BigButton from 'components/BigButton';
import BigInput from 'components/BigInput';
import Box from 'styles/Box';
import GymGuy from 'images/gym-guy.svg';
import GameBar from 'components/GameBar';
import { client } from 'api/client';
import { usePlayerContext } from 'hooks/PlayerProvider';
import { Notification } from 'rsuite';

export default function Start() {
  const { player } = usePlayerContext();

  function onSave(isUrl: boolean, content:string){
    // const url = `element/finishCurrent`;
    const url = `element/finish`;
    const elementContent = isUrl?{DrawImage: content}:{Text: content}
    // window.alert("Save element" + url);
    client(url, {
      token: player?.token?.tokenKey,
      method: 'PATCH',
      data: elementContent,
    })
    .then(response => {
      Notification['info']({
        title:'you get from api:',
        description: 'response: ',
      });
    })
    .catch(error => {
      Notification['error']({
        title: 'An error occurred while trying to kick a player.',
        description: error,
      });
    });
  }

  // const url = `player/players/${id}/kick`;
  //   client(url, {
  //     token: player?.token?.tokenKey,
  //     method: 'PATCH',
  //   })
  //     .then(response => {
  //       Notification['success']({
  //         title: 'Player successfully kicked.',
  //         description: 'Play with the bests!',
  //       });
  //     })
  //     .catch(error => {
  //       Notification['error']({
  //         title: 'An error occurred while trying to kick a player.',
  //         description: error,
  //       });
  //     });
  
  return (
    <Box padding={32} flexDirection="column" gap={42}>
      <GameBar max={12} />

      <Box flexDirection="column" alignItems="center">
        <img src={GymGuy} alt="" width={256} />

        <h1
          className={css({
            fontFamily: 'Work Sans',
            fontWeight: 'bold',
            fontSize: 32,
          })}>
          Start a story
        </h1>
      </Box>

      <Box gap={16} flexDirection="column" alignItems="center">
        <BigInput placeholder="A grandma ate my father" icon="edit" />
        <BigButton onClick={() => onSave(false, "element text")} icon="check">Save</BigButton>
        <BigButton onClick={() => onSave(false, "element text")} icon="edit">Edit</BigButton>
      </Box>
    </Box>
  );
}
