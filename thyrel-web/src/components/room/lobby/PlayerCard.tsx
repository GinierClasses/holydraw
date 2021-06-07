import { baseColor } from 'styles/colors';
import { Avatar, Box, makeStyles, Typography } from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';
import StarIcon from '@material-ui/icons/Star';
import CloseIcon from '@material-ui/icons/Close';
import clsx from 'clsx';

type PlayerCardProps = {
  id: number;
  name: string;
  avatar: string;
  isOwner?: boolean;
  isKickable?: boolean;
  isCurrentPlayer?: boolean;
  onKick?: (id: number, name: string) => void;
};

const useStyles = makeStyles(theme => ({
  avatar: {
    width: 48,
    height: 48,
    backgroundColor: `${theme.palette.primary.dark}`,
    boxShadow: theme.shadows[5],
    overflow: 'visible',
    '&> img': {
      height: 48,
      width: 'auto',
      margin: 'auto',
      position: 'unset',
    },
  },
  badge: {
    width: 20,
    height: 20,
    borderRadius: '50%',
    backgroundColor: baseColor,
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
    position: 'absolute',
    bottom: 0,
    left: 0,
    zIndex: 1,
  },
  icon: {
    color: '#ffffff',
  },
  badgeIcon: {
    width: 16,
    height: 16,
  },
  username: {
    fontFamily: 'Work Sans',
    fontSize: 20,
    width: '100%',
    fontWeight: 'bold',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    margin: `0 ${theme.spacing(1)}px`,
  },
  kickButton: {
    cursor: 'pointer',
  },
}));

export default function PlayerCard({
  id,
  name,
  avatar,
  isOwner,
  isKickable,
  isCurrentPlayer,
  onKick,
}: PlayerCardProps) {
  const classes = useStyles();
  return (
    <Box
      borderRadius={32}
      padding={1}
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      bgcolor="background.default">
      <Box position="relative">
        {isCurrentPlayer && (
          <div className={classes.badge}>
            <PersonIcon
              className={clsx(classes.icon, classes.badgeIcon)}
              data-testid="user-icon"
            />
          </div>
        )}
        <Avatar src={avatar} className={classes.avatar} />
      </Box>

      <Typography color="textPrimary" className={classes.username}>
        {name}
      </Typography>
      <Box display="flex" alignItems="center">
        {isOwner ? (
          <StarIcon className={classes.icon} data-testid="star-icon" />
        ) : (
          isKickable && (
            <Box
              component="button"
              padding={0}
              border={0}
              className={classes.kickButton}
              height={24}
              onClick={() => onKick?.(id, name)}
              bgcolor="transparent">
              <CloseIcon className={classes.icon} />
            </Box>
          )
        )}
      </Box>
    </Box>
  );
}
