import { copyToClipboard } from 'utils/clipboard';
import { Box, Button, Link } from '@material-ui/core';
import VpnKeyIcon from '@material-ui/icons/VpnKeyRounded';
import { useSnackbar } from 'notistack';
import Player from 'types/Player.type';

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
    if (identifier) {
      copyToClipboard(`${window.location.origin}/join/${identifier}`);
      enqueueSnackbar('URL successfully copied 😎', { variant: 'success' });
    }
  }
  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <Button
        startIcon={<VpnKeyIcon style={{ fontSize: 32 }} />}
        onClick={onShared}
        variant="contained">
        {identifier || 'loading...'}
      </Button>
      {player?.isOwner && identifier && (
        <Link component="button" variant="body2" color="textSecondary">
          Generate new code
        </Link>
      )}
    </Box>
  );
}
