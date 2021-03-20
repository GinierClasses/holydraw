import Box from 'styles/Box';
import Player from 'types/Player.type';
import { Avatar } from 'rsuite';
import { baseColor, primaryFade } from 'styles/colors';
import styled from '@emotion/styled';
import { Icon, Tooltip, Whisper } from 'rsuite';
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
    height: '64px !important',
    width: 'auto !important',
    margin: 'auto',
    position: 'unset',
  },
});

const StyledBox = styled(Box)({
  width: 20,
  height: 20,
  borderRadius: '50%',
  backgroundColor: baseColor,
  alignItems: 'center',
  justifyContent: 'center',
  display: 'flex',
  position: 'absolute',
  bottom: 0,
  left: 0,
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
      maxWidth={isDeviceSM ? 200 : 285}
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
            <Box
              className={css({
                [Mq.XS]: {
                  position: 'relative',
                },
              })}>
              {!isDeviceSM &&
                (player.isOwner ? (
                  <StyledBox>
                    <Icon data-testid="star-icon" icon="twinkle-star" />
                  </StyledBox>
                ) : (
                  isKickable && (
                    <button
                      onClick={() =>
                        !player.isOwner &&
                        isKickable &&
                        onClick?.(player.id, player.username)
                      }
                      className={css({
                        backgroundColor: 'transparent',
                        outline: 'none',
                        padding: 0,
                      })}>
                      <StyledBox>
                        <Icon data-testid="kick-icon" icon="close" />
                      </StyledBox>
                    </button>
                  )
                ))}

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
            </Box>
            {!isDeviceSM && (
              <p
                className={css({
                  fontFamily: 'Work Sans',
                  fontSize: 16,
                  fontWeight: 'bold',
                  overflow: 'hidden',
                  flexDirection: 'row',
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
