import { Box, makeStyles, Avatar, Typography } from '@material-ui/core';

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
    gap: 4,
    padding: 4,

    position: 'static',
    width: 323,
    height: 40,
    left: 0,
    top: 21,
    border: `1px solid ${theme.palette.secondary.main}`,
    borderRadius: 4,
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
      <div className={classes.sentencecontainer}>
        <Avatar src={avatarUrl} className={classes.avatar} />
        <Typography className={classes.text} component="p">
          {sentence}
        </Typography>
      </div>
    </Box>
  );
}
