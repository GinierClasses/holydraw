import { DialogContent, DialogTitle, Grid } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { RoomMode, roomModeInformations } from 'types/Room.type';
import RoomModeCard from './RoomModeCard';

type RoomModeSettingsModalProps = {
  open: boolean;
  onClose: () => void;
  onSelect: (mode: RoomMode) => void;
};

export default function RoomModeSettingsModal({
  open,
  onClose,
  onSelect,
}: RoomModeSettingsModalProps) {
  return (
    <Dialog onClose={() => onClose()} open={open}>
      <DialogTitle>Settings</DialogTitle>
      <IconButton
        sx={{
          position: 'absolute',
          right: theme => theme.spacing(1),
          top: theme => theme.spacing(1),
          margin: 0,
        }}
        onClick={() => onClose()}
        size="large">
        <CloseIcon />
      </IconButton>
      <DialogContent>
        <Grid container wrap="wrap" justifyContent="center" spacing={2}>
          {Object.keys(roomModeInformations).map((key: string) => {
            const roomMode = Number(key) as RoomMode;
            const mode = roomModeInformations[roomMode];
            return (
              <Grid item key={key}>
                <RoomModeCard onClick={() => onSelect(roomMode)} {...mode} />
              </Grid>
            );
          })}
        </Grid>
      </DialogContent>
    </Dialog>
  );
}
