import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { Box, Typography } from '@material-ui/core';

type ModeModalProps = {
  open: boolean;
  onClose: () => void;
};

const useStyles = makeStyles(theme => ({
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    margin: 0,
  },
}));

export default function ModeModal({ open, onClose }: ModeModalProps) {
  const classes = useStyles();

  return (
    <Dialog onClose={() => onClose()} open={open}>
      <Box
        display="flex"
        flexDirection="row"
        maxWidth="100%"
        justifyContent="center"
        bgcolor="background.paper"
        width={572}
        height={312}>
        <Box mt={2}>
          <Typography variant="h4">Settings</Typography>
          <IconButton className={classes.closeButton} onClick={() => onClose()}>
            <CloseIcon />
          </IconButton>
        </Box>
      </Box>
    </Dialog>
  );
}
