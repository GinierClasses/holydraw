import { Avatar, fade, makeStyles, Theme } from '@material-ui/core';
import profilesPictures from 'images/profiles/profiles-pictures';

const useAvatarStyles = makeStyles<Theme, { isSelected: boolean }>(theme => ({
  avatar: {
    height: 64,
    width: 64,
    overflow: 'visible',
    backgroundColor: props =>
      props.isSelected
        ? fade(theme.palette.primary.main, 0.6)
        : fade(theme.palette.primary.main, 0.2),
    [theme.breakpoints.up('sm')]: {
      height: 40,
      width: 40,
    },
    '&> img': {
      height: 64,
      width: 'auto',
      margin: 'auto',
      position: 'unset',
      [theme.breakpoints.up('sm')]: {
        height: 40,
      },
    },
  },
}));

export default function BookPlayerAvatar({
  avatarUrl,
  isSelected,
}: {
  avatarUrl: string;
  isSelected: boolean;
}) {
  const classes = useAvatarStyles({ isSelected });
  return (
    <Avatar
      className={classes.avatar}
      src={profilesPictures[Number(avatarUrl)]}
    />
  );
}
