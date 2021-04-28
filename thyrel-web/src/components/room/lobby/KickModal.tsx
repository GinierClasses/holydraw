import React from 'react';
import { Button, Dialog, DialogActions, DialogTitle } from '@material-ui/core';

type KickModalProps = {
  open: boolean;
  username?: string;
  onKick: () => void;
  onClose: () => void;
};

export function KickModal({ open, username, onKick, onClose }: KickModalProps) {
  return (
    <Dialog fullWidth maxWidth="xs" open={open} onClose={() => onClose()}>
      <DialogTitle>Do you really want to kick {username} ?</DialogTitle>
      <DialogActions>
        <Button onClick={() => onClose()} color="secondary">
          Cancel 👋
        </Button>
        <Button onClick={() => onKick()} color="secondary">
          Kick 🤫
        </Button>
      </DialogActions>
    </Dialog>
  );
}
