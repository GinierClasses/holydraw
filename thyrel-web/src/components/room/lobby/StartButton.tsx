import { Box, Typography, useTheme } from '@material-ui/core';
import BigButton from 'components/BigButton';
import SpinnerIcon from 'components/SpinnerIcon';
import Player from 'types/Player.type';
import PlayArrowRoundedIcon from '@material-ui/icons/PlayArrowRounded';

type StartButtonProps = {
  player?: Player;
  startName?: string;
  onStart: () => void;
};

export default function StartButton({
  player,
  startName = 'game',
  onStart,
}: StartButtonProps) {
  const theme = useTheme();
  return (
    <Box m={3} display="flex" flexDirection="column" alignItems="center">
      <Box display="flex" alignItems="center">
        {!player?.isOwner && (
          <SpinnerIcon
            style={{ color: theme.palette.text.secondary, marginRight: 4 }}
          />
        )}
        <Typography variant="body2" color="textSecondary">
          {player?.isOwner
            ? "you're the owner, click here to start the " + startName + '.'
            : 'Waiting for the host to start the ' + startName + '.'}
        </Typography>
      </Box>
      {player?.isOwner && (
        <Box mt={2}>
          <BigButton
            onClick={onStart}
            size="large"
            startIcon={<PlayArrowRoundedIcon style={{ fontSize: 48 }} />}>
            Start
          </BigButton>
        </Box>
      )}
    </Box>
  );
}
