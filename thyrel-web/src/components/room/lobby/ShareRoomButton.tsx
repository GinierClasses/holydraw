import { copyToClipboard } from 'utils/clipboard';
import { Box, Button, makeStyles, Typography } from '@material-ui/core';
import VpnKeyIcon from '@material-ui/icons/VpnKeyRounded';
import { useSnackbar } from 'notistack';
import Player from 'types/Player.type';
import { client } from 'api/client';
import { getToken } from 'api/player-provider';
import 'styles/roboto-mono-font.css';

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
  robotoMono: {
    fontFamily: 'Roboto Mono',
  },
}));

export default function ShareRoomButton({
  identifier,
  player,
}: ShareRoomButtonProps) {
  const { enqueueSnackbar } = useSnackbar();
  const classes = useStyles();

  function onShared() {
    if (!identifier) return;
    copyToClipboard(`${window.location.origin}/join/${identifier}`);
    enqueueSnackbar('URL successfully copied 😎', { variant: 'success' });
  }

  function onGenerate() {
    if (!identifier || !player?.isOwner) return;
    client('room/reload_identifier', {
      token: getToken(),
      method: 'PATCH',
    }).then(() =>
      enqueueSnackbar('Identifier successfully regenerated 😎', {
        variant: 'success',
      }),
    );
  }

  return (
    <Box>
      <Button
        startIcon={<VpnKeyIcon style={{ fontSize: 32 }} />}
        onClick={onShared}
        classes={{ label: classes.robotoMono }}
        variant="contained">
        {identifier || 'loading...'}
      </Button>
      {player?.isOwner && (
        <Box>
          <Button fullWidth onClick={onGenerate} className={classes.button}>
            <Typography variant="body2" color="textSecondary">
              Generate new code
            </Typography>
          </Button>
        </Box>
      )}
    </Box>
  );
}
