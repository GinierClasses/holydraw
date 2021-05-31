import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { Box, DialogContent, DialogTitle } from '@material-ui/core';
import { RoomMode, roomModeInformations } from 'types/Room.type';
import RoomModeCard from './ModeCard';

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
    <Dialog onClose={() => onClose()} open={open} maxWidth="sm" fullWidth>
      <DialogTitle>Settings</DialogTitle>
      <IconButton className={classes.closeButton} onClick={() => onClose()}>
        <CloseIcon />
      </IconButton>
      <DialogContent>
        <Box
          display="flex"
          flexDirection="row"
          flexWrap="wrap"
          justifyContent="center">
          {Object.keys(roomModeInformations).map((key: string) => {
            const roomMode = Number(key) as RoomMode;
            const mode = roomModeInformations[roomMode];
            return (
              <RoomModeCard
                key={key}
                onClick={() => onSelect(roomMode)}
                {...mode}
              />
            );
          })}
        </Box>
      </DialogContent>
    </Dialog>
  );
}
