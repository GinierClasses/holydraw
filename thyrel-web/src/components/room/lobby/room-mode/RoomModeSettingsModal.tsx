import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { DialogContent, DialogTitle, Grid } from '@material-ui/core';
import { RoomMode, roomModeInformations } from 'types/Room.type';
import RoomModeCard from './RoomModeCard';

type RoomModeSettingsModalProps = {
  open: boolean;
  onClose: () => void;
  onSelect: (mode: RoomMode) => void;
};

const useStyles = makeStyles(theme => ({
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    margin: 0,
  },
}));

export default function RoomModeSettingsModal({
  open,
  onClose,
  onSelect,
}: RoomModeSettingsModalProps) {
  const classes = useStyles();

  return (
    <Dialog onClose={() => onClose()} open={open}>
      <DialogTitle>Settings</DialogTitle>
      <IconButton className={classes.closeButton} onClick={() => onClose()}>
        <CloseIcon />
      </IconButton>
      <DialogContent>
        <Grid container wrap="wrap" justify="center" spacing={2}>
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
