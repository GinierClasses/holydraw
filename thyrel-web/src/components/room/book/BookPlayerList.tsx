import Player from 'types/Player.type';
import {
  Box,
  makeStyles,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from '@material-ui/core';
import StarIcon from '@material-ui/icons/Star';
import CloseIcon from '@material-ui/icons/Close';
import BookPlayerAvatar from './BookPlayerAvatar';

type BookPlayerListProps = {
  players: Player[];
  playerId?: number;
  isKickable?: boolean;
  onClick?: (id: number, username: string) => void;
};

const useStyles = makeStyles(theme => ({
  badge: {
    width: 20,
    height: 20,
    borderRadius: '50%',
    backgroundColor: theme.palette.secondary.main,
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
    position: 'absolute',
    bottom: 0,
    left: 0,
  },
  container: {
    overflowX: 'scroll',
  },
  username: {
    overflow: 'hidden',
    maxWidth: 64,
  },
  button: {
    backgroundColor: 'transparent',
    outline: 'none',
    padding: 0,
  },
}));

export default function BookPlayerList({
  players,
  playerId,
  onClick,
  isKickable,
}: BookPlayerListProps) {
  const theme = useTheme();
  const isDeviceSM = useMediaQuery(theme.breakpoints.up('sm'));
  const classes = useStyles();

  return (
    <Box
      display="flex"
      gridGap={8}
      maxWidth={isDeviceSM ? 200 : 285}
      className={classes.container}
      alignItems="center"
      flexDirection="row">
      {players.map((player, i) => {
        const isPlayerSelected = playerId === player.id;
        return (
          <Tooltip key={player.id} title={player.username} placement="top">
            <Box flexDirection="column" alignItems="center" zIndex={4}>
              <Box position={{ xs: 'relative', sm: 'initial' }}>
                {!isDeviceSM &&
                  (player.isOwner ? (
                    <div className={classes.badge}>
                      <StarIcon
                        data-testid="star-icon"
                        style={{ fontSize: 32 }}
                      />
                    </div>
                  ) : (
                    isKickable && (
                      <button
                        onClick={() =>
                          !player.isOwner &&
                          isKickable &&
                          onClick?.(player.id, player.username)
                        }
                        className={classes.button}>
                        <div className={classes.badge}>
                          <CloseIcon
                            data-testid="kick-icon"
                            style={{ fontSize: 32 }}
                          />
                        </div>
                      </button>
                    )
                  ))}
                <BookPlayerAvatar
                  isSelected={isPlayerSelected}
                  avatarUrl={player.avatarUrl}
                />
              </Box>
              {!isDeviceSM && (
                <Typography className={classes.username} variant="subtitle1">
                  {player.username}
                </Typography>
              )}
            </Box>
          </Tooltip>
        );
      })}
    </Box>
  );
}
