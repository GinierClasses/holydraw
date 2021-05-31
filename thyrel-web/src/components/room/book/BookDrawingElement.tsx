import { Box, makeStyles, Typography } from '@material-ui/core';
import CurrentDrawImage from '../CurrentDrawImage';
import ReactionPicker from './ReactionPicker';

type BookDrawingElementProps = {
  username?: string;
  src?: string;
};

const useStyles = makeStyles(theme => ({
  width: {
    width: 296,
    height: 186,
    [theme.breakpoints.down('xs')]: {
      width: '100%',
    },
  },

  username: {
    textAlign: 'right',
    maxWidth: 256,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    marginRight: theme.spacing(2),
  },
}));

type Reaction = {
  emojiId: number;
  count: number;
  isSelected: boolean;
};

export default function BookDrawingElement({
  username,
  src,
}: BookDrawingElementProps) {
  const classes = useStyles();

  const reactionsExample: Reaction[] = [
    { emojiId: 0, count: 1, isSelected: false },
    { emojiId: 1, count: 2, isSelected: false },
    { emojiId: 2, count: 0, isSelected: false },
    { emojiId: 3, count: 3, isSelected: false },
    { emojiId: 4, count: 2, isSelected: false },
  ];
  return (
    <>
      <Box position="relative">
        <Box
          display="flex"
          alignItems="flex-end"
          flexDirection="column"
          maxWidth={{ xs: '84%', sm: 'auto' }}>
          <Typography variant="subtitle1" className={classes.username}>
            {username}
          </Typography>

          <CurrentDrawImage src={src} className={classes.width} />
        </Box>
        <Box position="absolute" bottom={0} left={0} zIndex={1}>
          <ReactionPicker
            onClick={emj => console.log(emj)}
            reactions={reactionsExample}
          />
        </Box>
      </Box>
    </>
  );
}
