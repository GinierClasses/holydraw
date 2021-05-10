import { copyToClipboard } from 'utils/clipboard';
import { Button } from '@material-ui/core';
import VpnKeyIcon from '@material-ui/icons/VpnKeyRounded';
import { useSnackbar } from 'notistack';

type ShareRoomButtonProps = {
  identifier?: string;
};

export default function ShareRoomButton({ identifier }: ShareRoomButtonProps) {
  const { enqueueSnackbar } = useSnackbar();

  function onShared() {
    if (identifier) {
      copyToClipboard(`${window.location.origin}/join/${identifier}`);
      enqueueSnackbar('URL successfully copied 😎', { variant: 'success' });
    }
  }
  return (
    <Button
      startIcon={<VpnKeyIcon style={{ fontSize: 32 }} />}
      onClick={onShared}
      variant="contained">
      {identifier || 'loading...'}
    </Button>
  );
}
