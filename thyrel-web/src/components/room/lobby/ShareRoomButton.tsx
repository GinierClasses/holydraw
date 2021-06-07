import { copyToClipboard } from 'utils/clipboard';
import { Box, Button, Link } from '@material-ui/core';
import VpnKeyIcon from '@material-ui/icons/VpnKeyRounded';
import { useSnackbar } from 'notistack';
import Player from 'types/Player.type';
import { client } from 'api/client';
import { getToken } from 'api/player-provider';
import 'styles/roboto-mono-font.css';
import { loadingText } from 'utils/utils';

type ShareRoomButtonProps = {
  player?: Player;
  identifier?: string;
};

export default function ShareRoomButton({
  identifier,
  player,
}: ShareRoomButtonProps) {
  const { enqueueSnackbar } = useSnackbar();

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
    <Box display="flex" width="100%" flexDirection="column" alignItems="center">
      <Button
        startIcon={<VpnKeyIcon style={{ fontSize: 32 }} />}
        onClick={onShared}
        fullWidth
        classes={{ label: 'font_roboto-mono' }}
        variant="contained">
        {identifier || loadingText}
      </Button>
      {player?.isOwner && identifier && (
        <Link
          onClick={onGenerate}
          component="button"
          variant="body2"
          color="textSecondary">
          Generate new code
        </Link>
      )}
    </Box>
  );
}
