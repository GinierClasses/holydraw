import { Icon } from 'rsuite';
import { baseColor, bgFade } from '../../styles/colors';
import Box from '../../styles/Box';
// import styled from '@emotion/styled';
import { css } from '@emotion/css';

type AvatarCardProps = {
  image?: string;
  size?: 'md' | 'lg';
  onShuffle?: () => void;
};

// const StyledAvatar = styled(Avatar)({
//   width: '48px',
//   height: '48px',
// });

export default function AvatarCard({
  //children,
  image,
  size,
  onShuffle,
}: AvatarCardProps) {
  return (
    <Box
      alignItems="center"
      width={256}
      height={256}
      className={css({
        position: 'relative',
      })}>
      <button
        onClick={() => onShuffle?.()}
        className={css({
          backgroundColor: baseColor,
          outline: 'none',
          borderRadius: '50%',
          position: 'absolute',
          left: '0',
          bottom: '0',
          width: '48px',
          height: '48px',
          boxShadow: `0px 4px 1px ${bgFade(0.8)}`,
          '&:active': {
            bottom: -4,
            boxShadow: 'none',
          },
        })}>
        <Icon icon="random" />
      </button>
      <Box
        borderWidth={2}
        borderRadius="50%"
        width={256}
        height={256}
        overflow="hidden">
        <img
          src={image}
          className={css({ width: 256, height: 'fit-content' })}
          alt="Avatar"
        />
      </Box>
    </Box>
  );
}
