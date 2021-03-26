import { Box, Typography, useTheme } from '@material-ui/core';
import BigButton from 'components/BigButton';
import SpinnerIcon from 'components/SpinnerIcon';
import Player from 'types/Player.type';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';

type StartButtonProps = {
  player?: Player;
  onStart: () => void;
};

export default function StartButton({ player, onStart }: StartButtonProps) {
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
            ? "you're the owner, click here to start the game"
            : 'Waiting for the host to start the game.'}
        </Typography>
      </Box>
      {player?.isOwner && (
        <Box mt={2}>
          <BigButton
            onClick={onStart}
            size="large"
            startIcon={<PlayArrowIcon style={{ fontSize: 32 }} />}>
            Start
          </BigButton>
        </Box>
      )}
    </Box>
  );
}
