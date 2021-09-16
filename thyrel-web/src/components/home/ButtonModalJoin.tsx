import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@material-ui/core';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { defaultColorSx } from 'utils/@material-ui-v5-migration';
import BigButton from '../BigButton';

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
  const { t } = useTranslation();

  function handleKeyPress(event: React.KeyboardEvent<HTMLInputElement>) {
    if (loading || event.key !== 'Enter') return;
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
        variant={urlIdentifier ? 'contained' : 'text'}
        color={urlIdentifier ? 'primary' : 'inherit'}
        sx={urlIdentifier ? undefined : defaultColorSx}
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
        <DialogTitle>{t('lobby.joinGame')}</DialogTitle>
        <DialogContent>
          <TextField
            color="secondary"
            autoFocus
            margin="dense"
            id="name"
            label="Identifier"
            value={identifier}
            onKeyPress={handleKeyPress}
            onChange={e => setIdentifier(e.target.value)}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="secondary">
            {t('lobby.cancel')}
          </Button>
          <Button
            onClick={() => {
              onClick(identifier);
              setOpen(false);
            }}
            color="secondary">
            {t('lobby.join')}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
