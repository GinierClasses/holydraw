import Box from '../../styles/Box';
import PlayerCard from './PlayerCard';
import Player from '../../types/Player.type';
import profilesPictures from '../../images/profiles/profiles-pictures';

type PlayerCardListProps = {
  players?: Player[];
  isKickable?: boolean;
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
      overflowY="scroll"
      alignItems="center"
      flexDirection="column"
      pr={8}>
      {players &&
        players.map(player => {
          return (
            <PlayerCard
              id={player.id}
              name={player.username}
              avatar={profilesPictures[Number(player.avatarUrl)]}
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
