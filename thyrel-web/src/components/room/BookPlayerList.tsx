import Box from '../../styles/Box';
import Player from '../../types/Player.type';
import { Avatar } from 'rsuite';
import { primaryFade } from '../../styles/colors';
import styled from '@emotion/styled';
import { Tooltip, Whisper } from 'rsuite';
import { css } from '@emotion/css';

type BookPlayerListProps = {
  players: Player[];
  playerId?: number;
};

const StyledAvatar = styled(Avatar)({
  width: 32,
  height: 32,
  overflow: 'visible',
  '> img': {
    // `!important` is awful in CSS but I don't have the choice
    height: '26px !important',
    width: 'auto !important',
    margin: 'auto',
  },
});

export default function BookPlayerList({
  players,
  playerId,
}: BookPlayerListProps) {
  return (
    <Box
      gap={8}
      margin="0px 0px 25px 0px"
      height={50}
      width={200}
      overflowX="scroll"
      alignItems="center"
      flexDirection="row">
      {players.map(player => {
        const isPlayerSelected = playerId === player.id;
        return (
          <div>
            <Whisper
              placement="top"
              trigger="hover"
              speaker={<Tooltip>{player.username}</Tooltip>}>
              <StyledAvatar
                className={css({
                  backgroundColor: isPlayerSelected
                    ? primaryFade(0.6)
                    : primaryFade(0.2),
                })}
                circle={true}
                src={player.avatarUrl}
                size="lg"
              />
            </Whisper>
          </div>
        );
      })}
    </Box>
  );
}
