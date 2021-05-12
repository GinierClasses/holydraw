import React from 'react';
import { Dialog, DialogTitle } from '@material-ui/core';

type AlbumSliderProps = {
  open: boolean;
  username?: string;
};

export default function AlbumSlider({ open, username }: AlbumSliderProps) {
  return (
    <Dialog fullScreen maxWidth="xs" open={open}>
      <DialogTitle>Do you really want to kick {username} ?</DialogTitle>
    </Dialog>
  );
}
