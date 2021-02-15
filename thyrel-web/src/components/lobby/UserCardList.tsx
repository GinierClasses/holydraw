import Box from '../../styles/Box';
import UserCard from './UserCard';
import Player from '../../types/Player.type';

type UserCardListProps = {
  players: Player[];
};

export default function UserCardList({ players }: UserCardListProps) {
  return (
    <Box
      gap={16}
      height={384}
      width={270}
      alignItems="center"
      flexDirection="column"
      overflowY="scroll"
      pr={8}>
      {players.map(player => {
        return (
          <UserCard
            id={player.id}
            name={player.username}
            avatar={player.avatarUrl}
            isOwner={player.isOwner}
            isKickable={false}
            onKick={id => console.log('User id is :', id)}
            key={player.id}
          />
        );
      })}
    </Box>
  );
}
