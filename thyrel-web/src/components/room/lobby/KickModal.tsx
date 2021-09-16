import { Button, Dialog, DialogActions, DialogTitle } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

type KickModalProps = {
  open: boolean;
  username?: string;
  onKick: () => void;
  onClose: () => void;
};

export function KickModal({ open, username, onKick, onClose }: KickModalProps) {
  const { t } = useTranslation();
  return (
    <Dialog fullWidth maxWidth="xs" open={open} onClose={() => onClose()}>
      <DialogTitle>{t('lobby.kick', { username: username })}</DialogTitle>
      <DialogActions>
        <Button onClick={() => onClose()} color="secondary">
          {t('lobby.cancelButton')}
        </Button>
        <Button onClick={() => onKick()} color="secondary">
          {t('lobby.kickButton')}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
