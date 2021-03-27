import PlayerCard from './PlayerCard';
import Player from 'types/Player.type';
import profilesPictures from 'images/profiles/profiles-pictures';
import { Box } from '@material-ui/core';

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
    <Box
      display="flex"
      gridGap={16}
      height={384}
      alignItems="center"
      flexDirection="column"
      style={{ overflowY: 'scroll' }}
      pr={{ xs: 1, md: 1.5 }}>
      {players &&
        players.map(player => {
          const isPlayerSelected = playerId === player.id;
          return (
            <PlayerCard
              id={player.id}
              name={player.username}
              avatar={profilesPictures[Number(player.avatarUrl)]}
              isOwner={player.isOwner}
              isKickable={isKickable}
              isCurrentPlayer={isPlayerSelected}
              onKick={onKick}
              key={player.id}
            />
          );
        })}
    </Box>
  );
}
