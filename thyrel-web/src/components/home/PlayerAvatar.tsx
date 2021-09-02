import { alpha, Box } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import ShuffleRoundedIcon from '@material-ui/icons/ShuffleRounded';

type PlayerAvatarProps = {
  image: string;
  onShuffle?: () => void;
  size?: number;
};

const Image = styled('img')({
  width: 'auto',
  margin: 'auto',
});

export default function PlayerAvatar({
  image,
  onShuffle,
  size = 256,
}: PlayerAvatarProps) {
  return (
    <Box
      alignItems="center"
      width={size}
      position="relative"
      height={size}
      sx={{ animation: 'player-avatar-float 4s infinite ease-in-out' }}>
      <Box
        component="button"
        sx={{
          backgroundColor: theme => theme.palette.primary.main,
          outline: 'none',
          borderRadius: '50%',
          position: 'absolute',
          left: 0,
          bottom: 0,
          cursor: 'pointer',
          border: 'none',
          width: 64,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: 64,
          boxShadow: theme =>
            `0px 4px 1px ${alpha(theme.palette.background.default, 0.8)}`,
          '&:active': {
            bottom: -4,
            boxShadow: 'none',
          },
        }}
        onClick={onShuffle}>
        <ShuffleRoundedIcon
          data-testid="shuffle-icon"
          style={{ color: '#FFFFFF', fontSize: 32 }}
        />
      </Box>
      <Box
        border={2}
        display="flex"
        borderColor="primary.main"
        borderRadius="50%"
        width={size}
        height={size}
        bgcolor="background.default"
        sx={{
          boxShadow: theme =>
            `0px 4px 1px ${alpha(theme.palette.background.default, 0.8)}`,
        }}>
        <Image src={image} height={size} alt="Avatar" />
      </Box>
    </Box>
  );
}
