import { alpha, Avatar } from '@material-ui/core';
import profilesPictures from 'images/profiles/profiles-pictures';

export default function BookPlayerAvatar({
  avatarUrl,
  isSelected,
}: {
  avatarUrl: string;
  isSelected: boolean;
}) {
  return (
    <Avatar
      sx={{
        height: 64,
        width: 64,
        overflow: 'visible',
        backgroundColor: theme =>
          isSelected
            ? alpha(theme.palette.primary.main, 0.6)
            : alpha(theme.palette.primary.main, 0.2),
        '&> img': {
          height: 64,
          width: 'auto',
          margin: 'auto',
          position: 'unset',
        },
      }}
      src={profilesPictures[Number(avatarUrl)]}
    />
  );
}
