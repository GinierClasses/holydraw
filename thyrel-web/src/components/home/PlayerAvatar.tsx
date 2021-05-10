import { Box, fade, makeStyles } from '@material-ui/core';
import ShuffleRoundedIcon from '@material-ui/icons/ShuffleRounded';

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
    width: 64,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 64,
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
  root: {
    animation: 'float 4s infinite ease-in-out',
  },
  '@global': {
    '@keyframes float': {
      '0%': { transform: 'translateY(-10px)' },
      '50%': { transform: 'translateY(10px)' },
      '100%': { transform: 'translateY(-10px)' },
    },
  },
}));

export default function PlayerAvatar({ image, onShuffle }: PlayerAvatarProps) {
  const classes = useStyles();
  return (
    <Box
      alignItems="center"
      width={256}
      position="relative"
      height={256}
      className={classes.root}>
      <button className={classes.button} onClick={onShuffle}>
        <ShuffleRoundedIcon style={{ color: '#FFFFFF', fontSize: 32 }} />
      </button>
      <Box
        border={2}
        display="flex"
        borderColor="primary.main"
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
