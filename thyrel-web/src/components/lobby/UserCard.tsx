import { Avatar } from 'rsuite';
import { css } from '@emotion/css';
import styled from '@emotion/styled';
import Box from '../../styles/Box';
import { Icon } from 'rsuite';

type UserCardProps = {
  id: number;
  name: string;
  avatar: string;
  isOwner: boolean;
  isKickable: boolean;
  onKick?: (id: number) => void;
};

// Sets size for avatar component
const StyledAvatar = styled(Avatar)({
  width: '48px',
  height: '48px',
});

export default function UserCard({
  id,
  name,
  avatar,
  isOwner,
  isKickable,
  onKick,
}: UserCardProps) {
  return (
    <Box
      borderWidth={1}
      width={192}
      height={64}
      borderRadius={4}
      padding={8}
      alignItems="center"
      justifyContent="space-between"
      className={css({
        background: '#0F131A',
      })}>
      <StyledAvatar circle={true} src={avatar} size="lg" />
      <p
        className={css({
          fontFamily: 'Work Sans',
          fontSize: 24 + 2 - name.length,
          fontWeight: 'bold',
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          textOverflow: 'ellipsis',
          maxWidth: 80,
        })}>
        {name}
      </p>
      <div>
        {isOwner ? (
          <Icon icon="twinkle-star" />
        ) : (
          isKickable && (
            <button
              onClick={() => onKick?.(id)}
              className={css({
                backgroundColor: 'transparent',
                outline: 'none',
              })}>
              <Icon icon="close" />
            </button>
          )
        )}
      </div>
    </Box>
  );
}
