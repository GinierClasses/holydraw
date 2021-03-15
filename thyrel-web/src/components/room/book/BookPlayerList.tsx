import Box from 'styles/Box';
import Player from 'types/Player.type';
import { Avatar } from 'rsuite';
import { primaryFade } from 'styles/colors';
import styled from '@emotion/styled';
import { Tooltip, Whisper } from 'rsuite';
import { css } from '@emotion/css';
import profilesPictures from 'images/profiles/profiles-pictures';

type BookPlayerListProps = {
  players: Player[];
  playerId?: number;
};

const StyledAvatar = styled(Avatar)({
  width: 32,
  height: 32,
  overflow: 'visible',
  '> img': {
    height: '32px !important',
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
      maxWidth={200}
      overflowX="scroll"
      alignItems="center"
      flexDirection="row">
      {players.map((player, i) => {
        const isPlayerSelected = playerId === player.id;
        return (
          <div key={i}>
            <Whisper
              placement="top"
              trigger="hover"
              speaker={<Tooltip>{player.username}</Tooltip>}>
              <StyledAvatar
                className={css({
                  backgroundColor: `${
                    isPlayerSelected ? primaryFade(0.6) : primaryFade(0.2)
                  } !important`,
                })}
                circle={true}
                src={profilesPictures[Number(player.avatarUrl)]}
                size="lg"
              />
            </Whisper>
          </div>
        );
      })}
    </Box>
  );
}
