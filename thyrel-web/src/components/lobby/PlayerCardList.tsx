import Box from '../../styles/Box';
import PlayerCard from './PlayerCard';
import Player from '../../types/Player.type';

type PlayerCardListProps = {
  players: Player[];
  isKickable: boolean;
  onKick?: (id: number) => void;
};

export default function PlayerCardList({
  players,
  isKickable,
  onKick,
}: PlayerCardListProps) {
  return (
    <Box
      gap={16}
      height={384}
      width={270}
      overflowY="scroll"
      alignItems="center"
      flexDirection="column"
      pr={8}>
      {players.map(player => {
        return (
          <PlayerCard
            id={player.id}
            name={player.username}
            avatar={player.avatarUrl}
            isOwner={player.isOwner}
            isKickable={isKickable}
            onKick={onKick}
            key={player.id}
          />
        );
      })}
    </Box>
  );
}
