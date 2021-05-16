import { copyToClipboard } from 'utils/clipboard';
import { Box, Button, makeStyles, Typography } from '@material-ui/core';
import VpnKeyIcon from '@material-ui/icons/VpnKeyRounded';
import { useSnackbar } from 'notistack';
import Player from 'types/Player.type';

type ShareRoomButtonProps = {
  player?: Player;
  identifier?: string;
};

const useStyles = makeStyles(theme => ({
  button: {
    backgroundColor: 'transparent',
    border: 'none',
    textDecoration: 'underline',
    display: 'inline',
    margin: 0,
    padding: 0,
    '&:hover': {
      background: 'none',
    },
  },
}));

export default function ShareRoomButton({
  identifier,
  player,
}: ShareRoomButtonProps) {
  const { enqueueSnackbar } = useSnackbar();
  const classes = useStyles();

  function onShared() {
    if (identifier) {
      copyToClipboard(`${window.location.origin}/join/${identifier}`);
      enqueueSnackbar('URL successfully copied 😎', { variant: 'success' });
    }
  }
  return (
    <Box>
      <Button
        startIcon={<VpnKeyIcon style={{ fontSize: 32 }} />}
        onClick={onShared}
        variant="contained">
        {identifier || 'loading...'}
      </Button>
      {player?.isOwner && (
        <Box>
          <Button fullWidth className={classes.button}>
            <Typography variant="body2" color="textSecondary">
              Generate new code
            </Typography>
          </Button>
        </Box>
      )}
    </Box>
  );
}
