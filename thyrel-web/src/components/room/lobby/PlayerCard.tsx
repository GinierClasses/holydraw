import { Avatar, Box, Typography } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import PersonIcon from '@material-ui/icons/Person';
import StarIcon from '@material-ui/icons/Star';

type PlayerCardProps = {
  id: number;
  name: string;
  avatar: string;
  isOwner?: boolean;
  isKickable?: boolean;
  isCurrentPlayer?: boolean;
  onKick?: (id: number, name: string) => void;
};

const iconSx = { color: 'common.white' };

export default function PlayerCard({
  id,
  name,
  avatar,
  isOwner,
  isKickable,
  isCurrentPlayer,
  onKick,
}: PlayerCardProps) {
  return (
    <Box
      borderRadius="32px"
      padding={1}
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      bgcolor="background.default">
      <Box position="relative">
        {isCurrentPlayer && (
          <Box
            sx={{
              width: 20,
              height: 20,
              borderRadius: '50%',
              backgroundColor: 'secondary.main',
              alignItems: 'center',
              justifyContent: 'center',
              display: 'flex',
              position: 'absolute',
              bottom: 0,
              left: 0,
              zIndex: 1,
            }}>
            <PersonIcon
              sx={{
                ...iconSx,
                ...{
                  width: 16,
                  height: 16,
                },
              }}
              data-testid="user-icon"
            />
          </Box>
        )}
        <Avatar
          src={avatar}
          sx={{
            width: 48,
            height: 48,
            backgroundColor: theme => `${theme.palette.primary.dark}`,
            boxShadow: 5,
            overflow: 'visible',
            '&> img': {
              height: 48,
              width: 'auto',
              margin: 'auto',
              position: 'unset',
            },
          }}
        />
      </Box>

      <Typography
        color="textPrimary"
        sx={{
          fontFamily: 'Work Sans',
          fontSize: 20,
          width: '100%',
          fontWeight: 'bold',
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          margin: theme => `0 ${theme.spacing(1)}`,
        }}>
        {name}
      </Typography>
      <Box display="flex" alignItems="center">
        {isOwner ? (
          <StarIcon sx={iconSx} data-testid="star-icon" />
        ) : (
          isKickable && (
            <Box
              component="button"
              padding={0}
              border={0}
              sx={{
                cursor: 'pointer',
              }}
              height={24}
              onClick={() => onKick?.(id, name)}
              bgcolor="transparent">
              <CloseIcon sx={iconSx} />
            </Box>
          )
        )}
      </Box>
    </Box>
  );
}
