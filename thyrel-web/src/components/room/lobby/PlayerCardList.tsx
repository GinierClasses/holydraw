import PlayerCard from './PlayerCard';
import Player from 'types/Player.type';
import profilesPictures from 'images/profiles/profiles-pictures';
import { Box, Grid } from '@material-ui/core';

type PlayerCardListProps = {
  players?: Player[];
  playerId?: number;
  isKickable?: boolean;
  onKick?: (id: number, name: string) => void;
};

export default function PlayerCardList({
  players,
  playerId,
  isKickable,
  onKick,
}: PlayerCardListProps) {
  return (
    <Box height={384} width={256 + 8 + 8} overflow="hidden scroll">
      <Grid container spacing={2} alignItems="flex-end">
        {players &&
          players.map(player => {
            const isPlayerSelected = playerId === player.id;
            return (
              <Grid item xs={12} key={player.id}>
                <PlayerCard
                  id={player.id}
                  name={player.username}
                  avatar={profilesPictures[Number(player.avatarUrl)]}
                  isOwner={player.isOwner}
                  isKickable={isKickable}
                  isCurrentPlayer={isPlayerSelected}
                  onKick={onKick}
                />
              </Grid>
            );
          })}
      </Grid>
    </Box>
  );
}
