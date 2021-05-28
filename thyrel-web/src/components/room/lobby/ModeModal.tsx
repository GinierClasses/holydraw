import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { Box, DialogTitle } from '@material-ui/core';
import { RoomMode } from 'types/Room.type';
import ModeCard from './ModeCard';

type ModeModalProps = {
  open: boolean;
  onClose: () => void;
  onSelect: (mode: RoomMode) => void;
};

type InfoModeProps = {
  title: string;
  description: string;
};

const useStyles = makeStyles(theme => ({
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    margin: 0,
  },
}));

const infoMode: Record<RoomMode, InfoModeProps> = {
  [RoomMode.Standard]: {
    title: 'Standard',
    description: 'A simple mode where you draw and guess.',
  },
  [RoomMode.OneWord]: {
    title: 'OneWord',
    description: 'As Standard Mode but with only one word.',
  },
};

export default function ModeModal({ open, onClose, onSelect }: ModeModalProps) {
  const classes = useStyles();

  return (
    <Dialog onClose={() => onClose()} open={open}>
      <Box
        display="flex"
        flexDirection="row"
        bgcolor="background.paper"
        width={500}
        height={312}>
        <DialogTitle>Settings</DialogTitle>
        <IconButton className={classes.closeButton} onClick={() => onClose()}>
          <CloseIcon />
        </IconButton>
        <Box
          display="flex"
          flexDirection="row"
          flexWrap="wrap"
          justifyContent="center"
          mt={12}>
          {Object.keys(infoMode).map((key: string) => {
            const roomMode = Number(key) as RoomMode;
            const mode = infoMode[roomMode];
            return (
              <ModeCard {...mode} onClick={() => onSelect(roomMode)}></ModeCard>
            );
          })}
        </Box>
      </Box>
    </Dialog>
  );
}
