import React from 'react';
import BigButton from '../BigButton';
import PlayForWorkIcon from '@material-ui/icons/PlayForWork';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
} from '@material-ui/core';

type ModalJoinProps = {
  identifier?: string;
  onClick: (identifier: string) => void;
  loading?: boolean;
  className?: string;
};

export default function ModalJoin({
  identifier: urlIdentifier,
  loading,
  onClick,
  className,
}: ModalJoinProps) {
  const [open, setOpen] = React.useState(false);
  const [identifier, setIdentifier] = React.useState('');
  return (
    <>
      <BigButton
        startIcon={<PlayForWorkIcon style={{ fontSize: 32 }} />}
        loading={loading}
        className={className}
        size="large"
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
            autoFocus
            margin="dense"
            id="name"
            label="Identifier"
            value={identifier}
            onChange={event => setIdentifier(event.target.value)}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="primary">
            Cancel 👋
          </Button>
          <Button
            onClick={() => {
              onClick(identifier);
              setOpen(false);
            }}
            color="primary">
            Join 🥳
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
