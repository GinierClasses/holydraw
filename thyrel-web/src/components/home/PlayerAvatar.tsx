import { Icon } from 'rsuite';
import { baseColor, bgColor, bgFade } from '../../styles/colors';
import Box from '../../styles/Box';
import { css } from '@emotion/css';
import styled from '@emotion/styled';

type PlayerAvatarProps = {
  image: string;
  onShuffle?: () => void;
};

const ShuffleButton = styled.button({
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
});

export default function PlayerAvatar({ image, onShuffle }: PlayerAvatarProps) {
  return (
    <Box
      alignItems="center"
      width={256}
      height={256}
      className={css({
        position: 'relative',
      })}>
      <ShuffleButton onClick={onShuffle}>
        <Icon icon="random" />
      </ShuffleButton>
      <Box
        borderWidth={2}
        borderRadius="50%"
        width={256}
        height={256}
        bg={bgColor}
        className={css({ boxShadow: `0px 4px 1px ${bgFade(0.8)}` })}>
        <img
          src={image}
          className={css({ height: 256, width: 'auto', margin: 'auto' })}
          alt="Avatar"
        />
      </Box>
    </Box>
  );
}
