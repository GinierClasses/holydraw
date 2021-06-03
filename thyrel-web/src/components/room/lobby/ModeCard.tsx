import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { CardActionArea, Typography } from '@material-ui/core';

export type InfoModeProps = {
  title: string;
  description: string;
};

type ModeCardProps = InfoModeProps & {
  onClick: () => void;
};

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: 200,
    borderRadius: 32,
    backgroundColor: theme.palette.action.hover,
    marginRight: 4,
  },
  title: {
    marginBottom: 12,
  },
}));

export default function ModeCard({
  title,
  description,
  onClick,
}: ModeCardProps) {
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
