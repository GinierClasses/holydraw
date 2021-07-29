import { Box, Typography, useTheme } from '@material-ui/core';
import BigButton from 'components/BigButton';
import SpinnerIcon from 'components/SpinnerIcon';
import Player from 'types/Player.type';
import PlayArrowRoundedIcon from '@material-ui/icons/PlayArrowRounded';

type StartButtonProps = {
  player?: Player;
  startName?: string;
  onClick: () => void;
  isLoading?: boolean;
  label?: string;
};

export default function StartButton({
  player,
  startName = 'game',
  isLoading,
  onClick,
  label = 'Start',
}: StartButtonProps) {
  const theme = useTheme();
  return (
    <Box mt={3} display="flex" flexDirection="column" alignItems="center">
      <Box display="flex" alignItems="center">
        {!player?.isOwner && (
          <SpinnerIcon
            style={{ color: theme.palette.text.secondary, marginRight: 4 }}
          />
        )}
        <Typography variant="body2" color="textSecondary">
          {player?.isOwner
            ? `you're the owner, click here to start the ${startName}`
            : `Waiting for the host to start the ${startName}`}
        </Typography>
      </Box>
      {player?.isOwner && (
        <Box mt={2}>
          <BigButton
            loading={isLoading}
            onClick={() => !isLoading && onClick()}
            color="primary"
            startIcon={<PlayArrowRoundedIcon style={{ fontSize: 48 }} />}>
            {label}
          </BigButton>
        </Box>
      )}
    </Box>
  );
}
