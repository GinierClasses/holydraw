import { Box, Button, makeStyles, Typography } from '@material-ui/core';
import InfoIcon from '@material-ui/icons/Info';
import { useRoomContext } from 'hooks/RoomProvider';
import React from 'react';
import 'styles/roboto-mono-font.css';
import { RoomMode } from 'types/Room.type';
import ModeModal from './ModeModal';

const useStyles = makeStyles(theme => ({
  button: {
    marginLeft: theme.spacing(4),
    fontSize: 20,
    height: 32,
  },
}));

const modeName: Record<RoomMode, string> = {
  [RoomMode.Standard]: 'Standard',
  [RoomMode.OneWord]: 'One Word',
};

export default function RoomModeSelector() {
  const classes = useStyles();
  const { room } = useRoomContext();
  const [open, setOpen] = React.useState(false);
  return (
    <Box
      display="flex"
      flexDirection="row"
      alignItems="center"
      height={32}
      width={262}>
      <Typography variant="body1">Mode:</Typography>
      <Button
        className={classes.button}
        endIcon={<InfoIcon />}
        variant="contained"
        onClick={() => {
          setOpen(true);
        }}>
        {room?.mode ? modeName[room?.mode] : 'loading...'}
      </Button>
      <ModeModal
        open={open}
        onClose={() => setOpen(false)}
        onSelect={() => {}}
      />
    </Box>
  );
}
