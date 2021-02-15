import Box from '../../styles/Box';
import UserCard from './UserCard';
import Player from '../../types/Player.type';

type UserCardListProps = {
  players: Player[];
  isKickable: boolean;
  onKick?: (id: number) => void;
};

export default function UserCardList({
  players,
  isKickable,
  onKick,
}: UserCardListProps) {
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
          <UserCard
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
