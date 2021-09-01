import React from 'react';
import BigButton from '../BigButton';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
} from '@material-ui/core';

type ButtonModalJoinProps = {
  identifier?: string;
  onClick: (identifier: string) => void;
  loading?: boolean;
  className?: string;
};

export default function ButtonModalJoin({
  identifier: urlIdentifier,
  loading,
  onClick,
  className,
}: ButtonModalJoinProps) {
  const [open, setOpen] = React.useState(false);
  const [identifier, setIdentifier] = React.useState('');

  function handleKeyPress(e: React.KeyboardEvent<HTMLInputElement>) {
    if (loading || e.key !== 'Enter') return;
    onClick(identifier);
  }

  return (
    <>
      <BigButton
        startIcon={
          urlIdentifier ? <PlayArrowIcon style={{ fontSize: 32 }} /> : undefined
        }
        fullWidth
        loading={loading}
        className={className}
        color={urlIdentifier ? 'primary' : 'default'}
        onClick={() =>
          urlIdentifier ? onClick(urlIdentifier) : setOpen(true)
        }>
        Join
      </BigButton>

      <Dialog
        fullWidth
        maxWidth="xs"
        open={open}
        onClose={() => setOpen(false)}>
        <DialogTitle>Join a game 👨‍🎨</DialogTitle>
        <DialogContent>
          <TextField
            color="secondary"
            autoFocus
            margin="dense"
            id="name"
            label="Identifier"
            value={identifier}
            onKeyPress={handleKeyPress}
            onChange={event => setIdentifier(event.target.value)}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="secondary">
            Cancel 👋
          </Button>
          <Button
            onClick={() => {
              onClick(identifier);
              setOpen(false);
            }}
            color="secondary">
            Join 🥳
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
