import { Box, Button, Link } from '@material-ui/core';
import VpnKeyIcon from '@material-ui/icons/VpnKeyRounded';
import { client } from 'api/client';
import { getToken } from 'api/player-provider';
import { useSnackbar } from 'notistack';
import 'styles/roboto-mono-font.css';
import Player from 'types/Player.type';
import { defaultColorSx } from 'utils/@material-ui-v5-migration';
import { copyToClipboard } from 'utils/clipboard';
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
    <Box
      color="textPrimary"
      display="flex"
      width="100%"
      flexDirection="column"
      alignItems="center">
      <Button
        startIcon={<VpnKeyIcon style={{ fontSize: 32 }} />}
        onClick={onShared}
        fullWidth
        sx={{
          fontSize: { xs: 24, md: 26 },
          height: 64,
          ...defaultColorSx,
        }}
        className="font_roboto-mono"
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
