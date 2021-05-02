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
  return (
    <>
      <BigButton
        startIcon={
          !urlIdentifier ? undefined : (
            <PlayArrowIcon style={{ fontSize: 32 }} />
          )
        }
        fullWidth
        loading={loading}
        className={className}
        size="medium"
        color={!urlIdentifier ? 'default' : 'primary'}
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
