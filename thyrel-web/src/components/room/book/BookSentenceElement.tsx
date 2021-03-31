import { Box, makeStyles, Avatar, Typography } from '@material-ui/core';
import theme from 'theme';

type BookSentenceElementProps = {
  username?: string;
  sentence?: string;
  avatarUrl?: string;
};

const useStyles = makeStyles(theme => ({
  sentencecontainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: theme.spacing(1),
    border: `1px solid ${theme.palette.secondary.main}`,
    borderRadius: 4,
    maxWidth: theme.spacing(42),
  },
  avatar: {
    width: 32,
    height: 32,
    backgroundColor: theme.palette.secondary.dark,
    border: `1px solid ${theme.palette.secondary.main}`,
    overflow: 'visible',
    '&> img': {
      height: 32,
      width: 'auto',
      margin: 'auto',
      position: 'unset',
    },
  },
  text: {
    fontFamily: 'Work Sans',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 16,
  },
  sentence: {
    marginRight: 8,
    marginLeft: 8,
  },
}));

export default function BookSentenceElement({
  username,
  sentence,
  avatarUrl,
}: BookSentenceElementProps) {
  const classes = useStyles();
  return (
    <Box display="flex" flexDirection="column">
      <Box className={classes.text}>{username}</Box>
      <Box
        display="flex"
        flexDirection="row"
        alignItems="center"
        padding={theme.spacing(1)}
        border="1px solid"
        borderColor={theme.palette.secondary.main}
        borderRadius="4px"
        maxWidth={theme.spacing(42)}
        className={classes.sentencecontainer}>
        <Avatar src={avatarUrl} className={classes.avatar} />
        <Typography className={(classes.text, classes.sentence)} component="p">
          {sentence} asdasda sd wd asd asdas dasd asdasd as das dasdasd asd as
          dsd ad as dasd asd as dasd asd asd asd asdsdadas adasd asdas asd as
          dasd
        </Typography>
      </Box>
    </Box>
  );
}
