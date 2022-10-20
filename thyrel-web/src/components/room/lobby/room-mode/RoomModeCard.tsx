import { CardActionArea, Typography } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
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
    <Card
      sx={{
        maxWidth: 192,
        borderRadius: 4,
        backgroundColor: theme => theme.palette.background.default,
      }}
      onClick={onClick}>
      <CardActionArea>
        <CardContent>
          <Typography
            sx={{
              marginBottom: 1,
            }}
            variant="h5">
            {title}
          </Typography>
          <Typography variant="body2">{description}</Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
