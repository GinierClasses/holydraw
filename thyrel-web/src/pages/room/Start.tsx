import { Grid, Typography } from '@material-ui/core';
import GameLayout from 'components/room/GameLayout';
import SentenceForm from 'components/room/start/SentenceForm';
import { useRoomContext } from 'hooks/RoomProvider';
import useMobileHorizontal from 'hooks/useMobileHorizontal';
import GymGuy from 'images/gym-guy.svg';
import { RoomMode } from 'types/Room.type';

export default function Start() {
  const isHorizontal = useMobileHorizontal();
  return (
    <GameLayout maxWidth="sm">
      <Grid
        container
        spacing={3}
        direction="column"
        alignItems="center"
        className="full-height"
        wrap="nowrap"
        justifyContent="center">
        {!isHorizontal && (
          <Grid item>
            <img src={GymGuy} alt="" width={256} />
          </Grid>
        )}
        <Grid item>
          <CurrentStartDirective />
        </Grid>
        <SentenceForm />
      </Grid>
    </GameLayout>
  );
}

function CurrentStartDirective() {
  const { room } = useRoomContext();

  return (
    <Typography variant="h4">
      {room?.mode === RoomMode.OneWord ? 'Choose a word' : 'Start a story'}
    </Typography>
  );
}
