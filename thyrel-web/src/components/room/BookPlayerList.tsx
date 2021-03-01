import Box from '../../styles/Box';
import BookPlayerList from './BookPlayerList';
import Player from '../../types/Player.type';
import { Avatar } from 'rsuite';
import { baseColor } from '../../styles/colors';
import styled from '@emotion/styled/types/base';

type BookPlayerListListProps = {
  players: Player[];
  isKickable: boolean;
  onKick?: (id: number) => void;
};

const StyledAvatar = styled(Avatar)({
  width: 48,
  height: 48,
  backgroundColor: 'transparent',
  border: `1px solid ${baseColor}`,
  overflow: 'visible',
  '> img': {
    // `!important` is awful in CSS but I don't have the choice
    height: '48px !important',
    width: 'auto !important',
    margin: 'auto',
  },
});

export default function BookPlayerListList({
  players,
  isKickable,
  onKick,
}: BookPlayerListListProps) {
  return (
    <Box
      gap={16}
      height={270}
      width={150}
      overflowY="scroll"
      alignItems="center"
      flexDirection="row"
      pr={8}>
      {players.map(player => {
        return (
          
        );
      })}
    </Box>
  );
}

{/* <BookPlayerList
id={player.id}
name={player.username}
avatar={player.avatarUrl}
isOwner={player.isOwner}
isKickable={isKickable}
onKick={onKick}
key={player.id}
/> */}