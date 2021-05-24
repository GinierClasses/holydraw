import { Box, Button, makeStyles, Typography } from '@material-ui/core';
import InfoIcon from '@material-ui/icons/Info';
import React from 'react';
import 'styles/roboto-mono-font.css';
import ModeModal from './ModeModal';

const useStyles = makeStyles(theme => ({
  button: {
    marginLeft: theme.spacing(4),
    fontSize: 20,
    height: 32,
  },
}));

export default function RoomModeSelector() {
  const classes = useStyles();
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
        Standard
      </Button>
      <ModeModal open={open} onClose={() => setOpen(false)} />
    </Box>
  );
}
