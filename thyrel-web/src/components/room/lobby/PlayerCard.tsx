import { Avatar } from 'rsuite';
import { css } from '@emotion/css';
import styled from '@emotion/styled';
import Box from 'styles/Box';
import { Icon } from 'rsuite';
import { baseColor, bgColor } from 'styles/colors';

type PlayerCardProps = {
  id: number;
  name: string;
  avatar: string;
  isOwner?: boolean;
  isKickable?: boolean;
  onKick?: (id: number) => void;
};

// Sets size for avatar component
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

export default function PlayerCard({
  id,
  name,
  avatar,
  isOwner,
  isKickable,
  onKick,
}: PlayerCardProps) {
  return (
    <Box
      borderWidth={1}
      width={256}
      height={64}
      borderRadius={4}
      padding={8}
      alignItems="center"
      justifyContent="space-between"
      bg={bgColor}>
      <StyledAvatar circle={true} src={avatar} size="lg" />
      <p
        className={css({
          fontFamily: 'Work Sans',
          fontSize: 20,
          fontWeight: 'bold',
          overflow: 'hidden',
          maxWidth: 128,
        })}>
        {name}
      </p>
      <div>
        {isOwner ? (
          <Icon data-testid="star-icon" icon="twinkle-star" />
        ) : (
          isKickable && (
            <button
              onClick={() => onKick?.(id)}
              className={css({
                backgroundColor: 'transparent',
                outline: 'none',
                padding: 0,
              })}>
              <Icon icon="close" />
            </button>
          )
        )}
      </div>
    </Box>
  );
}
