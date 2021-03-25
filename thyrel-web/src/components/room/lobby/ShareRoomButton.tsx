import { copyToClipboard } from 'utils/clipboard';
import { Box, Button, makeStyles } from '@material-ui/core';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import { useSnackbar } from 'notistack';

type ShareRoomButtonProps = {
  identifier?: string;
};

const useStyles = makeStyles(theme => ({
  identifierText: {
    marginLeft: 16,
    fontWeight: 'bold',
    width: '100%',
    color: theme.palette.text.primary,
  },
  img: {
    height: 256,
    width: 'auto',
    margin: 'auto',
  },
  icon: {
    fontSize: 32,
    color: theme.palette.text.primary,
  },
}));

export default function ShareRoomButton({ identifier }: ShareRoomButtonProps) {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  function onShared() {
    if (identifier) {
      copyToClipboard(`${window.location.origin}/join/${identifier}`);
      enqueueSnackbar('URL successfully copied 😎', { variant: 'success' });
    }
  }
  return (
    <Button onClick={onShared} size="large" variant="contained">
      <Box display="flex" alignItems="center">
        <VpnKeyIcon className={classes.icon} />
        <span className={classes.identifierText}>
          {identifier || 'loading...'}
        </span>
      </Box>
    </Button>
  );
}
