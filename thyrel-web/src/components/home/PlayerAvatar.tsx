import { Box, fade, makeStyles, Theme } from '@material-ui/core';
import ShuffleIcon from '@material-ui/icons/Shuffle';

type PlayerAvatarProps = {
  image: string;
  onShuffle?: () => void;
  size?: number;
};

const useStyles = makeStyles<Theme, { size: number }>(theme => ({
  button: {
    backgroundColor: theme.palette.primary.main,
    outline: 'none',
    borderRadius: '50%',
    position: 'absolute',
    left: 0,
    bottom: 0,
    cursor: 'pointer',
    border: 'none',
    width: 48,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 48,
    boxShadow: `0px 4px 1px ${fade(theme.palette.background.default, 0.8)}`,
    '&:active': {
      bottom: -4,
      boxShadow: 'none',
    },
  },
  imgBox: {
    boxShadow: `0px 4px 1px ${fade(theme.palette.background.default, 0.8)}`,
  },
  img: {
    height: props => props.size,
    width: 'auto',
    margin: 'auto',
  },
}));

export default function PlayerAvatar({
  image,
  onShuffle,
  size = 256,
}: PlayerAvatarProps) {
  const classes = useStyles({ size });
  return (
    <Box alignItems="center" width={size} position="relative" height={size}>
      <button className={classes.button} onClick={onShuffle}>
        <ShuffleIcon style={{ color: '#FFFFFF' }} />
      </button>
      <Box
        border={2}
        display="flex"
        borderColor="primary.main"
        borderRadius="50%"
        width={size}
        height={size}
        bgcolor="background.default"
        className={classes.imgBox}>
        <img src={image} className={classes.img} alt="Avatar" />
      </Box>
    </Box>
  );
}
