import { Box, Grid } from '@material-ui/core';
import profilesPictures from 'images/profiles/profiles-pictures';
import Player from 'types/Player.type';
import PlayerCard from './PlayerCard';

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
    <Box width={272} height="100%" overflow="hidden scroll">
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
