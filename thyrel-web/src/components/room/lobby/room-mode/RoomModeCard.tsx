import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { CardActionArea, Typography } from '@material-ui/core';
import { InfoRoomModeProps } from 'types/Room.type';

type RoomModeCardProps = InfoRoomModeProps & {
  onClick: () => void;
};

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: 192,
    borderRadius: 32,
    backgroundColor: theme.palette.action.hover,
  },
  title: {
    marginBottom: 12,
  },
}));

export default function RoomModeCard({
  title,
  description,
  onClick,
}: RoomModeCardProps) {
  const classes = useStyles();
  return (
    <Card className={classes.root} onClick={onClick}>
      <CardActionArea>
        <CardContent>
          <Typography className={classes.title} variant="h5">
            {title}
          </Typography>
          <Typography variant="body2">{description}</Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
