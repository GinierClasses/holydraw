import { Box, makeStyles, Avatar, Typography } from '@material-ui/core';

type BookSentenceElementProps = {
  username?: string;
  children?: string;
  avatarUrl?: string;
};

const useStyles = makeStyles(theme => ({
  avatar: {
    width: 32,
    height: 32,
    backgroundColor: theme.palette.primary.dark,
    overflow: 'visible',
    boxShadow: theme.shadows[2],
    '&> img': {
      height: 26,
      width: 'auto',
      margin: 'auto',
      position: 'unset',
    },
  },
  box: {
    backgroundColor: theme.palette.custom.main,
    borderRadius: 20,
    border: 'none',
  },
}));

export default function BookSentenceElement({
  username,
  children,
  avatarUrl,
}: BookSentenceElementProps) {
  const classes = useStyles();
  return (
    <Box display="flex" flexDirection="column">
      <Typography variant="subtitle1">{username}</Typography>
      <Box
        display="flex"
        flexDirection="row"
        p={0.5}
        width={320}
        className={classes.box}>
        <Avatar src={avatarUrl} className={classes.avatar} />
        <Box ml={1} mr={1} alignSelf="center">
          <Typography variant="body1">{children}</Typography>
        </Box>
      </Box>
    </Box>
  );
}
