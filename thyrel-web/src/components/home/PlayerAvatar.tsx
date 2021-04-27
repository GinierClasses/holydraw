import { Box, fade, makeStyles } from '@material-ui/core';
import ShuffleIcon from '@material-ui/icons/Shuffle';

type PlayerAvatarProps = {
  image: string;
  onShuffle?: () => void;
};

const useStyles = makeStyles(theme => ({
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
    height: 256,
    width: 'auto',
    margin: 'auto',
  },
}));

export default function PlayerAvatar({ image, onShuffle }: PlayerAvatarProps) {
  const classes = useStyles();
  return (
    <Box alignItems="center" width={256} position="relative" height={256}>
      <button className={classes.button} onClick={onShuffle}>
        <ShuffleIcon style={{ color: '#FFFFFF' }} />
      </button>
      <Box
        border={2}
        display="flex"
        borderColor="secondary.main"
        borderRadius="50%"
        width={256}
        height={256}
        bgcolor="background.default"
        className={classes.imgBox}>
        <img src={image} className={classes.img} alt="Avatar" />
      </Box>
    </Box>
  );
}
