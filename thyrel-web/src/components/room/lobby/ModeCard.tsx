import { Box, Typography } from '@material-ui/core';
import { InfoRoomModeProps } from 'types/Room.type';

type RoomModeCardProps = InfoRoomModeProps & {
  onClick: () => void;
};

export default function RoomModeCard({
  title,
  description,
  onClick,
}: RoomModeCardProps) {
  return (
    <Box
      component="button"
      bgcolor="custom.main"
      flexDirection="column"
      justifyContent="space-between"
      mr={1}
      maxWidth={256}
      p={1}
      borderRadius={32}
      border="none"
      className="cursor-pointer"
      onClick={onClick}>
      <Typography variant="h6" color="textPrimary">
        {title}
      </Typography>
      <Typography variant="body1" color="textPrimary" align="center">
        {description}
      </Typography>
    </Box>
  );
}
