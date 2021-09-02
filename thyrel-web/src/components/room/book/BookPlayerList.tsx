import Player from 'types/Player.type';
import {
  Box,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from '@material-ui/core';
import StarIcon from '@material-ui/icons/Star';
import CloseIcon from '@material-ui/icons/Close';
import BookPlayerAvatar from './BookPlayerAvatar';
import { SxProps, Theme } from '@material-ui/system';

type BookPlayerListProps = {
  players: Player[];
  playerId?: number;
  isKickable?: boolean;
  onClick?: (id: number, username: string) => void;
};

const badgeSx: SxProps<Theme> = {
  width: 20,
  height: 20,
  borderRadius: '50%',
  backgroundColor: 'primary.main',
  alignItems: 'center',
  justifyContent: 'center',
  display: 'flex',
  border: 0,
  position: 'absolute',
  bottom: 0,
  left: 0,
  zIndex: 2,
};

const iconSx = {
  fontSize: 16,
  color: 'common.white',
};

export default function BookPlayerList({
  players,
  playerId,
  onClick,
  isKickable,
}: BookPlayerListProps) {
  const theme = useTheme();
  const isDeviceSM = useMediaQuery(theme.breakpoints.up('sm'));

  return (
    <Box
      display="flex"
      gap={2}
      maxWidth={285}
      sx={{
        overflowX: 'scroll',
      }}
      alignItems="center"
      flexDirection="row">
      {players.map(player => {
        const isPlayerSelected = playerId === player.id;
        return (
          <Tooltip key={player.id} title={player.username} placement="top">
            <Box flexDirection="column" alignItems="center" zIndex={4}>
              <Box position={'relative'}>
                {!isDeviceSM &&
                  (player.isOwner ? (
                    <Box sx={badgeSx}>
                      <StarIcon data-testid="star-icon" sx={iconSx} />
                    </Box>
                  ) : (
                    isKickable && (
                      <Box
                        component="button"
                        onClick={() => {
                          if (!player.isOwner && isKickable) {
                            onClick?.(player.id, player.username);
                          }
                        }}
                        sx={badgeSx}>
                        <CloseIcon data-testid="kick-icon" sx={iconSx} />
                      </Box>
                    )
                  ))}
                <BookPlayerAvatar
                  isSelected={isPlayerSelected}
                  avatarUrl={player.avatarUrl}
                />
              </Box>
              <Typography
                sx={{
                  overflow: 'hidden',
                  textAlign: 'center',
                  maxWidth: 64,
                  whiteSpace: 'nowrap',
                }}
                component="p"
                variant="body2">
                {player.username}
              </Typography>
            </Box>
          </Tooltip>
        );
      })}
    </Box>
  );
}
