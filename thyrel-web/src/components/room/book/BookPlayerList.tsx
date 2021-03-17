import Box from 'styles/Box';
import Player from 'types/Player.type';
import { Avatar } from 'rsuite';
import { primaryFade } from 'styles/colors';
import styled from '@emotion/styled';
import { Tooltip, Whisper } from 'rsuite';
import { css } from '@emotion/css';
import profilesPictures from 'images/profiles/profiles-pictures';
import Mq, { MediaQuery } from 'styles/breakpoint';
import { useMediaQuery } from 'hooks/useMediaQuery';

type BookPlayerListProps = {
  players: Player[];
  playerId?: number;
  isKickable?: boolean;
  onClick?: (id: number, username: string) => void;
};

const StyledAvatar = styled(Avatar)({
  height: 64,
  width: 64,
  [Mq.SM]: {
    height: 32,
    width: 32,
  },
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
  onClick,
  isKickable,
}: BookPlayerListProps) {
  const isDeviceSM = useMediaQuery(MediaQuery.SM);
  return (
    <Box
      gap={8}
      maxWidth={isDeviceSM ? 200 : 300}
      overflowX="scroll"
      alignItems="center"
      flexDirection="row">
      {players.map((player, i) => {
        const isPlayerSelected = playerId === player.id;
        return (
          <Box
            key={i}
            className={css({
              [Mq.XS]: {
                flexDirection: 'column',
                alignItems: 'center',
              },
            })}>
            <Whisper
              placement="top"
              trigger="hover"
              speaker={<Tooltip>{player.username}</Tooltip>}>
              <button
                onClick={
                  isKickable
                    ? () => onClick?.(player.id, player.username)
                    : undefined
                }
                className={css({
                  backgroundColor: 'transparent',
                  outline: 'none',
                  padding: 0,
                  [Mq.SM]: {
                    pointerEvents: 'none',
                  },
                })}>
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
              </button>
            </Whisper>
            {!isDeviceSM && (
              <p
                className={css({
                  fontFamily: 'Work Sans',
                  fontSize: 16,
                  fontWeight: 'bold',
                  overflow: 'hidden',
                  maxWidth: 64,
                })}>
                {player.username}
              </p>
            )}
          </Box>
        );
      })}
    </Box>
  );
}
