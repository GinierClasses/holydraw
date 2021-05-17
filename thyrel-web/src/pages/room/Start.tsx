import GymGuy from 'images/gym-guy.svg';
import { Grid, Typography } from '@material-ui/core';
import SentenceForm from 'components/room/start/SentenceForm';
import GameLayout from 'components/room/GameLayout';
import { useRoomContext } from 'hooks/RoomProvider';
import { RoomMode } from 'types/Room.type';

export default function Start() {
  const { room } = useRoomContext();
  return (
    <GameLayout maxWidth="sm">
      <Grid
        container
        spacing={3}
        direction="column"
        alignItems="center"
        className="full-height"
        wrap="nowrap"
        justify="center">
        <Grid item>
          <img src={GymGuy} alt="" width={256} />
        </Grid>
        <Grid item>
          <Typography variant="h4">
            {room?.roomMode === RoomMode.Standard
              ? 'Start a story'
              : 'Choose a word'}
          </Typography>
        </Grid>
        <SentenceForm />
      </Grid>
    </GameLayout>
  );
}
